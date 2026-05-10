import { useState } from "react";

import { Link, useNavigate }
from "react-router-dom";

import axios from "axios";

import "./Login.css";

function Login() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      email: "",
      password: ""

    });

  const [error, setError] =
    useState("");

  /* HANDLE CHANGE */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  /* HANDLE LOGIN */

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(

            "https://gtr-production-74e0.up.railway.app/api/auth/login",

            formData

          );

        /* SAVE TOKEN */

        localStorage.setItem(

          "token",

          response.data.token

        );

        localStorage.setItem(

          "user",

          JSON.stringify(
            response.data.user
          )

        );

        /* REDIRECT */

        navigate("/dashboard");

      } catch (error) {

        console.log(error.response);

        setError(
          error.response?.data?.message ||
          "Login failed"
        );
      }

    };

  return (

    <div className="auth-page">

      {/* LEFT SECTION */}

      <div className="auth-left">

        <div className="overlay"></div>

        <div className="left-content">

          <h1>GTR</h1>

          <p>
            Manage projects,
            collaborate with your team,
            and track tasks efficiently
            in one workspace.
          </p>

          <div className="auth-tags">

            <span>
              Project Tracking
            </span>

            <span>
              Task Management
            </span>

            <span>
              Team Collaboration
            </span>

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="auth-right">

        <div className="auth-card">

          <h2>Welcome Back</h2>

          <p className="subtitle">
            Login to continue
          </p>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />

            </div>

            {/* ERROR */}

            {error && (

              <p className="error-text">

                {error}

              </p>

            )}

            {/* BUTTON */}

            <button
              type="submit"
              className="auth-btn"
            >

              Login

            </button>

          </form>

          <p className="switch-text">

            Don’t have an account?

            <Link to="/signup">

              Sign Up

            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;