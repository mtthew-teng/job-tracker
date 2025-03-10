import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { addJob } from "../services/jobService";

const AddJobForm = ({ onJobAdded }) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!company || !position || !dateApplied) {
      setError("Company, Position, and Date Applied are required.");
      return;
    }

    const jobData = { company, position, status, date_applied: dateApplied, notes };

    setLoading(true);
    try {
      const newJob = await addJob(jobData, token);
      onJobAdded(newJob);
      setCompany("");
      setPosition("");
      setStatus("Applied");
      setDateApplied("");
      setNotes("");
    } catch (err) {
      setError(err.detail || "Failed to add job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Card style={{ width: "50%" }}>
        <Card.Body>
          <h2 className="text-center">Add Job Application</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Applied</Form.Label>
              <Form.Control type="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100" disabled={loading}>
              {loading ? "Adding..." : "Add Job"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddJobForm;
