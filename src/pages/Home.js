import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import PrimaryButton from "../components/buttons/PrimaryButton";
import ToTopButton from "../components/buttons/ToTopButton";
import ImageGridItem from "../components/ImageGridItem";
import dock from "../images/banners/dock.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL, ARTICLES_CATEGORY_PATH } from "../constants/Api";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Gets all posts from the "articles" posts category
  useEffect(() => {
    async function getArticles() {
      try {
        const response = await axios.get(BASE_URL + ARTICLES_CATEGORY_PATH);
        setArticles(response.data);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    getArticles();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error message={errorMessage} />;
  }

  return (
    <>
      <Row className="mt-3">
        <ImageGridItem
          colBbreakpoint={12}
          linkTo="/Hotels"
          image={dock}
          imageHeight="70"
          text="Book your next hotel in Bergen with Holidaze"
          fontStyle="banner-text"
        >
          <hr className="w-100 text-white mt-0 mb-4" />
        </ImageGridItem>
        <Link to="/Hotels" className="d-block">
          <PrimaryButton color="p-4">Find hotel</PrimaryButton>
        </Link>
      </Row>
      <Row className="px-2">
        <h2 className="headline mt-4 mb-2">Things to do in Bergen</h2>
        <hr />
      </Row>
      <Row>
        <ImageGridItem
          colBbreakpoint={8}
          linkTo={"/Article/" + articles[4].id}
          image={articles[4].acf.image}
          imageHeight="50"
          text={articles[4].acf.title}
          fontStyle="headline"
          effect="zoom-effect"
        ></ImageGridItem>
        <ImageGridItem
          colBbreakpoint={4}
          linkTo={"/Article/" + articles[3].id}
          image={articles[3].acf.image}
          imageHeight="50"
          text={articles[3].acf.title}
          fontStyle="headline"
          effect="zoom-effect"
        />
      </Row>
      <Row className="my-3">
        <ImageGridItem
          colBbreakpoint={12}
          linkTo={"/Article/" + articles[2].id}
          image={articles[2].acf.image}
          imageHeight="50"
          text={articles[2].acf.title}
          fontStyle="headline"
          effect="zoom-effect"
        />
      </Row>
      <Row>
        <ImageGridItem
          colBbreakpoint={4}
          linkTo={"/Article/" + articles[1].id}
          image={articles[1].acf.image}
          imageHeight="50"
          text={articles[1].acf.title}
          fontStyle="headline"
          effect="zoom-effect"
        />
        <ImageGridItem
          colBbreakpoint={8}
          linkTo={"/Article/" + articles[0].id}
          image={articles[0].acf.image}
          imageHeight="50"
          text={articles[0].acf.title}
          fontStyle="headline"
          effect="zoom-effect"
        />
      </Row>
      <ToTopButton />
    </>
  );
}
