import React from "react";
import { Crown, GitPullRequest, AlertCircle, Layers } from "lucide-react";

function LeaderboardTable({ data }) {
  const leaderboard = data.leaderboard;

  return (
    <div className="w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl border border-gray-600 p-4 md:p-6 shadow-2xl">

      {/* Header */}
      <div className="mb-8 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-white">
          Leaderboard
        </h2>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          Ranked by Stack Score
        </p>
      </div>

      {/* List */}
      <div className="space-y-4">
        {leaderboard.map((user, index) => (
          <div
            key={user.username}
            className="flex items-center gap-3 md:gap-5 bg-slate-800/50 hover:bg-slate-700/60 transition-all p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-600 hover:scale-[1.01]"
          >

            {/* Rank */}
            <div className="flex-shrink-0 w-10 md:w-14 flex justify-center">
              {index === 0 ? (
                <Crown className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 drop-shadow-lg" />
              ) : index === 1 ? (
                <Crown className="w-6 h-6 md:w-8 md:h-8 text-gray-300 drop-shadow-lg" />
              ) : index === 2 ? (
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
        ))}
      </div>
    </div>
  );
}

export default LeaderboardTable;
