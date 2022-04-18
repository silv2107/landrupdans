import { Link } from "@reach/router";
import "./Nav.scss";

const Nav = () => {

    return ( 
        <ul className="navigation">
            <li><Link to="/"><img src="/svg/home.svg" alt="home" /></Link></li>
            <li><Link to="/search"><img src="/svg/search.svg" alt="search" /></Link></li>
            <li><Link to="/calender"><img src="/svg/login.svg" alt="calender" /></Link></li> 
        </ul>
     );
}
 
export default Nav;