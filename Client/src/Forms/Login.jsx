import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Success action
    toast.success("Login successful!");
    console.log("Login Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4 flex items-center border rounded-lg px-3 py-2">
          <Mail className="text-gray-500 mr-2" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="flex-1 outline-none"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-4 flex items-center border rounded-lg px-3 py-2">
          <Lock className="text-gray-500 mr-2" size={20} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="flex-1 outline-none"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
