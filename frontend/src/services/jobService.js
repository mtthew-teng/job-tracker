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

export const getJobs = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { detail: "Failed to fetch jobs" };
    }
};

export const deleteJob = async (jobId, token) => {
    try {
        await axios.delete(`${API_URL}${jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw error.response ? error.response.data : { detail: "Failed to delete job" };
    }
}