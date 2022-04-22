import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import logo_groww from "../logo-groww.svg";
import "./Home.css";
import AllBanks from "./AllBanks";
import Favorites from "./Favorites";
import { Typography, Menu, Button, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ReactComponent as Search } from '../search.svg';
import { ReactComponent as Close } from '../cancel-icon.svg';

const Home = () => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [favoriteBanks, setFavoriteBanks] = useState([]);
  const [filteredFavoriteBanks, setFilteredFavoriteBanks] = useState([]);
  const [activeMenu, setActiveMenu] = useState("All Banks")
  const [selectedCity, setSelectedCity] = useState("MUMBAI")
  const [loading, setLoading] = useState(false);
  const [anchorEl, setanchorEl] = useState(null);
  const [searchTextValue, setSearchTextValue] = useState("");

  useEffect(() => {
    if (selectedCity) {
      setLoading(true)
      fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${selectedCity}`, {
        method: "GET"
      }).then(
        res => res.json()
      ).then(
        response => {
          console.log("response", response)
          setLoading(false)
          setBanks(response)
          setFilteredBanks(response)
        }
      )
    }
    console.log('favoriteBanks....', favoriteBanks)
  }, [selectedCity])

  useEffect(() => {
    if (searchTextValue) {
      const arr = banks.filter(bank => {
        return bank.bank_name.toLowerCase().includes(searchTextValue.toLowerCase())
      })
      setFilteredBanks(arr);

      const arr2 = favoriteBanks.filter(bank => {
        return bank.bank_name.toLowerCase().includes(searchTextValue.toLowerCase())
      })
      setFilteredFavoriteBanks(arr2);
    } else {
      setFilteredBanks(banks)
      setFilteredFavoriteBanks(favoriteBanks)
    }
  }, [searchTextValue])

  const handleClick = event => {
    setanchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setanchorEl(null)
  };

  const handleMenuItemClick = (value, idx) => {
    setSelectedCity(value);
  }

  const cityOptions = [
    {
      key: 'MUMBAI',
      text: 'Mumbai',
      value: 'MUMBAI'
    },
    {
      key: "DELHI",
      text: 'Delhi',
      value: 'DELHI'
    },
    {
      key: 'BENGALURU',
      text: 'Bengaluru',
      value: 'BENGALURU'
    },
    {
      key: 'CHENNAI',
      text: 'Chennai',
      value: 'CHENNAI'
    },
    {
      key: 'KOLKATA',
      text: 'Kolkata',
      value: 'KOLKATA'
    }
  ]

  const onSearchTextChange = (searchTextValue) => {
    setSearchTextValue(searchTextValue);
  };

  const clearSearchFilter = () => {
    setSearchTextValue("");
  };

  return (
    <div>
      <img src={logo_groww} className="company-logo" />
      <div className="main-content">
        <div className="sidebar-content">
          <div className={`${activeMenu == "All Banks" ? "active_menu" : "menu"}`} onClick={() => setActiveMenu("All Banks")}>
            All Banks
          </div>
          <div className={`${activeMenu == "Favorites" ? "active_menu" : "menu"}`} onClick={() => setActiveMenu("Favorites")}>
            Favorites
          </div>
        </div>
        <div className="list-content">
          <div className="selectors">
            <div className="select-country">
              <Button onClick={(e) => handleClick(e)}>{selectedCity} <ArrowDropDownIcon /></Button>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                value={selectedCity}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                {cityOptions.map((option, index) => (
                  <MenuItem
                    key={option.key}
                    selected={selectedCity == option.value}
                    onClick={() => handleMenuItemClick(option.value, index)}
                  >
                    {option.text}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div className="search-box">
              <span className="search">
                <Search />
              </span>
              <input
                type="text"
                placeholder="Search"
                onChange={(ev) => onSearchTextChange(ev.target.value)}
                value={searchTextValue}
              />
              {searchTextValue && (
                <span className="search">
                  <span
                    className="cancel-search"
                    onClick={() => {
                      clearSearchFilter();
                    }}>
                    <Close className="cancel__icon" />
                  </span>
                </span>
              )}
            </div>
          </div>
          {
            activeMenu == "All Banks" ?
              <AllBanks banks={filteredBanks} favoriteBanks={favoriteBanks} setFavoriteBanks={(banks) => setFavoriteBanks(banks)} />
              :
              <Favorites banks={filteredFavoriteBanks} />
          }
        </div>
      </div>

    </div>
  )
}

export default Home;