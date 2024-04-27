import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img1 from "assets/home.png";

const Home = () => {
  const history = useNavigate();

  const handleLogin = () => {
    try {
       
      history("/login");
    } catch (error) {
       
      console.error("Navigation error:", error);
    }
  };

  

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor:"#f37a2f" ,fontFamily: "'Montserrat', sans-serif"}}
    >
      <Row className="justify-content-center">
        
        <Col md={6} className="mb-4 ">
          <h2 className="mb-4 text-light text-center" style={{fontSize:"35px"}}><b>Welcome to Hunger Free</b></h2>
          <p className="mb-4 text-center text-light" style={{fontSize:"20px"  }}>Start your helping journey with us.</p>
          <img src={img1} alt="Welcome" className="img-fluid" />
          <br></br>
          <div style={{textAlign:"center"}}>
            <Button
              variant="secondary"
              className="me-2"
              onClick={handleLogin}
              aria-label="Login"
              style={{padding:"12px"}}
            >
              <b>Get Started</b>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    
  );
};

export default Home;