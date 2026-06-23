import { downloadReport }
  from "../services/reportService";

function DownloadReportButton({
  analysis,
}) {
  const handleDownload =
    async () => {
      try {
        const response =
          await downloadReport(
            analysis
          );

        const url =
          window.URL.createObjectURL(
            new Blob([response.data])
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.setAttribute(
          "download",
          `${analysis.filename}_report.pdf`
        );

        document.body.appendChild(
          link
        );

        link.click();

        link.remove();
      } catch (error) {
        console.error(error);
        alert(
          "Failed to download report."
        );
      }
    };

  return (
    <button
      onClick={handleDownload}
      className="
        w-full
        bg-emerald-600
        hover:bg-emerald-700
        py-3
        rounded-xl
        font-semibold
        transition
      "
    >
      📄 Download PDF Report
    </button>
  );
}

export default DownloadReportButton;