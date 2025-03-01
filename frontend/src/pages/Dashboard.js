import React, {useState} from "react";
import AuthGuard from "../components/AuthGuard";
import LogoutButton from "../components/LogoutButton";
import AddJobForm from "../components/AddJobForm";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const handleJobAdded = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  return (
    <AuthGuard>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome! You are logged in.</p>
        <LogoutButton />
        <AddJobForm onJobAdded={handleJobAdded} />
      </div>
    </AuthGuard>
  );
}

export default Dashboard;
