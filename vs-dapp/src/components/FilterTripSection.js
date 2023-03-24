import React, { useEffect } from 'react';
import { useState } from 'react';
import FilteredTrips from './FilteredTrips.js';
import SelectBoxStart from '../SecondaryComponents/SelectBoxStart.js';
import SelectBoxArrival from '../SecondaryComponents/SelectBoxArrival';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Switch from '@mui/material/Switch';
import MockUpTrips from '../SecondaryComponents/MockUpTrips.js';
import "../styles/Trip.css"



import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



const FilterTripSection = (props) => {

    const [start, setStart] = useState()
    const [arrival, setArrival] = useState()
    const [timestamp1, setTimestamp1] = useState(null);
    const [timestamp2, setTimestamp2] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [bookable, setBookable] = useState(false);
    const [editable, setEditable] = useState(false);


    const [placeholder, setPlaceholder] = useState(true);
    const [choice, setChoice] = useState('owned');

    const label = { inputProps: { 'aria-label': 'Switch completed' } };
    const label1 = { inputProps: { 'aria-label': 'Switch bookable' } };

    const query = {
        start: start,
        arrival: arrival,
        timestamp1: timestamp1,
        timestamp2: timestamp2,
        completed: completed,
        bookable: bookable,
        editable: editable,
        choice: choice
    }

    useEffect(() => {
        if (props.trips.length === 0) {
            setPlaceholder(true)
        } else {
            setPlaceholder(false)
        }
    }, [props.trips])



    const setTimestamp = (newValue, caso) => {
        const result = dayjs(dayjs(newValue).format('YYYY-MM-DD')).unix()
        if (caso === "1") {
            setTimestamp1(result)
        }
        if (caso === "2") {
            setTimestamp2(result)
        }
    }

    const handleChoise = (event, newChoice) => {
        setChoice(newChoice);
    };

    if(document.getElementById("filters") && props.page === "MyTrips"){
        document.getElementById("filters").classList.add("account")
    }


    return (
        <div className="row mx-0 justify-content-center">
            <div id="filters" className=''>
                <SelectBoxStart className='col-lg-2' start={start} setStart={setStart} />
                <SelectBoxArrival className='col-lg-2' arrival={arrival} setArrival={setArrival} />
                <hr className='filter-div'/>
                <DatePicker className='col-lg-2 px-3 filter-dates' sx={{ width: '100%' }} data={timestamp1} onChange={(newValue) => setTimestamp(newValue, "1")} />
                <DatePicker className='col-lg-2 px-3 filter-dates2' sx={{ width: '100%' }} data={timestamp2} onChange={(newValue) => setTimestamp(newValue, "2")} />
                <hr className='filter-div'/>
                <Switch className='col-lg-1' sx={{ ml:"7px" }} {...label} onChange={() => setCompleted(!completed)} />
                <p className='col-lg-1 filter-text'> Solo completati</p>
                <hr className='filter-div'/>
                {props.page === "trips" ?
                    <><Switch className='col-lg-1' {...label1} sx={{ ml:"7px" }} onChange={() => setBookable(!bookable)} />
                    <p className='col-lg-1 filter-text'> Solo prenotabili</p></>
                    :
                    <>
                        <Switch className='col-lg-1' {...label} sx={{ ml:"3px" }} onChange={() => setEditable(!editable)} />
                        <p className='col-lg-1 filter-text'> Solo modificabili</p>
                        <hr className='filter-div'/>
                        <ToggleButtonGroup className='col-lg-3 px-2'
                            sx={{ ml:"3px" }}
                            value={choice}
                            exclusive
                            onChange={handleChoise}
                            aria-label="query trips"
                        >
                            <ToggleButton value="owned" aria-label="owned">Owned</ToggleButton>
                            <ToggleButton value="booked" aria-label="booked">Booked</ToggleButton>
                            <ToggleButton value="both" aria-label="both">Both</ToggleButton>
                        </ToggleButtonGroup>
                    </>
                }
            </div>  
            {placeholder ? <MockUpTrips /> : <FilteredTrips
                {...props}
                query={query}
            />}
        </div>
    )
}




export default FilterTripSection;