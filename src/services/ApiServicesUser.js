import Axios from 'axios'
import { SERVER_URL, BASE_ROUTE } from '../constants';


export const isAuth = async () => {
    try {
        const data = await Axios.get(`${SERVER_URL}/${BASE_ROUTE.AUTH}`, {
            withCredentials: true
        })
        return data.data;

    } catch (err) {
        throw err;
    }
}

export const getAllUserNotifications = async () => {
    try {
        const data = await Axios.get(`${SERVER_URL}/${BASE_ROUTE.GETALLUSERNOTFICATIONS}`, {
            withCredentials: true
        })
        return data.data;

    } catch (err) {
        throw err;
    }
}
export const ContactUsEmail = async (message, email, item = null) => {
    try {
        const data = await Axios.post(`${SERVER_URL}/${BASE_ROUTE.CONTACTUSEMAIL}`, {
            message,
            email,
            item
        }, {
            withCredentials: true
        })
        return data.data;

    } catch (err) {
        throw err;
    }
}