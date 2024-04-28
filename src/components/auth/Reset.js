import React from "react";
import Swal from 'sweetalert2';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "lib/firebase";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

export const Reset = () => {
  const history = useNavigate();
  const [resetError, setResetError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;
    sendPasswordResetEmail(auth, emailVal)
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Check email for reset link',
          showConfirmButton: false,
          timer: 3000
        })
        history("/login");
      })
      .catch((err) => {
        setResetError(err.message);
      });
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f37a2f", fontFamily: "'Montserrat', sans-serif" }}
    >
      <Row className="justify-content-center">
        <Col>
          <div className="p-4">
            <h2 className="mb-4 text-center" style={{ fontSize: "24px", color: "#fff", fontWeight: "600" }}>Forgot Password</h2>

            {resetError && <Alert variant="danger">{resetError}</Alert>}

            <Form onSubmit={(e) => handleSubmit(e)} style={{ margin: "0 auto", maxWidth: "400px" }}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control type="email" name="email" placeholder="Enter your email" style={{ padding: "15px" }} />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ width: "100%", fontWeight: "bold", backgroundColor: "black", color: "white" }}>
                Reset
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
