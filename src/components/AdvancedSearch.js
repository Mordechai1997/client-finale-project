import { useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Form from './Form';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import SelectField from './SelectField';
import TextField from './TextField';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';
import useAllCategorys from '../Hooks/useAllCategorys';
import Dialog from '@mui/material/Dialog';
import { DialogTitle } from '@mui/material';
import { ProductsByAdvancedSearch } from '../services/ApiServicesProduct';

const listTypeDelivery = [{
    CategoryId: 1,
    CategoryName: 'delivery'
},
{
    CategoryId: 2,
    CategoryName: 'on loan'
}]

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
export default function AdvancedSearch({ open,
    handleClose,
    handleSearch,
    message
}) {

    const listSelect = useAllCategorys();
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [selected, setSelected] = useState('');
    const [selectedTypeDelivery, setSelectedTypeDelivery] = useState('');






    const setCityProduct = (e) => {
        setCity(e);
    }
    const handleSubmit = () => {
        handleClose();
        handleSearch(1, selected, selectedTypeDelivery, title, city)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            style={{ maxWidth: "none", maxHeight: "none" }}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Advanced Search
            </DialogTitle>
            <Form styleCss={{ margin: 0 }}>
                <SelectField
                    list={listSelect}
                    label="Select a category"
                    handleChange={setSelected}
                    value={selected}
                />
                <SelectField
                    list={listTypeDelivery}
                    label="Select type of delivery"
                    handleChange={setSelectedTypeDelivery}
                    value={selectedTypeDelivery}
                />
                <TextField
                    icon={<Inventory2OutlinedIcon sx={{ m: 1 }} />}
                    label="Title"
                    id={"title"}
                    value={title}
                    setValue={setTitle}
                    required={false}
                />


                <TextField
                    icon={<ApartmentSharpIcon
                        sx={{ m: 1 }} />}
                    label="city"
                    id={"city"}
                    value={city}
                    setValue={setCityProduct}
                    required={false}
                />

                {
                    message && <Alert severity={message.type}>
                        {message.message}
                    </Alert>
                }
                <Button
                    variant="contained"
                    sx={{
                        textTransform: 'none'
                    }}
                    onClick={handleSubmit}
                >
                    Search
                </Button>
                <Button variant="outlined" autoFocus onClick={handleClose}>
                    Cancel
                </Button>
            </Form>
        </Dialog >
    );
}

