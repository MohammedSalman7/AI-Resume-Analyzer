function ResumePreview({ file }) {
  if (!file) return null;

  const fileSize = (
    file.size / 1024
  ).toFixed(2);

  const extension =
    file.name.split(".").pop().toUpperCase();

  return (
    <div
      className="
        bg-slate-900
        rounded-2xl
        p-6
        shadow-xl
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
        Resume Preview
      </h2>

      <div className="space-y-4">

        <div
          className="
            flex
            items-center
            gap-3
            text-slate-300
          "
        >
          <span className="text-2xl">
            📄
          </span>

          <span>
            {file.name}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-3
            text-slate-300
          "
        >
          <span className="text-2xl">
            📦
          </span>

          <span>
            {fileSize} KB
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-3
            text-slate-300
          "
        >
          <span className="text-2xl">
            📑
          </span>

          <span>
            {extension}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-3
            text-green-400
            font-semibold
          "
        >
          <span className="text-2xl">
            ✅
          </span>

          <span>
            Ready for Analysis
          </span>
        </div>

      </div>
    </div>
  );
}

export default ResumePreview;