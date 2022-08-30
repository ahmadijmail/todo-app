import React, { useState, useEffect } from "react";
import superagent from 'superagent';
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

export const LoginContext = React.createContext();
const API = `https://auth-api-ahmadijmail.herokuapp.com/signin`
export default function LoginProvider(props) {

    const [loginStatus, setLoginStatus] = useState(false);
    const [usernameFromcookie, setuser2]=useState()
    const [user, setUser] = useState({
        username: cookie.load('username') || "",
        capabilities: cookie.load('capabilities') || []
    });


    useEffect(() => {
        const tokenFromCookies = cookie.load('token');
        if (tokenFromCookies) {
            setLoginStatus(true);
            setUser(user);
           
        } else {
            setLoginStatus(false);
            setUser({})
        }

        const username= cookie.load('username')
        setuser2(username)
    }, []);
    const loginFunction = async (username, password) => {
        try {
            const response = await superagent.post(`${API}`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
            console.log('body >>> ', response.body);
            validateMyUser(response.body);
        } catch (err) {

        }
    }
    const logoutFunction = () => {
        setLoginStatus(false);
        setUser({});
        cookie.remove('token');
        cookie.remove('actions');
        cookie.remove('username');
    }
    const validateMyUser = (user) => {
        if (user.token) {
            const userFromToken = jwt.decode(user.token);
            console.log('username >>>> ', userFromToken);
            setLoginStatus(true);
            setUser(user);
            console.log(user);
            cookie.save('token', user.user.token);
           
            cookie.save('username', user.user.username);
           
         
            cookie.save('capabilities', user.user.capabilities)
        } else {
            setLoginStatus(false);
            setUser({});
        }
    }
    //read
    const can = (action) => {
   
        return user?.capabilities?.includes(action);
    }
    const state = {
        loginStatus: loginStatus,
        loginFunction: loginFunction,
        logoutFunction: logoutFunction,
        user: user,
        usernameFromcookie:usernameFromcookie,
       
        canDo: can
   
    }
    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}