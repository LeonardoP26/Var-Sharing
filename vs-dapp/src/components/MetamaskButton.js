import * as React from 'react';
import { useWeb3React } from "@web3-react/core";
import { useEffect, useRef } from 'react';
import { config } from '../config';
import { InjectedConnector } from '@web3-react/injected-connector';
const injected = new InjectedConnector({ supportedChainIds: config.network.id });



const MetamaskButton = (props) => {
  const { active, activate, deactivate, account } = useWeb3React();
  const event = useRef(false);

  async function checkIfWalletIsConnected(account) {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        //const account = accounts[0];
        activate(injected)
        return;
      }
    }
  }

  if (event.current === false && window.ethereum) {
    window.ethereum.on('accountsChanged', async () => {
      deactivate(injected);
      window.location.reload();
    });
    event.current = true;
  }


  //TODO CAPIRE
  useEffect(() => {
    checkIfWalletIsConnected(account);
  }, []);


    if (isMobileDevice() && window.ethereum && props.chainId) {
      return (
        <>
          <div>
            <a>
              <button href="/" onClick={() => activate(injected)} className='btn btn-primary btn-xl mm connect-btn'>
                Connect Wallet
              </button>
            </a>
          </div>
          <div>
            <button className='btn btn-primary btn-xl mm connect-btn'>
              <a rel="noopener noreferrer" target="_blank" href="https://metamask.app.link/dapp/https://leonardop26.github.io/Var-Sharing-dApp/">
                Connect MetaMask
              </a>
            </button>
          </div>
        </>
      );
    } else if (isMobileDevice()) {
      return (
        <button className='btn btn-primary btn-xl mm'>
          <a rel="noopener noreferrer" target="_blank" href="https://metamask.app.link/dapp/https://leonardop26.github.io/Var-Sharing-dApp/">
            Connect MetaMask
          </a>
        </button>
      );
    } else if (!window.ethereum) {
      return (
        <div>
          <button className="btn btn-primary mm">
            <a target="_blank" href="https://metamask.io/download/">Install MetaMask!</a>
          </button>
        </div>
      );
    } else if(props.chainId) {
      return (
        <div>
          <button className="btn btn-primary mm" type="button" onClick={() => activate(injected)}>
            {active ? (account.slice(0, 5) + '...' + account.slice(38, 42)) : "Connect MetaMask"}
          </button>
        </div>
      );
    }
  
};


//TODO GESTIRE MOBILE
function isMobileDevice() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

export default MetamaskButton;
