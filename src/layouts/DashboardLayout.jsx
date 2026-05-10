import { useState } from "react";

import Sidebar from "../components/Sidebar";

import "./DashboardLayout.css";

function DashboardLayout({ children }) {

  const [collapsed, setCollapsed] =
    useState(() => {

      return (
        localStorage.getItem(
          "sidebarCollapsed"
        ) === "true"
      );

    });

  return (

    <div className="layout">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={
          collapsed
            ? "main-section expanded"
            : "main-section"
        }
      >

        <div className="page-content">

          {children}

        </div>

      </div>

    </div>

  );
}

export default DashboardLayout;