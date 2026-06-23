function JobRecommendationCard({
  recommendations,
}) {
  if (!recommendations?.length) return null;

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
      <h2 className="text-2xl font-bold mb-8">
        Recommended Roles
      </h2>

      <div className="space-y-6">
        {recommendations.map((item) => (
          <div key={item.role}>
            <div className="flex justify-between mb-2">
              <span className="font-medium">
                {item.role}
              </span>

              <span className="text-blue-400 font-bold">
                {item.match_score}%
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-4">
              <div
                className="
                  bg-blue-500
                  h-4
                  rounded-full
                  transition-all
                  duration-700
                "
                style={{
                  width: `${item.match_score}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobRecommendationCard;