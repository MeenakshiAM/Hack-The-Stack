const fs = require("fs");
const { graphql } = require("@octokit/graphql");
const config = require("../config.json");

const token = process.env.HACK_THE_STACK_TOKEN;

if (!token) {
  console.error("❌ Missing HACK_THE_STACK_TOKEN");
  process.exit(1);
}

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
            id
            mergedAt
            author { login }
            labels(first: 20) {
              nodes { name }
            }
          }
        }

        openIssues: issues(first: 100, states: OPEN) {
          nodes {
            id
            createdAt
            author { login }
            labels(first: 20) {
              nodes { name }
            }
          }
        }

        closedIssues: issues(first: 100, states: CLOSED) {
          nodes {
            id
            closedAt
            author { login }
            labels(first: 20) {
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

function calculatePoints(labels = [], isIssue = false) {
  const labelNames = labels.map(l => l.name.toLowerCase());

  // ✅ Must have Hack the Stack label
  //if (!labelNames.includes("hack the stack")) return 0;

  // -------------------------
  // ISSUE SCORING
  // -------------------------
  if (isIssue) {
    return config.points.issue || 0;
  }

  // -------------------------
  // PR SCORING (level-based)
  // -------------------------
  let maxPoints = 0;

  for (const label of labelNames) {
    if (config.points[label]) {
      maxPoints = Math.max(maxPoints, config.points[label]);
    }
  }

  return maxPoints;
}

async function main() {
  const leaderboard = {};
  const countedIssueIds = new Set(); // prevent double counting
  let totalPRsCounted = 0;
  let totalIssuesCounted = 0;

  for (const repo of config.repositories) {
    const [owner, name] = repo.split("/");
    const data = await fetchRepoData(owner, name);

    const prs = data.repository.pullRequests.nodes;
    const openIssues = data.repository.openIssues.nodes;
    const closedIssues = data.repository.closedIssues.nodes;

    // -------------------------
    // PROCESS MERGED PRs
    // -------------------------
    for (const pr of prs) {
      if (!isWithinEvent(pr.mergedAt)) continue;

      const points = calculatePoints(pr.labels?.nodes || []);
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

    // -------------------------
    // PROCESS OPEN ISSUES
    // -------------------------
    for (const issue of openIssues) {
      if (countedIssueIds.has(issue.id)) continue;
      if (!isWithinEvent(issue.createdAt)) continue;

      const points = calculatePoints(issue.labels?.nodes || [], true);
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

      countedIssueIds.add(issue.id);
      totalIssuesCounted += 1;
    }

    // -------------------------
    // PROCESS CLOSED ISSUES
    // -------------------------
    for (const issue of closedIssues) {
      if (countedIssueIds.has(issue.id)) continue;
      if (!isWithinEvent(issue.closedAt)) continue;

      const points = calculatePoints(issue.labels?.nodes || [], true);
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

      countedIssueIds.add(issue.id);
      totalIssuesCounted += 1;
    }
  }

  // -------------------------
  // SORT & FORMAT
  // -------------------------
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

  // -------------------------
  // WRITE OUTPUT
  // -------------------------
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

  console.log(" Leaderboard generated successfully.");
}

main();
