import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLogin } from "hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "utils/form-validate";
import { HERO, REGISTER, RESET } from "lib/routes";
import logo from "assets/logo.webp";

export default function Login() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState(null);

  const [forgot, setForgot] = useState(false)

  async function handleLogin(data) {
    try {
      await login({
        email: data.email,
        password: data.password,
        redirectTo: HERO,
        setForgot,
      });
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor:"#f37a2f", fontFamily: "'Montserrat', sans-serif" }}
    >
      <Row className="justify-content-center">
        <Col>
          <div
            className="home-container"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <div
              className="logo"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
            <div className="name" style={{ marginTop: "1px" }}>
              <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#fff" }}>Welcome Back</h1>
            </div>
          </div>
          <div className="p-4">


            {loginError && <Alert variant="danger">{loginError}</Alert>}

            <Form
              onSubmit={handleSubmit(handleLogin)}
              style={{ margin: "0 auto", maxWidth: "400px" }}
            >
              <FormGroup className="py-2" controlId="email">
                <FormLabel style={{ fontSize: "16px", color: "#fff" }}><b> Your Email</b></FormLabel>
                <FormControl
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", emailValidate)}
                  style={{ width: "100%",padding:"15px"}}
                />
                {errors.email && (
                  <Form.Text className="text-danger">
                    {errors.email.message}
                  </Form.Text>
                )}
              </FormGroup>
              <FormGroup className="py-2" controlId="password">
                <FormLabel style={{ fontSize: "16px", color: "#fff" }}><b>Your Password</b></FormLabel>
                <FormControl
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", passwordValidate)}
                  style={{ width: "100%",padding:"15px"}}
                />
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password.message}
                  </Form.Text>
                )}
              </FormGroup>
              <Button
                className="mt-4"
                variant="primary"
                type="submit"
                size="md"
                disabled={isLoading}
                style={{ width: "100%", fontWeight: "bold",backgroundColor:"black",color:"white" }}
              >
                {isLoading ? "Logging In" : "Log In"}
              </Button>
            </Form>

            <p className="text-center mt-4" style={{ fontSize: "14px",color: "#232b2b ",fontWeight: "bold" }}>
              Don't have an account?{" "}
              <Link
                to={REGISTER}
                className="text-decoration-none"
                style={{ fontWeight: "bold", color: "white" }}
              > 
                Register 
              </Link>{" "}
              instead!
            </p>
            {forgot && 
            <p className="text-center mt-4" style={{ fontSize: "14px",color: "#232b2b ",fontWeight: "bold" }}>
              You have Forgot Password?{" "}
              <Link
                to={RESET}
                className="text-decoration-none"
                style={{ fontWeight: "bold", color: "white" }}
              > 
                Click here
              </Link>{" "}
            </p>
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
}