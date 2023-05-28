import { useState } from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { EmailField } from './EmailField';
import { EmailRegex } from './Valid';
import Form from './Form';

import Textarea from '@mui/joy/Textarea';
import { useSelector } from 'react-redux';
import { ContactUsEmail } from '../services/ApiServicesUser';
import Spinner from './Spinner';

export function ContactUs() {

    const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);
    const [email, setEmail] = useState(userLogIn?.email);
    const [messageUser, setMessageUser] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        setIsLoading(true)
        if (validForm()) {
            const res = await ContactUsEmail(messageUser, email);
            if (res)
                setMessage({ message: res.message, type: 'success' })
        }
        setIsLoading(false)
    }
    const validForm = () => {
        if (!email) {
            setMessage({ message: 'Email is required', type: 'error' });
            return false;
        }
        if (!EmailRegex.test(email)) {
            setMessage({ message: 'Invalid email address', type: 'error' });
            return false;
        }
        if (!messageUser) {
            setMessage({ message: 'Empty message', type: 'error' });
            return false;
        }
        return true;

    }

    return (
        <>
            {isLoading ? <Spinner isLoading={isLoading} /> :
                <Form>
                    <h2>Contact us</h2>
                    <EmailField
                        required
                        label='Email'
                        id='email'
                        value={email}
                        setValue={setEmail} />
                    <Textarea value={messageUser} onChange={(e) => setMessageUser(e.target.value)} required placeholder="Type your message here…" maxRows={20} minRows={2} />
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
        </>
    );
}

