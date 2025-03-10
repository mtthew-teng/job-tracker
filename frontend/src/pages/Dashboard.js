import React, { useState, useEffect } from "react";
import { Spinner, Container } from "react-bootstrap";
import AuthGuard from "../components/AuthGuard";
import LogoutButton from "../components/LogoutButton";
import JobTable from "../components/JobTable";
import { getJobs, deleteJob, updateJob } from "../services/jobService";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await getJobs(token);
        setJobs(data);
      } catch (err) {
        setError(err.detail || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    setLoading(true);
    try {
      await deleteJob(jobId, token);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (err) {
      setError(err.detail || "Failed to delete job");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedJob) => {
    setLoading(true);
    try {
      const newJob = await updateJob(updatedJob.id, updatedJob, token);
      setJobs(jobs.map((job) => (job.id === updatedJob.id ? newJob : job)));
    } catch (err) {
      setError(err.detail || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <Container className="text-center mt-3">
        <h1>Dashboard</h1>
        <LogoutButton />
        {error && <p className="text-danger">{error}</p>}

        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <JobTable jobs={jobs} setJobs={setJobs} onDelete={handleDelete} onUpdate={handleUpdate} />
        )}
      </Container>
    </AuthGuard>
  );
}

export default Dashboard;
