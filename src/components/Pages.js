import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Pages({page, cntPages, handleChange}) {
  return (
    <Stack spacing={2}>
      <Pagination
        color="primary"
        count={cntPages}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
