//primary red button
export default function PrimaryButton(props) {
  return (
    <button
      onClick={props.buttonAction}
      className="primary-btn border-0 custom-red rounded shadow text-white w-100 my-3"
    >
      {props.children}
    </button>
  );
}
