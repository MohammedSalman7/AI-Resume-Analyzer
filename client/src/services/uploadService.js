import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export const uploadResume = async (
  formData
) => {
  return axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};