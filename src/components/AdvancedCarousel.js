import React from "react";
import { useSnapCarousel } from "react-snap-carousel";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CardProduct from './CardProduct';


const AdvancedCarousel = ({ list }) => {
  const {
    scrollRef,
    pages,
    activePageIndex,
    next,
    prev,
    goTo
  } = useSnapCarousel();


  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      overflow: "hidden",
      alignItems: "center"
    }}>
      <Box onClick={() => prev()}>
        <Fab size="small" color="primary" aria-label="add" >
          <ArrowBackIosNewIcon />
        </Fab>
      </Box>
      <ul
        id="scroll"
        ref={scrollRef}
        style={{
          width: "90%",
          display: "flex",
          overflow: "auto",
          scrollSnapType: "x mandatory",
          boxSizing: "content-box"
        }}
      >
        {list.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: "50px",
              width: "300px",
              flexShrink: 0,
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CardProduct item={item} />
          </li>
        ))}
      </ul>
      <Box onClick={() => next()}>
        <Fab size="small" color="primary" aria-label="add" >
          <ArrowForwardIosIcon />
        </Fab>
      </Box>
    </div>
  );
};

export default AdvancedCarousel;
