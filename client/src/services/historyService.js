import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;

export const getHistory = (
  email
) => {
  return axios.get(
    `${API}/history/${email}`
  );
};