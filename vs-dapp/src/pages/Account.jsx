import React from 'react';
import { useState, useEffect } from 'react';
import "../styles/Account.css"
import AccountNavBar from '../AccountComponents/AccountNavBar.jsx';
import AccountContent from '../AccountComponents/AccountContent.jsx';



const Account = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
    const [page, setPage] = useState("MainDashboard")

    return (
        <>
            <AccountNavBar page={page} setPage={setPage} />
            <div className='acc-content'>
                <div className='content-box'>
                    <AccountContent {...props} page={page}/>
                </div>
            </div>
        </>
    );
}

export default Account;