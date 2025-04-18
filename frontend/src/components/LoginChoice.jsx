import "../styles/Choice.css";
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';


function LoginChoice()
{
    function handleClick(event)
    {
        window.location.href= "/login/" + event.target.name;
    }

    
    return (
      <>
    
      <img
      className="groupLogo img-fluid"
      src={Logo}
      alt="HomeQuest Logo"
      style={{maxHeight:"80%", maxWidth:"80%"}}
      />


      <div className="d-grid gap-5" style={{marginTop:"12%"}}>
    <button onClick={handleClick} name="customer" className="btn btn-primary" type="button" style={{fontSize:"25px"}}>Login as Customer</button>
    <button onClick={handleClick} name="agent" className="btn btn-primary" type="button" style={{fontSize:"25px"}}>Login as Agent</button>
    <button onClick={handleClick} name="investor" className="btn btn-primary" type="button" style={{fontSize:"25px"}}>Login as Investor</button>
    <a className="Choice" onClick={()=>{console.log("Register")}} href="/register" style={{color:"black", fontSize:"25px", fontWeight:'bold'}}> Register Here</a>
      </div>

      </>
    )
}
export default LoginChoice;