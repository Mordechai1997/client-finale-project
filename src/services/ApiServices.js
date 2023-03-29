import Axios from 'axios'
import { SERVER_URL, BASE_ROUTE } from '../constants';

export const Register = (email, password, fullName) => {
    try {
       const res = Axios.post(`${SERVER_URL}/${BASE_ROUTE.SIGNUP}`, {
            email,
            password,
            fullName
        })
        return res.data

    }catch(err){
        return err;
    }
} 
