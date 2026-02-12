function LeaderboardTable({ data }) {
  return (
    <table border="1" cellPadding="10" style={{ width: "100%", marginBottom: "2rem" }}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Score</th>
          <th>PRs</th>
          <th>Issues</th>
          <th>Repos</th>
        </tr>
      </thead>
      <tbody>
        {data.leaderboard.map((user) => (
          <tr key={user.username}>
            <td>{user.rank}</td>
            <td>{user.username}</td>
            <td>{user.score}</td>
            <td>{user.totalPRs}</td>
            <td>{user.totalIssues}</td>
            <td>{user.reposContributed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaderboardTable;
