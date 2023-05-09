import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditTheDetails from './EditTheDetails';
import { Box } from '@mui/material';
import AdvancedCarousel from './AdvancedCarousel';
import { useSelector } from "react-redux";

export default function Profile() {

  const listOfFavoritProducts = useSelector((state) => state.reducer.listProducts.listOfFavoritProducts);
  const listOfMyProducts = useSelector((state) => state.reducer.listProducts.listOfMyProducts);

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Edit my details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EditTheDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>My products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={{ marginTop: "60px" }}>
            {listOfMyProducts[0] ?
              <AdvancedCarousel list={listOfMyProducts} /> :
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                You have not uploaded a product yet
              </Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            My favorit products
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={{ marginTop: "60px" }}>
            {listOfFavoritProducts[0] ?
              <AdvancedCarousel list={listOfFavoritProducts} /> :
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                You have not liked any product yet
              </Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
