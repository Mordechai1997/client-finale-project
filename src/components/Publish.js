import { useState, useEffect } from 'react';
import Axios from 'axios'
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
import { getAllMyProducts } from '../services/ApiServicesProduct';
import { initListOfMyProducts } from './listProductsSlice';

const listTypeDelivery = [{
  CategoryId: 1,
  CategoryName: 'delivery'
},
{
  CategoryId: 2,
  CategoryName: 'on loan'
}]

export default function Publish() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);
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
    console.log(e.target.files[0].size);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }
  const clearFile = () => {
    setFile(null);
    setFileName(null);
  }
  const setCityProduct = (e) => {
    setCity(e);
    // try{
    //   Axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&q='+city
    //   ).then((e)=>console.log(e))
    // }catch(err){
    //   console.log(err)
    // }
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
        const response = await fetch(`${SERVER_URL}/products/uploadimage`, {
          method: 'POST',
          body: data
        })
      }
      await Axios.post(`${SERVER_URL}/products/addproduct`, {
        userId: userLogIn.userId,
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
      }).then(async () => {
        const newMyList = await getAllMyProducts();
        dispatch(initListOfMyProducts(newMyList));
        setMessage({ message: 'The post was successfully published!', type: 'success' })
        setTimeout(() => {
          changeUrl('/')
        }, 100)
      })
    } catch (err) {
      console.log(err);
      setMessage({ message: 'Something is wrong Try again!', type: 'error' })
    }


  }
  return (
    <Form>
      <SelectField
        list={listSelect}
        label="Select a category"
        handleChange={setSelected}
        value={selected}
      />
      <SelectField
        list={listTypeDelivery}
        label="Select type of delivery"
        handleChange={setSelectedTypeDelivery}
        value={selectedTypeDelivery}
      />
      <TextField
        icon={<Inventory2OutlinedIcon sx={{ m: 1 }} />}
        label="Title"
        id={"title"}
        value={title}
        setValue={setTitle}
        required={true}
      />
      <TextField
        icon={<DescriptionOutlinedIcon
          sx={{ m: 1 }} />}
        label="Description"
        id={description}
        value={description}
        setValue={setDescription}
      />

      <Upload saveFile={saveFile} />
      {fileName &&
        <p style={{ textAlign: "center" }}>
          <span
            style={{
              cursor: 'pointer',
              color: 'grey',
              display: 'block'
            }}
            onClick={clearFile}
          >x</span>
          {fileName}
        </p>
      }
      <TextField
        icon={<PhoneIcon
          sx={{ m: 1 }} />}
        label="phone number"
        id={"phone"}
        value={phone}
        setValue={setPhoneNumber}
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
        />
        <TextField
          sx={{ width: '65%' }}
          icon={<MapsHomeWorkOutlinedIcon
            sx={{ m: 1 }} />}
          label="street"
          id={"street"}
          value={street}
          setValue={setStreet}
        />
      </Box>


      {
        message && <Alert severity={message.type}>
          {message.message}
        </Alert>
      }
      <Button
        sx={{ background: "linear-gradient(145deg, black, blue)", color: 'white' }}
        onClick={handleSubmit}
      >
        Publish
      </Button>
    </Form>
  );
}

