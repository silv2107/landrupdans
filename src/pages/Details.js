import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Buttons from "../components/Buttons";
import { TokenContext } from "../context/TokenContext";
import Nav from "../components/Nav";
import "./Details.scss";

const Details = ({id}) => {
    const [activity, setActivity] = useState();
    const [isLoading, setIsloading] = useState(true);
    console.log(id);
    
    // const [addActivity, setAddActivity] = useState();
    // const [instructorId, setInstructorId] = useState();

    const { token } = useContext(TokenContext);
    const [ subscribing, setSubscribing ] = useState(true)
    const [userAge, setUserAge] = useState();


    //setting user age to validate subscription
    fetch(`http://localhost:4000/api/v1/users/${token.userId}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Bearer ${token.token}`
                }
            })
    .then(response => response.json())
    .then( data => {
        console.log(data);
        console.log(data.age)
        setUserAge(data.age);
        
    })
    .catch(err => console.error(err));

    console.log(token);

    function postActivity() {

        //AXIOS VIRKER IKKE - VIDES IKKE HVORFOR
        // token && axios.post(`http://localhost:4000/api/v1/users/5/activities/1`, 
        // { headers: {"Authorization" : `Bearer ${token.token}`} })
        //     .then(response => {
        //         console.log(response);
        //     })

        
            
        
        //setting the unsubscribe functionality on
        if(subscribing){
            fetch(`http://localhost:4000/api/v1/users/${token.userId}/activities/${id}`, {
                "method": "POST",
                "headers": {
                    "Authorization": `Bearer ${token.token}`
                }
            })
            .then(response => {
                console.log(response)
                setSubscribing(false)
            
            })
            .catch(err => console.error(err));
        }

        //setting the subscribe functionality on
        else {
            fetch(`http://localhost:4000/api/v1/users/${token.userId}/activities/${id}`, {
                "method": "DELETE",
                "headers": {
                    "Authorization": `Bearer ${token.token}`
                }
            })
            .then(response => {
                console.log(response)
                setSubscribing(true)

                
            })
            .catch(err => console.error(err));
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:4000/api/v1/activities/${id}`)
            .then(response => {
                //use an activity component to build activity page
                setActivity(response.data);
                console.log(response.data);
                setIsloading(false)
                for(let index = 0; index < response.data.users.length; index++) {
                    if(response.data.users[index].id === token.userId) {
                        setSubscribing(false)
                    }
                    else{
                        setSubscribing(true)
                    }
                }

            })
    }, [id, token.userId]);


    return isLoading ? <p>DATA IS LOADING...</p> : ( 
        <>
            <div className="detailPhoto">
                <img src={activity.asset.url} alt={activity.name} />
                {token.userId > 4 && activity.minAge <= userAge && activity.maxAge >= userAge ? <button className="wrapperButton" onClick={postActivity}><Buttons text={subscribing ? "Tilmeld" : "Forlad"}/></button> : null}
            </div>
            <div className="detailsInfo">
                <h3>{activity.name}</h3>
                <p>{activity.weekday}</p>
                <p>{activity.time}</p>
                <p>{activity.description}</p>
                <p>{activity.minAge}-{activity.maxAge} år</p>
            </div>
            <footer>
                <Nav/>
            </footer>
            
        </>
     );
}
 
export default Details;