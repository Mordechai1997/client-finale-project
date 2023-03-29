import { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { PasswordField } from './PasswordField'
import { validPublic } from './Valid';
import Form from './Form';
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut } from "./userLogInSlice";
import { useNavigate } from 'react-router';
import Upload from './UploadField';
import SelectField from './SelectField';
import TextField from './TextField';
import debounce from 'lodash.debounce';
import Pages from './Pages';
import { Box } from '@mui/system';
import CardProduct from './CardProduct';
import { SERVER_URL, BASE_ROUTE } from '../constants';
import Spinner from "./Spinner";
import SearchIcon from '@mui/icons-material/Search';
import {SetListProducts} from './categorySlice'

export default function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listSelect = useSelector((state) => state.reducer.categorys.listSelect);
    const listProductsFromRedux = useSelector((state) => state.reducer.categorys.listProducts);
    const [search, setSearch] = useState('');
    const [countPages, setCountPages] = useState(1);
    const [listProducts, setListProducts] = useState([]);
    const [listProductsSearch, setListProductsSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1);

    useEffect(() => {
        ProductsBySearch("");
    }, [])

    const debounce = (func, timeout = 300) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }
    const ProductsBySearch = async (e, cnt = 1) => {
        setIsLoading(true)
        await Axios.post(`${SERVER_URL}/products/ProductsBySearch`, {
            text: e,
            cnt: cnt
        }, {
            withCredentials: true
        }).then((res) => {
            dispatch(SetListProducts(res.data.list));
            setListProducts(res.data.list);
            setPage(cnt)
            setCountPages(Math.ceil(res.data.count / 9))
        }).finally(() => {
            setIsLoading(false)
        })
    }
    const debouncedChangeHandler = useCallback(
        debounce(ProductsBySearch, 300)
        , []);
    const handleChangeSearch = (e) => {
        setSearch(e)
        debouncedChangeHandler(e);
    }
    const handleChangePage = (event, value) => {
        ProductsBySearch(search, value)
        window.scrollTo(0, 0);
    };
    return (
        <div style={{
            marginTop: "100px",
        }}>
            {isLoading?<Spinner isLoading={isLoading} />:<>
            <Box >
                {/* <SelectField
                    list={listSelect}
                    label="Select a category"
                    handleChange={setSelected}
                    value={selected}
                /> */}

                {/* <SelectField
                    list={listTypeDelivery}
                    label="Select type of delivery"
                    handleChange={setSelectedTypeDelivery}
                    value={selectedTypeDelivery}
                /> */}
                <TextField
                    sx={{ width: '30%' }}
                    icon={<SearchIcon
                        sx={{ m: 1 }} />}
                    label="Search.."
                    id={"Search"}
                    value={search}
                    setValue={handleChangeSearch}
                />
                {/* <TextField
                    icon={<ApartmentSharpIcon
                        sx={{ m: 1 }} />}
                    label="city"
                    id={"city"}
                    value={city}
                    setValue={setCityProduct}
                    required={true}
                /> */}
            </Box>
            {(listProducts && listProducts[0]) && (<>
                <div
                    className="cointener"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {listProducts.map((item, index) => (<CardProduct key={index} item={item} />))}
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 5 }}>
                    <Pages
                        cntPages={countPages}
                        page={page}
                        handleChange={handleChangePage}
                    />
                </Box>
            </>)}
            </>}
        </div>

    );
}

