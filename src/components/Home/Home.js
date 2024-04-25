import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import welcome from "./welcome.jpg";

const Home = () => {
  const history = useNavigate();

  const handleLogin = () => {
    try {
      // Navigate to login page
      history("/login");
    } catch (error) {
      // Handle navigation error
      console.error("Navigation error:", error);
    }
  };

  const handleSignup = () => {
    try {
      // Navigate to signup page
      history("/register");
    } catch (error) {
      // Handle navigation error
      console.error("Navigation error:", error);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ marginTop: "200px" }}
    >
      <Row className="justify-content-center">
        {/* Upper Grid for Image */}
        <Col md={6} className="mb-4 ">
          <h2 className="mb-4 ">Welcome</h2>
          <p className="mb-4">Start your helping journey with us.</p>
          <img src={welcome} alt="Welcome" className="img-fluid" />
          <div className="p-4">
            <Button
              variant="primary"
              className="me-2"
              onClick={handleLogin}
              aria-label="Login"
            >
              Login
            </Button>
            <Button
              variant="secondary"
              onClick={handleSignup}
              aria-label="Sign Up"
            >
              Signup
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
