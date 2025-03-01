import React, { useState } from "react";
import { addJob } from "../services/jobService";

const AddJobForm = ({ onJobAdded }) => {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("Applied");
    const [dateApplied, setDateApplied] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const jobData = {
            company,
            position,
            status,
            date_applied: dateApplied,
            notes,
        };

        try {
            const newJob = await addJob(jobData, token);
            onJobAdded(newJob);
            setCompany("");
            setPosition("");
            setStatus("Applied");
            setDateApplied("");
            setNotes("");
        } catch (err) {
            setError(err.detail || "Failed to add job.");
        }
    };

    return (
        <div>
            <h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Company:</label>
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
                    </div>
                    <div>
                        <label>Position:</label>
                        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div>
                        <label>Date Applied:</label>
                        <input type="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} required />
                    </div>
                    <div>
                        <label>Notes:</label>
                        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
                    </div>
                    <button type="submit">Add Job</button>
                </form>
            </h2>
        </div>
    );
};

export default AddJobForm;