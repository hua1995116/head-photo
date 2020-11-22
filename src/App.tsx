import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Space } from "antd";
import Github from "./compoments/common/Github";
import Logo from "./compoments/common/Logo";
import axios from "axios";
import moment from "moment";
import Bottom from './compoments/common/Bottom';
import Home from './webview/Home'

function App() {
  
  return (
    <div className="App">
      <Home />
      <Bottom />
    </div>
  );
}

export default App;
