import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";  
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { SERVER_URL, BASE_ROUTE } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function CardProduct({ item }) {

  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const navigateToProductPage = () => {
    navigate(`/Product?productId=${item.product_id}`, { state: item });
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "8px",
        position: "relative",
        m: 2,
        flex: '1 1 30%',

      }}
    >
      <CardMedia
        style={{ cursor: "pointer" }}
        component="img"
        height="194"
        image={item.image_name ? `${SERVER_URL}/${item.image_name}` : "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=250&h=200&fit=crop&auto=format"}
        alt="Paella dish"
        onClick={navigateToProductPage}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => setLike(!like)}
          sx={{ color: `${like ? "#ff00009c" : "none"}` }}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Typography sx={{ right: "0", position: "absolute", m: 2 }}>
          {item.CategoryName}
        </Typography>
      </CardActions>
    </Card>
  );
}
