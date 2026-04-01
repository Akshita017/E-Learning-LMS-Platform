import { User } from "../models/user.model.js";
import { CourseProgress } from "../models/courseProgress.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Course } from "../models/course.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // patel214
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // extract public id of the old image from the url is it exists;
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
      deleteMediaFromCloudinary(publicId);
    }

    // upload new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const email = req.query.email;
    console.log("getEnrolledCourses called, email:", email);
    let user;
    if (email) {
      user = await User.findOne({ email }).populate({
        path: "enrolledCourses",
        populate: { path: "lectures" },
      });
    } else {
      const userId = req.id;
      user = await User.findById(userId).populate({
        path: "enrolledCourses",
        populate: { path: "lectures" },
      });
    }

    if (!user) {
      console.log("getEnrolledCourses: user not found for email", email);
      return res.status(404).json({ enrolledCourses: [] });
    }
    console.log(
      "getEnrolledCourses: found user",
      user.email,
      "enrolledCourses:",
      (user.enrolledCourses || []).length
    );

    // Also include courses from purchases (completed or pending) in case enrolledCourses wasn't updated
    // Include 'pending' as well so recently purchased courses show up in My Learning before webhook completes
    const completedPurchases = await CoursePurchase.find({
      userId: user._id,
      status: { $in: ["completed", "pending"] },
    }).populate("courseId");
    console.log(
      "getEnrolledCourses: purchases found:",
      completedPurchases.length
    );

    // Build a map of courseId -> { course, purchasedAt }
    const courseMap = new Map();

    // Add courses from user.enrolledCourses
    for (const course of user.enrolledCourses || []) {
      courseMap.set(String(course._id), { course, purchasedAt: null });
    }

    // Add/override from completed purchases
    for (const purchase of completedPurchases) {
      if (purchase.courseId) {
        courseMap.set(String(purchase.courseId._id), {
          course: purchase.courseId,
          purchasedAt: purchase.createdAt,
        });
      }
    }

    const results = [];
    for (const [courseId, { course, purchasedAt }] of courseMap.entries()) {
      const totalLectures = course.lectures ? course.lectures.length : 0;
      const progressDoc = await CourseProgress.findOne({
        courseId: String(course._id),
        userId: String(user._id),
      });
      const viewed = progressDoc
        ? progressDoc.lectureProgress.filter((p) => p.viewed).length
        : 0;
      const progress = totalLectures
        ? Math.round((viewed / totalLectures) * 100)
        : 0;

      // Normalize course object shape to what the frontend expects
      const courseObj = course.toObject ? course.toObject() : course;
      const normalized = {
        _id: courseObj._id,
        title: courseObj.courseTitle || courseObj.title || "",
        image: courseObj.courseThumbnail || courseObj.image || "",
        price: courseObj.coursePrice || courseObj.price || 0,
        description: courseObj.description || courseObj.subTitle || "",
        progress,
        purchasedAt,
        // include the original course object for any other data the client may need
        original: courseObj,
      };

      results.push(normalized);
    }

    console.log(
      "getEnrolledCourses: returning enrolledCourses:",
      results.length
    );
    return res.status(200).json({ enrolledCourses: results });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ enrolledCourses: [] });
  }
};
