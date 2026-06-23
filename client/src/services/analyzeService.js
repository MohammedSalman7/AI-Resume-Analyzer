import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;

export const analyzeOnly =
  (formData) => {
    return axios.post(
      `${API}/analyze`,
      formData
    );
  };