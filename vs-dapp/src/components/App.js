import '../styles/App.css';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import 'dayjs/locale/en-gb';
import React from 'react';

import HomeGetLogged from '../pages/HomeGetLogged.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function App() {

  const getLibrary = (provider, connector) => {
    return new Web3Provider(provider);
  };

  // if (window.ethereum) {
  //   return (
  //     <div>
  //       <Web3ReactProvider getLibrary={getLibrary}>
  //         <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
  //           <HomeGetLogged />
  //         </LocalizationProvider>
  //       </Web3ReactProvider>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <HomeGetLogged />
  //     </div>
  //   );
  // }
  return (
    <div>
      <Web3ReactProvider getLibrary={getLibrary}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
          <HomeGetLogged />
        </LocalizationProvider>
      </Web3ReactProvider>
    </div>
  );
  
}
export default App;
