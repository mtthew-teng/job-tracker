import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";

function HomePage() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center p-4" style={{ width: "25rem" }}>
        <Card.Body>
          <h1>Welcome to Job Tracker</h1>
          <p className="text-muted">Track your job applications easily.</p>
          <div className="d-flex justify-content-around mt-3">
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Sign Up</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HomePage;
