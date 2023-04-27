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