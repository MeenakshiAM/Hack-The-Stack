import React, { useEffect, useState } from "react";
import { Crown, GitPullRequest, AlertCircle, Layers } from "lucide-react";
import confetti from "canvas-confetti";

function LeaderboardTable({ data }) {
  const leaderboard = data.leaderboard;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered leaderboard
  const filteredLeaderboard = leaderboard.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredLeaderboard.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredLeaderboard.length / usersPerPage);

  // Confetti on first load
  useEffect(() => {
    confetti({
      particleCount: 500,
      spread: 200,
      startVelocity: 70,
      origin: { x: 0.5, y: 0.4 },
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl border border-gray-600 p-4 md:p-6 shadow-2xl">

      {/* Header */}
      <div className="mb-4 md:mb-6 text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-white">
          Leaderboard
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Ranked by Stack Score
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full md:w-1/2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            
          </span>
          <input
            type="text"
            placeholder="Search by your github username..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // optional: reset to first page on search
            }}
            className="
              w-full pl-10 pr-4 py-3 rounded-full 
              bg-slate-700 text-white placeholder-slate-400 italic
              shadow-inner hover:shadow-lg focus:shadow-lg 
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-indigo-400
              placeholder-opacity-70
            "
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {currentUsers.map((user, index) => {
          const absoluteIndex = leaderboard.findIndex(u => u.username === user.username);

          return (
            <div
              key={user.username}
              className={`flex items-center gap-3 md:gap-5 p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all hover:scale-[1.01]
                ${
                  absoluteIndex === 0
                    ? "bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border-yellow-400 shadow-[0_0_25px_rgba(255,215,0,0.6)]"
                    : "bg-slate-800/50 hover:bg-slate-700/60 border-gray-600"
                }`}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-10 md:w-14 flex justify-center">
                {absoluteIndex === 0 ? (
                  <Crown className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 drop-shadow-lg animate-crownFloat" />
                ) : absoluteIndex === 1 ? (
                  <Crown className="w-6 h-6 md:w-8 md:h-8 text-gray-300 drop-shadow-lg" />
                ) : absoluteIndex === 2 ? (
                  <Crown className="w-6 h-6 md:w-8 md:h-8 text-orange-600 drop-shadow-lg" />
                ) : (
                  <span className="text-sm md:text-lg font-black opacity-40 text-slate-300">
                    #{user.rank}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <img
                src={user.avatarUrl || `https://github.com/${user.username}.png`}
                alt={user.username}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-teal-400/30 object-cover"
              />

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-lg font-bold uppercase tracking-tight text-white truncate">
                  {user.username}
                </h3>

                <div className="flex gap-3 md:gap-6 mt-2 text-[11px] md:text-xs font-semibold flex-wrap md:flex-nowrap">
                  <span className="flex items-center gap-1 text-blue-400">
                    <GitPullRequest size={14} />
                    {user.totalPRs} PRs
                  </span>

                  <span className="flex items-center gap-1 text-red-400">
                    <AlertCircle size={14} />
                    {user.totalIssues} Issues
                  </span>

                  <span className="flex items-center gap-1 text-purple-400">
                    <Layers size={14} />
                    {user.reposContributed} Repos
                  </span>
                </div>
              </div>

              {/* Score */}
              <div className="flex-shrink-0 bg-slate-900/80 px-3 md:px-5 py-2 rounded-xl md:rounded-2xl border border-white/10 text-center min-w-[80px] md:min-w-[120px]">
                <div className="text-lg md:text-2xl font-black text-indigo-400">
                  {user.score}
                </div>
                <div className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                  Stack Score
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-lg text-sm font-bold transition-all
              ${
                currentPage === i + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardTable;
