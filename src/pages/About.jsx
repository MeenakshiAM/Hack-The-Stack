function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-20">

        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Hack The Stack
          </h1>
          <p className="text-slate-400">
            An Inter-College Open Source Contribution Program by FOSS-CLUB LBSITW
          </p>
          <p className="text-sm text-slate-500">
            Mode : Online <br />
            Duration : 20 Feb 2026 - 13 March 2026
          </p>
        </div>

        {/* About the Event */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-400"> About the Event</h2>
          <p className="leading-relaxed text-slate-300">
            Hack the Stack is a beginner-friendly open source contribution program
            designed exclusively for students.
          </p>
          <p className="leading-relaxed text-slate-300">
            The event introduces participants to Git, GitHub, collaboration,
            and real-world development workflows through structured contributions
            to curated repositories.
          </p>
          <p className="leading-relaxed text-slate-300">
            Whether you're writing your first line of code or stepping into open
            source for the first time — this program is your gateway.
          </p>
        </section>

        {/* Objective */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-teal-400"> Objective</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Introduce students to open source culture</li>
            <li>Teach real-world contribution workflows</li>
            <li>Encourage collaborative development</li>
            <li>Build GitHub portfolios</li>
            <li>Develop confidence in reading and contributing to existing codebases</li>
          </ul>
          <p className="text-slate-400">
            This event bridges the gap between learning to code and building with the world.
          </p>
        </section>

        {/* How It Works */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-cyan-400"> How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-300">
            <li>Register for the program.</li>
            <li>Get access to curated beginner-friendly repositories.</li>
            <li>Explore issues labeled for contributions.</li>
            <li>Fork → Clone → Create Branch → Make Changes → Raise Pull Request.</li>
            <li>Receive feedback from maintainers.</li>
            <li>Earn points for valid and accepted contributions.</li>
            <li>Mentors guide you throughout the process.</li>
          </ol>
        </section>

        {/* What Participants Will Learn */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-400"> What Participants Will Learn</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Git & GitHub basics</li>
            <li>Forking & Pull Requests</li>
            <li>Understanding issues & documentation</li>
            <li>Code review process</li>
            <li>Collaboration etiquette</li>
            <li>Writing meaningful commit messages</li>
          </ul>
        </section>

        {/* Evaluation & Recognition */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-teal-400"> Evaluation & Recognition</h2>
          <p className="text-slate-300 font-semibold">Participants will be evaluated based on:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Quality of contributions</li>
            <li>Number of valid pull requests</li>
            <li>Issue resolution</li>
            <li>Consistency</li>
            <li>Collaboration</li>
          </ul>

          <p className="text-slate-300 font-semibold mt-4">Top contributors will receive:</p>
          <ul className="space-y-2 text-slate-300">
            <li> Certificates of Excellence</li>
            <li> Recognition on Leaderboard</li>
            <li> Special Prizes for winners</li>
          </ul>
        </section>

        {/* Who Can Participate */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-cyan-400"> Who Can Participate?</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Students affiliated under APJ Abdul Kalam Technological University (KTU)</li>
            <li>Beginners to open source</li>
            <li>Anyone with basic programming knowledge</li>
            <li>Students willing to learn and collaborate</li>
            <li>No prior open source experience required</li>
            <li>Must have a GitHub account</li>
          </ul>
        </section>

        {/* Event Structure */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-400"> Event Structure</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Contribution Phase (20th Feb – 13th Mar)</li>
            <li>Mid-checkpoint Review</li>
            <li>Final Evaluation</li>
            <li>Result Announcement & Recognition</li>
          </ul>
        </section>

        {/* Why Hack the Stack */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-teal-400"> Why Hack the Stack?</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>Open source builds credibility</li>
            <li>Recruiters value contribution history</li>
            <li>Improves code reading skills</li>
            <li>Builds collaboration mindset</li>
            <li>Creates a strong campus technical community</li>
          </ul>
          <p className="text-slate-400">
            This event transforms students from learners to contributors.
          </p>
        </section>

        {/* Vision */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-cyan-400"> Vision</h2>
          <p className="leading-relaxed text-slate-300">
            Hack the Stack aims to create a strong open source culture within students
            and empower them to confidently contribute beyond campus to global projects.
          </p>
          <p className="font-semibold text-indigo-400">
            This is not just an event.  
            It is the beginning of a contribution culture.
          </p>
        </section>

      </div>
    </div>
  );
}

export default About;
