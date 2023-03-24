import React from 'react';
import { useEffect } from 'react';
import FilterTripSection from '../components/FilterTripSection';

const Trips = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <header className="bg-image mh-100 text-center text-white d-flex header-pagina">
                <div className="container my-auto">
                    <div className="row">
                        <div className="col">
                            <div className="col-lg-10 mx-auto">
                                <h1 className="text-uppercase titolo-pagina"><strong>Viaggi Attivi: {props.numerotrip}</strong></h1>
                            </div>
                            <div className="col-lg-8 mx-auto">
                                <p className="text-faded mb-5 titolo-pagina">Qua puoi vedere tutti i viaggi creati dai tuoi colleghi o crearne uno tutto tuo!</p>
                            </div>
                            <div>
                                <button className='btn btn-primary btn-xl'>
                                    <a rel="noopener noreferrer" target="_blank" href="https://faucet.polygon.technology/">
                                        get matic
                                    </a>
                                </button>
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </header>
            <FilterTripSection {...props} page={"trips"} />
        </>
    );
}

export default Trips;