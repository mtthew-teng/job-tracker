import React, {useState, useEffect} from "react";
import AuthGuard from "../components/AuthGuard";
import LogoutButton from "../components/LogoutButton";
import AddJobForm from "../components/AddJobForm";
import { getJobs, deleteJob } from "../services/jobService";

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
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      await deleteJob(jobId, token);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (err) {
      setError(err.detail || "Failed to delete job");
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
        {jobs.length === 0 ? (
          <p>No jobs found. Add a job to get started!</p>
        ) : (
          <table border="1">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.company}</td>
                  <td>{job.position}</td>
                  <td>{job.status}</td>
                  <td>{job.date_applied}</td>
                  <td>{job.notes}</td>
                  <td>
                    <button onClick={() => handleDelete(job.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AuthGuard>
  );
}

export default Dashboard;
