import "./TaskCard.css";

function TaskCard({
  title,
  description,
  assignee,
  due,
  status
}) {

  return (
    <div className="task-card">

      {/* TOP */}

      <div className="task-top">

        <h3>{title}</h3>

        <span className={`task-status ${status.toLowerCase()}`}>
          {status}
        </span>

      </div>

      {/* DESCRIPTION */}

      <p className="task-description">
        {description}
      </p>

      {/* FOOTER */}

      <div className="task-footer">

        <span>
          Assigned to: {assignee}
        </span>

        <span>
          Due: {due}
        </span>

      </div>

    </div>
  );
}

export default TaskCard;