import React from "react";
import { ShieldCheck, Users, Trophy } from "lucide-react";

export default function RulesRegulations() {
  const points = {
    "issue creation": 3,
    "good first issue": 5,
    documentation: 5,
    
    "level-1": 10,
    "level-2": 15,
    "level-3": 20,
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white py-16 px-4">

      <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-2xl rounded-3xl border border-gray-700 p-6 md:p-10 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Hack the Stack
          </h1>
          <p className="text-slate-400 mt-3 text-sm md:text-base">
            Rules & Regulations
          </p>
        </div>

        {/* Contributors Section */}
        <section className="mb-12 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:bg-slate-800/70 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-indigo-400" />
            <h2 className="text-xl md:text-2xl font-bold">
              Rules for Contributors
            </h2>
          </div>

          <ul className="space-y-3 text-slate-300 text-sm md:text-base">
            <li>• Contribute only to repositories from the official approved list.</li>
            <li>• Do NOT start coding without raising and getting an issue assigned.</li>
            <li>• Only issues with <span className="text-indigo-400 font-semibold">Hack the Stack</span> label are eligible.</li>
            <li>• Work only on issues officially assigned to you.</li>
            <li>• Create a separate branch for every issue.</li>
            <li>• Use meaningful commit messages.</li>
            <li>• No spam, plagiarism, or duplicate pull requests.</li>
            <li>• Pull Requests must mention the issue number (e.g., Closes #23).</li>
          </ul>
        </section>

        {/* Project Admin Section */}
        <section className="mb-12 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:bg-slate-800/70 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-purple-400" />
            <h2 className="text-xl md:text-2xl font-bold">
              Rules for Project Admins
            </h2>
          </div>

          <ul className="space-y-3 text-slate-300 text-sm md:text-base">
            <li>• Ensure repository is public and properly documented.</li>
            <li>• Create clearly defined issues with proper labels.</li>
            <li>• Use official difficulty labels (Level 1, Level 2, Level 3).</li>
            <li>• Assign only one contributor per issue.</li>
            <li>• Review Pull Requests fairly and provide constructive feedback.</li>
            <li>• Avoid merging low-quality or incomplete contributions.</li>
            <li>• Maintain transparency in scoring and evaluation.</li>
          </ul>
        </section>

        {/* Points Section */}
<section className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
  <div className="flex items-center gap-3 mb-6">
    <Trophy className="text-yellow-400" />
    <h2 className="text-xl md:text-2xl font-bold">
      Points System
    </h2>
  </div>

 <ul className="space-y-3 text-slate-300 text-sm md:text-base">
  {Object.entries(points).map(([label, value]) => {
    const lower = label.toLowerCase();

    let displayText = "Issue Creation";

    if (lower === "issue") {
      displayText = "Issue Creation";
    } 
    else if (lower === "pr-created") {
      console.log("working pr");
      displayText = "PR Created";
    } 
    else if (lower === "good first issue") {
      displayText = "PR Merged (Good First Issue)";
    } 
    else if (lower === "documentation") {
       
      displayText = "PR Merged (Documentation)";
    } 
    else if (lower.includes("level")) {
      displayText = `PR Merged (${label.toUpperCase()})`;
    }

    return (
      <>
      {/* <li className="flex justify-between"><span>PR - creation</span>
        <span className="font-semibold text-indigo-400">
          5 pts
        </span>
        </li> */}
      <li key={label} className="flex justify-between">
        <span>{displayText}</span>
        <span className="font-semibold text-indigo-400">
          {value} pts
        </span>
      </li>
      </>
    );
  })}
</ul>
</section>

      </div>
    </div>
  );
}
