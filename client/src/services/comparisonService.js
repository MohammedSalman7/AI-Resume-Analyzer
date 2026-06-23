import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;

export const getComparison =
  (email) => {
    return axios.get(
      `${API}/compare/${email}`
    );
  };