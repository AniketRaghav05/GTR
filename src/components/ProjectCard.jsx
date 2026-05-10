import "./ProjectCard.css";

function ProjectCard({
  title,
  description,
  tasks,
  members,
  progress
}) {

  return (
    <div className="project-card">

      <h2>{title}</h2>

      <p className="project-description">
        {description}
      </p>

      {/* INFO */}

      <div className="project-info">

        <span>{tasks} Tasks</span>

        <span>{members} Members</span>

      </div>

      {/* PROGRESS */}

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: progress
          }}
        ></div>

      </div>

    </div>
  );
}

export default ProjectCard;