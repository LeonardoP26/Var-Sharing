// import * as React from 'react';
// import { useWeb3React } from "@web3-react/core";
// import { useEffect } from 'react';
// import { config } from '../config';
// import { InjectedConnector } from '@web3-react/injected-connector';
// const injected = new InjectedConnector({ supportedChainIds: config.network.id });



// const LogoutButton = () => {
//     const { active, deactivate, account } = useWeb3React();

//     //  async function checkIfWalletIsConnected(account) {
//     //      if (window.ethereum) {
//     //        const accounts = await window.ethereum.request({
//     //          method: "eth_accounts",
//     //        });
//     //        if (accounts.length > 0) {
//     //          //const account = accounts[0];
//     //          activate(injected)
//     //          return;
//     //        }
//     //      }
//     //    }

//     //    window.ethereum.on('accountsChanged', async () => {
//     //     deactivate(injected);
//     //     window.location.reload();
//     //   });

//     //TODO CAPIRE
//     // useEffect(() => {
//     //     checkIfWalletIsConnected(account);
//     // }, []);


//     const handleButtonClick = () => {
//         if (active) {
//             deactivate(injected);
//         }
//     }


//     return (
//         <div>
//             <button className="btn btn-primary" type="button" onClick={() => handleButtonClick()}>
//                 Logout
//             </button>
//         </div>
//     );

// };

// export default LogoutButton;
