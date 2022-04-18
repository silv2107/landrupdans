import axios from "axios";
import { useEffect,useState } from "react";
import Nav from "../components/Nav";
import"./Content.scss";


const Content = ({id}) => {
    const [subscribers, setSubscribers] = useState([]);
    const [content, setContent] = useState([]);

    useEffect(() => {
        axios(`http://localhost:4000/api/v1/activities/${id}`)
        .then(response => {
            setContent(response.data)
            setSubscribers(response.data.users)
        })

    }, [id]);
    return ( 
        <div className="wrapperContent">
            <header className="contentContainer">
                <h1>{content.name}</h1>
                {subscribers.map((subscriber)=>{
                    return <p key={subscriber.id}>{subscriber.firstname} {subscriber.lastname}</p>
                })}
            </header> 
            <footer>
                <Nav/>
            </footer> 
        </div>  
     );
}
 
export default Content;