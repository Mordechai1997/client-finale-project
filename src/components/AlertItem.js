import { Box, MenuItem, Typography } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
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
            <Box>
                <ThumbUpOffAltIcon fontSize="small" />
                {" "}
                Congratulations you got a new like for your product
            </Box>
        )
    }
    const ViewAlert = () => {
        return (
            <Box >
                <VisibilityIcon fontSize="small" />
                {" "}
                Someone viewed your product
            </Box>
        )
    }
    const deletionAlert = () => {
        return (
            <Box >
                <TipsAndUpdatesIcon fontSize="small" />
                {" "}
                Update reminder for your product
            </Box>
        )
    }
    return (
        <MenuItem  onClick={navigateProduct} sx={{ backgroundColor: `${alert.userViewedTheAlert ? "#fff" : '#afdbf578'}`, borderBottom: '1px solid #80808045' }}>
            <Typography textAlign="center" component={'div'}>
                {getMsgByType(alert?.typeNotification)}
            </Typography>
        </MenuItem>
    );
}

export default AlertItem;
