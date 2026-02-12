const fs = require("fs");
const { graphql } = require("@octokit/graphql");
const config = require("../config.json");

const token = process.env.HACK_THE_STACK_TOKEN;

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
});

async function fetchRepoData(owner, name) {
  const query = `
    query {
      repository(owner: "${owner}", name: "${name}") {

        pullRequests(first: 100, states: MERGED) {
          nodes {
            mergedAt
            author { login }
            labels(first: 10) {
              nodes { name }
            }
          }
        }

        issues(first: 100, states: CLOSED) {
          nodes {
            closedAt
            author { login }
            labels(first: 10) {
              nodes { name }
            }
          }
        }

      }
    }
  `;

  return await graphqlWithAuth(query);
}

function isWithinEvent(date) {
  if (!date) return false;

  const d = new Date(date);
  return (
    d >= new Date(config.startDate) &&
    d <= new Date(config.endDate)
  );
}

function calculatePoints(labels, isIssue = false) {
  let points = 0;

  const labelNames = labels.map(l => l.name.toLowerCase());

  // Must have hack the stack label
 // if (!labelNames.includes("hack the stack")) return 0;

  if (isIssue) {
    return config.points.issue_open; // or config.points.issue if you renamed it
  }

  // For PRs, take highest matching label
  for (const label of labelNames) {
    if (config.points[label]) {
      points = Math.max(points, config.points[label]);
    }
  }

  return points;
}

async function main() {
  const leaderboard = {};
  let totalPRsCounted = 0;
  let totalIssuesCounted = 0;

  for (const repo of config.repositories) {
    const [owner, name] = repo.split("/");
    const data = await fetchRepoData(owner, name);

    const prs = data.repository.pullRequests.nodes;
    const issues = data.repository.issues.nodes;

    // --------------------
    // Process PRs (MERGED)
    // --------------------
    for (const pr of prs) {
      if (!isWithinEvent(pr.mergedAt)) continue;

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

    // -----------------------
    // Process Issues (CLOSED)
    // -----------------------
    for (const issue of issues) {
      if (!isWithinEvent(issue.closedAt)) continue;

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

main();
