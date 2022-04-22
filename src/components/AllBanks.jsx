import React, {useState, useEffect} from "react";
import './custom.css';
import DataTable from 'react-data-table-component';
import { ReactComponent as Star} from '../grey-star.svg';
import { ReactComponent as FavStar} from '../yellow-star.svg';

const AllBanks = (props) => {

    const [banks, setBanks] = useState(props.banks);

    useEffect(() => {
        if (props.banks)  {
            setBanks(props.banks)
        }
    }, [props])

    const columns = [
        {
            name: '',
            selector: row => (
                props.favoriteBanks.includes(row) ?
                 <FavStar title="Remove from Favourites" onClick={() => unFavorite(row)} className="fav-icon"/>
                :
                 <Star title="Mark as Favourite" onClick={() => handleFavorite(row)} className="fav-icon"/>
            ),
            width: '50px',
            style: {
                paddingRight: '10px'
            }

        },
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

    const handleFavorite = (row) => {
        let fbArr = [...props.favoriteBanks];
        fbArr.push(row);
        props.setFavoriteBanks(fbArr);
    }

    const unFavorite = (row) => {
        let fbArr = [...props.favoriteBanks];
        fbArr.splice( fbArr.indexOf(row), 1);
        props.setFavoriteBanks(fbArr);
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

            <h3> All Banks </h3>
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

export default AllBanks;