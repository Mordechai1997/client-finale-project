import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { SERVER_URL } from '../constants';
import { SetListSelect } from '../components/categorySlice';


export default function useAllCategorys() {
    const listSelect = useSelector((state) => state.reducer.categorys.listSelect);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!listSelect[0]) {
            getAllCategorys();
        }
    }, [])

    const getAllCategorys = async () => {
        const data = await axios.get(`${SERVER_URL}/products/getallCategorys`, {
          withCredentials: true
        })
        dispatch(SetListSelect(data.data));
      }

    return listSelect;
}
