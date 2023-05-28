import { useState } from "react";
import DraggableDialog from "./PopUp";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Box from "@mui/material/Box";
import Alert from '@mui/material/Alert';
import Textarea from '@mui/joy/Textarea';
import { useSelector } from 'react-redux';
import { ContactUsEmail } from '../services/ApiServicesUser';
import Spinner from "./Spinner";
import Form from './Form';

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

export default function ReportProduct({ item, open, closeReport }) {

    const [openReportSubmit, setOpenReportSubmit] = useState(false);
    const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);
    const [messageUser, setMessageUser] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        setIsLoading(true)
        if (validForm()) {
            const res = await ContactUsEmail(messageUser, userLogIn.email, JSON.stringify(item));
            if (res)
                setMessage({ message: res.message, type: 'success' })
        }
        setIsLoading(false)
        setTimeout(() => {
            handleCloseReport();
        }, 2000)
    }
    const validForm = () => {

        if (!messageUser) {
            setMessage({ message: 'Empty message', type: 'error' });
            return false;
        }
        if (!userLogIn || !userLogIn.email) {
            setMessage({ message: 'User not logged in', type: 'error' });
            return false;
        }
        return true;

    }
    const okReport = () => {
        closeReport()
        setOpenReportSubmit(true);
    }
    const handleCloseReport = () => {
        setOpenReportSubmit(false)
    }
    return (
        <>
            <DraggableDialog
                title={"Do you want to report the product?"}
                open={open}
                handleClose={() => closeReport()}
                handleOk={okReport} />
            <Dialog
                open={openReportSubmit}
                onClose={handleCloseReport}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                style={{ maxWidth: "none", maxHeight: "none" }}
            >
                <Box style={{ padding: "30px" }}>

                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Report to us
                    </DialogTitle>
                    <DialogActions>
                        {isLoading ? <Spinner isLoading={isLoading} /> :
                            <Form styleCss={{ margin: 0 }}>

                                <Textarea value={messageUser} onChange={(e) => setMessageUser(e.target.value)} required placeholder="Type your report here…" maxRows={20} minRows={2} />
                                <Button
                                    variant="contained"
                                    sx={{
                                        textTransform: 'none'
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                                {
                                    message && <Alert severity={message.type}>
                                        {message.message}
                                    </Alert>
                                }
                            </Form>}
                    </DialogActions>
                    <Box style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "10px 0"
                    }}>
                        <Button variant="outlined" autoFocus onClick={handleCloseReport}>
                            Cancel
                        </Button>

                    </Box>
                </Box>
            </Dialog >

        </>

    );
}
