import { useState } from 'react';
import Axios from 'axios'
import { validForm } from './Valid'
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { PasswordField } from './PasswordField';
import { EmailField } from './EmailField';
import { NameField } from './NameField'
import Form from './Form';
import { useNavigate } from 'react-router';
import { SERVER_URL, BASE_ROUTE } from '../constants';

export function SignUp() {

  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('')

  const changeUrl = (url) => {
    navigate(url)
  }
  const handleSubmit = () => {
    const result = validForm(email, password, confirmPassword, fullName.trim());
    if (result.type === 'success') {
      Axios.post(`${SERVER_URL}/${BASE_ROUTE.SIGNUP}`, {
        email,
        password,
        fullName
      })
        .then((res) => {
          setMessage({ ...res.data, type: 'success' });
          setTimeout(() => {
            changeUrl('/');
          }, 1500);
        })
        .catch((error) => {
          setMessage({ ...error.response.data, type: 'error' })
        });
    } else {
      setMessage(result)
    }
  }


  return (
    <Form>
      <NameField
        label='Full Name'
        id='input-full-name'
        value={fullName}
        setValue={setFullName} /><br />
      <EmailField
        label='Email'
        id='input-email'
        value={email}
        setValue={setEmail} />
      <br />
      <PasswordField
        label='Password'
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
        message && <Alert severity={message.type}>{message.message}</Alert>
      }
      <Button
        sx={{
          background: "linear-gradient(145deg, black, blue)",
          color: 'white'
        }}
        onClick={handleSubmit}
      >
        Register
      </Button>
      <p> Already have an account? {''}
        <Button onClick={() => changeUrl('/login')} sx={{ textTransform: 'none' }}>
          Sign in
        </Button>
      </p>
    </Form>
  );
}

