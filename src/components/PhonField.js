import * as React from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SelectField from './SelectField'

export default function PhonField({ id, value, setValue, label, icon }) {
  return (
      <FormControl variant="standard">
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <input
          type="tel"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={id}
          endAdornment={
            <InputAdornment position="end">
              {icon && icon}
            </InputAdornment>
          }
       />


      </FormControl>
  );
}
