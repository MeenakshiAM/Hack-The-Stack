import { useEffect, useState } from "react";
import Header from "../components/Header";
import LeaderboardTable from "../components/LeaderboardTable";
import StatsBar from "../components/StatsBar";
import ScoreRules from "../components/ScoreRules";

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/leaderboard.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading leaderboard...</h2>;
  if (error) return <h2>Failed to load leaderboard.</h2>;

  return (
    <div style={{ padding: "2rem" }}>
      <Header data={data} />
      <StatsBar data={data} />
      <LeaderboardTable data={data} />
      <ScoreRules data={data} />
    </div>
  );
}

export default Home;
