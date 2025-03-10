import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const EditJobForm = ({ job, onUpdate, onCancel }) => {
  const [editedJob, setEditedJob] = useState({ ...job });

  const handleChange = (e) => {
    setEditedJob({ ...editedJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedJob);
    onCancel();
  };

  return (
    <>
      <td>
        <Form.Control
          type="text"
          name="company"
          value={editedJob.company}
          onChange={handleChange}
          size="sm"
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="position"
          value={editedJob.position}
          onChange={handleChange}
          size="sm"
        />
      </td>
      <td>
        <Form.Select name="status" value={editedJob.status} onChange={handleChange} size="sm">
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </Form.Select>
      </td>
      <td>
        <Form.Control
          type="date"
          name="date_applied"
          value={editedJob.date_applied}
          onChange={handleChange}
          size="sm"
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="notes"
          value={editedJob.notes}
          onChange={handleChange}
          size="sm"
        />
      </td>
      <td className="text-center">
      <Button variant="primary" size="sm" className="me-2" onClick={handleSubmit}>
        Save
      </Button>
      <Button variant="secondary" size="sm" onClick={onCancel}>
        Cancel
      </Button>

      </td>
    </>
  );
};

export default EditJobForm;
