import React, { useContext, useState, } from "react";
//import { createContext } from "react/cjs/react.production.min";


export  const SettingsContext = React.createContext();

export  function Settings(props) {

const [showComplete, setShowComplete] = useState("false");
const [numOfitems, setnumOfitems] = useState(3);
const [currentPage, setpagenum] = useState(1);
const pagevisited = currentPage * numOfitems;
const lastpage=pagevisited-numOfitems
const Settingsdata = {
  lastpage:lastpage,
  pagevisited:pagevisited,
  currentPage:currentPage,
  setpagenum:setpagenum,
  showComplete:showComplete,
  setShowComplete:setShowComplete,
  numOfitems:numOfitems,
  setnumOfitems:setnumOfitems,


};
  return (
  
      <SettingsContext.Provider value={Settingsdata} >

      {props.children}
      </SettingsContext.Provider >

  );
}

export default SettingsContext;
