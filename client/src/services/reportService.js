import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;

export const downloadReport = async (
  analysis
) => {
  return axios.post(
    `${API}/report/download`,
    analysis,
    {
      responseType: "blob",
    }
  );
};