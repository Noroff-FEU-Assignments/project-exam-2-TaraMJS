import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function FormFeedback(props) {
  return (
    <div className={`text-center mx-auto my-4 p-4 d-flex flex-column justify-content-center align-items-center rounded shadow ` + props.type}>
      <h3 className={`feedback-headers ` + props.contentColor}>{props.content}</h3>
      <p className={props.messageColor}>{props.message}</p>
     <Link to="/Hotels" className="redirect-btn d-block"><Button variant={props.outline}>See hotels</Button></Link> 
    </div>
  );
}
