import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const uploadResume = async (formData) => {
  return axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};