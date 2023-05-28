import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import Pages from './Pages';
import { Box } from '@mui/system';
import CardProduct from './CardProduct';
import Spinner from "./Spinner";
import { Button } from '@mui/material';

export default function MyProductsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [countPages, setCountPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const listOfMyProducts = useSelector((state) => state.reducer.listProducts.listOfMyProducts);

    useEffect(() => {
        if (listOfMyProducts) {
            setIsLoading(false)
        }
    }, [])




    return (
        <div style={{
            marginTop: "100px",
        }}>
            {isLoading ? <Spinner isLoading={isLoading} /> :
                <>{listOfMyProducts[0] ? <div
                    className="cointener-my-products"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {listOfMyProducts.map((item, index) => (<CardProduct key={index} item={item} fromMyProductsPage={true} />))}
                </div> :
                    <p> No products you Upload were found to add new product {''}
                        <Button onClick={() => navigate('/publish')} sx={{ textTransform: 'none' }}>
                            click me
                        </Button>
                    </p>}

                </>}
        </div>

    );
}

