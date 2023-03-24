import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { config } from '../config';
import { useState, useEffect } from 'react';


export default function SelectBoxArrival({ start, setStart }) {

  const [inputValue, setInputValue] = useState('');


  const defaultProps = {
    options: config.options.sedi,
    getOptionLabel: (option) => option.subtitle,
  }

  const ID = config.options.sedi.filter((el) => el.subtitle === inputValue);
  useEffect(() => {
    if (inputValue && ID[0]) {
      setStart(ID[0].value)
    }
  }, [ID])



  const set = (newInputValue) => {
    setInputValue(newInputValue);
    if (ID[0]) {
      setStart(ID[0].value)
    }
  }

  return (
    <Autocomplete
      {...defaultProps}
      id="auto-select"
      autoSelect
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        set(newInputValue)
      }}
      onChange={(event, newValue)=>{
        if(newValue === null){
          setStart(undefined)
        }
      }}

      sx={{ maxWidth: 300,width: 150, pr: "20px", pb:"10px"}}
      renderInput={(params) => (
        <TextField {...params} label="Partenza" variant="standard" />
      )}
    />
  );
}