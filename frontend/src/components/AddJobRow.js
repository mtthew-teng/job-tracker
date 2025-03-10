import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addJob } from "../services/jobService";

const AddJobRow = ({ jobs, setJobs }) => {
  const [newJob, setNewJob] = useState({
    company: "",
    position: "",
    status: "Applied",
    date_applied: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();

    if (!newJob.company || !newJob.position || !newJob.date_applied) return;

    setLoading(true);
    try {
      const addedJob = await addJob(newJob, token);
      setJobs([...jobs, addedJob]);
      setNewJob({ company: "", position: "", status: "Applied", date_applied: "", notes: "" });
    } catch (error) {
      console.error("Error adding job:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>
        <Form.Control
          type="text"
          name="company"
          value={newJob.company}
          onChange={handleChange}
          placeholder="Company"
          size="sm"
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="position"
          value={newJob.position}
          onChange={handleChange}
          placeholder="Position"
          size="sm"
        />
      </td>
      <td>
        <Form.Select name="status" value={newJob.status} onChange={handleChange} size="sm">
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
          value={newJob.date_applied}
          onChange={handleChange}
          size="sm"
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="notes"
          value={newJob.notes}
          onChange={handleChange}
          placeholder="Notes"
          size="sm"
        />
      </td>
      <td className="text-center">
        <Button variant="primary" size="sm" onClick={handleAddJob} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </td>
    </tr>
  );
};

export default AddJobRow;
