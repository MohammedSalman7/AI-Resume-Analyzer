function Loader() {
  return (
    <div
      className="
        bg-slate-900
        rounded-2xl
        p-8
        border
        border-slate-800
        text-center
        space-y-4
      "
    >
      <div
        className="
          animate-spin
          rounded-full
          h-16
          w-16
          border-b-4
          border-blue-500
          mx-auto
        "
      />

      <h2
        className="
          text-2xl
          font-bold
        "
      >
        Analyzing Resume...
      </h2>

      <div
        className="
          text-slate-400
          space-y-2
        "
      >
        <p>
          📤 Uploading Resume...
        </p>

        <p>
          🔍 Extracting Skills...
        </p>

        <p>
          📊 Calculating ATS Score...
        </p>

        <p>
          💼 Finding Recommended Roles...
        </p>

        <p>
          🗺️ Generating Career Roadmap...
        </p>
      </div>
    </div>
  );
}

export default Loader;