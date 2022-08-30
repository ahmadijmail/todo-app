import React from 'react';
import superagent from 'superagent';
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import { When } from 'react-if';
import { LoginContext } from './context';
import "./login.scss"
export default class Login extends React.Component {
    static contextType = LoginContext;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    changeHandler = (e) => {
        // this.setState({
        //     username: e.target.value
        // })
        // this.setState({
        //     password: e.target.value
        // })
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitHandler = (e) => {
        e.preventDefault();
        this.context.loginFunction(this.state.username, this.state.password);
    }
    render() {
        return (
            <>
                <When condition={!this.context.loginStatus}>
                <form class="login" onSubmit={this.submitHandler}>
  <input type="text" placeholder='admin' name='username' onChange={this.changeHandler}/>
  <input type="text" placeholder='admin' name='password' onChange={this.changeHandler}/>
  <button>Login</button>
   </form>

                    
                </When>
                <When condition={this.context.loginStatus}>
                  
                    <button onClick={this.context.logoutFunction} className="delete" >Logout</button>
                </When>
            </>
        )
    }
}


