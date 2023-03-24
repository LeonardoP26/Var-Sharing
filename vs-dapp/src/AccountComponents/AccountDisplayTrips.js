import React from 'react';
import "../styles/Trip.css"
import Trip from '../components/Trip';


const AccountDisplayTrip = (props) => {
    return (
        <div>
            {
                props.trips.map((trip, index) => (
                    <div key={trip.id.toNumber()} id={trip.id.toNumber()}>
                        <Trip {...props} trip={trip} />
                    </div>
                ))
            }
        </div>
    )
}

export default AccountDisplayTrip;