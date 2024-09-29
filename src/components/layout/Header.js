import { useAuth } from 'hooks/auth';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    const { user, isLoading: authLoading } = useAuth();
    if (authLoading) return "Loading...";
  return (
    <Navbar className="position-fixed d-flex justify-content-between align-items-center bg-primary text-white p-2 w-100  z-1 " >
      <Container>
        <Navbar.Brand className="text-white" href="#home ">Hunger Free</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className='text-white'>
            Hello👋 {user.username}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;