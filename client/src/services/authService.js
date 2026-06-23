import axios from "axios";

const API =
  "http://127.0.0.1:5000";

export const registerUser = (
  userData
) => {
  return axios.post(
    `${API}/register`,
    userData
  );
};

export const loginUser = (
  userData
) => {
  return axios.post(
    `${API}/login`,
    userData
  );
};

export const getProfile = (
  token
) => {
  return axios.get(
    `${API}/profile`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );
};