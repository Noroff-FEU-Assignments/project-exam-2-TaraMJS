import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from "react";
import { BASE_URL, COMMENTS_PATH, POSTS_PATH } from "../../constants/Api";
import { useParams } from "react-router-dom";
import Form from "../../components/forms/Form";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Label from "../../components/forms/Label";
import Spinner from "../../components/Spinner";
import FormError from "../../components/forms/FormError";
import FormFeedback from "../../components/forms/FormFeedback";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { Row, Col, Breadcrumb } from "react-bootstrap";
import Image from "react-bootstrap/Image";

//requirements for form to validate
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Must be at least 3 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

export default function HotelEnquiry() {

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hotel, setHotel] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //gets the hotel the enquiry is for
  const { id } = useParams();
  const getHotel = BASE_URL + POSTS_PATH + "/" + id;

  useEffect(() => {
    async function fetchHotel() {
      try {
        const response = await fetch(getHotel);

        if (response.ok) {
          const json = await response.json();
          setHotel(json.acf);
        }
      } catch (error) {
        setError(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHotel();
  }, [getHotel]);

  //submits form values as a wordpress comment to a specific post named "Enquiries"
  async function submitEnquiry(data) {

    const url = BASE_URL + COMMENTS_PATH + "/create";

    setLoading(true);
    
    //457 is the id of the post that receives the comment
    apiFetch({
      path: url,
      method: "POST",
      data: {
        author_email: data.email,
        author_name: data.name,
        content: data.message,
        post: 457,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        if(result){
        setLoading(false);
        setSuccessMessage(true); 
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setErrorMessage(error.message);
      });
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <FormFeedback
        type="bg-warning"
        content="Ooops an error occured!"
        message={errorMessage}
        contentColor="text-dark"
        messageColor="text-dark"
        outline="outline-dark"
      />
    );
  }

  if (successMessage) {
    return (
      <FormFeedback
        type="bg-success"
        content="Your enquiry was succesfully sent!"
        message="The hotel will send you a confirmation shortly"
        contentColor="text-white"
        messageColor="text-white"
        outline="outline-light"
      />
    );
  }

  return (
    <>
      <Row>
        <Col>
          <Breadcrumbs
            linkTo={`/HotelDetails/${id}`}
            linkName={hotel ? hotel.hotelName : "back"}
            activeLink="Enquiry"
          >
            <Breadcrumb.Item href="/Hotels">Hotels</Breadcrumb.Item>
          </Breadcrumbs>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col
          sm={6}
          md={6}
          className="d-flex align-items-center flex-column mx-auto my-auto p-4"
        >
          <Image
            className="hotel-detail-image rounded-top w-100 shadow"
            src={hotel.hotelImage}
            alt="Hotel image"
          />
          <div className="w-100">
            <h4 className="headline mt-3">You are currently booking:</h4>
            <hr className="mt-0" />
            <ul className="px-4">
              <li>
                <p className="headline">{hotel.hotelName}</p>
              </li>
              <li>
                <p className="paragraph">For {hotel.hotelPrice}$ per night</p>
              </li>
            </ul>
          </div>
        </Col>
        <Col
          sm={6}
          md={6}
          className="hotel-enquiry-form d-flex flex-column my-auto py-4"
        >
          <Form
            formAction={handleSubmit(submitEnquiry)}
            headerContent={
              hotel
                ? "Make an enquiry for " + hotel.hotelName
                : "Make an enquiry"
            }
          >
            <Label text="Name" />
            <input
              className="p-1 w-100 rounded form-control"
              placeholder="Enter your name..."
              type="text"
              {...register("name")}
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}
            <Label text="Email" />
            <input
              className="p-1 w-100 rounded form-control"
              placeholder="Enter your email..."
              type="email"
              {...register("email")}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
            <Label text="Message" />
            <textarea
              className="p-1 w-100 rounded form-control"
              placeholder="Enter your message..."
              rows="2"
              cols="50"
              {...register("message")}
            />
            {errors.message && <FormError>{errors.message.message}</FormError>}
            <PrimaryButton color="primary-btn-dark">Send</PrimaryButton>
            <p className="text-center note">
              *PLease include the dates you wish to book the hotel in your
              request
            </p>
          </Form>
        </Col>
      </Row>
    </>
  );
}
