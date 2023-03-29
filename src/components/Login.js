import { useEffect, useState } from 'react';
import Axios from 'axios'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { PasswordField } from './PasswordField'
import { EmailField } from './EmailField';
import Form from './Form';
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut } from "./userLogInSlice";
import { useNavigate } from 'react-router';
import { SERVER_URL } from '../constants';

export function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const changeUrl = (url) => {
    navigate(url, { replace: true })
  }

  const handleSubmit = (e) => {
    if (!(email && password)) {
      setMessage({ message: 'The entire form must be completed!', type: 'error' });
      return;
    }
    Axios.post(`${SERVER_URL}/login`, {
      email,
      password
    }, {
      withCredentials: true
    }).then((res) => {
      console.log(res)
        setMessage(({ message: res.data.message, type: 'success' }))
        changeUrl('/home');
      })
      .catch((error) => {
        setMessage({ ...error.response.data, type: 'error' });
      });
  }

  return (
    <Form>
      <EmailField
        label='Email'
        id='email'
        value={email}
        setValue={setEmail} />
      <PasswordField
        label='Password'
        id='passwordTextField'
        value={password}
        setValue={setPassword} />
      <p>
        <Button sx={{ textTransform: 'none' }} onClick={() => changeUrl('/reset-password-email')}>
          Forgot password?
        </Button>
      </p>
      {
        message && <Alert severity={message.type}>
          {message.message}
        </Alert>
      }
      <Button
        sx={{ background: "linear-gradient(145deg, black, blue)", color: 'white' }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <p onClick={() => changeUrl('/signup')}> No account?
        <Button sx={{ textTransform: 'none' }}>
          Create one
        </Button>
      </p>
    </Form>
  );
}

