import apiFetch from "@wordpress/api-fetch";
import { useState } from "react";
import { BASE_URL, POSTS_PATH } from "../../constants/Api";
import Form from "../../components/forms/Form";
import Label from "../../components/forms/Label";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Header from "../../components/Header";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import Spinner from "../../components/Spinner";
import FormError from "../../components/forms/FormError";
import FormFeedback from "../../components/forms/FormFeedback";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetTokenFromStorage } from "../../functions/GetFromStorage";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter hotel name")
    .min(2, "Must be at least 2 characters"),
  description: yup
    .string()
    .required("Please enter hotel description")
    .min(50, "The description must contain at least 50 characters"),
  price: yup
    .number()
    .required("Please enter a price")
    .typeError("Please enter a price")
    .positive("No negative values"),
  url: yup
    .string()
    .required("Please enter a image url")
    .url("Must be valid url format"),
});

export default function CreateEstablishment() {
  
  const url = BASE_URL + POSTS_PATH;

  //gets token from storage
  const token = GetTokenFromStorage();

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

  //21 is the id of the category named "establishments"
  async function addEstablishment(data) {
    setLoading(true);
    apiFetch({
      path: url,
      method: "POST",
      data: {
        title: data.name,
        status: "publish",
        categories: [21],
        acf: {
          hotelName: data.name,
          hotelPrice: data.price,
          hotelDescription: data.description,
          hotelImage: data.url,
        },
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        content="Your establishment was successfully created!"
        contentColor="text-white"
        messageColor="text-white"
        outline="outline-light"
      />
    );
  }

  return (
    <div className="mt-2 mb-4 w-75 mx-auto">
      <Breadcrumbs
        linkTo="/Admin"
        linkName="Admin panel"
        activeLink="Create establishment"
      />
      <Header text="Create Establishment" />
        <Form
          formAction={handleSubmit(addEstablishment)}
          headerContent="Create new establishment form"
          color="grey-header"
        >
          <Label text="Name" />
          <input
            className="p-1 w-100 rounded form-control"
            placeholder="Enter hotel name..."
            type="text"
            {...register("name")}
          />
          {errors.name && <FormError>{errors.name.message}</FormError>}
          <Label text="Price" />
          <input
            className="p-1 w-100 rounded form-control"
            placeholder="Enter price per night..."
            type="number"
            {...register("price")}
          />
          {errors.price && <FormError>{errors.price.message}</FormError>}
          <Label text="Image url" />
          <input
            className="p-1 w-100 rounded form-control"
            placeholder="Enter hotel image url..."
            type="url"
            {...register("url")}
          />
          {errors.url && <FormError>{errors.url.message}</FormError>}
          <Label text="Description" />
          <textarea
            className="p-1 w-100 rounded form-control"
            placeholder="Enter description..."
            rows="2"
            cols="50"
            {...register("description")}
          />
          {errors.description && (
            <FormError>{errors.description.message}</FormError>
          )}
          <PrimaryButton>Create</PrimaryButton>
        </Form>
    </div>
  );
}
