import { useState } from 'react';
import Axios from 'axios'
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { PasswordField } from './PasswordField';
import { EmailField } from './EmailField';
import { NameField } from './NameField'
import Form from './Form';
import { useNavigate } from 'react-router';
import { SERVER_URL, BASE_ROUTE } from '../constants';
import { useSelector, useDispatch } from "react-redux";
import TextField from './TextField';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { validFullName, validPhoneNumber, validEmail } from './Valid';

export default function EditTheDetails() {

    const navigate = useNavigate();
    const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState(userLogIn.email ? userLogIn.email : '');
    const [fullName, setFullName] = useState(userLogIn.username ? userLogIn.username : '')
    const [phoneNumber, setPhoneNumber] = useState(userLogIn.phoneNumber ? userLogIn.phoneNumber : '')
    const [disabled, setDisable] = useState(true)
    const [messageFullName, setErrorFullName] = useState('')
    const [messageEmail, setErrorEmail] = useState('')
    const [messagePhoneNumber, setErrorPhoneNumber] = useState('')




    const changeUrl = (url) => {
        navigate(url)
    }
    const handleSubmit = () => {
        setMessage('')
        setErrorEmail('')
        setErrorFullName('')
        setErrorPhoneNumber('')

        if (disabled) {
            changeBtn();
            return;
        }

        if (validForm()) {
            updateUserDetails()
            changeBtn();
        }

    }
    const validForm = () => {

        let isValid = true;

        var valid = validEmail(email);
        if (valid.type !== 'success') {
            setErrorEmail(valid);
            isValid = false;
        }
        valid = validFullName(fullName);
        if (valid.type !== 'success') {
            isValid = false;
            setErrorFullName(valid);
        }
        valid = validPhoneNumber(phoneNumber);
        if (valid.type !== 'success') {
            isValid = false;
            setErrorPhoneNumber(valid);
        }
        if (isValid && userLogIn && userLogIn.email === email && userLogIn.username === fullName && userLogIn.phoneNumber === phoneNumber) {
            isValid = false;
            setMessage({ message: 'No changes', type: 'info' })
        }

        return isValid;
    }
    const changeBtn = () => {
        setDisable(prev => !prev)
    }
    const updateUserDetails = async () => {

        await Axios.post(`${SERVER_URL}/updateUserDetails`, {
            id: userLogIn.userId,
            email,
            name: fullName,
            phoneNumber
        }, {
            withCredentials: true
        }).then((res) => {
            console.log(res.data.newUser)
            setMessage({ message: 'success', type: 'success' })

        }).finally(() => {
            setErrorEmail('')
            setErrorFullName('')
            setErrorPhoneNumber('')
        })
    }

    return (
        <div>
            <div style={{
                width: ' 80%',
                display: 'flex',
                justifyContent: ' space-around',
                alignItems: 'center',
                margin: 'auto'
            }}>
                <NameField
                    label='Full Name'
                    id='input-full-name'
                    value={fullName}
                    setValue={setFullName}
                    disabled={disabled}
                    required={!disabled}
                    errorMessage={messageFullName && messageFullName.message}
                />{" "}
                <EmailField
                    label='Email'
                    id='input-email'
                    value={email}
                    setValue={setEmail}
                    disabled={disabled}
                    required={!disabled}
                    errorMessage={messageEmail && messageEmail.message}

                />
                <TextField
                    icon={<PhoneIcon
                        sx={{ m: 1 }} />}
                    label="phone number"
                    id={"phone"}
                    type="number"
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                    disabled={disabled}
                    required={!disabled}
                    errorMessage={messagePhoneNumber && messagePhoneNumber.message}
                    max={10}

                />

                <Button
                    className={` ${disabled ? 'Edit' : 'Save'}-btn-Details`}
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ width: 80, backgroundColor: "linear-gradient(145deg, black, blue)" }}

                >
                    {disabled ? 'Edit' : 'Save'}
                    <span style={{ marginLeft: '4px', paddingTop: '5px' }}>{disabled ? <EditIcon fontSize="small" /> : <SaveAsIcon fontSize='small' />}</span>

                </Button>
            </div >
            <div className='alert-edit-details' style={{ width: '50%', margin: 'auto', marginTop: 20 }} >
                {
                    message && <Alert severity={message.type}>
                        {message.message}
                    </Alert>
                }
            </div>
        </div >

    );
}

