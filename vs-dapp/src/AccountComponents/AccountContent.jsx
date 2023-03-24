import React from 'react';
import { useCallback } from 'react';

import "../styles/Account.css"

import CreateTripSection from './CreateTripSection.jsx';
import MainDashboard from './MainDashboard.jsx';
import MyTrips from './MyTrips.jsx';

const AccountContent = (props) => {

    const renderContent = useCallback(() => {
        switch (props.page) {
            case 'MainDashboard':
                return <MainDashboard />

            case 'MyTrips':
                return <MyTrips {...props}/>

            case 'CreateTrip':
                return <CreateTripSection {...props}/>

            case 'MyAccount':
                return <MainDashboard />

            case 'Altro':
                return <MainDashboard />

            default:
                return <MainDashboard />;
        }
    }, [props.page]);

    return (
        <>
            {renderContent()}
        </>
    );



}

export default AccountContent;