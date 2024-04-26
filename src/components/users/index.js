import { Container, Row, Col } from "react-bootstrap";
import { useUsers } from "hooks/users";
import User from "./User";

export default function Users() {
  const { users, isLoading } = useUsers();

  if (isLoading) return "Loading...";

  return (
    <Container fluid>
      <Row xs={2} md={3} lg={4} xl={4} xxl={4} className="g-2 g-md-3 px-2 py-6">
        {users?.map((user) => (
          <Col key={user.id}>
            <User user={user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
