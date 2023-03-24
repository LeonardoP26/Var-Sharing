import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Account from '../pages/Account';
import Trips from '../pages/Trips';
import { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { ethers } from 'ethers';
import "../styles/App.css"

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const { config } = require("../config.js");

const Main = () => {
    const { account, library } = useWeb3React();
    const [numerotrip, setNumeroTrip] = useState(null);
    const [contract, setContract] = useState(null);
    const [toggle, setToggle] = useState();
    const [trips, setTrips] = useState([])
    const [RemPass, setRemPass] = useState([]);
    const [PassPerTrip, setPassPerTrip] = useState([]);
    const [tripBooked, setTripBooked] = useState([]);

    const [openb, setOpenb] = useState(false);
    const [open, setOpen] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openR, setOpenR] = useState(false);
    const [openD, setOpenD] = useState(false);


    const objectCountRef = { current: 0 }

    useEffect(() => {
        loadBlockchainData()
        console.log("load")
    }, [toggle]);


    const alertNewTrip = () => {
        setOpen(true);
    };

    const alertNewBook = () => {
        setOpenb(true);
    };

    const alertEditTrip = () => {
        setOpenE(true);
    };

    const alertRemoveBook = () => {
        setOpenR(true);
    };

    const alertDeleteTrip = () => {
        setOpenD(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setOpenb(false);
        setOpenE(false);
        setOpenR(false);
        setOpenD(false);
    };

    function freeBodyScroll() {
        //objectCountRef.current -= 1
        if (objectCountRef.current === 0) {
            const scrollY = document.body.style.top
            document.body.style.position = ''
            document.body.style.top = ''
            window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
    }



    const loadBlockchainData = async () => {
        const contract = new ethers.Contract(config.contract.address,
            config.contract.abi, library
        )
        setContract(contract)

        try {
            const PassPerTripData = contract.getAllPassPerTrip()
            const tripsData = contract.getTrip()
            const RemPassData = contract.getRemPassPerTrip()           //in BN
            const tripBookedData = contract.getTripPerPass(account)   //in BN

            const [PassPerTrip, trips, RemPass, tripBooked] =
                await Promise.all([PassPerTripData, tripsData, RemPassData, tripBookedData])

            setRemPass(RemPass)
            setTripBooked(tripBooked)
            setPassPerTrip(PassPerTrip)
            setTrips(trips)
        } catch (err) {
            window.location.reload();
        }
        freeBodyScroll()
    }

    return (
        <div className='content'>
            <Routes>
                <Route exact path='/Var-Sharing-dApp/' element={<Trips
                    numerotrip={numerotrip}
                    setNumeroTrip={setNumeroTrip}
                    contract={contract}
                    setContract={setContract}
                    toggle={toggle}
                    setToggle={setToggle}
                    trips={trips}
                    RemPass={RemPass}
                    setRemPass={setRemPass}
                    open={open}
                    setOpen={setOpen}
                    openb={openb}
                    setOpenb={setOpenb}
                    PassPerTrip={PassPerTrip}
                    setPassPerTrip={setPassPerTrip}
                    tripBooked={tripBooked}
                    alertNewBook={alertNewBook}
                    alertEditTrip={alertEditTrip}
                    alertRemoveBook={alertRemoveBook}
                    alertDeleteTrip={alertDeleteTrip}

                />} ></Route>
                <Route exact path='/Var-Sharing-dApp/Account' element={<Account
                    numerotrip={numerotrip}
                    setNumeroTrip={setNumeroTrip}
                    contract={contract}
                    setContract={setContract}
                    toggle={toggle}
                    setToggle={setToggle}
                    trips={trips}
                    RemPass={RemPass}
                    setRemPass={setRemPass}
                    open={open}
                    setOpen={setOpen}
                    openb={openb}
                    setOpenb={setOpenb}
                    PassPerTrip={PassPerTrip}
                    setPassPerTrip={setPassPerTrip}
                    tripBooked={tripBooked}
                    alertNewTrip={alertNewTrip}
                    alertEditTrip={alertEditTrip}
                    alertRemoveBook={alertRemoveBook}
                    alertDeleteTrip={alertDeleteTrip}
                />}></Route>
                <Route
                    path="*"
                    element={<Navigate to="/Var-Sharing-dApp/" />}
                />
            </Routes>
            <Snackbar open={openb} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Trip booked successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Viaggio creato con successo!
                </Alert>
            </Snackbar>
            <Snackbar open={openE} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Viaggio modificato con successo!
                </Alert>
            </Snackbar>
            <Snackbar open={openR} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Prenotazione cancellata con successo!
                </Alert>
            </Snackbar>
            <Snackbar open={openD} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Ti sei cancellato dal tuo viaggio!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Main;