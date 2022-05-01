import apiFetch from "@wordpress/api-fetch";
import { BASE_URL, COMMENTS_PATH } from "../constants/Api";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Form from "../components/forms/Form";
import Label from "../components/forms/Label";
import FormError from "../components/forms/FormError";
import FormFeedback from "../components/forms/FormFeedback";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { Container } from "react-bootstrap";

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

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //submits form values to wordpress
  async function submitMessage(data) {

    const url = BASE_URL + COMMENTS_PATH + "/create";

    setLoading(true);
    
    //512 is the id of the post that receives the comment
    apiFetch({
      path: url,
      method: "POST",
      data: {
        author_email: data.email,
        author_name: data.name,
        content: data.message,
        post: 512,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        if (result) {
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
        content="Your message was succesfully sent!"
        message="We will respond to you shortly"
        contentColor="text-white"
        messageColor="text-white"
        outline="outline-light"
      />
    );
  }

  return (
    <>
      <Container className="my-4">
        <Form
          formAction={handleSubmit(submitMessage)}
          headerContent="Contact Holidaze"
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
          <PrimaryButton>Send</PrimaryButton>
        </Form>
      </Container>
    </>
  );
}
