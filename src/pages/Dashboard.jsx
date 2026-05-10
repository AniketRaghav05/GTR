import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

import StatsCard
from "../components/StatsCard";

import "./Dashboard.css";

function Dashboard() {

  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [showAllTasks, setShowAllTasks] =
    useState(false);

  /* BACKEND URL */

  const TASK_API =
    "https://gtr-production-74e0.up.railway.app/api/tasks";

  const PROJECT_API =
    "https://gtr-production-74e0.up.railway.app/api/projects";

  /* FETCH DATA */

  useEffect(() => {

    fetchTasks();

    fetchProjects();

  }, []);

  /* TASKS */

  const fetchTasks =
    async () => {

      try {

        const response =
          await axios.get(
            TASK_API
          );

        setTasks(response.data);

      } catch (error) {

        console.log(error);

      }

    };

  /* PROJECTS */

  const fetchProjects =
    async () => {

      try {

        const response =
          await axios.get(
            PROJECT_API
          );

        setProjects(response.data);

      } catch (error) {

        console.log(error);

      }

    };

  /* STATS */

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const progressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "In Progress"
    ).length;

  const overdueTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Overdue"
    ).length;

  return (

    <DashboardLayout>

      {/* STATS */}

      <div className="stats-grid">

        <StatsCard
          title="Total Tasks"
          value={tasks.length}
          change="+12%"
          type="info"
        />

        <StatsCard
          title="Completed"
          value={completedTasks}
          change="+8%"
          type="positive"
        />

        <StatsCard
          title="In Progress"
          value={progressTasks}
          change="+5%"
          type="info"
        />

        <StatsCard
          title="Overdue"
          value={overdueTasks}
          change="-2%"
          type="warning"
        />

        <StatsCard
          title="Projects"
          value={projects.length}
          change="+4%"
          type="info"
        />

      </div>

      {/* MAIN GRID */}

      <div className="dashboard-grid">

        {/* TASKS */}

        <div className="tasks-section">

          <div className="section-header">

            <div>

              <h3>Recent Tasks</h3>

              <p>
                Latest project updates
              </p>

            </div>

          </div>

          {/* TABLE */}

          <div className="dashboard-table">

            {/* HEAD */}

            <div className="dashboard-head">

              <span>TASK</span>
              <span>STATUS</span>
              <span>DUE</span>

            </div>

            {/* ROWS */}

            {(showAllTasks
              ? tasks
              : tasks.slice(0, 3)
            ).map((task) => (

              <div
                className="dashboard-row"
                key={task._id}
              >

                {/* TASK */}

                <div className="task-name">

                  <h4>
                    {task.title}
                  </h4>

                  <p>
                    {task.assignedTo}
                  </p>

                </div>

                {/* STATUS */}

                <span
                  className={`table-status ${
                    task.status ===
                    "Completed"

                      ? "completed"

                      : task.status ===
                        "In Progress"

                      ? "progress"

                      : task.status ===
                        "Overdue"

                      ? "overdue"

                      : "pending"
                  }`}
                >

                  {task.status}

                </span>

                {/* DATE */}

                <span
                  className={`table-date ${
                    task.status ===
                    "Overdue"

                      ? "overdue"

                      : ""
                  }`}
                >

                  {task.dueDate}

                </span>

              </div>

            ))}

            {/* VIEW MORE */}

            {tasks.length > 3 && (

              <div className="view-more-wrapper">

                <button
                  className="view-more-btn"
                  onClick={() =>
                    setShowAllTasks(
                      !showAllTasks
                    )
                  }
                >

                  {showAllTasks
                    ? "Show Less ↑"
                    : "View More ↓"}

                </button>

              </div>

            )}

          </div>

        </div>

        {/* ACTIVITY */}

        <div className="activity-section">

          <div className="section-header">

            <div>

              <h3>Activity</h3>

              <p>
                Team updates
              </p>

            </div>

          </div>

          <div className="activity-card">

            <p>

              <strong>
                Harshit
              </strong>

              {" "}
              updated a project

            </p>

            <span>
              5 mins ago
            </span>

          </div>

          <div className="activity-card">

            <p>

              <strong>
                Aman
              </strong>

              {" "}
              completed authentication

            </p>

            <span>
              20 mins ago
            </span>

          </div>

          <div className="activity-card">

            <p>

              <strong>
                Harsh
              </strong>

              {" "}
              designed team page

            </p>

            <span>
              1 hour ago
            </span>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;