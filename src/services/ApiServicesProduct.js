import Axios from 'axios'
import { SERVER_URL, BASE_ROUTE } from '../constants';

export const addLikeProduct = async (productId, userId) => {
    return await Axios.post(`${SERVER_URL}/${BASE_ROUTE.PRODUCTS}/addFavoritProduct`, {
        userId: userId,
        productId,
    }, {
        withCredentials: true
    })
}
export const removeFavoritProduct = async (productId, userId) => {
    return await Axios.post(`${SERVER_URL}/${BASE_ROUTE.PRODUCTS}/removeFavoritProduct`, {
        userId: userId,
        productId,
    }, {
        withCredentials: true
    })
}
export const getAllFavoritProducts = async (id) => {
    try {
        const res = await Axios.get(`${SERVER_URL}/${BASE_ROUTE.PRODUCTS}/getAllFavoritProducts?id=${id}`, {
            withCredentials: true
        })
        console.log(res)
        return res.data;
    }
    catch (err) {
        return err;
    }

}
export const getAllMyProducts = async () => {
    try {
        const res = await Axios.get(`${SERVER_URL}/${BASE_ROUTE.PRODUCTS}/getAllMyProducts`, {
            withCredentials: true
        })
        return res.data;
    }
    catch (err) {
        return err;
    }

}
export const getProductByIdApi = async (id) => {
    try {
        const res = await Axios.get(`${SERVER_URL}/${BASE_ROUTE.PRODUCTS}/getProductById?id=${id}`, {
            withCredentials: true
        })
        return res.data;
    } catch (err) {
        return err
    }
}
export const getMyProductByIdApi = async (id) => {
    try {
        const res = await Axios.get(`${SERVER_URL}/${BASE_ROUTE.PRODUCTS}/getProductById?id=${id}`, {
            withCredentials: true
        })
        return res.data;
    } catch (err) {
        return err
    }
}