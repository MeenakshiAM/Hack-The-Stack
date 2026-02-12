function StatsBar({ data }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <p>Total Participants: {data.totalParticipants}</p>
      <p>Total PRs Counted: {data.totalPRsCounted}</p>
      <p>Total Issues Counted: {data.totalIssuesCounted}</p>
      <p>Repositories Tracked: {data.reposTracked}</p>
    </div>
  );
}

export default StatsBar;
