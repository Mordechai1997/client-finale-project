import { Box, MenuItem, Typography } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";

function AlertItem({ alert }) {

    const navigate = useNavigate();


    const getMsgByType = (type) => {
        switch (type) {
            case 1:
                return ViewAlert();
            case 2:
                return deletionAlert();
            case 3:
                return likeAlert();
            default:
                return "No value found";
        }
    }
    const navigateProduct = () => {
        navigate(`/Product?productId=${alert.productId}`);
    }
    const likeAlert = () => {
        return (
            <Box onClick={navigateProduct}>
                <ThumbUpOffAltIcon fontSize="small" />
                {" "}
                Congratulations you got a new like for your product
            </Box>
        )
    }
    const ViewAlert = () => {
        return (
            <Box onClick={navigateProduct}>
                <VisibilityIcon fontSize="small" />
                {" "}
                Someone viewed your product
            </Box>
        )
    }
    const deletionAlert = () => {
        return (
            <Box onClick={navigateProduct}>
                <DeleteForeverIcon fontSize="small" />
                {" "}
                If the product is not relevant, it should be removed from the site
            </Box>
        )
    }
    return (
        <MenuItem sx={{ backgroundColor: `${alert.userViewedTheAlert ? "#fff" : '#afdbf578'}`, borderBottom: '1px solid #80808045' }}>
            <Typography textAlign="center">
                {getMsgByType(alert?.typeNotification)}
            </Typography>
        </MenuItem>
    );
}

export default AlertItem;
