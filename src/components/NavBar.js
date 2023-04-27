import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { useSelector, useDispatch } from "react-redux";
import { LogOut } from './userLogInSlice';
import { useNavigate } from 'react-router';
import DraggableDialog from './PopUp'

const pages = [
    { text: 'My products', icon: <CategoryOutlinedIcon />, link: '/my-products' },
    { text: 'New product', icon: <AddchartOutlinedIcon />, link: '/publish' },
    { text: 'My favorit products', icon: <AssignmentIndOutlinedIcon />, link: '/favorit-products' }];
const settings = ['My profile', 'Logout'];

export default function ResponsiveNavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogIn = useSelector((state) => state.reducer.userlogin.userInfo);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [state, setState] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);

    const isMobile = navigator.userAgentData.mobile;

    const changeUrl = (url) => {
        navigate(url)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = (url) => {
        changeUrl(url)
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = (e) => {
        setAnchorElUser(null);
        if (e === 'Logout') {
            setOpenPopUp(true)
        }
        if (e === 'My profile') {
            changeUrl('/Profile');
        }
    };
    const handleOk = () => {
        setOpenPopUp(false)
        dispatch(LogOut());
        changeUrl('/login');
    }
    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setState(false)}
        >
            <List>
                {pages.map((item, index) => (
                    <Button
                        onClick={() => changeUrl(item.link)}
                        sx={{ my: 2, color: 'black', display: 'block' }}
                        key={item.text}
                    >
                        <ListItem button  >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    </Button>
                ))}
            </List>
            <Divider />
        </Box>
    );
    return (
        <AppBar position="fixed" sx={{ background: "linear-gradient(145deg, black, blue)" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => changeUrl('/')}
                        sx={{
                            mr: 2,
                            cursor: 'pointer',
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            onClick={() => setState(true)}
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <SwipeableDrawer
                            anchor={"left"}
                            open={state}
                            onClose={() => setState(false)}
                            onOpen={() => setState(true)}
                        >
                            {list("left")}
                        </SwipeableDrawer>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        onClick={() => changeUrl('/')}
                        sx={{
                            mr: 2,
                            cursor: 'pointer',
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.text}
                                onClick={() => handleCloseNavMenu(page.link)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.text}
                            </Button>
                        ))}
                    </Box>
                    {userLogIn && <IconButton sx={{ size: "large", color: "inherit", mr: 2 }}>
                        <Badge badgeContent={17} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>}
                    {userLogIn ? <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={userLogIn.username}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    alt={userLogIn?.username?.charAt(0).toUpperCase()}
                                    src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> :
                        <Button
                            onClick={() => changeUrl('/login')}
                            className='btn-login'
                            sx={{
                                color: "blue",
                                background: 'white',
                                textTransform: 'none'
                            }} variant="outlined" >Log in
                        </Button>}
                </Toolbar>
            </Container>
            <DraggableDialog title={"Exit?"} handleClose={() => setOpenPopUp(false)} open={openPopUp} handleOk={handleOk} />

        </AppBar>
    );
};

