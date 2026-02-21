const fs = require("fs");
const { graphql } = require("@octokit/graphql");
const config = require("../config.json");

const token = process.env.HACK_THE_STACK_TOKEN;

if (!token) {
  console.error("Missing HACK_THE_STACK_TOKEN");
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

        pullRequests(first: 100, states: [OPEN, CLOSED, MERGED]) {
          nodes {
            id
            state
            createdAt
            closedAt
            mergedAt
            author { login avatarUrl }
            labels(first: 20) {
              nodes { name }
            }
          }
        }

        openIssues: issues(first: 100, states: OPEN) {
          nodes {
            id
            createdAt
            author { login avatarUrl }
            labels(first: 20) {
              nodes { name }
            }
          }
        }

        closedIssues: issues(first: 100, states: CLOSED) {
          nodes {
            id
            createdAt
            closedAt
            author { login avatarUrl }
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

function isExcludedUser(username) {
  return config.excludedUsers?.includes(username);
}

function hasHackTheStackLabel(labels = []) {
  const labelNames = labels.map(l => l.name.toLowerCase());
  return labelNames.includes("hackthestack");
}

function calculatePRPoints(pr) {
  const labels = pr.labels?.nodes || [];

  // Must have HackTheStack label
  if (!hasHackTheStackLabel(labels)) return 0;

  // If PR is merged → level-based scoring
  if (pr.mergedAt) {
    const labelNames = labels.map(l => l.name.toLowerCase());

    let maxPoints = 0;
    for (const label of labelNames) {
      if (config.points[label]) {
        maxPoints = Math.max(maxPoints, config.points[label]);
      }
    }

    return maxPoints;
  }

  // If PR is NOT merged (open or closed without merge)
  return 5;
  }



function calculateIssuePoints(issue) {
  const labels = issue.labels?.nodes || [];

  // Must have HackTheStack label
  if (!hasHackTheStackLabel(labels)) return 0;

  return config.points.issue || 0;
}

async function main() {
  const leaderboard = {};
  const countedIssueIds = new Set();
  let totalPRsCounted = 0;
  let totalIssuesCounted = 0;

  for (const repo of config.repositories) {
    const [owner, name] = repo.split("/");
    const data = await fetchRepoData(owner, name);

    const prs = data.repository.pullRequests.nodes;
    const openIssues = data.repository.openIssues.nodes;
    const closedIssues = data.repository.closedIssues.nodes;

    // ================= PRs =================
    for (const pr of prs) {
      let relevantDate = null;

      if (pr.state === "MERGED") {
        relevantDate = pr.mergedAt;
      } else if (pr.state === "OPEN") {
        relevantDate = pr.createdAt;
      } else if (pr.state === "CLOSED") {
        relevantDate = pr.closedAt;
      }

      if (!isWithinEvent(relevantDate)) continue;

      const user = pr.author?.login;
      if (!user || isExcludedUser(user)) continue;

      const points = calculatePRPoints(pr);
      if (!points) continue;

      if (!leaderboard[user]) {
        leaderboard[user] = {
          score: 0,
          totalPRs: 0,
          totalIssues: 0,
          repos: new Set(),
          avatarUrl: pr.author?.avatarUrl || null
        };
      }

      leaderboard[user].score += points;
      leaderboard[user].totalPRs += 1;
      leaderboard[user].repos.add(repo);

      totalPRsCounted += 1;
    }

    // ================= OPEN ISSUES =================
    for (const issue of openIssues) {
      if (countedIssueIds.has(issue.id)) continue;
      if (!isWithinEvent(issue.createdAt)) continue;

      const user = issue.author?.login;
      if (!user || isExcludedUser(user)) continue;

      const points = calculateIssuePoints(issue);
      if (!points) continue;

      if (!leaderboard[user]) {
        leaderboard[user] = {
          score: 0,
          totalPRs: 0,
          totalIssues: 0,
          repos: new Set(),
          avatarUrl: issue.author?.avatarUrl || null
        };
      }

      leaderboard[user].score += points;
      leaderboard[user].totalIssues += 1;
      leaderboard[user].repos.add(repo);

      countedIssueIds.add(issue.id);
      totalIssuesCounted += 1;
    }

    // ================= CLOSED ISSUES =================
    for (const issue of closedIssues) {
      if (countedIssueIds.has(issue.id)) continue;
      if (!isWithinEvent(issue.closedAt)) continue;

      const user = issue.author?.login;
      if (!user || isExcludedUser(user)) continue;

      const points = calculateIssuePoints(issue);
      if (!points) continue;

      if (!leaderboard[user]) {
        leaderboard[user] = {
          score: 0,
          totalPRs: 0,
          totalIssues: 0,
          repos: new Set(),
          avatarUrl: issue.author?.avatarUrl || null
        };
      }

      leaderboard[user].score += points;
      leaderboard[user].totalIssues += 1;
      leaderboard[user].repos.add(repo);

      countedIssueIds.add(issue.id);
      totalIssuesCounted += 1;
    }
  }

  const sorted = Object.entries(leaderboard)
    .map(([username, stats]) => ({
      username,
      avatarUrl: stats.avatarUrl,
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