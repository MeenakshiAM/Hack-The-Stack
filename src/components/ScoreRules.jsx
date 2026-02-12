function ScoreRules({ data }) {
  return (
    <div>
      <h3>Scoring Rules</h3>
      <ul>
        {Object.entries(data.scoringRules).map(([label, points]) => (
          <li key={label}>
            {label} → {points} points
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScoreRules;