import React, { useContext, useState,useEffect } from "react";


export  const SettingsContext = React.createContext();

export  function Settings(props) {

  const postperPagefromlocal=JSON.parse(localStorage.getItem("iTemsPerPage"))
const [showComplete, setShowComplete] = useState("false");
const [numOfitems, setnumOfitems] = useState(postperPagefromlocal?postperPagefromlocal:3);
const [currentPage, setpagenum] = useState(1);
let [complete, setcomplete] = useState();
let [showcom, setcomp] = useState(false);
const pagevisited = currentPage * numOfitems;
const lastpage=pagevisited-numOfitems
const Settingsdata = {
  showcom:showcom,
  setcomp:setcomp,
  complete:complete,
  setcomplete:setcomplete,
  lastpage:lastpage,
  pagevisited:pagevisited,
  currentPage:currentPage,
  setpagenum:setpagenum,
  showComplete:showComplete,
  setShowComplete:setShowComplete,
  numOfitems:numOfitems,
  setnumOfitems:setnumOfitems,


};

useEffect(()=>{




},[numOfitems])



  return (
  
      <SettingsContext.Provider value={Settingsdata} >

      {props.children}
      </SettingsContext.Provider >

  );
}

export default SettingsContext;
