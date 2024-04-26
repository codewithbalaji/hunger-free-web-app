import { useState } from 'react';
import { Button, Container, Form, FormControl, FormGroup, FormLabel, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRegister } from 'hooks/auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate, usernameValidate } from 'utils/form-validate';
import { DASHBOARD, LOGIN } from 'lib/routes';
import logo from 'assets/logo.png';

export default function Register() {
  const { register: signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [registerError, setRegisterError] = useState(null);

  async function handleRegister(data) {
    try {
      await signup({
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        redirectTo: DASHBOARD
      });
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
    
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center">
      <div className="home-container" style={{ textAlign: 'center' ,marginBottom:'10px'}}>
          <div className="logo" style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
          </div>
          <div className="name" style={{ marginTop: '1px' }}>
            <h1 style={{ fontSize: '36px',  }}>Welcome You</h1>
          </div>
        </div>
        <Col >
          <div className="p-4">
            <h2 className="mb-4 text-center">Register</h2>

            {registerError && <Alert variant="danger">{registerError}</Alert>}

            <Form onSubmit={handleSubmit(handleRegister)}>
              <FormGroup className="py-2">
                <FormLabel>Username</FormLabel>
                <FormControl
                  placeholder="username"
                  {...register("username", usernameValidate)}
                />
                {errors.username && <Form.Text className="text-danger">{errors.username.message}</Form.Text>}
              </FormGroup>
              <FormGroup className="py-2">
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  placeholder="user@email.com"
                  {...register("email", emailValidate)}
                />
                {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
              </FormGroup>
              <FormGroup className="py-2">
                <FormLabel>Password</FormLabel>
                <FormControl
                  type="password"
                  placeholder="password123"
                  {...register("password", passwordValidate)}
                />
                {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
              </FormGroup>
              <FormGroup className="py-2">
                <FormLabel>Role</FormLabel>
                <FormControl
                  as="select"
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="volunteer">Volunteer</option>
                  <option value="contributor">Contributor</option>
                </FormControl>
                {errors.role && <Form.Text className="text-danger">{errors.role.message}</Form.Text>}
              </FormGroup>
              <Button
                className="mt-4"
                variant="primary"
                type="submit"
                size="md"
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up' : 'Register'}
              </Button>
            </Form>

            <p className="text-center mt-4">
              Already have an account?{' '}
              <Link to={LOGIN} className="text-decoration-none fw-medium text-primary">
                Log In
              </Link>{' '}
              instead!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
