import { useContext, useState } from "react";
import { TokenContext } from "../context/TokenContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { navigate } from "@reach/router";
import Buttons from "../components/Buttons";
import "./Login.scss";
import { useEffect } from "react";

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

const Login = () => {
    const { register, handleSubmit } = useForm()
    const { setToken } = useContext(TokenContext)
    const [message, setMessage] = useState();
    
    useEffect(() => {
        if(getCookie("username")){
            const object = JSON.parse(getCookie("username"))
            setToken(object)
            navigate(`/calender`);
        }

    }, [setToken]);
    

    const onSubmit = (data) => {
        console.log(data.checkbox);
        //første validering
        if(data.username.length < 4 ) {
           return setMessage("username to short.")
        }
        if(data.password.length < 4 ) {
            return setMessage("password to short.")
        }
        
        axios.post("http://localhost:4000/auth/token", data)
            .then(response => {               
                setToken(response.data)

                //if it's checked a cookie is registered
                if(data.checkbox){ 
                    document.cookie =`username=${JSON.stringify(response.data)}`;
                }
                navigate("/") 
            }
        )
        //anden validering
        
        .catch(error => {
            console.log(error.response);
            const err = error.response.statusText
            setMessage(err);
        })}

    return (
        <div className="loginWrapper">
            <div className="shade"><img src="/svg/shade.svg" alt="shade" /></div> 
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="loginTitle">Log ind</h1>
                <input className="username loginInput" type="text" {...register("username")} placeholder="brugernavn"/>
                <input className="password loginInput" type="password" {...register("password")} placeholder="adgangskode"/>
                <button className="wrapperButton" type="submit"><Buttons text="Log ind"/></button>
                <div>
                    <label className="chekckboxLabel" htmlFor="checkbox">Husk mig</label>
                    <input className="checkbox" type="checkbox" id="checkbox" {...register("checkbox")}/>
                </div>
                {message ? <p className="invalidMessage">{message}</p> : null}
            </form>
        </div>
     );
}
 
export default Login;