import React from "react";
import { motion } from "framer-motion";

function AuthPage({ children }) {
  return (
    <div className="relative w-full h-full min-h-screen p-10 px-10 bg-zinc-900 flex items-center justify-center mt-12 ">

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#1E1E2E] via-[#27293D] to-[#121212] opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      ></motion.div>

      {/* Floating Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-[#4F46E5] opacity-30 rounded-full"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-20 right-16 w-28 h-28 bg-[#FACC15] opacity-30 rounded-full"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* Authentication Form Wrapper */}
      <div className="relative z-10 bg-gray-800/90 p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
        {children}
      </div>
    </div>
  );
}

export default AuthPage;
