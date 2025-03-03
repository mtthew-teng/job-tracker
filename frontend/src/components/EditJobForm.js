import React, { useState } from "react";

const EditJobForm = ({ job, onUpdate, onCancel }) => {
  const [editedJob, setEditedJob] = useState({ ...job });

  const handleChange = (e) => {
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedJob);
  };

  return (
    <>
      <td>
        <input type="text" name="company" value={editedJob.company} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="position" value={editedJob.position} onChange={handleChange} />
      </td>
      <td>
        <select name="status" value={editedJob.status} onChange={handleChange}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
      <td>
        <input type="date" name="date_applied" value={editedJob.date_applied} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="notes" value={editedJob.notes} onChange={handleChange} />
      </td>
      <td>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </td>
    </>
  );
};

export default EditJobForm;
