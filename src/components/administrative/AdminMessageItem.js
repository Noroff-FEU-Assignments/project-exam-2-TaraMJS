import { Accordion } from "react-bootstrap";

//displays messages and enquiries in DisplayContactMessages.js and DisplayEnquiries.js
export default function AdminMessagaItem({ message, name}) {
  function handleHTML(markup) {
    return { __html: markup };
  }
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Guest name: <span className="m-1">{name}</span>
        </Accordion.Header>
        <Accordion.Body dangerouslySetInnerHTML={handleHTML(message)} />
      </Accordion.Item>
  </Accordion>
  );
}
