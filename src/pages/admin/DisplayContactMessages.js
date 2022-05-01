import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL, COMMENTS_PATH } from "../../constants/Api";
import AdminMessagaItem from "../../components/administrative/AdminMessageItem";
import { Col, Row } from "react-bootstrap";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import Error from "../../components/Error";

//Displays a list of messages on the message page
export default function DisplayContactMessages() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //targets the wordpress post "Messages" to display the post's comments
  const enquiryPageId = "?post=512";

  // Gets comments from the post named "Messages" in wordpress
  useEffect(() => {
    async function getMessages() {
      try {
        const response = await axios.get(
          BASE_URL + COMMENTS_PATH + enquiryPageId
        );
        setMessages(response.data);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);;
      } finally {
        setLoading(false);
      }
    }
    getMessages();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error message={errorMessage} />;
  }

  return (
    <div className="w-75 mx-auto">
      <Breadcrumbs
        linkTo="/Admin"
        linkName="Admin panel"
        activeLink="Messages"
      />
      <Header text="Messages" />
      <p className="note">Click the guest name to see their message</p>
      <Row className="mb-4">
        {messages.map(function (message) {
          return (
            <Col sm={12} className="my-1" key={message.id}>
              <AdminMessagaItem
                message={message.content.rendered}
                name={message.author_name}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
