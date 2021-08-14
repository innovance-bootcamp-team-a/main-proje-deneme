import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase, { firestore } from "../firebase/firebase";
import "./LoginPage.css";

const MainPage = () => {
  const [username, setUsername] = useState("");

  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault()
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        // Signed in..
        const { uid } = firebase.auth().currentUser;
        history.push({
          pathname: "/rooms",
          state: { username },
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <div className="main-bg">
        <div className="login-container text-c animated flipInX">
          <div>
            <h1 className="logo-badge text-whitesmoke">
            </h1>
          </div>
          <p className="text-whitesmoke">Sign in</p>
          <div className="container-content">
            <form className="margin-t">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  required=""
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                className="form-button button-l margin-b"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </form>
            <p className="margin-t text-whitesmoke">
              <small> Chat Application &copy; 2021</small>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
