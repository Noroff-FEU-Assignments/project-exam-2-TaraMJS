import {Container } from "react-bootstrap";

export default function Form(props) {
  return (
    <Container>
          <form
            onSubmit={props.formAction}
            className="form mx-auto shadow rounded"
          >
            <h2 className="custom-matte-blue headline text-white w-100 rounded-top text-center p-3">
              {props.headerContent}
            </h2>
            <div className="p-3">{props.children}</div>
          </form>
    </Container>
  );
}
