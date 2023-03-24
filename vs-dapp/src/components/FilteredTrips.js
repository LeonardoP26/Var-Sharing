import React from 'react';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import DisplayTrip from './DisplayTrip';
import AccountDisplayTrip from '../AccountComponents/AccountDisplayTrips';
import dayjs from 'dayjs';


const FilteredTrips = (props) => {
    const { account } = useWeb3React();


    const [filteredTrips, setFilteredTrips] = useState([]);
    const [idBookable, setIdBookable] = useState([]);
    const [editable, setEditable] = useState(false);


    useEffect(() => {
        const resultLoc = checkLocations()
        const resultTS = checkTimestamps(resultLoc)
        const resultCompl = onlyCompleted(resultTS)
        const resultBook = onlyBookable(resultCompl)
        onlyOwned(resultBook)
    }, [props.query, props.trips, props.RemPass])

    //tripBooked, PassPerTrip

    const checkLocations = () => {
        if (props.query.start && props.query.arrival) {
            const result1 = props.trips.filter((el) => el.arrival === props.query.arrival);
            const result = result1.filter((el) => el.start === props.query.start);
            return result
        } else if (props.query.start) {
            const result = props.trips.filter((el) => el.start === props.query.start);
            return result
        } else if (props.query.arrival) {
            const result = props.trips.filter((el) => el.arrival === props.query.arrival);
            return result
        } else {
            return props.trips
        }
    }

    const checkTimestamps = (resultLoc) => {
        if (props.query.timestamp1 && props.query.timestamp2) {
            const result1 = resultLoc.filter((el) => el.date >= props.query.timestamp1);
            const result = result1.filter((el) => el.date <= props.query.timestamp2);
            return result
        } else if (props.query.timestamp1) {
            const result = resultLoc.filter((el) => el.date >= props.query.timestamp1);
            return result
        } else if (props.query.timestamp2) {
            const result = resultLoc.filter((el) => el.date <= props.query.timestamp2);
            return result
        } else {
            return resultLoc
        }
    }

    const onlyCompleted = (resultTS) => {
        if (!props.query.completed) {
            return resultTS
        } else if (props.query.completed) {
            const result = resultTS.filter((el) => el.completed.toNumber() === 1);
            return result
        }
    }

    const onlyBookable = (resultCompl) => {
        var now = dayjs()
        const result = resultCompl.filter((el) => el.completed.toNumber() === 0);
        const result1 = result.filter((el) => el.started.toNumber() === 0);
        const result2 = result1.filter((el) => el.cancelled.toNumber() === 0);
        const resulta = result2.filter((el) => el.availability.toNumber() === 1);
        const result3 = resulta.filter((el) => el.date > now.add(12, 'hour').unix() );
        const result4 = result3.filter((el) => el.owner !== account);


        for (var k = 0; k < props.tripBooked.length; k++) {
            for (var j = 0; j < result4.length; j++) {
                if (props.tripBooked[k].toNumber() === result4[j].id.toNumber()) {
                    let tmp = result4[result4.length - 1]
                    result4[result4.length - 1] = result4[j]
                    result4[j] = tmp
                    result4.pop()
                }
            }
        }
        setIdBookable(result4)
        props.setNumeroTrip(result4.length)




        if (!props.query.bookable) {
            return resultCompl

        } else if (props.query.bookable) {
            return result4
        }


    }


    const onlyOwned = (resultBook) => {

        if (props.page === "trips") {
            setFilteredTrips(resultBook)
            return resultBook
        } else {

            const resultOwned = resultBook.filter((el) => el.owner === account);

            let onlybooked = [...resultBook];

            let onlyBooked = []
            for (var k = 0; k < props.tripBooked.length; k++) {
                for (var j = 0; j < onlybooked.length; j++) {
                    if (props.tripBooked[k].toNumber() === onlybooked[j].id.toNumber()) {
                        onlyBooked.push(onlybooked[j])
                    }
                }
            }

            const resultBoth = onlyBooked.concat(resultOwned);

            setEditable(edit(resultBoth))

            if (props.query.choice === "owned") {
                if (props.query.editable) {
                    const resultEditable = edit(resultOwned)
                    setFilteredTrips(resultEditable)
                    return resultEditable
                } else {
                    setFilteredTrips(resultOwned)
                    return resultOwned
                }
            }
            if (props.query.choice === "booked") {
                if (props.query.editable) {
                    const resultEditable = edit(onlyBooked)
                    setFilteredTrips(resultEditable)
                    return resultEditable
                } else {
                    setFilteredTrips(onlyBooked)
                    return onlyBooked
                }
            }
            if (props.query.choice === "both") {
                if (props.query.editable) {
                    const resultEditable = edit(resultBoth)
                    setFilteredTrips(resultEditable)
                    return resultEditable
                } else {
                    setFilteredTrips(resultBoth)
                    return resultBoth
                }
            }
        }

        function edit(c) {
            var now = dayjs()
            const result = c.filter((el) => el.completed.toNumber() === 0);
            const result1 = result.filter((el) => el.started.toNumber() === 0);
            const result2 = result1.filter((el) => el.date > now.add(12, 'hour').unix());
            const resultEditable = result2.filter((el) => el.cancelled.toNumber() === 0);
            return resultEditable
        }


    }



    if (props.page === "trips") {
        return (
            <>
                <DisplayTrip
                    {...props}
                    trips={filteredTrips}
                    idBookable={idBookable}
                    editable={editable}
                />
            </>
        )
    } else if (props.page === "MyTrips") {
        return (
            <>
                <AccountDisplayTrip
                    {...props}
                    trips={filteredTrips}
                    editable={editable} />
            </>
        )
    }



}

export default FilteredTrips;