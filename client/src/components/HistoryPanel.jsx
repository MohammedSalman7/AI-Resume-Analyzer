import {
  useEffect,
  useState,
} from "react";

import {
  getHistory,
} from "../services/historyService";

import {
  useAuth,
} from "../hooks/useAuth";

function HistoryPanel() {
  const [history, setHistory] =
    useState([]);

  const { user } =
    useAuth();

  useEffect(() => {
    const loadHistory =
      async () => {
        try {
          if (!user?.email)
            return;

          const response =
            await getHistory(
              user.email
            );

          setHistory(
            response.data
          );
        } catch (error) {
          console.log(error);
        }
      };

    loadHistory();
  }, [user]);

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
        Upload History
      </h2>

      {!history.length && (
        <p className="text-slate-400">
          No uploads yet.
        </p>
      )}

      <div
        className="
          space-y-4
          max-h-[500px]
          overflow-y-auto
          pr-2
        "
      >
        {history.map(
          (item, index) => (
            <div
              key={index}
              className="
                bg-slate-800
                rounded-xl
                p-5
                border
                border-slate-700
                hover:border-blue-500
                hover:scale-[1.02]
                transition-all
                duration-300
              "
            >
              <h3
                className="
                  text-lg
                  font-bold
                  text-blue-400
                  mb-2
                "
              >
                📄 {item.filename}
              </h3>

              <p className="text-slate-300">
                🎯 Role: {item.role}
              </p>

              <p
                className={`font-semibold ${
                  item.ats_score >= 80
                    ? "text-green-400"
                    : item.ats_score >= 50
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                📊 ATS: {item.ats_score}%
              </p>

              <p
                className="
                  text-slate-500
                  text-sm
                  mt-2
                "
              >
                🕒 {item.uploaded_at}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default HistoryPanel;