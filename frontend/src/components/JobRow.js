import React, { useState } from "react";
import { Button } from "react-bootstrap";
import EditJobForm from "./EditJobForm";

const JobRow = ({ job, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <tr className="align-middle">
      {isEditing ? (
        <EditJobForm job={job} onUpdate={onUpdate} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <td className="px-3">{job.company}</td>
          <td className="px-3">{job.position}</td>
          <td className="px-3">
            <span className={`badge ${getBadgeClass(job.status)} p-2`}>{job.status}</span>  
          </td>
          <td className="px-3">{job.date_applied}</td>
          <td className="px-3">{job.notes}</td>
          <td className="px-3 text-center">
            <Button variant="primary" size="sm" className="me-2" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(job.id)}>
              Delete
            </Button>
          </td>
        </>
      )}
    </tr>
  );
};

const getBadgeClass = (status) => {
  switch (status) {
    case "Applied":
      return "bg-primary";
    case "Interview":
      return "bg-warning text-dark";
    case "Offer":
      return "bg-success";
    case "Rejected":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};

export default JobRow;
