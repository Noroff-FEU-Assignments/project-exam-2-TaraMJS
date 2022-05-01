export default function Spinner() {
  // spinner loading component that indicates a request in progress
  return (
    <div className="d-flex justify-content-center align-items-center h-50">
      <div className="spinner">
        <span
          className="spinner-border spinner-border-sm p-3"
          role="status"
          aria-hidden="true"
        ></span>
      </div>
    </div>
  );
}
