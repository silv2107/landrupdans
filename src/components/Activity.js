import "./Activity.scss";

const Activity = ({backgroundImg, course, age}) => {
    return ( 
        <div className="wrapperActivity" style={{backgroundImage:`url(${backgroundImg})`}}>
            <div className="activityContentWrapper">
                <div className="contentDescription">
                    <h4>{course}</h4>
                    <h4 className="age">{age}</h4>
                </div>
                <div className="activityContent"></div>
            </div>
        </div>
     );
}
 
export default Activity;