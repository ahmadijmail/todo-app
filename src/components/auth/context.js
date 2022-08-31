import React, { useState, useEffect } from "react";
import superagent from "superagent";
import base64 from "base-64";
import jwt from "jsonwebtoken";
export const SettingsContext = React.createContext();
export const LoginContext = React.createContext();
const API = `https://auth-api-ahmadijmail.herokuapp.com/signin`;
export default function LoginProvider(props) {
  const [loginStatus, setLoginStatus] = useState(false);

  const [user, setUser] = useState({
    username: JSON.parse(localStorage.getItem("username")) || "",
    capabilities: JSON.parse(localStorage.getItem("capabilities")) || [],
  });
const [error,setError]=useState()
  useEffect(() => {
    const tokenFromCookies = JSON.parse(localStorage.getItem("token"));
    if (tokenFromCookies) {
      setLoginStatus(true);

      setUser(user);
    } else {
      setLoginStatus(false);
      // setUser({});
    }
  }, []);
  const loginFunction = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}`)
        .set(
          "authorization",
          `Basic ${base64.encode(`${username}:${password}`)}`
        );

      validateMyUser(response.body.user);

      setUser(response.body.user);
    } catch (err) {
        setError(err)
        console.log(err);
    }
  };
  const logoutFunction = () => {
    setLoginStatus(false);
    window.location.reload();
    setUser({});
    localStorage.clear("token");
    localStorage.clear("actions");
    localStorage.clear("username");
  };

  const validateMyUser = (user) => {
    if (user.token) {
      const userFromToken = jwt.decode(user.token);

      setLoginStatus(true);
      //setUser(user);
      localStorage.setItem("token", JSON.stringify(user.token));

      localStorage.setItem("username", JSON.stringify(user.username));

      localStorage.setItem("capabilities", JSON.stringify(user.capabilities));
    } else {
      setLoginStatus(false);
      setUser({});
    }
  };

  const state = {
    loginStatus: loginStatus,
    loginFunction: loginFunction,
    logoutFunction: logoutFunction,
    user: user,
    error:error,

  };
  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
