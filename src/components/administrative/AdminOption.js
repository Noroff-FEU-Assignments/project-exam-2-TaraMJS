import { Row, Col } from "react-bootstrap";

//displays admin`s options on Admin.js
export default function AdminOption(props) {
  return (
    <Row className="d-flex justify-content-center">
      <Col
        sm={12}
        md={8}
        lg={6}
        className="admin-option custom-dark-blue d-flex align-items-center h-100 headline m-2 rounded shadow"
      >
        <div className="m-auto w-100">
          {props.content}
        </div>
      </Col>
    </Row>
  );
}
