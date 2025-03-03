import React, { useState, useEffect } from "react";
import AuthGuard from "../components/AuthGuard";
import LogoutButton from "../components/LogoutButton";
import AddJobForm from "../components/AddJobForm";
import JobTable from "../components/JobTable";
import { getJobs, deleteJob, updateJob } from "../services/jobService";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs(token);
        setJobs(data);
      } catch (err) {
        setError(err.detail || "Failed to load jobs");
      }
    };

    fetchJobs();
  }, [token]);

  const handleJobAdded = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(jobId, token);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (err) {
      setError(err.detail || "Failed to delete job");
    }
  };

  const handleUpdate = async (updatedJob) => {
    try {
      const newJob = await updateJob(updatedJob.id, updatedJob, token);
      setJobs(jobs.map((job) => (job.id === updatedJob.id ? newJob : job)));
    } catch (err) {
      setError(err.detail || "Failed to update job");
    }
  };

  return (
    <AuthGuard>
      <div>
        <h1>Dashboard</h1>
        <LogoutButton />
        <AddJobForm onJobAdded={handleJobAdded} />
        <h2>Your Job Applications</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <JobTable jobs={jobs} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </AuthGuard>
  );
}

export default Dashboard;
