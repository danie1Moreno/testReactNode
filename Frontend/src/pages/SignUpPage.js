import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

export const SignUpPage = () => {
  const [token, setToken] = useToken();

  const [errorMessage, setErrorMessage] = useState("");

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const history = useHistory();

  const onSignUpClicked = async () => {
    const response = await axios.post("http://localhost:5000/app/singup", {
      email: emailValue,
      password: passwordValue,
    });
    const { token } = response.data;
    setToken(token);
    history.push("/login");
  };

  return (
    <>
      <header>Twitch App</header>
      <div className="page-container">
        <div className="content-container">
          <h1>Sign Up</h1>
          {errorMessage && <div className="fail">{errorMessage}</div>}
          <input
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="someone@examplemail.com"
          />
          <input
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            placeholder="password"
          />
          <input
            type="password"
            value={confirmPasswordValue}
            onChange={(e) => setConfirmPasswordValue(e.target.value)}
            placeholder="password"
          />
          <hr />
          <button
            disabled={
              !emailValue ||
              !passwordValue ||
              passwordValue !== confirmPasswordValue
            }
            onClick={onSignUpClicked}
          >
            Sign Up
          </button>
          <button onClick={() => history.push("/login")}>
            Already have an account? Log In
          </button>
          <button onClick={() => history.push("/home")}>Home</button>
        </div>
      </div>
    </>
  );
};
