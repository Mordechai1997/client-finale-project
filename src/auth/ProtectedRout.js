import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL, BASE_ROUTE } from '../constants';
import { useNavigate } from 'react-router-dom';


export const IsAuth = async () => {

    const navigate = useNavigate();
    console.log('IsAuth');

    try {
      const data  = await axios.get(`${SERVER_URL}/${BASE_ROUTE.AUTH}`, {
        withCredentials: true
      })
      console.log(data)
    } catch (err) {
      console.error(err);
      navigate('/')
    }
  }