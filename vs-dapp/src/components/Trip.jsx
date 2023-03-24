import React, { useEffect, useState, useRef } from 'react';
import "../styles/Trip.css"
import dayjs from 'dayjs';
import TripModal from '../SecondaryComponents/TripModal';
import { useWeb3React } from '@web3-react/core';
import { config } from '../config';

const Trip = (props) => {   //solo se date > now?

    const { account } = useWeb3React()

    const [coloreInfo, setColore] = useState()
    const [tripEdit, setTripEdit] = useState()
    const [toggleEdit, setToggleEdit] = useState(false)

    const objectCountRef = { current: 0 }

    const bookable = useRef(true);
    const alreadyBooked = useRef(false);

    useEffect(() => {
        checkColor()
        disable()
        let lung = (props.PassPerTrip[props.trip.id]).length
        for (let i = 0; i < lung; i++) {
            if ((props.PassPerTrip[props.trip.id])[i] === account) {
                alreadyBooked.current = true
            }
        }
    }, [props.PassPerTrip, props.trips, props.tripBooked, props.idBookable])



    const tripP = (config.options.sedi.filter((el) => el.value === props.trip.start))[0];
    const tripA = (config.options.sedi.filter((el) => el.value === props.trip.arrival))[0];




    function disable() {
        if (props.page === "MyTrips") {
            let found = false
            if (document.getElementById("edit-" + props.trip.id.toNumber())) {
                for (var i = 0; i < props.editable.length; i++) {
                    bookable.current = false;
                    if (props.trip.id.toNumber() === props.editable[i].id.toNumber()) {
                        found = true
                    }
                }
                if (found === false) {
                    document.getElementById("edit-" + props.trip.id.toNumber()).setAttribute("disabled", true);
                }
            }
        }


    }


    function checkColor() {
        let coloreInfo
        if (props.page === "trips") {
            let found = false
            if (document.getElementById("book-" + props.trip.id.toNumber())) {
                for (var i = 0; i < props.idBookable.length; i++) {
                    if (props.trip.id.toNumber() === props.idBookable[i].id.toNumber()) {
                        found = true
                    }
                }
                if (found === false) {
                    coloreInfo = "non-bookable trip-box"
                    bookable.current = false;
                    if (alreadyBooked.current === true) {
                        coloreInfo = "border-booked trip-box"
                    }
                }
            }
        }

        if (props.trip.completed.toNumber() === 1) {
            coloreInfo = "completed trip-box"
        }
        if (props.trip.started.toNumber() === 1) {
            coloreInfo = "started trip-box"
        }

        if (props.trip.cancelled.toNumber() === 1) {
            coloreInfo = "cancelled trip-box"
        } // Poi legato al fatto del disable book mettere colore 
        //red non book e green book?
        setColore(coloreInfo)
    }


    const handleEdit = (tripEdit) => {
        setTripEdit(tripEdit)
        toggleEdit ? setToggleEdit(false) : setToggleEdit(true)
    }


    function freezeBodyScroll() {

        if (objectCountRef.current === 0) {
            document.body.style.top = `-${window.scrollY}px`
            document.body.style.position = 'fixed'
        }
        objectCountRef.current += 1
    }

    function freeBodyScroll() {
        if (objectCountRef.current === 0) {
            const scrollY = document.body.style.top
            document.body.style.position = ''
            document.body.style.top = ''
            window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
    }


    if (props.page === "MyTrips") {
        return (
            <>
                <div className={coloreInfo ? coloreInfo : "trip-box"}>
                    <div className='trip-box1'>
                        <div className="row">
                            <h4>{tripP.subtitle} &rarr; {tripA.subtitle}</h4>
                        </div>
                        <div className="row">
                            <h5>{dayjs.unix(props.trip.date).format('DD/MM/YYYY, HH:mm')}</h5>
                        </div>
                        <div className="row">
                            <p>Posti disponibili: {(props.RemPass[props.trip.id]).toNumber()}/{props.trip.maxPass.toNumber()}</p>

                        </div>

                    </div>
                    <button type="button" id={"edit-" + props.trip.id.toNumber()} className="btn btn-primary btn-block" onClick={() => {
                        handleEdit(props.trip)
                        freezeBodyScroll()
                    }}>Edit</button>
                </div>

                {toggleEdit ?
                    <TripModal {...props} tripEdit={tripEdit} freeBodyScroll={freeBodyScroll} handleEdit={handleEdit} bookable={bookable} alreadyBooked={alreadyBooked} />
                    : ""}
            </>
        )
    }
    else if (props.page === "trips") {
        return (
            <>
                <div className={coloreInfo ? coloreInfo : "trip-box"} id={"book-" + props.trip.id.toNumber()} onClick={!toggleEdit ? () => {
                    handleEdit(props.trip)
                    freezeBodyScroll()
                } : () => { }}>
                    <div className='trip-box1'>
                        <div className="">
                            <i className="fa-solid fa-location-dot"></i>
                            <h4>{tripP.subtitle} &rarr; {tripA.subtitle}</h4>
                        </div>
                        <div className="">
                        <i className="fa-solid fa-calendar-days icon-center"></i>
                            <h5>{dayjs.unix(props.trip.date).format('DD/MM/YYYY, HH:mm')}</h5>
                        </div>
                        <div className="">
                            <p>Posti disponibili: {(props.RemPass[props.trip.id]).toNumber()}/{props.trip.maxPass.toNumber()}</p>
                        </div>
                        {toggleEdit ?
                            <TripModal {...props} tripEdit={tripEdit} freeBodyScroll={freeBodyScroll} handleEdit={handleEdit} bookable={bookable} alreadyBooked={alreadyBooked} />
                            : ""}
                    </div>
                </div>
            </>
        )
    }
}

export default Trip;