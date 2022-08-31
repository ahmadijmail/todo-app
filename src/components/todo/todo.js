import React, { useEffect, useState } from "react";
import { useContext } from "react";
import useForm from "../../hooks/form.js";
import SettingsContext from "../../conText/settings";
import { v4 as uuid } from "uuid";
import { When } from "react-if";
import Lists from "../List/list";
import { LoginContext } from "../auth/context";
import "./todo.scss";

const ToDo = (props) => {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const Settingsdata = useContext(SettingsContext);
  const authcontext = useContext(LoginContext);

  const StorageforComplete = JSON.parse(
    localStorage.getItem("CompletedStatus")
  );

  function setcomps() {
    let complete = list.filter((item) => !item.complete);

    Settingsdata.setcomplete(complete);
    Settingsdata.setcomp(!Settingsdata.showcom);
  }


  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    localStorage.setItem(
      "iTemsPerPage",
      JSON.stringify(Settingsdata.numOfitems)
    );
    localStorage.setItem(
      "CompletedStatus",
      JSON.stringify(Settingsdata.showcom)
    );
    setIncomplete(incompleteCount);

    document.title = `To Do List: ${incomplete}`;
  }, [list, Settingsdata.numOfitems, Settingsdata.showcom]);

  return (
    <>
      <When condition={authcontext.loginStatus}>
      
        <div className="hideandseek">
      <div class="multi-button">
          <div>
           
            <div>
              <select
                onChange={(e) => {
                  const tagetedd = e.target.value;
                  Settingsdata.setnumOfitems(tagetedd);
                }}
                class="button"
                id="copy"
              >
                <option value="3" className="submit">
                  Items Per Page
                </option>

                <option className="submit" value="4">
                  4
                </option>

                <option className="submit" value="5">
                  5
                </option>

                <option className="submit" value="6">
                  6
                </option>

                <option className="submit" value="10">
                  10
                </option>
              </select>
              <When condition={authcontext.loginStatus}>
              <button
                class="button"
                id="cut"
                onClick={authcontext.logoutFunction}
              >
                <span> </span>
                Logout
              </button>
            </When>
            </div>
           
          </div>
         
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="title">Welcome {authcontext.user.username}</div>
            <div className="subtitle">
              To Do List: {incomplete} items pending
            </div>
            <div className="input-container ic1">
              <input
                onChange={handleChange}
                id="firstname"
                name="text"
                className="input"
                type="text"
              />
              <div className="cut"></div>
              <label htmlFor="firstname" className="placeholder">
                To Do Item
              </label>
            </div>

            <div className="input-container ic2">
              <input
                onChange={handleChange}
                name="assignee"
                id="lastname"
                className="input"
                type="text"
              />
              <div className="cut"></div>
              <label htmlFor="lastname" className="placeholder">
                Assigned To
              </label>
            </div>
            <label>
              <span>Difficulty</span>
              <input
                onChange={handleChange}
                defaultValue={defaultValues.difficulty}
                type="range"
                min={1}
                max={5}
                name="difficulty"
              />
            </label>
            <When
              condition={
                authcontext.loginStatus &&
                authcontext.user.capabilities.includes("create")
              }
            >
              <button className="submit" type="submit">
                Add Item
              </button>
            </When>

            <button
              className="submit"
              type="submit"
              onClick={() => setcomps(true)}
            >
              {!Settingsdata.showcom ? "Show Pending Tasks" : "Show All"}
            </button>
          </form> 
        </div> 
       
        </div> 
       <div className= "displist">
       {
        
        (
          Settingsdata.showcom == false ? list : Settingsdata.complete
        ).slice(Settingsdata.lastpage, Settingsdata.pagevisited)
          .map((item) => (
            <div className="lists">
            <div key={item.id}>
              <div className="form2">
                <div key={item.id}>
                  <p>{item.text}</p>
      
                  <p>
                    <small>Assigned to: {item.assignee}</small>
                  </p>
      
                  <p>
                    <small>Difficulty: {item.difficulty}</small>
                  </p>
                  <div>Complete: {item.complete.toString()}</div>
      
                  <hr />
                </div>
      
                <When
                  condition={
                    authcontext.loginStatus &&
                    authcontext.user.capabilities.includes("update")
                  }
                >
                  <button
                    className="Complete"
                    onClick={() => toggleComplete(item.id)}
                  >
                    Complete
                  </button>
                </When>
      
                <When
                  condition={
                    authcontext.loginStatus &&
                    authcontext.user.capabilities.includes("delete")
                  }
                >
                  <button className="delete" onClick={() => deleteItem(item.id)}>
                    Delete
                  </button>
                </When>
              </div>
            </div>
            </div>
          ))
       }</div>
        <Lists totalposts={list.length} />
        
      </When>
    </>
  );
};

export default ToDo;
