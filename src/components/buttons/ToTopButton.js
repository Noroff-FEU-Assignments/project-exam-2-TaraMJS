import { Image } from "react-bootstrap";
import arrowUp from "../../images/icons/arrow-up-circle-fill.svg";

//button that scrolls to the top on pages wit a lot of content
export default function ToTopButton(){
    
    function goToTop(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
       });
    }

    return(
        <div className="w-25 mx-auto my-4 btn" onClick={goToTop}><Image src={arrowUp} /></div>
    )
}