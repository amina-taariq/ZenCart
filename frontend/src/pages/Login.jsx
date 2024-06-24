import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    console.log("Login function executed", formData);
    let responseData;
    await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("Signup function executed", formData);
    let responseData;
    await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <section className="max-padd-container flexCenter flex-col pt-32 ">
      <div className="w-full max-w-[600px] h-[550px] bg-white m-auto px-14 py-10 rounded-md">
        <h3 className="h3 text-center">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state === "Sign Up" && (
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={changeHandler}
              placeholder="Your Name"
              className="h-12 w-full pl-5  bg-slate-900/5 outline-none rounded text-sm"
            />
          )}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Your Email"
            className="h-12 w-full pl-5 bg-slate-900/5 outline-none rounded text-sm"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={changeHandler}
              placeholder="Your password"
              className="h-12 w-full pl-5 bg-slate-900/5 outline-none rounded text-sm pr-10"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="btn-dark w-[100%] h-12 rounded my-5 !py-1"
            onClick={() => {
              state === "Login" ? login() : signup();
            }}>
            Continue
          </button>
        </div>

        {state === "Sign Up" ? (
          <p className="text-black font-bold">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-secondary underline cursor-pointer">
              Login
            </span>
          </p>
        ) : (
          <p className="text-black font-bold">
            Create an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-secondary underline cursor-pointer">
              Click here
            </span>
          </p>
        )}

        <div className="flexStart mt-6 gap-3">
          <input
            type="checkbox"
            name=""
            id=""
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
