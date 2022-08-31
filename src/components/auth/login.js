import React from "react";
import { When } from "react-if";
import { LoginContext } from "./context";
import "./login.scss";
export default class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.context.loginFunction(this.state.username, this.state.password);
  };
  render() {
    return (
      <>
        <When condition={!this.context.loginStatus}>
          <form className="login" onSubmit={this.submitHandler}>
            <input
              type="text"
              placeholder="user name"
              name="username"
              onChange={this.changeHandler}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={this.changeHandler}
            />
            <button>Login</button>
            {this.context.error?<label>UserName or password is not correct</label>:null}  
          </form>
        </When>
       
      </>
    );
  }
}