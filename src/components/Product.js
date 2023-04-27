import { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants';
import { useSearchParams, useLocation } from 'react-router-dom';
import Box from "@mui/material/Box";
import './product.css'
import Button from '@mui/material/Button';
import DraggableDialog from './PopUp'
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AdvancedCarousel from './AdvancedCarousel';
import Axios from 'axios';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch, useSelector } from 'react-redux';
import { addLikeProduct, removeFavoritProduct } from '../services/ApiServicesProduct';
import { initFavoritProducts } from './listProductsSlice';

export default function Product() {

    const dispatch = useDispatch();
    const { state } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState(state);
    const [dataUser, setDataUser] = useState(null);
    const [visitDate, setVisitDate] = useState("");
    const [openPopUp, setOpenPopUp] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    const [pageId, setPageId] = useState();
    const listOfFavoritProducts = useSelector((state) => state.reducer.listProducts.listOfFavoritProducts);
    const [like, setLike] = useState(listOfFavoritProducts?.some(el => el.product_id === data?.product_id));
    const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);


    useEffect(() => {
        const id = searchParams.get("productId");
        if (!data || pageId !== id) {
            getProductById(id)
            setDateUpdateProduct();
            setPageId(id);
            initListProducts();
            window.scrollTo(0, 0);
            setLike(listOfFavoritProducts?.some(el => el.product_id === parseInt(id)))
        }
    })
    const setDateUpdateProduct = () => {
        const tempDate = new Date(data.updatedAt);
        var year = tempDate.getFullYear();
        var mes = tempDate.getMonth() + 1;
        var dia = tempDate.getDate();
        var fecha = dia + "/" + mes + "/" + year;
        setVisitDate(fecha)
    }
    const initListProducts = async (cnt = 1) => {

        await Axios.post(`${SERVER_URL}/products/ProductsBySearch`, {
            text: "",
            cnt: cnt
        }, {
            withCredentials: true
        }).then((res) => {
            setListProducts(res.data.list);
        })
    }

    const copyText = (e) => {
        if (e.target.dataset.key)
            navigator.clipboard.writeText(e.target.dataset.key);
        setTimeout(() => {
            setOpenPopUp(false);
        }, 100)
    }
    const handleContactInformation = async () => {
        setOpenPopUp(false);
        try {
            const res = await Axios.get(`${SERVER_URL}/getEmailUserByMemberId?id=${data.user_id}`, {
                withCredentials: true
            })
            if (res.data) {
                setDataUser(res.data);
                setOpenPopUp(true)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const getProductById = async (id) => {
        try {
            const res = await Axios.get(`${SERVER_URL}/products/getProductById?id=${id}`, {
                withCredentials: true
            })
            setData(res.data);

        } catch (err) {
            console.log(err)
        }
    }
    const handleLike = async () => {
        debugger
        await setLikeProduct(!like);
        setLike(prev => !prev);
    }

    const setLikeProduct = async (myLike) => {
        debugger
        if (myLike){
            const list = listOfFavoritProducts.slice();
            list.push(data)
            dispatch(initFavoritProducts(list));
            await addLikeProduct(data.product_id, userLogIn.userId)
        }
        else {
            const list = listOfFavoritProducts.filter(i => i.product_id !== data.product_id);
            dispatch(initFavoritProducts(list));
            await removeFavoritProduct(data.product_id, userLogIn.userId)
        }
    }
    const PopUpContactInformation = () => {
        return (
            <Box style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "center" }}>
                <p style={{ fontSize: "20px" }}>{dataUser && dataUser.name}</p>
                <span style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button size="medium" >
                        {data.phone_number}
                    </Button><ContentCopyIcon
                        style={{ cursor: "pointer", ml: 2 }}
                        data-key={data.phone_number}
                        onClick={copyText} />
                </span>
                {dataUser && <span style={{ marginTop: "5px", display: "flex", justifyContent: "space-between" }}>
                    <Button size="medium">
                        {dataUser.email}
                    </Button>
                    <ContentCopyIcon
                        style={{ cursor: "pointer", ml: 2 }}
                        data-key={dataUser.email}
                        onClick={copyText} />
                </span>}
            </Box>
        )
    }
    return (<Box sx={{ mt: "100px" }}>{data && <>
        <p className='category-name'>Category: <span >{data.CategoryName}</span></p>
        <div className='main-product' >
            <div className='details-product'>
                <div>
                    <img className='img-product' src={`${data.image_name ? `${SERVER_URL}/${data.image_name}` : "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=250&h=200&fit=crop&auto=format"}`} />
                </div>
                <div className='text-details'>
                    <span >
                        <p className='title title-product'>{data.title}</p>
                    </span>
                    <span >
                        <p className='updated-product'><span className='title'>Updated on:</span> {visitDate}</p>
                    </span>
                    <span >
                        <p className=''><span className='title'>Product description: </span>{data.description}</p>
                    </span>
                    <span >
                        <p className=''><span className='title'>Addres: </span>{data.city} {data.street && `street ${data.street} `}{data.numberAtHome && `number ${data.numberAtHome}`}</p>
                    </span>
                    <span >
                        <p className='title'>{data.delivery_or_loen === 1 ? `delivery product` : `loaner product`}</p>
                    </span>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                        <IconButton
                            aria-label="add to favorites"
                            onClick={handleLike}
                            sx={{ color: `${like ? "#ff00009c" : "none"}` }}
                        >
                            <FavoriteIcon />
                        </IconButton>
                        <Button variant="contained" size="medium" onClick={handleContactInformation}>
                            <ContactPhoneIcon sx={{ mr: 2 }} /><span> Contact Information</span>
                        </Button>
                    </div>

                    <DraggableDialog content={PopUpContactInformation()} open={openPopUp} handleClose={() => setOpenPopUp(false)} />
                </div>
            </div>
        </div>
    </>}
        <Box style={{ marginTop: "60px" }}>{listProducts[0] && <AdvancedCarousel list={listProducts.filter(i => i.product_id !== data.product_id)} />}</Box>
    </Box>);
}
