export default function Error(props){
    return <p className="text-center text-dark bg-warning p-2 ">An error occured: {props.message}</p>;
}