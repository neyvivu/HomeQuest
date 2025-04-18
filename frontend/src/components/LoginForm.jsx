import { useState } from "react";
import "../styles/LoginForm.css";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice"; 

function LoginForm({ userType }) 
{
  const BASE_URL = 'http://localhost:3000'; 
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated()

//Hooks 
// const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const [data, setData] = useState({
    username: "",
    password: "",
    userType
});
// const [errorMessage,setErrorMessage] = useState("");
const navigate = useNavigate();
const dispatch = useDispatch();
const [show, setShow] = useState(false);
const {loading, errorMessage} = useSelector((state)=>state.user);



//Handlers
  function handleClickHide(event) 
  {
    event.preventDefault();
    setHide(!hide);
  }

  function handleChange(event) 
  {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post(`${BASE_URL}/api/auth/login-${data.userType}`, data);
      
      if (response.status == 200)
      {
        dispatch(signInSuccess(response.data.rest))
        if (signIn({
          auth: {
            token: response.data.token,
            type: 'Bearer'
          },
          userState: response.data.message
        })) {
          if (isAuthenticated) {
            navigate("/");
          }
        }
      }
    } catch (error) {
      // Handle login errors 
      console.log(error.response.data);
      dispatch(signInFailure(error.response.data.message));
      setShow(true);
      setData({
        ...data,
        password: ""
      });
    }
  };

  return (

    <>
    <div className="formcontainer" style={{marginTop:"10%"}}>
      <form name={userType} onSubmit={handleSubmit}>
        <div className="row justify-content-center">

          <label htmlFor="inputUserName3" className="col-sm-8 col-form-label ">
            Username
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="inputUserName3"
              placeholder="Username"
              onChange={handleChange}
              name="username"
              onKeyDown= {(event)=> (event.key === "Enter" || event.key ===" ") && event.preventDefault()}
              value={data.username}
              required
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <label htmlFor="inputPassword3" className="col-sm-8 col-form-label">
            Password
          </label>
          <div className="col-sm-8">
          <div className="input-group">
            <input
              type={hide ? "password" : "text"}
              className="form-control"
              id="inputPassword3"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
              name="password"
              onKeyDown= {
                (event)=>
                {
                  if ((event.key) === "Enter")
                  {
                    event.preventDefault();
                    {(data.username != "" && data.password != "") ? (handleSubmit(event)) : alert("Username and Password field cannot be empty!")}
                  }
                  else if (event.key === ' ')
                  {
                    event.preventDefault();
                  }
                }
              }
              required/>
              <button className="btn" onClick={handleClickHide} id="monkey-emoji" style={{backgroundColor: "white", marginBottom:"20px"}}>
              {hide ? "🙈" : "🙊"}
              </button>
              </div>
              <div>
              {show && errorMessage && <span id="errormsg">{errorMessage}</span>} 
              </div>
              <div htmlFor="inputPassword3" className="col-sm-8 col-form-label">
              <a href = {"/forget-pass/"+ userType} style={{color: "white"}}> <h4>Forget Password</h4></a>
              </div>
            </div>

            


        </div>
        <div className="row justify-content-center">
        <button type="submit" className="btn btn-primary loginSubmit"  style={{fontSize: "30px"}}>
          {`Login as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
        </button>
        </div>
      </form>
    </div>
    </>

  );
}


export default LoginForm;
