import React, { useContext, useState, } from "react";
//import { createContext } from "react/cjs/react.production.min";
import ReactPaginate from 'react-paginate';

export  const SettingsContext = React.createContext();

export  function Settings(props) {

const [showComplete, setShowComplete] = useState("false");
const [numOfitems, setnumOfitems] = useState(3);

const Settingsdata = {
 
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
