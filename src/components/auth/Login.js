import { useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLogin } from 'hooks/auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate } from 'utils/form-validate';
import { DASHBOARD, REGISTER } from 'lib/routes';

export default function Login() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [loginError, setLoginError] = useState(null);

  async function handleLogin(data) {
    try {
      await login({
        email: data.email,
        password: data.password,
        redirectTo: DASHBOARD
      });
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col >
          <div className="p-4 border rounded">
            <h2 className="mb-4 text-center">Log In</h2>

            {loginError && <Alert variant="danger">{loginError}</Alert>}

            <Form onSubmit={handleSubmit(handleLogin)}>
              <FormGroup className="py-2" controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  placeholder="user@email.com"
                  {...register("email", emailValidate)}
                />
                {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
              </FormGroup>
              <FormGroup className="py-2" controlId="password">
                <FormLabel>Password</FormLabel>
                <FormControl
                  type="password"
                  placeholder="password123"
                  {...register("password", passwordValidate)}
                />
                {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
              </FormGroup>
              <Button
                className="mt-4"
                variant="primary"
                type="submit"
                size="md"
                disabled={isLoading}
              >
                {isLoading ? 'Logging In' : 'Log In'}
              </Button>
            </Form>

            <p className="text-center mt-4">
              Don't have an account?{' '}
              <Link to={REGISTER} className="text-decoration-none fw-medium text-primary">
                Register
              </Link>{' '}
              instead!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
