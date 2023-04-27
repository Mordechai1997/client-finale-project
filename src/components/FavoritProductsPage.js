import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import Pages from './Pages';
import { Box } from '@mui/system';
import CardProduct from './CardProduct';
import Spinner from "./Spinner";

export default function FavoritProductsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [countPages, setCountPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const listOfFavoritProducts = useSelector((state) => state.reducer.listProducts.listOfFavoritProducts);

    useEffect(() => {
        if (listOfFavoritProducts) {
            setIsLoading(false)
        }
    }, [])




    return (
        <div style={{
            marginTop: "100px",
        }}>
            {isLoading ? <Spinner isLoading={isLoading} /> :
                <>{listOfFavoritProducts[0] ? <div
                    className="cointener"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {listOfFavoritProducts.map((item, index) => (<CardProduct key={index} item={item} fromFavoritProductsPage={true} />))}
                </div> :
                    <h1> No products you liked were found </h1>}

                </>}
        </div>

    );
}

