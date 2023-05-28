import { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button';
import FormatColorResetIcon from '@mui/icons-material/FormatColorReset';
import TextField from './TextField';
import Pages from './Pages';
import { Box } from '@mui/system';
import CardProduct from './CardProduct';
import { SERVER_URL } from '../constants';
import Spinner from "./Spinner";
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import AdvancedSearch from './AdvancedSearch';
import { ProductsByAdvancedSearch } from '../services/ApiServicesProduct';
import Tooltip from '@mui/material/Tooltip';

export default function HomePage() {

    const [search, setSearch] = useState('');
    const [countPages, setCountPages] = useState(1);
    const [listProducts, setListProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1);
    const [bodyAdvancedSearch, setBodyAdvancedSearch] = useState(null);
    const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false);


    useEffect(() => {
        setBodyAdvancedSearch(null);
        ProductsBySearch("");
    }, [])
    const clearFilter = () => {
        setBodyAdvancedSearch(null);
        ProductsBySearch("");
    }
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
            // dispatch(SetListProducts(res.data.list));
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
        if (bodyAdvancedSearch)
            ProductsByAdvanceSearch(value)
        else
            ProductsBySearch(search, value)
        window.scrollTo(0, 0);
    };
    const handleOpenAdvancedSearch = () => {
        setOpenAdvancedSearch(prev => !prev)
    }
    const ProductsByAdvanceSearch = async (cnt = 1, selected, selectedTypeDelivery, title, city) => {
        if (!bodyAdvancedSearch && !selected && !selectedTypeDelivery && !title && !city) {
            return;
        }
        setIsLoading(true)
        let data = '';
        if (bodyAdvancedSearch && !selected && !selectedTypeDelivery && !title && !city) {
            data = await ProductsByAdvancedSearch(cnt, bodyAdvancedSearch)

        } else {
            data = await ProductsByAdvancedSearch(cnt, { selected, selectedTypeDelivery, title, city })
        }
        if (data) {
            setListProducts(data?.list);
            setPage(cnt)
            setCountPages(Math.ceil(data?.count / 9));
            setBodyAdvancedSearch({ selected, selectedTypeDelivery, title, city })
        }
        setIsLoading(false)
    }
    return (
        <div style={{
            marginTop: "100px",
        }}>
            <AdvancedSearch open={openAdvancedSearch} handleClose={handleOpenAdvancedSearch} handleSearch={ProductsByAdvanceSearch} />
            <Box style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100px"
            }}>

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
                    className="search-input-home-page"
                    icon={<SearchIcon
                        sx={{ m: 1 }} />}
                    label="Search.."
                    id={"Search"}
                    value={search}
                    setValue={handleChangeSearch}
                />
                <Box style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100px",
                    width: '30%'
                }}>

                    <Button
                        className="search-input-home-page"
                        variant={"contained"}
                        sx={{ mt: 2 }}
                        onClick={handleOpenAdvancedSearch}
                    >
                        <TuneIcon />
                    </Button>
                    {
                        bodyAdvancedSearch &&
                        <Tooltip title="Clear filter" placement="top"  >
                            <FormatColorResetIcon onClick={clearFilter} style={{ cursor: "pointer" }} />
                        </Tooltip>
                    }
                </Box>
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
            {isLoading ? <Spinner isLoading={isLoading} /> : <>
                {(listProducts && listProducts[0]) && (<>
                    <div
                        className="container-cards-products"
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

