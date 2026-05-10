import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  return (
    <div className="auth-page">

      {/* LEFT SIDE */}

      <div className="auth-left">

        <div className="overlay"></div>

        <div className="left-content">

          <h1>GTR</h1>

          <p>
            Create your workspace and manage projects,
            tasks, and teams efficiently.
          </p>

          <div className="auth-tags">

            <span>Organize Projects</span>
            <span>Track Progress</span>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="auth-right">

        <div className="auth-card">

          <h2>Create Account</h2>

          <p className="subtitle">
            Start managing your team today
          </p>

          <form>

            <div className="input-group">

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
              />

            </div>

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
              />

            </div>

            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Create password"
              />

            </div>

            <div className="input-group">

              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm password"
              />

            </div>

            <button className="auth-btn">
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