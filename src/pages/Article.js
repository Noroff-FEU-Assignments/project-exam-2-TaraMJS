import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL, POSTS_PATH } from "../constants/Api";
import { Row, Col, Image } from "react-bootstrap";
import Spinner from "../components/Spinner";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Error from "../components/Error";

export default function Article() {
  const [article, setArticle] = useState(null);
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
    async function fetchArticle() {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const json = await response.json();
          setArticle(json.acf);
        }
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
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
        <Col sm={12}>
          <Breadcrumbs linkTo="/" linkName="Home" activeLink={article.title} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col sm={12} md={6} className="d-flex flex-column my-auto p-4">
          <h2 className="headline mt-3">{article.title}</h2>
          <hr className="m-0 mb-3" />
          <p className="paragraph">{article.content}</p>
        </Col>
        <Col sm={12} md={6} className="d-flex align-items-center p-4">
          <Image
            className="article-image w-100 h-100 rounded shadow"
            src={article.image}
            alt={article.title}
          />
        </Col>
      </Row>
    </>
  );
}
