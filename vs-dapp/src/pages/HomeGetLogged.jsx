import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Main from "../components/Main";
import { useWeb3React } from "@web3-react/core";
import MetamaskButton from "../components/MetamaskButton";
import { config } from '../config';



export default function HomeGetLogged() {
  const { active, account } = useWeb3React();
  const [chainId, setChainId] = useState(false)

  if (window.ethereum) {
    useEffect(() => {
      checkChain()
    })
    const hexToDecimal = hex => parseInt(hex, 16);
    const checkChain = async () => {
      let chain = await window.ethereum.request({ method: 'eth_chainId' })
      if (hexToDecimal(chain) === config.network.id[[0]]) {
        setChainId(true)
      }
    }

    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
  }

  

  useEffect(() => {
    if (account) {
      document.getElementById("loader").classList.add("loader--hidden")
    } else {
      setTimeout(() => document.getElementById("loader").classList.add("loader--hidden"), 2000);
    }
  }, [account])

  if (account) {
    return (
      <div>
        <div id="loader"></div>
        <NavBar />
        {active && <Main />}
      </div>
    )
  } else {
    return (
      <div>
        <div id="loader"></div>
        {/* <NavBar /> */}
        <div className='home'>
          <header className="bg-image mh-100 text-center text-white d-flex masthead backimage">
            <div className="container my-auto">
              <div className="col-lg-10 mx-auto">
                <h1 className="text-uppercase titolo-pagina"><strong>VAR SHARING</strong></h1>
              </div>
              <div className="col-lg-8 mx-auto">
                <p className="text-faded mb-5 titolo-pagina">Condividi i tuoi viaggi con i colleghi!</p>
                <h3 className="text-faded mb-5 titolo-pagina">
                  {!chainId ? "Collegati alla rete test MUMBAI di Polygon" : ""}</h3>
                <div><MetamaskButton chainId={chainId} /></div>
              </div>
            </div>
          </header>
        </div>

      </div>
    )
  }

}







