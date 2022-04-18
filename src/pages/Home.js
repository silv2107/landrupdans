import "./Home.scss";
import { navigate } from "@reach/router";
import Buttons from "../components/Buttons";

const Home = () => {
    return ( 
        <div className="backgroundImg">
            <div className="logoWrapper">
                <img src="/svg/logo.svg" alt="logo" />
            </div>
            <button className="wrapperButton" onClick={()=>{navigate("/activities")}} > <Buttons text="Kom i gang"/></button>
        </div>
     );
}
 
export default Home;