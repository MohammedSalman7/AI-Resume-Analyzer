function RoleTabs({
  selectedRole,
  setSelectedRole,
}) {
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
  ];

  return (
    <div
      className="
        flex
        flex-wrap
        gap-3
        justify-center
        mb-8
      "
    >
      {roles.map((role) => (
        <button
          key={role}
          onClick={() =>
            setSelectedRole(role)
          }
          className={`
            px-4
            py-2
            rounded-xl
            font-semibold
            transition-all
            duration-300
            border

            ${
              selectedRole === role
                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
            }
          `}
        >
          {role}
        </button>
      ))}
    </div>
  );
}

export default RoleTabs;