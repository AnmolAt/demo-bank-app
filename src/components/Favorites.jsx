import React, { useState, useEffect } from "react";
import './custom.css';
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Favorites = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [banks, setBanks] = useState(props.banks);

  useEffect(() => {
    if (props.banks) {
      setBanks(props.banks)
    }
  }, [props])

  const onRowClicked = (row, event) => {
    dispatch({ type: 'UPDATE_SELECTED_BANK', payload: row })
    navigate(`/bank-details?bank_ifsc=${row.ifsc}`)
  };

  const columns = [
    {
      name: 'Bank Name',
      selector: row => row.bank_name,
      compact: 'yes',
      wrap: 'yes',

    },
    {
      name: 'IFSC Code',
      selector: row => row.ifsc,
      compact: 'yes',
      wrap: 'yes',
      style: {
        paddingLeft: '10px'
      }
    },
    {
      name: 'Branch',
      selector: row => row.branch,
      compact: 'yes',
      wrap: 'yes',
    },
    {
      name: 'Bank ID',
      selector: row => row.bank_id,
      compact: 'yes',
      wrap: 'yes',

    },
    {
      name: 'Address',
      selector: row => row.address,
      compact: 'yes',
      wrap: 'yes',
    }
  ]

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
        cursor: "pointer"
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };

  return (
    <>

      <h3> Favorite Banks </h3>
      <div style={{ height: 800, width: '100%' }}>
        <DataTable
          pagination
          columns={columns}
          data={banks}
          customStyles={customStyles}
          onRowClicked={onRowClicked}
        />
      </div>
    </>
  );
}

export default Favorites;