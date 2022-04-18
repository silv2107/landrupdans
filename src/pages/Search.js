import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "@reach/router";
import Activity from "../components/Activity";
import Nav from "../components/Nav";
import "./Search.scss";

//search by name and weekday using a filtered list and includes
const Search = () => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState([]);
    const [showSelected, setShowSelected] = useState([]);
    const [err, setErr] = useState(false);
    
    function filteredList(event){
        event.preventDefault();

        if(event.target.search.value.length > 0)
       { const valueInput = event.target.search.value.toLowerCase();

        
        let array = content.filter((activity)=>{
            const wordName = activity.name.toLowerCase();
            const wordWeekday = activity.weekday.toLowerCase();

            if(wordName.includes(valueInput) || wordWeekday.includes(valueInput) ) {
                return true
            }
            else{
                return false
            }   
        })
        
        // returns nothing found
        if(array.length === 0){
            console.log(err);
            setErr(true)
            // console.log("Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet.");
        }
        // returns selected activities
        else {
            console.log(array);
            setErr(false)
        }
        setShowSelected(array)
        
    }

       

    }

    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/activities")
            .then(response => {
                setContent(response.data)
                setLoading(false)
            })
    }, []);
    return loading ? <p>DATA IS LOADING...</p> : ( 
        <div className="wrapperSearch">
            <h1 className="searchTitle">Søg</h1>
            <form className="searchForm" onSubmit={filteredList}>
                <input className="searchInput" type="search"  name="search"/>
                <button className="buttonInput" type="submit"><img src="/svg/searchIcon.svg" alt="" /></button>
            </form>
            <div className="mainActivities">
                {showSelected.map((activity)=>{
                     return <Link key={activity.id} to={`/details/${activity.id}`}>
                     <Activity key={activity.id} course={activity.name} age={`${activity.minAge}-${activity.maxAge} år`} backgroundImg={activity.asset.url}/>
                 </Link>
                })}
                {err && <p style={{color:"white"}}>Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet.</p>}
            </div>
            <footer>
                <Nav/>
            </footer>
        </div>
     );
}
 
export default Search;