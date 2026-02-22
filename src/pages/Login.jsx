import React, { useState, useEffect } from "react";
import { loginAPI } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [credentails, setCrendetails] = useState({
    email: "",
    password: "",
  });

  const [loading , setLoading] = useState(false) ; // loading spinner

  const onChange = (e) => {
    setCrendetails({
      ...credentails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setLoading(true); //START spiner
    try {
      const data = await loginAPI(credentails);

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
    setLoading(false) ; //STOP spinner
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <main className="flex justify-center items-center bg-linear-to-br from-blue-600 via-cyan-500 to-teal-400 min-h-screen">
        <form
          className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl w-80 p-6"
          onSubmit={handleLogin}
        >
          <h1 className="text-xl font-bold text-center text-white">LOGIN</h1>
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
            disabled = {loading}
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-4 rounded-full text-white font-semibold w-full p-2 flex justify-center items-center gap-2"
          >
            {loading && (
               <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
            )}
            <span className="block text-center">
              {loading ? "Login..." : " Log IN"}
            </span>
           
          </button>

          <p className="text-xs text-center mt-4 text-gray-200">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="font-bold cursor-pointer hover:text-white"
            >
              Register
            </span>
          </p>
        </form>
      </main>
    </>
  );
}

export default Login;
