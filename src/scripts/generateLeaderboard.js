import fs from "fs";
import { graphql } from "@octokit/graphql";
import config from "../config.json" assert { type: "json" };

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
            title
            createdAt
            author { login }
            labels(first: 10) {
              nodes { name }
            }
          }
        }
        issues(first: 100, states: OPEN) {
          nodes {
            createdAt
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
  const d = new Date(date);
  return (
    d >= new Date(config.startDate) &&
    d <= new Date(config.endDate)
  );
}

function calculatePoints(labels, isIssue = false) {
  let points = 0;

  const labelNames = labels.map(l => l.name.toLowerCase());

  if (!labelNames.includes("hack the stack")) return 0;

  if (isIssue) {
    return config.points.issue_open;
  }

  for (const label of labelNames) {
    if (config.points[label]) {
      points = Math.max(points, config.points[label]);
    }
  }

  return points;
}

async function main() {
  const leaderboard = {};

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

      leaderboard[user] = (leaderboard[user] || 0) + points;
    }

    for (const issue of issues) {
      if (!isWithinEvent(issue.createdAt)) continue;

      const points = calculatePoints(issue.labels.nodes, true);
      if (!points) continue;

      const user = issue.author?.login;
      if (!user) continue;

      leaderboard[user] = (leaderboard[user] || 0) + points;
    }
  }

  const sorted = Object.entries(leaderboard)
    .map(([user, points]) => ({ user, points }))
    .sort((a, b) => b.points - a.points);

  fs.writeFileSync(
    "./public/leaderboard.json",
    JSON.stringify({
      event: config.eventName,
      lastUpdated: new Date().toISOString(),
      participants: sorted
    }, null, 2)
  );

  console.log("Leaderboard generated successfully.");
}

main();
