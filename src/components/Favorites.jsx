import React, {useState, useEffect} from "react";
import './custom.css';
import { Typography, Menu } from '@mui/material';
import DataTable from 'react-data-table-component';
import { ReactComponent as Star} from '../grey-star.svg';
import { ReactComponent as FavStar} from '../yellow-star.svg';

const Favorites = (props) => {

    console.log('on the fav page')

    const [banks, setBanks] = useState(props.banks);

    console.log('props/////',props)

    useEffect(() => {
        if (props.banks)  {
            setBanks(props.banks)
        }
    }, [props])

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
    
    const options = {
        elevation: 5
    }

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
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
            />
            </div>
        </>
    );
}

export default Favorites;