import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const image = {
    title: "Delete an image",
    width: "100%"
};
const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 250,
    [theme.breakpoints.down("sm")]: {
        width: "100% !important", // Overrides inline-style
        height: 200
    },
    "&:hover, &.Mui-focusVisible": {
        zIndex: 1,
        "& .MuiImageBackdrop-root": {
            opacity: 0.15
        },
        "& .MuiImageMarked-root": {
            opacity: 0
        },
        "& .MuiTypography-root": {
            border: "4px solid currentColor"
        }
    }
}));

const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
});

const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
}));


export default function ImgBackUi({ url, file, onClick, disabled }) {
    const getImageUrl = () => {
        return url.replace(/ /g, "%20").replace('(', "%28").replace(")", "%29");
    }

    const img = file ? URL.createObjectURL(file) : getImageUrl()


    return (
        <Box
            sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
            onClick={onClick}
        >
            <ImageButton
                focusRipple
                key={image.title}
                style={{
                    width: image.width
                }}
            >
                <ImageSrc style={{ backgroundImage: `url(${img})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                            position: "relative",
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
                        }}
                    >
                        <input hidden accept="image/*" multiple type="file" />
                        {disabled ? image.title : "Click edit"}
                    </Typography>
                </Image>
            </ImageButton>
            <input hidden accept="image/*" multiple type="file" />
        </Box>
    );
}
