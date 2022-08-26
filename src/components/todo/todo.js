import React, { useEffect, useState } from "react";
import { useContext } from "react";
import useForm from "../../hooks/form.js";
import SettingsContext from "../../conText/settings";
import { v4 as uuid } from "uuid";

import Lists from "../List/list";
import "./todo.scss";

const ToDo = (props) => {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const Settingsdata = useContext(SettingsContext);


  function setcomps() {
    let complete = list.filter((item) => item.complete == true);

    Settingsdata.setcomplete(complete);
    Settingsdata.setcomp(!Settingsdata.showcom);
  }
  const displaytodo = (Settingsdata.showcom == false ? list : Settingsdata.complete)
    .slice(Settingsdata.lastpage, Settingsdata.pagevisited)
    .map((item) => (
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
          <button className="Complete" onClick={() => toggleComplete(item.id)}>
            Complete
          </button>
          <button className="delete" onClick={() => deleteItem(item.id)}>
            Delete
          </button>
        </div>
      </div>
    ));

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

    setIncomplete(incompleteCount);

    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="title">Welcome</div>
          <div className="subtitle">To Do List: {incomplete} items pending</div>
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
          <button className="submit" type="submit">
            Add Item
          </button>
        </form>
        <button className="submit" type="submit" onClick={() => setcomps(true)}>
          {!Settingsdata.complete ? "Show Completed" : "Show All"}
        </button>
      </div>
      {displaytodo}

      <Lists totalposts={list.length} postperPage={Settingsdata.numOfitems} />
    </>
  );
};

export default ToDo;
