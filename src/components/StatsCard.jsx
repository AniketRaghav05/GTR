import "./StatsCard.css";

function StatsCard({
  title,
  value,
  change,
  type
}) {

  return (
    <div className="stats-card">

      <div>

        <p className="stats-title">
          {title}
        </p>

        <h2 className="stats-value">
          {value}
        </h2>

      </div>

      <span className={`stats-badge ${type}`}>
        {change}
      </span>

    </div>
  );
}

export default StatsCard;