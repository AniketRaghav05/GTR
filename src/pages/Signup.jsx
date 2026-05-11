import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import "./Signup.css";

function Signup() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Member"

    });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  const handleSignup =
    async (e) => {

      e.preventDefault();

      /* PASSWORD CHECK */

      if (
        formData.password !==
        formData.confirmPassword
      ) {

        alert(
          "Passwords do not match"
        );

        return;

      }

      try {

        await axios.post(

          "https://gtr-production-74e0.up.railway.app/api/auth/signup",

          {

            name:
              formData.name,

            email:
              formData.email,

            password:
              formData.password,

            role:
              formData.role

          }

        );

        alert(
          "Account created successfully"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||

          "Signup failed"
        );

      }

    };

  return (

    <div className="auth-page">

      {/* LEFT SIDE */}

      <div className="auth-left">

        <div className="overlay"></div>

        <div className="left-content">

          <h1>GTR</h1>

          <p>

            Create your workspace
            and manage projects,
            tasks, and teams
            efficiently.

          </p>

          <div className="auth-tags">

            <span>
              Organize Projects
            </span>

            <span>
              Track Progress
            </span>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="auth-right">

        <div className="auth-card">

          <h2>
            Create Account
          </h2>

          <p className="subtitle">

            Start managing your
            team today

          </p>

          <form
            onSubmit={handleSignup}
          >

            {/* NAME */}

            <div className="input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* ROLE */}

            <div className="input-group">

              <label>
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >

                <option>
                  Member
                </option>

                <option>
                  Admin
                </option>

                <option>
                  Manager
                </option>

              </select>

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            {/* CONFIRM */}

            <div className="input-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                required
              />

            </div>

            {/* BUTTON */}

            <button
              className="auth-btn"
              type="submit"
            >

              Create Account

            </button>

          </form>

          <p className="switch-text">

            Already have an account?

            <Link to="/">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Signup;
