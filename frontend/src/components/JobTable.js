import React, { useState } from "react";
import { Table, Container } from "react-bootstrap";
import JobRow from "./JobRow";
import Filters from "./Filters";
import AddJobRow from "./AddJobRow";

const JobTable = ({ jobs, setJobs, onDelete, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? job.status === statusFilter : true;
    const matchesDate =
      (!startDate || new Date(job.date_applied) >= new Date(startDate)) &&
      (!endDate || new Date(job.date_applied) <= new Date(endDate));

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <Container className="d-flex flex-column align-items-center mt-3">
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <div style={{ width: "90%", maxWidth: "1200px" }}>
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
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
            <AddJobRow jobs={jobs} setJobs={setJobs} />

            {filteredJobs.map((job) => (
              <JobRow key={job.id} job={job} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default JobTable;
