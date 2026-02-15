import React, { use, useState } from "react";
import { registerAPI } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [credentails, setCrendetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCrendetails({
      ...credentails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await registerAPI(credentails);
      localStorage.setItem("token", data.token);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <main className="flex justify-center items-center bg-linear-to-br from-blue-600 via-cyan-500 to-teal-400 min-h-screen">
        <form
          className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl w-80 p-6"
          onSubmit={handleLogin}
        >
          <h1 className="text-xl font-bold text-center text-white">
            CREATE ACCOUNT
          </h1>
          <input
            type="text"
            name="name"
            onChange={onChange}
            placeholder="Name"
            className="w-full border-b px-4 py-4 mb-4 outline-none text-white bg-transparent"
          />
          <input
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Email"
            className="w-full border-b px-4 py-4 mb-4 outline-none text-white bg-transparent"
          />
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Enter your password"
            className="w-full border-b px-4 py-4 mb-4 outline-none text-white bg-transparent"
          />
          <button
            type="submit"
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-4 rounded-full text-white font-semibold w-full p-2"
          >
            Log IN
          </button>

          <p className="text-xs text-center mt-4 text-gray-200">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-bold cursor-pointer hover:text-white"
            >
              Login
            </span>
          </p>
        </form>
      </main>
    </>
  );
}

export default Register;
