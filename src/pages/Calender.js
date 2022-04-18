import { Link, navigate } from "@reach/router";
import { useContext, useEffect,useState } from "react";
import { TokenContext } from "../context/TokenContext";
import axios from "axios";
import UserComponent from "../components/User";
import Nav from "../components/Nav";
import "./Calender.scss";



const Calender = () => {
    const { token } = useContext(TokenContext);
    const [userActivities, setUserActivities] = useState([]);
    const [instructorActivities, setInstructorActivities] = useState([]);



    useEffect(() => {
        
        if(!token.token) {
            navigate("/login");
        }
        
        
        if(token.role === "instructor") {
            axios.get(`http://localhost:4000/api/v1/activities`)
            .then((response) => {   
                let array = response.data.filter((activity)=> {
                    if(activity.instructorId === token.userId){
                        return true
                    }
                    else {
                        return false
                    }
                }) 
                setInstructorActivities(array);

            })
        }
        if(token.role === "default") {
            axios.get(`http://localhost:4000/api/v1/users/${token.userId}`, { headers: {"Authorization" : `Bearer ${token.token}`} })
            .then((response) => {    
                //map over det her array
                console.log(response.data);
                setUserActivities(response.data.activities)
                //if something set setSubscriber in SubscriberContext to true/false
                
            })
        }
        

    }, [token]);

    // userActivities && userActivities.forEach(element => {
    //     if(element.id){
    //         setSubscribing(true)
    //     }
    //     else {
    //         setSubscribing(false)
    //     }
    //     console.log(subscribing);
    // });
   
    //lav to usestates som du mapper over, en for instructor og en for user
    return ( 
        <>
            <header className="calenderWrapper">
                <h1 className="calenderTitle">Calender</h1>
            </header>
            <main className="mainCalender">
                {userActivities.map((activity)=>{
                    return token.role === "default" ? <Link className="linkActivity" key={activity.id} to={`/details/${activity.id}`}><UserComponent key={activity.id} title={activity.name} date={`${activity.weekday} ${activity.time}`}/></Link> : null
                })}
                {instructorActivities.map((activity)=>{
                    return token.role === "instructor" ? <Link className="linkActivity" key={activity.id} to={`/content/${activity.id}`}><UserComponent key={activity.id} title={activity.name} date={`${activity.weekday} ${activity.time}`}/></Link> : null
                })}
            </main>
            <footer>
                <Nav/>
            </footer>
        </>
     );
}
 
export default Calender;