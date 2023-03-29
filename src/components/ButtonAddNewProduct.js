import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

export default function ButtonAddNewProduct() {
  return (
    <Link to='/publish'>
      <Box sx={{ m: 5, position: "fixed", bottom: "0px", left: "0px" }} >
        <Tooltip title="Add new product" placement="top"  >
          <Fab color="primary" aria-label="add" sx={{ background: "linear-gradient(145deg, black, blue)" }} >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Link>
  );
}
