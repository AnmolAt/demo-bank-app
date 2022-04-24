import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import BankDetails from "./components/BankDetails"
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/all-banks" exact element={<Home />} />
          <Route path="bank-details" element={<BankDetails />} />
          <Route exact path="/" element={<Navigate replace to="/all-banks" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
