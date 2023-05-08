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
        const res = await Axios.get(`${SERVER_URL}/${BASE_ROUTE.PRODUCTS}/getMyProductById?id=${id}`, {
            withCredentials: true
        })
        return res.data;
    } catch (err) {
        return err
    }
}
export const uploadImage = async (data) => {
    try {
        const response = await fetch(`${SERVER_URL}/products/uploadimage`, {
            method: 'POST',
            body: data
        })
        return response;
    } catch (err) {
        return err
    }
}
export const updateMyProduct = async (productId, userId, selected, title, fileName, phone, city, street, description, numberAtHome, selectedTypeDelivery) => {
    try {
        debugger
        const response = await Axios.post(`${SERVER_URL}/products/updateMyProduct`, {
            productId,
            userId: userId,
            categoryType: selected,
            title,
            fileName,
            phone,
            city,
            street,
            description,
            numberAtHome,
            deliveryOrLoen: selectedTypeDelivery
        }, {
            withCredentials: true
        })
        return response;
    } catch (err) {
        return err
    }
}