import { Crown, GitPullRequest, AlertCircle, Layers } from "lucide-react";

function LeaderboardTable({ data }) {
  const leaderboard = data.leaderboard;

  return (
    <div className="bg-white/5 mr-20 ml-20 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 shadow-2xl ">
      <div className="mb-10">
        <h2 className="text-4xl font-black tracking-tight uppercase">
          Leaderboard
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Ranked by Stack Score
        </p>
      </div>

      <div className="space-y-5">
        {leaderboard.map((user, index) => (
          <div
            key={user.username}
            className="flex items-center gap-4 bg-slate-800/50 hover:bg-slate-700/60 transition-all p-[12px] rounded-2xl border border-white/5 hover:scale-[1.01]"
          >
            {/* Rank */}
            <div className="w-12 flex justify-center">
              {index === 0 ? (
                <Crown className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
              ) : index === 1 ? (
                <Crown className="w-8 h-8 text-gray-300 drop-shadow-lg" />
              ) : index === 2 ? (
                <Crown className="w-8 h-8 text-orange-600 drop-shadow-lg" />
              ) : (
                <span className="text-lg font-black opacity-40">
                  {user.rank}
                </span>
              )}
            </div>
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-12 h-12 rounded-full border-2 border-indigo-500"
              />

            {/* Username */}
            <div className="flex-1">
              <h3 className="text-1xl font-bold uppercase tracking-tight">
                {user.username}
              </h3>

              <div className="flex flex-wrap gap-4 mt-3 text-xs font-bold animate-pulseSlow">
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
            <div className="bg-slate-900/70 px-4 py-1 rounded-2xl border border-white/10 text-center min-w-[120px]">
              <div className="text-2xl font-black text-indigo-400">
                {user.score}
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
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
