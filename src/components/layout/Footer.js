import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import facebookIcon from "../../images/icons/facebook.svg";
import instagramIcon from "../../images/icons/instagram.svg";
import twitterIcon from "../../images/icons/twitter.svg";

export default function Footer() {
  return (
    <div className="custom-dark-blue d-flex flex-column justify-content-center align-items-center">
      <Row className="custom-matte-blue w-100 d-flex justify-content-around p-3">
        <Col xs={12} sm={4} className="text-center">
          <Link to="/" className="paragraph text-decoration-none text-white m-1">
            Home
          </Link>
        </Col>
        <Col xs={12} sm={4} className="text-center">
          <Link
            to="/Hotels"
            className="paragraph text-decoration-none text-white m-1"
          >
            See all hotels
          </Link>
        </Col>
        <Col xs={12} sm={4} className="text-center">
          <Link
            to="/Contact"
            className="paragraph text-decoration-none text-white m-1"
          >
            Contact
          </Link>
        </Col>
      </Row>
      <Row className="w-75 d-flex justify-content-center p-3">
        <Col xs={12} sm={3} className="text-center">
          <span className="paragraph text-white">Follow us!</span>
        </Col>
        <Col xs={4} sm={3} className="text-center">
          <img
            src={facebookIcon}
            alt="Facebook icon"
          />
        </Col>
        <Col xs={4} sm={3} className="text-center">
          <img
            src={instagramIcon}
            alt="Instagram icon"
          />
        </Col>
        <Col xs={4} sm={3} className="text-center">
          <img src={twitterIcon} alt="Twitter icon"/>
        </Col>
      </Row>
    </div>
  );
}
