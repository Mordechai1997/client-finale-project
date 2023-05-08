import { useState, useEffect } from 'react';
import Axios from 'axios'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { PasswordField } from './PasswordField'
import { validPublic } from './Valid';
import Form from './Form';
import { useSelector, useDispatch } from "react-redux";
import { LogIn, LogOut } from "./userLogInSlice";
import Upload from './UploadField';
import SelectField from './SelectField';
import TextField from './TextField';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PhonField from './PhonField';
import PhoneInput from 'react-phone-number-input'
import PhoneIcon from '@mui/icons-material/Phone';
import { Box } from '@mui/system';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';
import { SERVER_URL, BASE_ROUTE } from '../constants';
import useAllCategorys from '../Hooks/useAllCategorys';
import { getAllMyProducts, getMyProductByIdApi, uploadImage, updateMyProduct } from '../services/ApiServicesProduct';
import { initListOfMyProducts } from './listProductsSlice';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ImgBackUi from './ImgBackUi';

const listTypeDelivery = [{
    CategoryId: 1,
    CategoryName: 'delivery'
},
{
    CategoryId: 2,
    CategoryName: 'on loan'
}]

export default function EditProduct() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);
    const listOfFavoritProducts = useSelector((state) => state.reducer.listProducts.listOfFavoritProducts);
    const listOfMyProducts = useSelector((state) => state.reducer.listProducts.listOfMyProducts);

    const [data, setData] = useState(state);
    const listSelect = useAllCategorys();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [numberAtHome, setNnumberAtHome] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [description, setDescription] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState('');
    const [selected, setSelected] = useState('');
    const [selectedTypeDelivery, setSelectedTypeDelivery] = useState('');
    const [pageId, setPageId] = useState();
    const [disabled, setdisabled] = useState(true);


    useEffect(() => {
        const id = searchParams.get("productId");
        if (!listOfMyProducts?.some(el => el.product_id + '' === id)) {
            navigate(`/Product?productId=${id}`);
            return
        }
        if (!data || pageId !== id) {
            initAllState(id);
        }
    })
    const initAllState = async (id) => {
        const res = await getMyProductById(id)
        window.scrollTo(0, 0);
        if (res) {
            setData(res)
            setPageId(id);

            setTitle(res.title)
            setStreet(res.street)
            setPhone(res.phone_number)
            setNnumberAtHome(res.numberAtHome)
            setDescription(res.description)
            setCity(res.city)
            setFileName(res.image_name);
            setSelected(listSelect?.findIndex(i => i.CategoryName === res.CategoryName) + 1)
            setSelectedTypeDelivery(listTypeDelivery?.findIndex(i => i.CategoryId === res.delivery_or_loen) + 1)
        }

    }
    const getMyProductById = async (id) => {
        try {
            const resData = await getMyProductByIdApi(id)
            return resData;
        } catch (err) {
            console.log(err)
        }
    }
    const changeUrl = (url) => {
        navigate(url)
    }
    const setPhoneNumber = (e) => {
        if (containsOnlyNumbers(e) || !e) {
            setPhone(e);
        }
    }
    const setNnumberAtHomeOnlyNumber = (e) => {
        if (containsOnlyNumbers(e) || !e) {
            setNnumberAtHome(e);
        }
    }
    const containsOnlyNumbers = (str) => {
        return /^\d+$/.test(str);
    }
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }
    const clearFile = () => {
        if (disabled) {
            return;
        }
        setFile(null);
        setFileName("");
    }
    const setCityProduct = (e) => {
        setCity(e);
    }
    const handleSubmit = async () => {
        const result = validPublic(selected, title, fileName, phone, city, selectedTypeDelivery)
        if (result.type === 'error') {
            setMessage(result);
            return;
        }
        try {

            if (file) {
                const data = new FormData();
                data.append('file', file);
                const response = await uploadImage(data)
            }
            const resUpdate = await updateMyProduct(data.product_id,userLogIn.userId, selected, title, fileName, phone, city, street, description, numberAtHome, selectedTypeDelivery)

            const newMyList = await getAllMyProducts();
            dispatch(initListOfMyProducts(newMyList));
            setMessage({ message: 'The post was successfully update!', type: 'success' })
            // setTimeout(() => {
            //     changeUrl('/')
            // }, 100)

        } catch (err) {
            console.log(err);
            setMessage({ message: 'Something is wrong Try again!', type: 'error' })
        }


    }
    const handelEditBtn = () => {
        setdisabled(prev => !prev);
        if (disabled) {
            window.scrollTo(0, 0);
        }
    }
    return (
        <Form>
            <SelectField
                list={listSelect}
                label="Select a category"
                handleChange={setSelected}
                value={selected}
                disabled={disabled}
            />
            <SelectField
                list={listTypeDelivery}
                label="Select type of delivery"
                handleChange={setSelectedTypeDelivery}
                value={selectedTypeDelivery}
                disabled={disabled}

            />
            <TextField
                icon={<Inventory2OutlinedIcon sx={{ m: 1 }} />}
                label="Title"
                id={"title"}
                value={title}
                setValue={setTitle}
                required={true}
                disabled={disabled}

            />
            <TextField
                icon={<DescriptionOutlinedIcon
                    sx={{ m: 1 }} />}
                label="Description"
                id={description}
                value={description}
                setValue={setDescription}
                disabled={disabled}

            />
            {
                fileName &&
                <ImgBackUi disabled onClick={clearFile} url={`${SERVER_URL}/${fileName}`} file={file} />

                // <img style={{ width: "85%", height: "200px" }} src={`${SERVER_URL}/${fileName}`} alt={fileName} />

            }{
                !disabled &&
                <Upload textBtn={fileName ? "Change image" : false} saveFile={saveFile} />
            }
            <TextField
                icon={<PhoneIcon
                    sx={{ m: 1 }} />}
                label="phone number"
                id={"phone"}
                value={phone}
                setValue={setPhoneNumber}
                disabled={disabled}
                required={true}
            />
            <TextField
                icon={<ApartmentSharpIcon
                    sx={{ m: 1 }} />}
                label="city"
                id={"city"}
                value={city}
                setValue={setCityProduct}
                required={true}
                disabled={disabled}

            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    sx={{ width: '30%' }}
                    icon={<MapsHomeWorkOutlinedIcon
                        sx={{ m: 1 }} />}
                    label="Apartment"
                    id={"numberAtHome"}
                    value={numberAtHome}
                    setValue={setNnumberAtHomeOnlyNumber}
                    disabled={disabled}

                />
                <TextField
                    sx={{ width: '65%' }}
                    icon={<MapsHomeWorkOutlinedIcon
                        sx={{ m: 1 }} />}
                    label="street"
                    id={"street"}
                    value={street}
                    setValue={setStreet}
                    disabled={disabled}

                />
            </Box>


            {
                message && <Alert severity={message.type}>
                    {message.message}
                </Alert>
            }
            {
                !disabled &&
                <Button
                    variant={"contained"}
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            }
            <Button
                variant={disabled ? "contained" : "outlined"}
                onClick={handelEditBtn}
            >
                {disabled ? 'Edit' : 'Cancel'}
            </Button>

            <Button variant="contained" color="error">
                Delete
            </Button>
        </Form>
    );
}

