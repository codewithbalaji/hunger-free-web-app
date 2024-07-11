import { useState } from 'react';
import { Button, Container, Form, FormControl, FormGroup, FormLabel, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRegister } from 'hooks/auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate, usernameValidate } from 'utils/form-validate';
import { DASHBOARD, LOGIN } from 'lib/routes';


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
        phoneNumber: data.phoneNumber, 
        redirectTo: DASHBOARD
      });
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', fontFamily: "'Montserrat', sans-serif" ,backgroundColor:"#f37a2f"}}>
      <Row className="justify-content-center">
      <div className="home-container" style={{ textAlign: 'center' ,marginBottom:'10px'}}>
        </div>
        <Col >
          <div className="p-2">
            <p className="mb-2 text-center" style={{ fontSize: "24px", fontWeight:"600", color: "#fff" }}>Register Today !</p>

            {registerError && <Alert variant="danger">{registerError}</Alert>}

            <Form onSubmit={handleSubmit(handleRegister)}>
              <FormGroup className="py-2">
                <FormLabel style={{ fontSize: "16px", color: "#fff",fontWeight:"bold" }}>Username</FormLabel>
                <FormControl
                  placeholder="Enter your username"
                  {...register("username", usernameValidate)}
                  style={{ '::placeholder': { color: '#888' }, width: '100%',padding:"14px" }}
                />
                {errors.username && <Form.Text className="text-danger">{errors.username.message}</Form.Text>}
              </FormGroup>
              <FormGroup className="py-2">
                <FormLabel style={{ fontSize: "16px", color: "#fff",fontWeight:"bold" }}>Email</FormLabel>
                <FormControl
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", emailValidate)}
                  style={{ '::placeholder': { color: '#888' }, width: '100%' ,padding:"14px"}}
                />
                {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
              </FormGroup>
              <FormGroup className="py-2">
                <FormLabel style={{ fontSize: "16px", color: "#fff",fontWeight:"bold" }}>Password</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", passwordValidate)}
                  style={{ '::placeholder': { color: '#888' }, width: '100%' ,padding:"14px"}}
                />
                {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
              </FormGroup>
              <FormGroup className="py-2">
                <FormLabel style={{ fontSize: "16px", color: "#fff",fontWeight:"bold" }}>Phone Number</FormLabel>
                <FormControl
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber", { required: "Phone number is required" })}
                  style={{ '::placeholder': { color: '#888' }, width: '100%' ,padding:"14px"}}
                />
                {errors.phoneNumber && <Form.Text className="text-danger">{errors.phoneNumber.message}</Form.Text>}
              </FormGroup>
              <FormGroup className="py-2">
                <FormLabel style={{ fontSize: "16px", color: "#fff",fontWeight:"bold" }}>Role</FormLabel>
                <FormControl
                  as="select"
                  {...register("role", { required: "Role is required" })}
                  style={{ '::placeholder': { color: '#888' }, width: '100%',padding:"14px" }}
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
                style={{ width: "100%", fontWeight: "bold",backgroundColor:"black",color:"white" }}
              >
                {isLoading ? 'Signing Up' : 'Register'}
              </Button>
            </Form>

            <p className="text-center mt-4" style={{ fontSize: "14px",color: "#232b2b ",fontWeight: "bold" }}> 
              Already have an account?{' '}
              <Link to={LOGIN} className="text-decoration-none " style={{ fontWeight: "bold", color: "white" }}>
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
