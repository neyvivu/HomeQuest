import { useState, useEffect } from "react";
import "../styles/RegisterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm({ userType }) {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3000";
  //Set up useState hooks

  const [data, setData] = useState({
    username: "",
    password: "",
    passwordconfirm: "",
    email: "",
    phoneNo: "",
    ...(userType === "agent" && { agentname: "", agentregnum: "" }),
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    agentregnum: "",
    phoneNo: "",
    password: "",
    passwordconfirm: "",
    ...(userType === "agent" && { license: "" }),
  });
  const [hideconfirm, setHideConfirm] = useState(true);
  const [hide, setHide] = useState(true);
  function handleClickHide(event) {
    event.preventDefault();
    setHide(!hide);
  }
  function handleClickHideConfirm(event) {
    event.preventDefault();
    setHideConfirm(!hideconfirm);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({
      username: "",
      email: "",
      agentregnum: "",
      phoneNo: "",
      password: "",
      passwordconfirm: "",
      ...(userType === "agent" && { license: "" }),
    });
    console.log(data);
    if (
      data.password !== data.passwordconfirm ||
      data.password === "" ||
      data.passwordconfirm === ""
    ) {
      setError({ passwordconfirm: "Password does not match" });
      console.log(error.passwordconfirm);
      setData((prevData) => ({
        ...prevData,
        password: "",
        passwordconfirm: "",
      }));
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/register-${userType}`,
        data
      );
      console.log(response);
      if (response.status == 201) {
        navigate("/login/" + userType);
      }
    } catch (error) {
      console.log(error.response.data.message);
      const e = error.response.data.message;
      if (e.type === "password") {
        console.log(e.content);
        setError({ password: e.content });
      } else if (e.type === "username") {
        console.log(e.content);
        setError({ username: e.content });
      } else if (e.type === "email") {
        console.log(e.content);
        setError({ email: e.content });
      } else if (e.type == "phoneNo") {
        console.log(e.content);
        setError({ phoneNo: e.content });
      } else if (e.type === "license") {
        console.log(e.content);
        setError({ license: e.content });
      }
    }
  };

  return (
    <>
      <div className="formcontainer">
        <form name={userType} onSubmit={handleSubmit}>
          <h1
            className="text-center font-weight-bold"
            style={{ color: "white" }}
          >
            {userType.charAt(0).toUpperCase() + userType.slice(1)} Registration
          </h1>
          <div className="row justify-content-center">
            <label
              htmlFor="inputUserName3"
              className="col-sm-8 col-form-label "
            >
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
                value={data.username}
                onKeyDown={(event) =>
                  (event.key === "Enter" || event.key === " ") &&
                  event.preventDefault()
                }
                required
              />
            </div>
            <span className="error">{error.username}</span>
          </div>
          <br></br>
          <div className="row justify-content-center">
            <label htmlFor="inputEmail" className="col-sm-8 col-form-label ">
              Email Address
            </label>
            <div className="col-sm-8">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email Address"
                onChange={handleChange}
                name="email"
                value={data.email}
                onKeyDown={(event) =>
                  (event.key === "Enter" || event.key === " ") &&
                  event.preventDefault()
                }
                required
              />
            </div>
            <span className="error">{error.email}</span>
          </div>
          {userType === "agent" && (
            <>
              <br></br>
              <div className="row justify-content-center">
                <label
                  htmlFor="inputAgentName"
                  className="col-sm-8 col-form-label "
                >
                  Agent Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="inputAgentName"
                    placeholder="Agent Name"
                    onChange={handleChange}
                    name="agentname"
                    value={data.agentname}
                    onKeyDown={(event) =>
                      event.key === "Enter" && event.preventDefault()
                    }
                    required
                  />
                </div>
              </div>
              <br></br>
              <div className="row justify-content-center">
                <label
                  htmlFor="inputAgentRegNum"
                  className="col-sm-8 col-form-label "
                >
                  Agent Registration Number
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="inputAgentRegNum"
                    placeholder="Agent Registration Number"
                    onChange={handleChange}
                    value={data.agentregnum}
                    name="agentregnum"
                    onKeyDown={(event) =>
                      (event.key === "Enter" || event.key === " ") &&
                      event.preventDefault()
                    }
                    required
                  />
                </div>
                <span className="error">{error.license}</span>
              </div>
            </>
          )}
          <br></br>
          <div className="row justify-content-center">
            <label
              htmlFor="inputPhoneNumber"
              className="col-sm-8 col-form-label "
            >
              Phone Number
            </label>
            <div className="col-sm-8">
              <input
                type="tel"
                className="form-control"
                id="inputPhoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
                name="phoneNo"
                value={data.phoneNo}
                onKeyDown={(event) =>
                  (event.key === "Enter" || event.key === " ") &&
                  event.preventDefault()
                }
                required
              />
            </div>
            <span className="error">{error.phoneNo}</span>
          </div>
          <br></br>
          <div className="row justify-content-center">
            <label
              htmlFor="inputPassword"
              className="col-sm-8 col-sm-7 col-form-label "
            >
              Password
            </label>
            <div className="col-sm-8">
              <div className="input-group">
                <input
                  type={hide ? "password" : "text"}
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  onChange={handleChange}
                  value={data.password}
                  name="password"
                  onKeyDown={(event) =>
                    (event.key === "Enter" || event.key === " ") &&
                    event.preventDefault()
                  }
                  required
                />
                <button
                  className="btn"
                  onClick={handleClickHide}
                  id="monkey-emoji"
                  style={{ backgroundColor: "white" }}
                >
                  {hide ? "🙈" : "🙊"}
                </button>
              </div>
            </div>
            <span className="error">{error.password}</span>
          </div>
          <br></br>
          <div className="row justify-content-center">
            <label
              htmlFor="inputPasswordConfirmation"
              className="col-sm-8 col-sm-7 col-form-label "
            >
              Password Confirmation
            </label>
            <div className="col-sm-8">
              <div className="input-group">
                <input
                  type={hideconfirm ? "password" : "text"}
                  className="form-control"
                  id="inputPasswordConfirmation"
                  placeholder="Password Confirmation"
                  onChange={handleChange}
                  value={data.passwordconfirm}
                  name="passwordconfirm"
                  onKeyDown={(event) =>
                    (event.key === "Enter" || event.key === " ") &&
                    event.preventDefault()
                  }
                  required
                />
                <button
                  className="btn"
                  onClick={handleClickHideConfirm}
                  id="monkey-emoji"
                  style={{ backgroundColor: "white" }}
                >
                  {hideconfirm ? "🙈" : "🙊"}
                </button>
              </div>
            </div>
            <span className="error">{error.passwordconfirm}</span>
          </div>
          <br></br>
          <br></br>
          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary loginSubmit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
