import React from "react";
import { useContext } from "react";
import "./list.scss"
import SettingsContext from "../../conText/settings";
const Lists = ({ totalposts, postperPage }) => {
  const Settingsdata = useContext(SettingsContext);
  
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalposts / postperPage); i++) {
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
