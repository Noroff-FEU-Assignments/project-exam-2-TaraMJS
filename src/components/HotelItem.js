import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import PrimaryButton from "./buttons/PrimaryButton";

//Styles and displays all hotels as cards on Hotels.js, links to HotelDetails.js
export default function HotelItem({ id, image, name, price, isEstablishment }) {
  return (
    <>
      <Col sm={6} lg={4} className="my-3 zoom-effect">
        <Link
          to={`/HotelDetails/${id}`}
          className="text-decoration-none"
        >
          <Card
            className={`card m-0 p-0 rounded shadow border-0 ${isEstablishment}`}
          >
            <Card.Img
              variant="top"
              src={image}
              alt="Hotel image"
              className="card-image w-100"
            />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <hr />
              <Card.Text className="paragraph">
                Price per night: {price}$
              </Card.Text>
              <PrimaryButton>View</PrimaryButton>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
}
