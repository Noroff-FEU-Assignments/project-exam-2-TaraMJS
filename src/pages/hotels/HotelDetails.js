import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BASE_URL, POSTS_PATH } from "../../constants/Api";
import { Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Spinner from "../../components/Spinner";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import Error from "../../components/Error";

//Displays specific hotel with its details
export default function HotelDetails() {

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate("/");
  }

  const url = BASE_URL + POSTS_PATH + "/" + id;

  useEffect(() => {
    async function fetchHotel() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          setHotel(json.acf);
        }
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHotel();
  }, [url]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error message={errorMessage} />;
  }

  return (
    <>
      <Row>
        <Col sm={12} className="px-3">
          <Breadcrumbs
            linkTo="/hotels"
            linkName="Hotels"
            activeLink={hotel.hotelName}
          />
        </Col>
      </Row>
      <Row className="mb-4 px-3">
        <Col sm={12} md={6} className="d-flex align-items-center py-4 my-4">
          <Image
            className="hotel-detail-image w-100 h-100 rounded shadow"
            src={hotel.hotelImage}
            alt="Hotel image"
          />
        </Col>
        <Col
          sm={12}
          md={6}
          className="hotel-detail-container d-flex flex-column my-auto p-4"
        >
          <h2 className="headline mt-4">{hotel.hotelName}</h2>
          <hr className="m-0 mb-3" />
          <p className="paragraph mt-4">{hotel.hotelDescription}</p>
          <p>Price per night: {hotel.hotelPrice}$</p>
          <Link to={`/HotelEnquiry/${id}`} className="mt-auto">
            <PrimaryButton>Book</PrimaryButton>
          </Link>
        </Col>
      </Row>
    </>
  );
}
