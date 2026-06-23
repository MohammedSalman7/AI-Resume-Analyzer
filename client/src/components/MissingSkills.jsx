function MissingSkills({ missingSkills }) {
  if (!missingSkills) return null;

  return (
    <div className="
      bg-slate-900
      rounded-2xl
      p-8
      shadow-xl
      border
      border-slate-800
    ">
      <h2 className="text-2xl font-bold mb-5">
        Missing Skills
      </h2>

      {missingSkills.length === 0 ? (
        <p className="text-green-400">
          ✅ No missing skills
        </p>
      ) : (
        <div className="space-y-3">
          {missingSkills.map(
            (skill, index) => (
              <div
                key={index}
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  rounded-lg
                  p-3
                "
              >
                ❌ {skill}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default MissingSkills;