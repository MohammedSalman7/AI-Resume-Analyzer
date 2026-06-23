function ResumeComparison({
  comparison,
}) {
  if (
    !comparison ||
    comparison.message
  ) {
    return (
      <div
        className="
          bg-slate-900
          p-8
          rounded-2xl
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            mb-4
          "
        >
          Resume Improvement
        </h2>

        <p>
          Upload at least
          two resumes to
          compare.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        bg-slate-900
        rounded-2xl
        p-8
        border
        border-slate-800
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Resume Improvement Tracker
      </h2>

      <div className="space-y-3">

        <p>
          📄 Previous:
          {" "}
          {
            comparison.previous_resume
          }
        </p>

        <p>
          📄 Current:
          {" "}
          {
            comparison.current_resume
          }
        </p>

        <p>
          📊 Previous ATS:
          {" "}
          {
            comparison.previous_ats
          }%
        </p>

        <p>
          📊 Current ATS:
          {" "}
          {
            comparison.current_ats
          }%
        </p>

        <p
          className="
            text-green-400
            font-bold
            text-lg
          "
        >
          🚀 Improvement:
          {" "}
          {
            comparison.improvement
          }%
        </p>

      </div>

      <div className="mt-6">

        <h3
          className="
            font-bold
            mb-3
          "
        >
          ✅ New Skills Added
        </h3>

        <div className="flex flex-wrap gap-2">
          {
            comparison.new_skills
            ?.map(
              (skill) => (
                <span
                  key={skill}
                  className="
                    bg-green-600
                    px-3
                    py-1
                    rounded-full
                  "
                >
                  {skill}
                </span>
              )
            )
          }
        </div>

      </div>

      <div className="mt-6">

        <h3
          className="
            font-bold
            mb-3
          "
        >
          ❌ Removed Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {
            comparison.removed_skills
            ?.map(
              (skill) => (
                <span
                  key={skill}
                  className="
                    bg-red-600
                    px-3
                    py-1
                    rounded-full
                  "
                >
                  {skill}
                </span>
              )
            )
          }
        </div>

      </div>
    </div>
  );
}

export default ResumeComparison;