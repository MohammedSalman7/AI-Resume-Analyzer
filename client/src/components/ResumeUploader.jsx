import { useState, useEffect } from "react";
import { uploadResume } from "../services/uploadService";
import { getComparison } from "../services/comparisonService";
import { useAuth } from "../context/AuthContext";

import DownloadReportButton from "./DownloadReportButton";
import ResumePreview from "./ResumePreview";
import Loader from "./Loader";
import RoleTabs from "./RoleTabs";
import HistoryPanel from "./HistoryPanel";
import ResumeComparison from "./ResumeComparison";
import {
  analyzeOnly
}
from "../services/analyzeService";
import SkillsPieChart from "../charts/SkillsPieChart";

import ATSScoreCard from "./ATSScoreCard";
import MissingSkills from "./MissingSkills";
import JobRecommendationCard from "./JobRecommendationCard";
import CareerRoadmap from "./CareerRoadmap";

function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] =
    useState(false);
  const [message, setMessage] =
    useState("");
  const [analysis, setAnalysis] =
    useState(null);
  const [loading, setLoading] =
    useState(false);

  const [comparison,
    setComparison] =
    useState(null);

  const [selectedRole,
    setSelectedRole] =
    useState(
      "Full Stack Developer"
    );

  const { user } =
    useAuth();

  const allowedExtensions = [
    ".pdf",
    ".doc",
    ".docx",
  ];

  const validateFile = (
    selectedFile
  ) => {
    if (!selectedFile)
      return false;

    const fileName =
      selectedFile.name.toLowerCase();

    const isValidExtension =
      allowedExtensions.some(
        (ext) =>
          fileName.endsWith(
            ext
          )
      );

    if (
      !isValidExtension
    ) {
      setMessage(
        "❌ Only PDF, DOC and DOCX resumes are allowed."
      );

      setFile(null);
      setAnalysis(null);

      return false;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (
      selectedFile.size >
      maxSize
    ) {
      setMessage(
        "❌ Resume size should be less than 5MB."
      );

      setFile(null);
      setAnalysis(null);

      return false;
    }

    setMessage("");

    return true;
  };

  const handleFileChange =
    (e) => {
      const selectedFile =
        e.target.files[0];

      if (
        validateFile(
          selectedFile
        )
      ) {
        setFile(
          selectedFile
        );
      }
    };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      e.type ===
        "dragenter" ||
      e.type ===
        "dragover"
    ) {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    const droppedFile =
      e.dataTransfer.files[0];

    if (
      validateFile(
        droppedFile
      )
    ) {
      setFile(
        droppedFile
      );
    }
  };

  const analyzeResume =
    async (
      resumeFile,
      role
    ) => {
      const formData =
        new FormData();

      formData.append(
        "resume",
        resumeFile
      );

      formData.append(
        "role",
        role
      );

      formData.append(
        "email",
        user?.email || ""
      );

      const response =
        await uploadResume(
          formData
        );

      return response.data;
    };
    const reAnalyzeResume = async (
  resumeFile,
  role
) => {
  const formData =
    new FormData();

  formData.append(
    "resume",
    resumeFile
  );

  formData.append(
    "role",
    role
  );

  const response =
    await analyzeOnly(
      formData
    );

  return response.data;
};
useEffect(() => {
  if (
    !file ||
    !analysis
  )
    return;

  const reAnalyze =
    async () => {
      try {
        const data =
          await reAnalyzeResume(
            file,
            selectedRole
          );

        setAnalysis(
          data
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  reAnalyze();

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [
  selectedRole,
  file
]);

    

  const handleUpload =
    async () => {
      if (!file) {
        setMessage(
          "Please select a valid resume."
        );

        return;
      }

      setLoading(true);
      setMessage("");
      setAnalysis(null);

      try {
        const data =
          await analyzeResume(
            file,
            selectedRole
          );

        setMessage(
          data.message
        );

        setAnalysis(
          data
        );
      } catch (error) {
        console.error(
          error
        );

        setMessage(
          "❌ Upload failed."
        );
      } finally {
        setLoading(false);
      }
    };

  

  // Load comparison
  useEffect(() => {
    const loadComparison =
      async () => {
        if (
          !user?.email
        )
          return;

        try {
          const response =
            await getComparison(
              user.email
            );

          setComparison(
            response.data
          );
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      };

    loadComparison();
  }, [
    analysis,
    user,
  ]);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center">
        Upload Your Resume
      </h2>

      {/* Upload Box */}
      <div
        onDragEnter={
          handleDrag
        }
        onDragOver={
          handleDrag
        }
        onDragLeave={
          handleDrag
        }
        onDrop={
          handleDrop
        }
        className={`
          border-2
          border-dashed
          rounded-2xl
          p-12
          text-center
          cursor-pointer
          transition-all
          duration-300
          ${
            dragActive
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-700 bg-slate-900"
          }
        `}
      >
        <input
          type="file"
          id="resumeUpload"
          accept=".pdf,.doc,.docx"
          onChange={
            handleFileChange
          }
          className="hidden"
        />

        <label
          htmlFor="resumeUpload"
          className="cursor-pointer block"
        >
          <div className="text-6xl mb-4">
            📄
          </div>

          <h3 className="text-2xl font-bold mb-2">
            Upload Your Resume
          </h3>

          <p className="text-slate-400">
            Drag & Drop Resume
            Here
          </p>

          <p className="text-slate-500 mt-2">
            or Click to Upload
          </p>

          <p className="text-sm text-slate-500 mt-4">
            Accepted formats:
            PDF, DOC, DOCX
            (Max 5MB)
          </p>

          {file && (
            <div
              className="
                mt-6
                p-4
                bg-slate-800
                rounded-xl
                text-green-400
                font-semibold
              "
            >
              ✅ {file.name}
            </div>
          )}
        </label>
      </div>

      <button
        onClick={
          handleUpload
        }
        disabled={
          loading
        }
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          py-3
          rounded-xl
          font-semibold
          transition
          disabled:opacity-50
        "
      >
        {loading
          ? "Analyzing Resume..."
          : "Upload Resume"}
      </button>

      {message && (
        <div
          className={`
            p-3
            rounded-lg
            text-center
            font-semibold
            ${
              message.includes(
                "❌"
              )
                ? "bg-red-600"
                : "bg-green-600"
            }
          `}
        >
          {message}
        </div>
      )}

      {loading && (
        <Loader />
      )}

      {analysis && (
        <div className="mt-10 space-y-8">
          <ResumePreview
            file={file}
          />

          <DownloadReportButton
            analysis={
              analysis
            }
          />

          <RoleTabs
            selectedRole={
              selectedRole
            }
            setSelectedRole={
              setSelectedRole
            }
          />

          <SkillsPieChart
  key={selectedRole}
  matchedSkills={
    analysis?.ats
      ?.matched_skills || []
  }
  missingSkills={
    analysis?.ats
      ?.missing_skills || []
  }
/>

          <div className="grid md:grid-cols-2 gap-6">
            <ATSScoreCard
              ats={
                analysis.ats
              }
            />

            <MissingSkills
              missingSkills={
                analysis.ats
                  ?.missing_skills ||
                []
              }
            />
          </div>

          <JobRecommendationCard
            recommendations={
              analysis.recommendations ||
              []
            }
          />

          <ResumeComparison
            comparison={
              comparison
            }
          />

          <CareerRoadmap
            roadmap={
              analysis.roadmap ||
              {}
            }
          />

          <HistoryPanel />
        </div>
      )}
    </div>
  );
}

export default ResumeUploader;