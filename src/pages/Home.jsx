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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h2 className="text-2xl text-red font-bold animate-pulse">
          Syncing Leaderboard...
        </h2>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500">
        Failed to load leaderboard.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        <Header data={data} />
        <LeaderboardTable data={data} />
        
      </div>
    </div>
  );
}

export default Home;
