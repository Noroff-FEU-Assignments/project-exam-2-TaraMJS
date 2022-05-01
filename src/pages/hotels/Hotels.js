import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { BASE_URL, ESTABLISHMENT_CATEGORY_PATH } from "../../constants/Api";
import HotelItem from "../../components/HotelItem";
import Spinner from "../../components/Spinner";
import ToTopButton from "../../components/buttons/ToTopButton";
import Error from "../../components/Error";

//Displays hotels on the "see all hotels" page
export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Gets all posts in the "establishments" posts category
  useEffect(() => {
    async function getHotels() {
      try {
        const response = await axios.get(
          BASE_URL + ESTABLISHMENT_CATEGORY_PATH
        );
        setHotels(response.data);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    getHotels();
  }, []);

  //indicates loading while request is in progress
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error message={errorMessage} />;
  }

  //Only displays post's from the "establishments category"
  return (
    <div className="hotels-container mx-auto">
      <Row>
        <Col sm={12}>
          <p className="paragraph mb-2 mt-4">Search hotel</p>
          <input
            type="search"
            id="search"
            placeholder="Search by hotel name..."
            onChange={(event) => setInputValue(event.target.value)}
            className="w-100 mb-4 p-3 rounded form-control shadow-sm"
          />
        </Col>
      </Row>
      <p className="paragraph p-2  w-100 rounded">
        {inputValue
          ? "Showing results for: " + inputValue
          : "showing all results"}
      </p>
      <hr className="mt-0" />
      <Row className="mb-4">
        {hotels
          .filter((hotel) =>
            hotel.acf.hotelName.toLowerCase().startsWith(inputValue)
          )
          .map(function (hotel) {
            return (
              <HotelItem
                key={hotel.id}
                id={hotel.id}
                name={hotel.acf.hotelName}
                price={hotel.acf.hotelPrice}
                image={
                  hotel.acf.hotelImage === "" || null
                    ? "https://www.projectbase.no/wp-content/uploads/woocommerce-placeholder.png"
                    : hotel.acf.hotelImage
                }
              />
            );
          })}
      </Row>
      <div className="text-center">
        <ToTopButton />
      </div>
    </div>
  );
}
