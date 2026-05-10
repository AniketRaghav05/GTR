import { useState } from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import {
  FiPlus,
  FiSearch,
  FiMail
} from "react-icons/fi";

import "./Team.css";

function Team() {

  const [members, setMembers] =
    useState([

      {
        name: "Aniket Raghav",
        role: "Full Stack Developer",
        email: "aniket@gtr.com",
        status: "Online",
      },

      {
        name: "Harshit",
        role: "Frontend Developer",
        email: "harshit@gtr.com",
        status: "Online",
      },

      {
        name: "Aman",
        role: "Backend Developer",
        email: "aman@gtr.com",
        status: "Offline",
      },

      {
        name: "Harsh",
        role: "UI/UX Designer",
        email: "harsh@gtr.com",
        status: "Online",
      }

    ]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] =
    useState({

      name: "",
      role: "",
      email: "",
      status: "Online"

    });

  /* UPDATE STATUS */

  const updateStatus =
    (email, newStatus) => {

      const updatedMembers =
        members.map((member) =>

          member.email === email

            ? {
                ...member,
                status: newStatus
              }

            : member

        );

      setMembers(updatedMembers);

    };

  /* SEARCH */

  const filteredMembers =
    members.filter((member) =>

      member.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  /* HANDLE INPUT */

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  /* ADD MEMBER */

  const addMember =
    (e) => {

      e.preventDefault();

      setMembers([

        ...members,

        formData

      ]);

      setShowModal(false);

      setFormData({

        name: "",
        role: "",
        email: "",
        status: "Online"

      });

    };

  return (

    <DashboardLayout>

      {/* HEADER */}

      <div className="team-header">

        <div>

          <h1>Team</h1>

          <p>

            Total Members:
            {" "}
            {filteredMembers.length}

          </p>

        </div>

        <button
          className="invite-btn"
          onClick={() =>
            setShowModal(true)
          }
        >

          <FiPlus />

          Invite Member

        </button>

      </div>

      {/* TOOLBAR */}

      <div className="team-toolbar">

        <div className="search-box">

          <FiSearch />

          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* TABLE */}

      <div className="team-table">

        {/* HEAD */}

        <div className="team-head">

          <span>MEMBER</span>
          <span>ROLE</span>
          <span>EMAIL</span>
          <span>STATUS</span>

        </div>

        {/* ROWS */}

        {filteredMembers.map((member, index) => (

          <div
            className="team-row"
            key={index}
          >

            {/* MEMBER */}

            <div className="member-info">

              <div>

                <h3>
                  {member.name}
                </h3>

                <p>
                  Team Member
                </p>

              </div>

            </div>

            {/* ROLE */}

            <div className="role">

              {member.role}

            </div>

            {/* EMAIL */}

            <div className="contact">

              <div>

                <FiMail />

                <span>
                  {member.email}
                </span>

              </div>

            </div>

            {/* STATUS */}

            <div>

              <select
                className={`team-status ${
                  member.status ===
                  "Online"

                    ? "online"

                    : member.status ===
                      "Busy"

                    ? "busy"

                    : member.status ===
                      "Away"

                    ? "away"

                    : "offline"
                }`}
                value={member.status}
                onChange={(e) =>
                  updateStatus(
                    member.email,
                    e.target.value
                  )
                }
              >

                <option>
                  Online
                </option>

                <option>
                  Offline
                </option>

                <option>
                  Busy
                </option>

                <option>
                  Away
                </option>

              </select>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="team-modal">

            <h2>
              Invite Member
            </h2>

            <form onSubmit={addMember}>

              <input
                type="text"
                name="name"
                placeholder="Member name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="role"
                placeholder="Role"
                value={formData.role}
                onChange={handleChange}
                required
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option>
                  Online
                </option>

                <option>
                  Offline
                </option>

                <option>
                  Busy
                </option>

                <option>
                  Away
                </option>

              </select>

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

                  Add Member

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </DashboardLayout>

  );
}

export default Team;