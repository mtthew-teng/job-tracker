import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const Filters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <Row className="mb-3 w-100 justify-content-center text-start">
      <Col xs={12} md={3}>
        <Form.Label>Search by Company</Form.Label>
        <Form.Control
          type="text"
          placeholder="Company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Col>
      <Col xs={12} md={3}>
        <Form.Label>Filter by Status</Form.Label>
        <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </Form.Select>
      </Col>
      <Col xs={12} md={2}>
        <Form.Label>From Date</Form.Label>
        <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </Col>
      <Col xs={12} md={2}>
        <Form.Label>To Date</Form.Label>
        <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </Col>
      <Col xs={12} md={2} className="d-flex align-items-end justify-content-center">
        <Button
          variant="secondary"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("");
            setStartDate("");
            setEndDate("");
          }}
        >
          Reset Filters
        </Button>
      </Col>
    </Row>
  );
};

export default Filters;
