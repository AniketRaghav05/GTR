import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

import "./Projects.css";

function Projects() {

  const [projects, setProjects] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] =
    useState({

      title: "",
      description: "",
      status: "Active",
      progress: 0

    });

  /* BACKEND URL */

  const API =
    "https://gtr-production-3bc7.up.railway.app/api/projects";

  /* FETCH PROJECTS */

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects =
    async () => {

      try {

        const response =
          await axios.get(API);

        setProjects(response.data);

      } catch (error) {

        console.log(error);

      }

    };

  /* HANDLE INPUT */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  /* CREATE PROJECT */

  const createProject =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          API,
          formData
        );

        setShowModal(false);

        fetchProjects();

        setFormData({

          title: "",
          description: "",
          status: "Active",
          progress: 0

        });

      } catch (error) {

        console.log(error);

      }

    };

  /* DELETE PROJECT */

  const deleteProject =
    async (id) => {

      try {

        await axios.delete(
          `${API}/${id}`
        );

        fetchProjects();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <DashboardLayout>

      {/* HEADER */}

      <div className="projects-header">

        <div>

          <h2>Projects</h2>

          <p>
            Total Projects:
            {" "}
            {projects.length}
          </p>

        </div>

        <button
          className="create-project-btn"
          onClick={() =>
            setShowModal(true)
          }
        >

          + Create Project

        </button>

      </div>

      {/* EMPTY STATE */}

      {projects.length === 0 ? (

        <div className="projects-empty">

          <h2>
            No projects available
          </h2>

          <p>
            Create your first project.
          </p>

        </div>

      ) : (

        <div className="projects-grid">

          {projects.map((project) => (

            <div
              className="project-card"
              key={project._id}
            >

              {/* TOP */}

              <div className="project-top">

                <h3>
                  {project.title}
                </h3>

                <span>
                  {project.status}
                </span>

              </div>

              {/* DESC */}

              <p>
                {project.description}
              </p>

              {/* PROGRESS */}

              <div className="progress-section">

                <div className="progress-info">

                  <span>
                    Progress
                  </span>

                  <span>
                    {project.progress}%
                  </span>

                </div>

                <div className="progress-bar">

                  <div
                    className={`progress-fill ${
                      project.status ===
                      "Completed"

                        ? "completed-bar"

                        : ""
                    }`}
                    style={{
                      width:
                        `${project.progress}%`
                    }}
                  ></div>

                </div>

              </div>

              {/* FOOTER */}

              <div className="project-footer">

                <button
                  className="delete-project-btn"
                  onClick={() =>
                    deleteProject(project._id)
                  }
                >

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="project-modal">

            <h2>Create Project</h2>

            <form
              onSubmit={createProject}
            >

              <input
                type="text"
                name="title"
                placeholder="Project title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option>
                  Active
                </option>

                <option>
                  Review
                </option>

                <option>
                  Completed
                </option>

              </select>

              <input
                type="number"
                name="progress"
                placeholder="Progress %"
                value={formData.progress}
                onChange={handleChange}
                required
              />

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >

                  Cancel

                </button>

                <button type="submit">

                  Create

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </DashboardLayout>

  );
}

export default Projects;