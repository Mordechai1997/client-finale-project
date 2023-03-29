import { useState } from 'react';
import Axios from 'axios'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { EmailField } from './EmailField';
import { EmailRegex } from './Valid';
import Form from './Form';
import { useNavigate } from 'react-router';
import { SERVER_URL, BASE_ROUTE } from '../constants';

export function ResetPasswordEmail() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const changeUrl = (url) => {
        navigate(url)
    }
    const handleSubmit = (e) => {
        if (!EmailRegex.test(email)) {
            setMessage({ message: 'Invalid email address', type: 'error' });
            return;
        }
        Axios.get(`${SERVER_URL}/reset-password-email?email=${email}`)
            .then((res) => {
                setMessage({ message:res.data.message, type: 'success' })
            })
            .catch((error) => {
                console.log(error)
                setMessage({ message:"Something goes to wrong. Please try again", type: 'error' });
            });
    }
    console.log(message)
    return (
        <Form>
            <p>Forgot your account’s password or having trouble logging into your Team? Enter your email address and we’ll send you a recovery link.</p>
            <EmailField
                label='Email'
                id='email'
                value={email}
                setValue={setEmail} />
            <br />
            <Button
                sx={{
                    background: "linear-gradient(145deg, black, blue)",
                    color: 'white',
                    textTransform: 'none'
                }}
                onClick={handleSubmit}
            >
                Send recovery email
            </Button>
            {
                message && <Alert severity={message.type}>
                    {message.message}
                </Alert>
            }
            <p> No account? {''}
                <Button onClick={() => changeUrl('/signup')} sx={{ textTransform: 'none' }}>
                    Create one
                </Button>
            </p>
        </Form>
    );
}

