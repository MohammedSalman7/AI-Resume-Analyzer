import axios from "axios";

export const downloadReport = async (
  analysis
) => {
  return axios.post(
    "http://127.0.0.1:5000/report/download",
    analysis,
    {
      responseType: "blob",
    }
  );
};