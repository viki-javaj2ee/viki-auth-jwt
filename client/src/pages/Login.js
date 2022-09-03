import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    const userObj = {
      email,
      password,
    };
    try {
      toast.loading("loading...");
      const response = await axios.post("/api/auth/login", userObj);
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("user", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-300">
        <h1 className="font-semibold text-3xl text-primary"> Login</h1>
        <input
          type="text"
          className="py-1 px-3 border-2 border-secondary rounded focus:outline-none w-full"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="py-1 px-3 border-2 border-secondary rounded focus:outline-none w-full"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-end">
          <Link className="underline text-secondary" to="/register">
            Click here to register
          </Link>
          <button
            className="py-1 px-5 text-white bg-primary"
            onClick={loginUser}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
