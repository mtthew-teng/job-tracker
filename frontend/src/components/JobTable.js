import React from "react";
import JobRow from "./JobRow";

const JobTable = ({ jobs, onDelete, onUpdate }) => {
  return jobs.length === 0 ? (
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
          <JobRow key={job.id} job={job} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </tbody>
    </table>
  );
};

export default JobTable;
