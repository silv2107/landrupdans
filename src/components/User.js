import "./User.scss";

const UserComponent = ({ title, date }) => {
    
    return ( 
        <div className="calenderActivity">
            <h2>{title}</h2>
            <p>{date}</p>
        </div>
     );
}
 
export default UserComponent;