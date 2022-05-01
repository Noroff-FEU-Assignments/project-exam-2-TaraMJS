import { Breadcrumb } from "react-bootstrap";

export default function Breadcrumbs(props) {
  return (
    <>
    <Breadcrumb className="px-3">
      {props.children}
      <Breadcrumb.Item href={props.linkTo}>{props.linkName}</Breadcrumb.Item>
      <Breadcrumb.Item>{props.activeLink}</Breadcrumb.Item>
    </Breadcrumb>
    <hr className="mt-0 mb-3" />
    </>
  );
}
