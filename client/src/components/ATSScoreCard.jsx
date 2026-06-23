import ATSProgress from "../charts/ATSProgress";

function ATSScoreCard({ ats }) {
  if (!ats) return null;

  return (
    <div
      className="
        bg-slate-900
        rounded-2xl
        p-8
        shadow-xl
        border
        border-slate-800
      "
    >
      <h2 className="text-2xl font-bold mb-4">
        ATS Score
      </h2>

      <p className="text-gray-400 text-center mb-6">
        {ats.role}
      </p>

      <div className="flex justify-center">
        <ATSProgress
          score={ats.score}
        />
      </div>

      <div className="mt-6 text-center">
        <p className="text-slate-400">
          Resume Match Score
        </p>
      </div>
    </div>
  );
}

export default ATSScoreCard;