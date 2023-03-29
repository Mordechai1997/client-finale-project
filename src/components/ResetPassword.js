import { useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { PasswordField } from './PasswordField';
import queryString from 'query-string';
import { validPassword } from './Valid';
import Form from './Form';
import { useNavigate } from 'react-router';
import { SERVER_URL, BASE_ROUTE } from '../constants';

export function ResetPassword() {

    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const changeUrl = (url) => {
        navigate(url)
    }
    const handleSubmit = (e) => {
        if (!(confirmPassword && password)) {
            setMessage({ message: 'The entire form must be completed!', type: 'error' });
            return;
        }
        if (confirmPassword !== password) {
            setMessage({ message: 'Passwords are not the same', type: 'error' });
            return;
        }
        if (!validPassword.test(password)) {
            setMessage({ message: 'Password not strong enough', type: 'error' });
            return;
        }
        Axios.post(`${SERVER_URL}/update-password`, {
            token: queryString.parse(window.location.search).token,
            password
        })
            .then((res) => {
                console.log(res.data)
                setMessage(({ ...res.data, type: 'success' }))
            })
            .catch((error) => {
                setMessage({ ...error.response.data, type: 'error' });
            });
    }

    return (
        <Form>
            <PasswordField
                label='New Password'
                id='input-password'
                value={password}
                setValue={setPassword} />
            <br />
            <PasswordField
                label='Confirm Password'
                id='input-confirm-password'
                value={confirmPassword}
                setValue={setConfirmPassword} />
            <br />
            {
                message && <Alert severity={message.type}>
                    {message.message}
                </Alert>
            }
            <Button
                sx={{
                    background: "linear-gradient(145deg, black, blue)",
                    color: 'white',
                    textTransform: 'none'
                }}
                onClick={handleSubmit}
            >
                Reset Password
            </Button>
            <p> No account? {''}
                <Button onClick={()=>changeUrl('/')} sx={{ textTransform: 'none' }}>
                    Sign in
                </Button>
            </p>
        </Form>
    );
}

