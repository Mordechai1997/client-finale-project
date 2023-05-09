import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Box from "@mui/material/Box";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({ title, handleClose, open, handleOk, content }) {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      style={{ maxWidth: "none", maxHeight: "none" }}
    >
      <Box style={{ padding: "30px" }}>

        {title && <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {title}
        </DialogTitle>}
        <DialogActions>
          {content && content}

        </DialogActions>
        <Box style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 0"
        }}>
          {handleClose && <Button variant="outlined" autoFocus onClick={handleClose}>
            Cancel
          </Button>}
          {handleOk && <Button variant="outlined" style={{ marginLeft: 15}} onClick={handleOk}>OK</Button>}
        </Box>
      </Box>

    </Dialog>
  );
}
