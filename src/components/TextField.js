import * as React from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function TextField
  ({
    id,
    value,
    setValue,
    label,
    icon,
    required,
    sx,
    type,
    disabled = false,
    errorMessage = '',
    max,
    min,
    className
  }) {
  return (
    <FormControl className={className} variant="standard" sx={{ ...sx }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        disabled={disabled ? true : false}
        endAdornment={
          <InputAdornment position="end">
            {required && <span style={{ color: "red" }}>*</span>}{icon && icon}
          </InputAdornment>
        }
        inputProps={{
          maxLength: max,
          minLength: min
        }}


      />

      {errorMessage && <span style={{ color: "red", fontSize: 'small' }}>{errorMessage}</span>}
    </FormControl>
  );
}
