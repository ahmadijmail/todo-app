import React, { useEffect, useState } from "react";
import { useContext } from "react";
import useForm from "../../hooks/form.js";
import SettingsContext from "../../conText/settings";
import { v4 as uuid } from "uuid";
import ReactPaginate from "react-paginate";

import "./todo.scss";

const ToDo = (props) => {

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  const Settingsdata = useContext(SettingsContext);
  // console.log(Settingsdata.showComplete);
  const [pagenum, setpagenum] = useState(0);
  const pagevisited = pagenum * Settingsdata.numOfitems;
  const displaytodo = list
    .slice(pagevisited, pagevisited + Settingsdata.numOfitems)
    .map((item) => (
      <div class="form2">
        <div key={item.id}>
          <p>{item.text}</p>
          <p>
            <small>Assigned to: {item.assignee}</small>
          </p>
          <p>
            <small>Difficulty: {item.difficulty}</small>
          </p>
          <div onClick={() => toggleComplete(item.id)}>
            Complete: {item.complete.toString()}
          </div>
          <hr />
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
    // console.log(item);
    setList([...list, item]);
    //console.log("list data",list);
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
  function showcolpetes(complete) {
    const items = list.filter((item) => {
      if (item.complete == true) return item.complete;
    });
    setList(items);
    //console.log(list);

    //Settingsdata.setShowComplete(true)
  }

  function namoo(params) {
    showComplete;
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);

    document.title = `To Do List: ${incomplete}`;
  }, [list]);
  console.log(list);

  let pageCount=Math.ceil(list.length/Settingsdata.numOfitems)
  const changePage= ({selected})=>{
    setpagenum(selected)
  }
  return (
    <>
      <form class="form" onSubmit={handleSubmit}>
        <div class="title">Welcome</div>
        <div class="subtitle">To Do List: {incomplete} items pending</div>
        <div class="input-container ic1">
          <input
            onChange={handleChange}
            id="firstname"
            name="text"
            class="input"
            type="text"
          />
          <div class="cut"></div>
          <label for="firstname" class="placeholder">
            To Do Item
          </label>
        </div>
        <div class="input-container ic2">
          <input
            onChange={handleChange}
            name="assignee"
            id="lastname"
            class="input"
            type="text"
          />
          <div class="cut"></div>
          <label for="lastname" class="placeholder">
            Assigned To
          </label>
        </div>

        <button class="submit" type="submit">
          Add Item
        </button>
        <button class="submit" onClick={showcolpetes}>
          Show complete
        </button>
      </form>

      {displaytodo}
      <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPagechange={changePage}
      />

   </>
  );
};

export default ToDo;
