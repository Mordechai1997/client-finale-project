import React from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
export default function Upload({saveFile}) {
  return (
    <Box>
        <input
            accept="image/*"
            className={""}
            style={{ display: 'none'}}
            id="raised-button-file"
            multiple
            type="file"
            onChange={(e)=>saveFile(e)}
        />
        <label htmlFor="raised-button-file">
        <Button sx={{width:"100%" }}variant="outlined" component="span" className={""}>
           <AddIcon/>    Add image 
        </Button>
        </label> 
    </Box>
  
  );
}

