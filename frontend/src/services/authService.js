import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      new URLSearchParams({
        username: email,
        password: password,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { detail: "Login failed" };
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { detail: "Registration failed" };
  }
};
