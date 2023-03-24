import React from 'react';
import "../styles/Trip.css"
import "../styles/Modal.css"
import dayjs from 'dayjs';
import { config } from '../config';
import { useWeb3React } from '@web3-react/core';



const TripModal = (props) => {

    const { account, library } = useWeb3React()

    const tripS = (config.options.sedi.filter((el) => el.value === props.tripEdit.start))[0];
    const tripA = (config.options.sedi.filter((el) => el.value === props.tripEdit.arrival))[0];


    const handleEdit = () => {
        if (props.tripEdit.owner === account) {
            document.getElementById("edittrip-" + props.tripEdit.id.toNumber()).classList.add("invisible")
            handleEditMaxPass()
        } else {
            handleRemoveBooking()
        }
    }

    const handleDelete = async () => {
        const signer = props.contract.connect(library.getSigner())

        try {
            document.getElementById("deletetrip-" + props.tripEdit.id.toNumber()).innerHTML = "<span id='loading' className='stage'></span>"
            document.getElementById("loading").classList.add("dot-flashing")

            let transaction = await signer.deleteTrip(props.tripEdit.id.toNumber())
            await transaction.wait()

            props.setToggle(!props.toggle)
            props.alertDeleteTrip()

            document.getElementById("loading").classList.remove("dot-flashing")
            document.getElementById("deletetrip-" + props.tripEdit.id.toNumber()).style = "display: none"
        } catch (err) {
            document.getElementById("loading").classList.remove("dot-flashing")
            document.getElementById("deletetrip-" + props.tripEdit.id.toNumber()).innerHTML = "<p>Delete</p>"

            if(err.reason === "user rejected transaction"){
                window.alert("Hai negato la transazione!")
            } else{
                let l = err.reason.length    
                window.alert(err.reason.substring(20, l));
                console.log(err.reason)
            }
        }

    }

    const handleRemoveBooking = async () => {
        const signer = props.contract.connect(library.getSigner())

        try {
            document.getElementById("edittrip-" + props.tripEdit.id.toNumber()).innerHTML = "<span id='loading' className='stage'></span>"
            document.getElementById("loading").classList.add("dot-flashing")
            let transaction = await signer.deleteBook(props.tripEdit.id.toNumber(), account)
            await transaction.wait()

            props.setToggle(!props.toggle)
            props.alertRemoveBook()

            document.getElementById("loading").classList.remove("dot-flashing")
            document.getElementById("loading").classList.add("booked")
            document.getElementById("edittrip-" + props.tripEdit.id.toNumber()).style = "display: none"
        } catch (err) {
            document.getElementById("loading").classList.remove("dot-flashing")
            document.getElementById("edittrip-" + props.tripEdit.id.toNumber()).innerHTML = "<p>Remove booking</p>"

            if(err.reason === "user rejected transaction"){
                window.alert("Hai negato la transazione!")
            } else{
                let l = err.reason.length    
                window.alert(err.reason.substring(20, l));
                console.log(err.reason)
            }
        }
    }


    const handleEditMaxPass = () => {
        document.getElementById("maxPass").style = "display: none"
        document.getElementById("maxPassValue").style = "display: block"
        console.log(document.getElementById("maxPassValue").value)
    }

    const checkMaxPass = () => {
        if (document.getElementById("maxPassValue").value < (props.PassPerTrip[props.tripEdit.id]).length || document.getElementById("maxPassValue").value > 4) {
            document.getElementById("maxPassError").innerText = `Inserisci un valore tra ${(props.PassPerTrip[props.tripEdit.id]).length} e 4`
        } else {
            document.getElementById("maxPassError").innerText = ""
            document.getElementById("editMaxPass").classList.remove("invisible")
            document.getElementById("editMaxPass").innerHTML = "Confirm MaxPass"
            document.getElementById("editMaxPass").onclick = () => confirmEditMaxPass()
        }
    }

    const confirmEditMaxPass = async () => {

        const signer = props.contract.connect(library.getSigner())
        try {
            let transaction = await signer.editMaxPassTrip(props.tripEdit.id.toNumber(), document.getElementById("maxPassValue").value)
            document.getElementById("editMaxPass").innerHTML = "<span id='loading' className='stage'></span>"
            document.getElementById("loading").classList.add("dot-flashing")
            await transaction.wait()
            props.setToggle(!props.toggle)
            props.alertEditTrip()

            document.getElementById("maxPass").style = "display: block"
            document.getElementById("maxPass").innerText = document.getElementById("maxPassValue").value
            document.getElementById("maxPassValue").style = "display: none"
            document.getElementById("editMaxPass").classList.add("invisible")
            document.getElementById("edittrip-" + props.tripEdit.id.toNumber()).classList.remove("invisible")

            document.getElementById("loading").classList.remove("dot-flashing")
        } catch (err) {
            if(err.reason === "user rejected transaction"){
                window.alert("Hai negato la transazione!")
            } else{
                let l = err.reason.length    
                window.alert(err.reason.substring(20, l));
                console.log(err.reason)
            }
        }
    }


    const BookTrip = async (id) => {
        const signer = props.contract.connect(library.getSigner())
        try {
            document.getElementById("booktrip-" + props.tripEdit.id.toNumber()).innerHTML = "<span id='loading' className='stage'></span>"
            document.getElementById("loading").classList.add("dot-flashing")

            let transaction = await signer.bookTrip(id)
            await transaction.wait()
            props.setToggle(!props.toggle)
            props.alertNewBook()

            document.getElementById("loading").classList.remove("dot-flashing")
            document.getElementById("loading").classList.add("booked")
            document.getElementById("booktrip-" + props.tripEdit.id.toNumber()).style = "display: none"
        } catch (err) {
            document.getElementById("loading").classList.remove("dot-flashing")
            document.getElementById("booktrip-" + props.tripEdit.id.toNumber()).innerHTML = "<p>Book</p>"
            if(err.reason === "user rejected transaction"){
                window.alert("Hai negato la transazione!")
            } else{
                let l = err.reason.length    
                window.alert(err.reason.substring(20, l));
                console.log(err.reason)
            }
        }


    }

    return (
        <>
            <div className="trip-container">
                <div className="trip">
                    <div className='trip-header'>
                        <h1>{props.page === "MyTrips" ? "Edit" : "Viaggio"}</h1>
                        <div href='' onClick={() => {
                            props.handleEdit()
                            props.freeBodyScroll()
                        }} className='trip-close'>
                            Close
                        </div>
                    </div>
                    <div className='trip-content'>
                        <ul aria-label='places'>
                            <i className="fa-solid fa-location-dot icon-center"></i>
                            <li aria-label='Partenza icon-center'>
                                <a target="_blank" rel="noopener noreferrer" href={tripS.map ? tripS.map : ""}>
                                    {/* <span className="material-symbols-outlined trip-line">
                                        line_end_circle
                                    </span> */}
                                    <div className='trip-places'>
                                        <span className='trip-start-main'>{tripS.title ? tripS.title : ""}</span>
                                        <span className='trip-start-sub'>{tripS.subtitle ? tripS.subtitle : ""}</span>
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="trip-arrow"
                                            width="24" height="24" aria-hidden="true">
                                            <polyline fill="none" stroke="#708C91" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="9 18 15 12 9 6">
                                            </polyline>
                                        </svg>

                                    </div>
                                </a>
                            </li>
                            <i className="fa-solid fa-angles-down fa-2xl trip-arrow-2"></i>
                            <li aria-label='Arrivo'>
                                <a target="_blank" rel="noopener noreferrer" href={tripA.map ? tripA.map : ""}>
                                    {/* <span className="material-symbols-outlined trip-line-2">
                                        line_end_circle
                                    </span> */}
                                    <div className='trip-places'>
                                        <span className='trip-start-main'>{tripA.title ? tripA.title : ""}</span>
                                        <span className='trip-start-sub'>{tripA.subtitle ? tripA.subtitle : ""}</span>
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="trip-arrow"
                                            width="24" height="24" aria-hidden="true">
                                            <polyline fill="none" stroke="#708C91" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="9 18 15 12 9 6">
                                            </polyline>
                                        </svg>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <hr />
                        <div aria-label='date'>
                            <i className="fa-solid fa-calendar-days icon-center"></i>
                            <span className='pass-title icon-center trip-date'>{dayjs.unix(props.tripEdit.date).format('DD/MM/YYYY, HH:mm')}</span>
                            <span className='pass-title icon-center trip-date trip-owner'>Owner: {props.tripEdit.owner.slice(0,10) + '...' + props.tripEdit.owner.slice(32, 42)}</span>
                        </div>
                        <hr />
                        <div aria-label='passengers'>
                            <span className="material-symbols-outlined icon-center">airline_seat_recline_normal</span>
                         
                            <span className='icon-center pass-title'>
                                <div>
                                    <span className=''> Passeggeri: {(props.PassPerTrip[props.tripEdit.id]).length}/</span>
                                    <span className='' id="maxPass">{props.tripEdit.maxPass.toNumber()}</span>
                                    <input className='edit-pass' id="maxPassValue" style={{ display: "none" }} onChange={() => checkMaxPass()} type="number" min="1" max="4"></input>
                                    <i className='edit-pass' id="maxPassError" ></i>
                                </div>
                                <button type="button" id="editMaxPass" className="btn btn-primary invisible spaced"></button>
                            </span>
                            <span className="trip-pass">
                            {(props.PassPerTrip[props.tripEdit.id])[0] ? <p>
                                1: {(props.PassPerTrip[props.tripEdit.id])[0].slice(0, 10) + '...' + (props.PassPerTrip[props.tripEdit.id])[0].slice(32, 42)}</p> : ""}
                            {(props.PassPerTrip[props.tripEdit.id])[1] ? <p>
                                2: {(props.PassPerTrip[props.tripEdit.id])[1].slice(0, 10) + '...' + (props.PassPerTrip[props.tripEdit.id])[1].slice(32, 42)}</p> : ""}
                            {(props.PassPerTrip[props.tripEdit.id])[2] ? <p>
                                3: {(props.PassPerTrip[props.tripEdit.id])[2].slice(0, 10) + '...' + (props.PassPerTrip[props.tripEdit.id])[2].slice(32, 42)}</p> : ""}
                            {(props.PassPerTrip[props.tripEdit.id])[3] ? <p>
                                4: {(props.PassPerTrip[props.tripEdit.id])[3].slice(0, 10) + '...' + (props.PassPerTrip[props.tripEdit.id])[3].slice(32, 42)}</p> : ""}
                            </span>
                            </div>

                        {props.tripEdit.cancelled.toNumber() === 0 ? <div aria-label='button'>
                            {props.bookable.current === true && props.page === "trips" ?

                                <button type="button" id={"booktrip-" + props.tripEdit.id.toNumber()} className="btn btn-primary btn-block icon-center"
                                    onClick={() => BookTrip(props.tripEdit.id.toNumber())}>
                                    <p>Book</p>
                                </button>
                                :
                                ""
                            }

                            {props.bookable.current === false && (props.tripEdit.owner === account || props.alreadyBooked.current === true) ?
                                <button type="button" id={"edittrip-" + props.tripEdit.id.toNumber()} className="btn btn-primary btn-block icon-center"
                                    onClick={() => handleEdit()}
                                >
                                    {props.tripEdit.owner === account ? "Edit" : ""}
                                    {props.alreadyBooked.current === true ? "Remove Booking" : ""}
                                </button>
                                :
                                ""
                            }

                            {props.tripEdit.owner === account ?
                                <button type="button" id={"deletetrip-" + props.tripEdit.id.toNumber()} className="btn btn-primary btn-block icon-center deleteButton"
                                    onClick={() => handleDelete()}
                                >
                                    Delete
                                </button>
                                : ""
                            }

                        </div> : ""
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )

}

export default TripModal;