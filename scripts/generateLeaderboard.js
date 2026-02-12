async function main() {
  const leaderboard = {};
  let totalPRsCounted = 0;
  let totalIssuesCounted = 0;

  for (const repo of config.repositories) {
    const [owner, name] = repo.split("/");
    const data = await fetchRepoData(owner, name);

    const prs = data.repository.pullRequests.nodes;
    const issues = data.repository.issues.nodes;

    for (const pr of prs) {
      if (!isWithinEvent(pr.createdAt)) continue;

      const points = calculatePoints(pr.labels.nodes);
      if (!points) continue;

      const user = pr.author?.login;
      if (!user) continue;

      if (!leaderboard[user]) {
        leaderboard[user] = {
          score: 0,
          totalPRs: 0,
          totalIssues: 0,
          repos: new Set()
        };
      }

      leaderboard[user].score += points;
      leaderboard[user].totalPRs += 1;
      leaderboard[user].repos.add(repo);

      totalPRsCounted += 1;
    }

    for (const issue of issues) {
      if (!isWithinEvent(issue.createdAt)) continue;

      const points = calculatePoints(issue.labels.nodes, true);
      if (!points) continue;

      const user = issue.author?.login;
      if (!user) continue;

      if (!leaderboard[user]) {
        leaderboard[user] = {
          score: 0,
          totalPRs: 0,
          totalIssues: 0,
          repos: new Set()
        };
      }

      leaderboard[user].score += points;
      leaderboard[user].totalIssues += 1;
      leaderboard[user].repos.add(repo);

      totalIssuesCounted += 1;
    }
  }

  const sorted = Object.entries(leaderboard)
    .map(([username, stats]) => ({
      username,
      score: stats.score,
      totalPRs: stats.totalPRs,
      totalIssues: stats.totalIssues,
      reposContributed: stats.repos.size
    }))
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({
      rank: index + 1,
      ...user
    }));

  fs.writeFileSync(
    "./public/leaderboard.json",
    JSON.stringify({
      eventName: config.eventName,
      lastUpdated: new Date().toISOString(),
      totalParticipants: sorted.length,
      totalPRsCounted,
      totalIssuesCounted,
      reposTracked: config.repositories.length,
      scoringRules: config.points,
      leaderboard: sorted
    }, null, 2)
  );

  console.log("Leaderboard generated successfully.");
}
