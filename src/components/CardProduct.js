import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { SERVER_URL, BASE_ROUTE } from '../constants';
import { useNavigate } from 'react-router-dom';
import ModeIcon from '@mui/icons-material/Mode';
import { useDispatch, useSelector } from "react-redux";
import { addLikeProduct, deleteMyProduct, removeFavoritProduct } from "../services/ApiServicesProduct";
import { initFavoritProducts } from "./listProductsSlice";
import { Box } from "@mui/material";
import DraggableDialog from "./PopUp";
import ReportIcon from '@mui/icons-material/Report';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import ReportProduct from "./ReportProduct";

export default function CardProduct({ item, fromFavoritProductsPage = false, fromMyProductsPage = false }) {

  const listOfFavoritProducts = useSelector((state) => state.reducer.listProducts.listOfFavoritProducts);
  const listOfMyProducts = useSelector((state) => state.reducer.listProducts.listOfMyProducts);
  const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [like, setLike] = useState(fromFavoritProductsPage ? true : listOfFavoritProducts?.some(el => el.product_id === item.product_id));
  const [isMyProduct, setIsMyProduct] = useState(fromMyProductsPage ? true : listOfMyProducts?.some(el => el.product_id === item.product_id));
  const [openPopUp, setOpenPopUp] = useState(false);
  const [loadedImg, setLoadedImg] = useState(true);
  const [openReport, setOpenReport] = useState(false);
  const [openPopUpSuccess, setOpenPopUpSuccess] = useState(false);


  useEffect(() => {
    setIsMyProduct(fromMyProductsPage ? true : listOfMyProducts?.some(el => el.product_id === item.product_id));
  }, [fromFavoritProductsPage, listOfFavoritProducts, fromMyProductsPage, listOfMyProducts, item.product_id])

  const navigateToProductPage = () => {
    if (!isMyProduct)
      navigate(`/Product?productId=${item.product_id}`, { state: item });
    else
      navigate(`/editProduct?productId=${item.product_id}`, { state: item });

  }

  const handleLike = async () => {
    await setLikeProduct(!like);
    if (!fromFavoritProductsPage) {
      setLike(prev => !prev);
    }
  }

  const setLikeProduct = async (myLike) => {
    if (myLike) {
      const list = listOfFavoritProducts.slice();
      list.push(item)
      dispatch(initFavoritProducts(list));
      await addLikeProduct(item.product_id, userLogIn.userId)
    }
    else {
      const list = listOfFavoritProducts.filter(i => i.product_id !== item.product_id);
      dispatch(initFavoritProducts(list));
      await removeFavoritProduct(item.product_id, userLogIn.userId)
    }
  }
  const handelClickDelete = () => {
    setOpenPopUp(true)
  }
  const deleteProduct = () => {
    deleteMyProduct(item.product_id)
    setOpenPopUp(false);
    setOpenPopUpSuccess(true)
    setTimeout(() => {
      navigate(`/`);
    }, 1000)
  }

  return (
    <>
      <ReportProduct item={item} open={openReport} closeReport={() => setOpenReport(false)} />
      <DraggableDialog title={"Are you sure you want to delete the product?"} open={openPopUp} handleClose={() => setOpenPopUp(false)} handleOk={deleteProduct} />
      <DraggableDialog title={<p style={{ color: "green" }}>The delete was successfully</p>} open={openPopUpSuccess} handleOk={() => setOpenPopUpSuccess(false)} />
      <Card
        className="card-product"
        sx={{
          maxWidth: 345,
          borderRadius: "8px",
          position: "relative",
          m: 2,
          flex: '1 1 30%',

        }}
      >
        <span style={{ cursor: "pointer" }} onClick={navigateToProductPage}>
          {loadedImg &&
            <Skeleton variant="rectangular" height={194} />}
          <CardMedia
            style={loadedImg ? { display: 'none' } : {}}
            component="img"
            height="194"
            image={item.image_name ? `${SERVER_URL}/${item.image_name}` : "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=250&h=200&fit=crop&auto=format"}
            alt="Paella dish"

            onLoad={() => setLoadedImg(false)}
          />
        </span>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {isMyProduct ?
            <Box>
              <IconButton aria-label="share">
                <DeleteForeverIcon onClick={handelClickDelete} />
              </IconButton>
              <IconButton>
                <ModeIcon onClick={navigateToProductPage} />
              </IconButton>
            </Box> :
            <Box>
              <IconButton
                aria-label="add to favorites"
                onClick={handleLike}
                sx={{ color: `${like ? "#ff00009c" : "none"}` }}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <Tooltip title={"Report"}>
                  <ReportIcon onClick={() => setOpenReport(true)} />
                </Tooltip>
              </IconButton>
            </Box>
          }
          <Typography sx={{ right: "0", position: "absolute", m: 2 }}>
            {item.CategoryName}
          </Typography>
        </CardActions>

      </Card>
    </>

  );
}
