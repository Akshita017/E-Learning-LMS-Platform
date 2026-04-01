import { useState, useEffect } from "react";
import Header from "../components/Header";
import Avatar from "boring-avatars";
import userData from "../../../server/data/users.json";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePic: "/profile-placeholder.jpg",
    role: "",
    enrolledCourses: [],
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser?.email) {
      const matchedUser = userData.find((u) => u.email === storedUser.email);

      console.log(matchedUser);
      if (matchedUser) {
        
        setFormData({
          name: matchedUser.name || "",
          email: matchedUser.email || "",
          profilePic: matchedUser.profilePic || "/profile-placeholder.jpg",
          role: matchedUser.isAdmin ? "Admin" : "Student",
          enrolledCourses: matchedUser.enrolledCourses || [],
        });
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Optional: You can also update localStorage or backend here
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-start bg-zinc-800 text-white py-10 px-6 mt-16">
        <div className="bg-zinc-900 p-10 rounded-xl shadow-2xl w-full">
          <h1 className="text-3xl font-extrabold text-[#FACC15] mb-8">PROFILE</h1>

          <div className="flex flex-row gap-20 p-10 items-center">
            {!formData.profilePic ? (
              <Avatar
                size={112}
                name={formData.name}
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            ) : (
              <img
                src={formData.profilePic}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
              />
            )}

            <div className="text-white">
              <p>Name: {formData.name}</p>
              <p>Email: {formData.email}</p>
              <p>Role: {formData.role}</p>
            </div>

            {isEditing && (
              <div className="fixed inset-0 bg-opacity-60 bg-[#00000081] flex items-center justify-center z-50">
                <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-white">Edit Profile</h2>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-white hover:text-red-500 text-sm"
                    >
                      ✖
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        readOnly
                        className="w-full border border-gray-300 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-700 p-3 rounded-lg text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!isEditing && (
              <div className="text-center mt-4 flex">
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg text-white shadow-md hover:shadow-lg transition-all"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <h3 className="mt-8 text-lg font-semibold text-[#FACC15]">
            Courses you're enrolled in
          </h3>

          {formData.enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {formData.enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 p-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <h2 className="text-lg font-semibold">{course.name}</h2>
                  <p className="text-gray-400 text-sm">By {course.owner}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mt-2">You haven't enrolled yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
