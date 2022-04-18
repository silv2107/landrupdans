import { Link } from "@reach/router";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import Activity from "../components/Activity";
import "./Activities.scss";

const Activities = () => {
    const [activities, setActivities] = useState();
    const [isLoading, setIsloading] = useState(true);


    useEffect(() => {
        
        axios.get("http://localhost:4000/api/v1/activities")
            .then(response => {
                //use an activity component to build activity page
                setActivities(response.data)
                setIsloading(false);

            })
    }, []);

    return isLoading ? <p>loading...</p> : ( 
        <div>
            <header>
                <h1 className="activityTitle">Aktiviteter</h1>
            </header>
            <main className="mainActivities">
                {activities.map((activity) => {
                    return <Link key={activity.id} to={`/details/${activity.id}`}>
                        <Activity course={activity.name} age={`${activity.minAge}-${activity.maxAge} år`} backgroundImg={activity.asset.url}/>
                    </Link>
                })}
            </main>
            <footer>
                <Nav/>
            </footer>
        </div>
     );
}
 
export default Activities;