import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function SkillsPieChart({
  matchedSkills = [],
  missingSkills = [],
}) {
  console.log(
    "Matched:",
    matchedSkills
  );

  console.log(
    "Missing:",
    missingSkills
  );
  const matched =
  matchedSkills?.length || 0;

const missing =
  missingSkills?.length || 0;

  const total =
    matched + missing;

  if (total === 0)
    return null;

  const data = [
    {
      name: "Matched Skills",
      value: matched,
    },
    {
      name: "Missing Skills",
      value: missing,
    },
  ];

  const COLORS = [
    "#10b981",
    "#ef4444",
  ];

  return (
    <div
      className="
        bg-slate-900
        rounded-2xl
        p-8
        border
        border-slate-800
        shadow-xl
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Skills Match Analysis
      </h2>

      <div className="h-96">
  <ResponsiveContainer
    width="100%"
    height="100%"
  >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={120}
              label={({
  percent,
  name,
}) =>
  `${name}: ${(
    percent * 100
  ).toFixed(0)}%`
}
            >
              {data.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip
              formatter={(
                value
              ) =>
                `${Math.round(
                  (value /
                    total) *
                    100
                )}%`
              }
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SkillsPieChart;