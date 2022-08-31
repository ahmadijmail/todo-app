import React from "react";
import { useContext } from "react";
import "./list.scss"
import SettingsContext from "../../conText/settings";
const Lists = ({ totalposts }) => {
  const Settingsdata = useContext(SettingsContext);
  
  const pages = [];
  const postperPagefromlocal=JSON.parse(localStorage.getItem("iTemsPerPage"))

  //without Stoarge
 // for (let i = 1; i <= Math.ceil(totalposts / postperPage); i++) { 


 //with Stoarge 
  for (let i = 1; i <= Math.ceil(totalposts / postperPagefromlocal); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return <button key={index} onClick={()=>{
          Settingsdata.setpagenum(page)
        }} className={page ==Settingsdata.currentPage?"active":""}>{page}</button>;
      })}
    </div>
  );
};
export default Lists;
