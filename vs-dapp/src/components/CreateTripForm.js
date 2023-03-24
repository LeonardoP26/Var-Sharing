import React, { useEffect, useState } from 'react';
import { config } from '../config';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useWeb3React } from '@web3-react/core';
import "../styles/Account.css"

const CreateTripForm = (props) => {

    const { library } = useWeb3React();

    const [date, setDate] = useState();
    const [start, setStart] = useState();
    const [arrival, setArrival] = useState();
    const [maxPass, setMaxPass] = useState();
    const [aperto, setAperto] = useState(false);
    //const [confirmed, setConfirmed] = useState(false);

    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');


    const defaultProps = {
        options: config.options.sedi,
        getOptionLabel: (option) => option.subtitle,
    }

    useEffect(() => {
        if (aperto === false) {
            setInterval(() => {
                if (aperto === false) {
                    validateForm()
                }
            }, 1000);
        }
        if (document.getElementById("create")) {
            document.getElementById("create").addEventListener("click", () => {

                var killId = setTimeout(function () {
                    for (var i = killId; i > 0; i--) clearInterval(i)
                }, 1000);
                setAperto(true)
            }
            )
        }
    }, [aperto])




    useEffect(() => {
        validateForm()
    }, [start, arrival, date, maxPass])


    const create = async () => {


        const signer = props.contract.connect(library.getSigner())
        try {

            document.getElementById("create-def").innerHTML = "<span id='loading' className='stage'></span>"
            document.getElementById("loading").classList.add("dot-flashing")
            let transaction = await signer.createTrip((start).value, (arrival).value, date, maxPass)
            await transaction.wait()
            props.setToggle(!props.toggle)
            props.alertNewTrip()
    
    
            document.getElementById("loading").classList.remove("dot-flashing")
            document.getElementById("loading").classList.add("booked")
            document.getElementById("create-def").innerHTML = "<p>Created!</p>"
            document.getElementById("close-create").click()
        } catch (err) {
            document.getElementById("loading").classList.remove("dot-flashing")
            document.getElementById("create-def").innerHTML = "<p>Create</p>"

            if(err.reason === "user rejected transaction"){
                window.alert("Hai negato la transazione!")
            } else if(err.reason === "invalid BigNumber value"){
                window.alert("Data non valida!")
            } else {
                let l = err.reason.length    
                window.alert(err.reason.substring(20, l));
                console.log(err.reason)
            }
        }
        
        

     
    }



    const validateForm = async () => {
        console.log(date)
        if (document.forms["CreateTrip"] && document.forms["CreateTrip"] && document.forms["CreateTrip"]) {
            let start = document.forms["CreateTrip"]["start"].value;
            let arrival = document.forms["CreateTrip"]["arrival"].value;
            let maxPass = document.forms["CreateTrip"]["maxPass"].value;


            if (start && arrival && maxPass && (start !== arrival)) {
                const IDs = (config.options.sedi.filter((el) => el.subtitle === start))[0];
                const IDa = (config.options.sedi.filter((el) => el.subtitle === arrival))[0];
                setStart(IDs)
                setArrival(IDa)
                setMaxPass(maxPass)
                document.getElementById("create").removeAttribute("disabled");
            } else {
                document.getElementById("create").setAttribute("disabled", "");
            }
        }
    }




    return (
        <>
            <form name="CreateTrip" className="">
                <div className='create-grid center'>


                    <div className="mb-4">
                        <label className="form-label" htmlFor="start">Start</label>
                        <Autocomplete
                            {...defaultProps}
                            autoSelect
                            id="start"
                            renderInput={(params) => (
                                <TextField {...params} variant="standard" />
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label" htmlFor="arrival">Arrival</label>
                        <Autocomplete
                            {...defaultProps}
                            autoSelect
                            id="arrival"
                            renderInput={(params) => (
                                <TextField {...params} variant="standard" />
                            )}
                        />

                    </div>

                    <div className="mb-4">
                        <label className="form-label" htmlFor="date">Date</label>
                        <DateTimePicker
                            minDate={tomorrow}
                            id="date"
                            onChange={(newValue) => { newValue !== undefined && setDate(newValue.unix()) }}
                            views={['day', 'hours', 'minutes' ]}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label" htmlFor="maxPass">Max passengers</label>
                        <Autocomplete
                            id="maxPass"
                            options={["1", "2", "3", "4"]}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                        />
                    </div>
                </div>
                <button type="button" data-mdb-toggle="modal" data-mdb-target="#createModal"
                    className="btn btn-primary btn-block mb-4" disabled id="create" >
                    Create
                </button>
            </form>


            <div className="modal fade" id="createModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close " data-mdb-dismiss="modal" aria-label="Close" onClick={() => {
                                setAperto(false)
                            }} />
                        </div>
                        <div>
                            <div className="modal-body">
                                <h4>Are you sure you want to create this trip?</h4>
                                <p>Departure: {start ? (start).subtitle : ""}</p>
                                <p>Arrival: {arrival ? (arrival).subtitle : ""}</p>
                                <p>Date: {dayjs.unix(date).format('DD/MM/YYYY, HH:mm')}</p>
                                <p>Maximum number of passengers: {maxPass}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="close-create" className="btn btn-secondary" data-mdb-dismiss="modal" onClick={() =>
                                    setAperto(false)
                                }>Close</button>
                                <button type="button" id="create-def" className="btn btn-primary" onClick={() => create()}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )


}

export default CreateTripForm;