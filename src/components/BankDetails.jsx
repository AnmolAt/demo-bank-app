import React from "react";
import { useSelector } from "react-redux";
import './custom.css';
import { useNavigate } from "react-router-dom";

const BankDetails = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state)
  return (
    <>
      <span className="all-link" onClick={() => navigate('/all-banks')}>
        {` <- All Banks`}
      </span>
      <div className="bank-details">
        <h1 className="bank-name">{state.bank_name}, {state.city}</h1>
        <div className="bank-content">
          <h3>Address: {state.address} </h3>
          <h3>Bank ID: {state.bank_id}</h3>
          <h3>Branch Name: {state.bank_id}</h3>
          <h3>Location : </h3>
          <h4>City - {state.city} </h4>
          <h4> District -  {state.district} </h4>
          <h4> State - {state.state} </h4>
        </div>
      </div>
    </>
  )
}

export default BankDetails;