import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8); // Countdown for 8 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-zinc-900 text-white">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-green-900 p-8 rounded-xl shadow-md"
      >
        <h1 className="text-3xl font-bold text-green-400">Payment Successful 🎉</h1>
        <p className="text-lg mt-2">Your course has been purchased successfully.</p>
        <p className="text-gray-300 mt-1">Redirecting to your dashboard in {countdown} seconds...</p>
      </motion.div>

      {/* Go to Dashboard Button */}
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default SuccessPage;
