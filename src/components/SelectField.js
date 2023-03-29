import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

export default function SelectField({value,label, style, list, handleChange}) {

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, ...style }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={(e)=>handleChange(e.target.value)}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {list&&list.map((item, index)=>(<MenuItem key={index} value={item.CategoryId}>{item.CategoryName}</MenuItem>))}
      </Select>
    </FormControl>
  );
}
