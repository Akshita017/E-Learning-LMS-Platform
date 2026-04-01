import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Import your pages and components
import Login from "../pages/Login";
import Signup from "../pages/Singup";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import MyLearning from "../pages/MyLearning";
import CourseTable from "../components/CourseTable";
import NewCourse from "../pages/NewCourse";
import CheckoutPage from "../pages/Checkout";
import SuccessPage from "../pages/SuccessPage";
import CourseDetail from "../pages/courseDetail";

const stripePromise = loadStripe("pk_test_51R8FfSFwNCmx1WSbZTu0keGb5i5i705GshbTySIXY82cbfHnCvpFqosX0aGYg66TcR1iPzWaYAYiE44wVYWzoszy00JoOXPT2l");

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/add-course" element={<CourseTable />} />
          <Route path="/create-course" element={<NewCourse />} />
          <Route path="/course-details" element={<CourseDetail />} />

          {/* Wrap the CheckoutPage with Elements for Stripe integration */}
          <Route
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutPage />
              </Elements>
            }
          />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
