import React from 'react';
import "../styles/Trip.css"
import FilterTripSection from '../components/FilterTripSection.js';


const MyTrips = (props) => {
    return (
        <FilterTripSection {...props} />
    )
}

export default MyTrips;