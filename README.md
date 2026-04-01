🎓 E-Learning LMS Platform

A full-stack Learning Management System (LMS) built using the MERN stack, enabling users to browse courses, purchase them, and learn through structured content.

---

🚀 Features

* 👨‍🎓 User Authentication (Login/Signup)
* 📚 Browse & Enroll in Courses
* 💳 Secure Payment Integration (Stripe)
* 🎥 Video Lectures
* 📊 Progress Tracking
* 🧑‍🏫 Instructor Dashboard
* 📦 Course Management (CRUD)
* 🔐 Protected Routes & Role-Based Access

---

🛠️ Tech Stack

Frontend:

* React.js
* Redux Toolkit
* Tailwind CSS

Backend:

* Node.js
* Express.js

Database:

* MongoDB

Payment:

* Stripe API

---

📂 Project Structure

```
lms-main/
│
├── client/        # Frontend (React)
├── server/        # Backend (Node + Express)
├── .gitignore
└── README.md
```

---

⚙️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/your-username/E-Learning-LMS-Platform.git
cd E-Learning-LMS-Platform

---

2️⃣ Setup Backend

cd server
npm install

Create a `.env` file in the server folder:

PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key


Run backend:

npm run dev

---

3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

🔐 Environment Variables

Make sure to add the following in your `.env` file:

* `MONGO_URI`
* `JWT_SECRET`
* `STRIPE_SECRET_KEY`

⚠️ **Do NOT push your `.env` file to GitHub**

---

🧠 Future Improvements

* ⭐ Course Reviews & Ratings
* 📱 Mobile Responsiveness Improvements
* 📩 Email Notifications
* 🧾 Invoice Generation

---

🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a PR.

---

📄 License

This project is licensed under the MIT License.

---

👩‍💻 Author

**Akshita Maheshwari**

* GitHub: https://github.com/Akshita017
* LinkedIn: (Add your profile link here)

---

⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
