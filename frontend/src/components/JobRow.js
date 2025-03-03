import React, { useState } from "react";
import EditJobForm from "./EditJobForm";

const JobRow = ({ job, onEdit, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <tr>
      {isEditing ? (
        <EditJobForm job={job} onUpdate={onUpdate} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <td>{job.company}</td>
          <td>{job.position}</td>
          <td>{job.status}</td>
          <td>{job.date_applied}</td>
          <td>{job.notes}</td>
          <td>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(job.id)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default JobRow;
