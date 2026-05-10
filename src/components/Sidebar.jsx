import {
  FiGrid,
  FiFolder,
  FiCheckSquare,
  FiUsers,
  FiMenu,
  FiLogOut
} from "react-icons/fi";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import {
  useEffect
} from "react";

import "./Sidebar.css";

function Sidebar({
  collapsed,
  setCollapsed
}) {

  const navigate =
    useNavigate();

  /* SAVE SIDEBAR STATE */

  useEffect(() => {

    localStorage.setItem(

      "sidebarCollapsed",

      collapsed

    );

  }, [collapsed]);

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };

  /* MENU */

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiGrid />
    },

    {
      name: "Tasks",
      path: "/tasks",
      icon: <FiCheckSquare />
    },

    {
      name: "Projects",
      path: "/projects",
      icon: <FiFolder />
    },

    {
      name: "Team",
      path: "/team",
      icon: <FiUsers />
    }

  ];

  return (

    <div
      className={
        collapsed
          ? "sidebar collapsed"
          : "sidebar"
      }
    >

      {/* TOP */}

      <div>

        {/* LOGO */}

        <div className="logo-section">

          <div className="logo-top">

            {!collapsed && (

              <div>

                <h1>GTR</h1>

                <p>
                  Get Task Ready
                </p>

              </div>

            )}

            <button
              className="menu-btn"
              onClick={() =>
                setCollapsed(
                  !collapsed
                )
              }
            >

              <FiMenu />

            </button>

          </div>

        </div>

        {/* MENU */}

        <div className="sidebar-menu">

          {menuItems.map(

            (item, index) => (

            <NavLink
              key={index}
              to={item.path}
              className={({
                isActive
              }) =>

                isActive
                  ? "menu-item active"
                  : "menu-item"

              }
            >

              <span className="menu-icon">

                {item.icon}

              </span>

              {!collapsed && (

                <span>
                  {item.name}
                </span>

              )}

            </NavLink>

          ))}

        </div>

      </div>

      {/* BOTTOM */}

      <button
        className="sidebar-logout"
        onClick={handleLogout}
      >

        <FiLogOut />

        {!collapsed && (
          <span>
            Logout
          </span>
        )}

      </button>

    </div>

  );
}

export default Sidebar;
