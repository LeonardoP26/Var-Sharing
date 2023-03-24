import React from 'react';

import "../styles/AccountNavBar.css"

const AccountNavBar = ({page, setPage}) => {

    const setActive = (current) => {
        document.getElementById(page).classList.remove("active")
        setPage(current)
        document.getElementById(current).classList.add("active")
    }


    return (
        <nav id="sidebarMenu" className="d-lg-block sidebar bg-white">
            <div className="position-sticky">
                <div className="list-group list-group-flush mx-3 mt-4 mb-4">
                    <button onClick={() => setActive("MainDashboard")} id="MainDashboard" className="list-group-item list-group-item-action py-2 ripple active" aria-current="true">
                        <i className="fas fa-tachometer-alt fa-fw me-3" /><span>Main dashboard</span></button>

                    <button onClick={() => setActive("MyTrips")} id="MyTrips" className="list-group-item list-group-item-action py-2 ripple">
                        <i className="fas fa-car fa-solid me-3" /><span>My Trips</span></button>

                    <button onClick={() => setActive("CreateTrip")} id="CreateTrip" className="list-group-item list-group-item-action py-2 ripple">
                        <i className="fas fa-regular fa-calendar-plus me-3" /><span>Create Trip</span></button>

                    <button onClick={() => setActive("MyAccount")} id="MyAccount" className="list-group-item list-group-item-action py-2 ripple">
                        <i className="fas fa-user fa-solid me-3" /><span>My Account</span></button>

                    <button onClick={() => setActive("Altro")} id="Altro" className="list-group-item list-group-item-action py-2 ripple">
                        <i className="fas fa-chart-pie fa-fw me-3" /><span>...</span></button>
                </div>
            </div>
        </nav>
    );
}

export default AccountNavBar;