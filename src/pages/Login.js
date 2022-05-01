import apiFetch from "@wordpress/api-fetch";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BASE_URL, TOKEN_PATH } from "../constants/Api";
import Form from "../components/forms/Form";
import Label from "../components/forms/Label";
import PrimaryButton from "../components/buttons/PrimaryButton";
import FormError from "../components/forms/FormError";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Spinner from "../components/Spinner";
import { Container } from "react-bootstrap";

const schema = yup.object().shape({
  username: yup.string().required("Please enter a username"),
  password: yup.string().required("Please enter a password"),
});

export default function Login() {
  function handleHTML(markup) {
    return { __html: markup };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  const url = BASE_URL + TOKEN_PATH;

  //logs in user if password and username is correct
  async function loginUser(data) {
    setLoading(true);
    apiFetch({
      path: url,
      method: "POST",
      data: {
        username: data.username,
        password: data.password,
      },
    })
      .then((response) => {
        setAuth(response);
        navigate("/Admin");
        setLoading(false);
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
  
  return (
    <>
      <Container className="my-4">
        <Form
          formAction={handleSubmit(loginUser)}
          headerContent="Log in to admin panel"
        >
          {error ? (
            <p
              dangerouslySetInnerHTML={handleHTML(errorMessage)}
              className="bg-warning p-2 rounded"
            />
          ) : (
            ""
          )}
          <Label text="Username" />
          <input
            className="p-1 w-100 rounded form-control"
            placeholder="Enter your username..."
            type="text"
            {...register("username")}
          />
          {errors.username && <FormError>{errors.username.message}</FormError>}
          <Label text="Password" />
          <input
            className="p-1 w-100 rounded form-control"
            placeholder="Enter your password..."
            type="password"
            {...register("password")}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
          <PrimaryButton>Login</PrimaryButton>
        </Form>
      </Container>
    </>
  );
}
