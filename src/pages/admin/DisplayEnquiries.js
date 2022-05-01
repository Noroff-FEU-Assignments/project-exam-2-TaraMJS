import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL, COMMENTS_PATH } from "../../constants/Api";
import AdminMessagaItem from "../../components/administrative/AdminMessageItem";
import { Col, Row } from "react-bootstrap";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import Error from "../../components/Error";

//Displays a list of enquiries on the enquiry page
export default function DisplayEnquiries() {
  
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //targets the wordpress post "Enquiries" to display the post's comments
  const enquiryPageId = "?post=457";

  // Gets comments from the post named "Enquiries" in wordpress
  useEffect(() => {
    async function getEnquiries() {
      try {
        const response = await axios.get(
          BASE_URL + COMMENTS_PATH + enquiryPageId
        );
        setEnquiries(response.data);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
    getEnquiries();
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
        activeLink="Enquiries"
      />
    <Header text="Enquiries" />
    <p className="note">Click the guest name to see their message</p>
      <Row className="mb-4">
        {enquiries.map((enquiry) => {
          return (
            <Col sm={12} className="my-1" key={enquiry.id}>
              <AdminMessagaItem
                message={enquiry.content.rendered}
                name={enquiry.author_name}
              />
            </Col>
          );
        })}
        
      </Row>
    </div>
  );
}
