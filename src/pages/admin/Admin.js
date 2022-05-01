import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import AdminOption from "../../components/administrative/AdminOption";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Row, Col, Container } from "react-bootstrap";

export default function Admin() {
  const [auth, setAuth] = useContext(AuthContext);
  let navigate = useNavigate();

  function logOut() {
    setAuth(null);
    navigate("/Login");
  }

  return (
    <Container>
      <Row>
        <Col sm={12} md={8} lg={6} className="m-auto">
          <p className="mt-4">Admin Panel</p>
          <hr className="w-100 mt-0"></hr>
        </Col>
      </Row>
      <Link
        to={`/DisplayEnquiries`}
        className="text-decoration-none d-block text-center text-white"
      >
        <AdminOption content="Hotel enquiries" />
      </Link>
      <Link
        to={`/DisplayContactMessages`}
        className="text-decoration-none text-white d-block text-center"
      >
        <AdminOption content="Contact form messages" />
      </Link>
      <Link
        to={`/CreateEstablishment`}
        className="text-decoration-none text-white d-block text-center"
      >
        <AdminOption content="Create a new establishment" />
      </Link>
      <Col sm={12} md={4} className="mx-auto my-4">
        <PrimaryButton buttonAction={logOut}>Log out</PrimaryButton>
      </Col>
    </Container>
  );
}
