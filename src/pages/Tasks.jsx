import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import DashboardLayout
from "../layouts/DashboardLayout";

import "./Tasks.css";

function Tasks() {

  const [tasks, setTasks] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] =
    useState({

      title: "",
      description: "",
      assignedTo: "",
      status: "Pending",
      dueDate: ""

    });

  /* BACKEND URL */

  const API =
    "https://gtr-production-3bc7.up.railway.app/api/tasks";

  /* FETCH TASKS */

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks =
    async () => {

      try {

        const response =
          await axios.get(API);

        setTasks(response.data);

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

  /* CREATE TASK */

  const createTask =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          API,
          formData
        );

        setShowModal(false);

        fetchTasks();

        setFormData({

          title: "",
          description: "",
          assignedTo: "",
          status: "Pending",
          dueDate: ""

        });

      } catch (error) {

        console.log(error);

      }

    };

  /* UPDATE STATUS */

  const updateStatus =
    async (id, status) => {

      try {

        await axios.put(

          `${API}/${id}`,

          { status }

        );

        fetchTasks();

      } catch (error) {

        console.log(error);

      }

    };

  /* DELETE TASK */

  const deleteTask =
    async (id) => {

      try {

        await axios.delete(
          `${API}/${id}`
        );

        fetchTasks();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <DashboardLayout>

      {/* HEADER */}

      <div className="tasks-header">

        <div>

          <h1>Tasks</h1>

          <p>
            Total Tasks:
            {" "}
            {tasks.length}
          </p>

        </div>

        <button
          className="add-task-btn"
          onClick={() =>
            setShowModal(true)
          }
        >

          + Add Task

        </button>

      </div>

      {/* EMPTY STATE */}

      {tasks.length === 0 ? (

        <div className="empty-state">

          <h2>
            No tasks available
          </h2>

          <p>
            Create your first task.
          </p>

        </div>

      ) : (

        <div className="tasks-table">

          {/* HEAD */}

          <div className="tasks-head">

            <span>TASK</span>
            <span>ASSIGNED</span>
            <span>STATUS</span>
            <span>DUE DATE</span>
            <span>ACTIONS</span>

          </div>

          {/* ROWS */}

          {tasks.map((task) => (

            <div
              className="tasks-row"
              key={task._id}
            >

              {/* TASK */}

              <div className="task-info">

                <h3>
                  {task.title}
                </h3>

                <p>
                  {task.description}
                </p>

              </div>

              {/* ASSIGNED */}

              <div className="assigned">

                {task.assignedTo}

              </div>

              {/* STATUS */}

              <div>

                <select
                  className={`status-select ${
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
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(
                      task._id,
                      e.target.value
                    )
                  }
                >

                  <option>
                    Pending
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Completed
                  </option>

                  <option>
                    Overdue
                  </option>

                </select>

              </div>

              {/* DATE */}

              <div className="due-date">

                {task.dueDate}

              </div>

              {/* DELETE */}

              <div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task._id)
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

          <div className="task-modal">

            <h2>Create Task</h2>

            <form
              onSubmit={createTask}
            >

              <input
                type="text"
                name="title"
                placeholder="Task title"
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

              <input
                type="text"
                name="assignedTo"
                placeholder="Assigned To"
                value={formData.assignedTo}
                onChange={handleChange}
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option>
                  Pending
                </option>

                <option>
                  In Progress
                </option>

                <option>
                  Completed
                </option>

                <option>
                  Overdue
                </option>

              </select>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
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

export default Tasks;