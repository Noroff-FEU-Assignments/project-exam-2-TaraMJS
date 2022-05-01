import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

//dynmic image component used to create an image grid on Home.js
export default function ImageGridItem(props) {
  return (
    <Col sm={props.colBbreakpoint}>
      <Link to={props.linkTo} className="text-decoration-none">
        <div className={`grid-image p-4 d-flex flex-column align-items-end rounded shadow ` + props.effect} style={{backgroundImage: "linear-gradient(rgba(255,255,255,.2), rgba(0,0,0,.6)), url(" + props.image + ")", height: props.imageHeight + "vh"}}>
          <p className={`w-100 text-center text-white mb-4 mt-auto ` + props.fontStyle}>{props.text}</p>
          {props.children}
        </div>
      </Link>
    </Col>
  );
}
