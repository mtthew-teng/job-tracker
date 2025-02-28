import axios from "axios";

const API_URL = "http://127.0.0.1:8000/auth/login";

export const login = async (email, password) => {
    try {
        const response = await axios.post(
            API_URL,
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