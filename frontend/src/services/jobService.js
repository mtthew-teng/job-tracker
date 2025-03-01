import axios from "axios";

const API_URL = "http://127.0.0.1:8000/jobs/";

export const addJob = async (jobData, token) => {
    try {
        const response = await axios.post(API_URL, jobData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { detail: "Job creation failed" };
    }
};