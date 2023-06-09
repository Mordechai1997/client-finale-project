import { useEffect, useState } from 'react';
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
import { getAllUserNotifications } from '../services/ApiServicesUser';
import AlertItem from './AlertItem';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';

const pages = [
    { text: 'Home', icon: <HomeIcon />, link: '/' },
    { text: 'My products', icon: <CategoryOutlinedIcon />, link: '/my-products' },
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
    const [allNotifications, setAllNotifications] = useState([]);
    const [openAlerts, setOpenAlerts] = useState(false);



    // const isMobile = navigator.userAgentData.mobile;
    useEffect(() => {
        if (userLogIn) {
            initNotifications()
        }
    }, [userLogIn])
    const initNotifications = async () => {
        const data = await getAllUserNotifications();
        setAllNotifications(data);
    }
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
    const OpenAlerts = async () => {
        setOpenAlerts(prev => !prev);
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
                        sx={{ width: "100%", color: 'black', display: 'block' }}
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
                        variant="span"
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
                        <img src='../my-logo.gif' alt="logo" style={{ width: '80px', height: '80px' }} />
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
                            <img src='../my-logo.gif' alt="logo" style={{ width: '50px', height: '50px' }} />
                            {list("left")}
                        </SwipeableDrawer>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {userLogIn && pages.map((page) => (
                            <Button
                                key={page.text}
                                onClick={() => handleCloseNavMenu(page.link)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.text}
                            </Button>
                        ))}
                    </Box>
                    <EmailIcon sx={{ cursor: 'pointer' }} onClick={() => changeUrl('contact-us')} />

                    {userLogIn &&
                        <Box>
                            <IconButton
                                onClick={OpenAlerts}
                                sx={{ size: "large", color: "inherit", mr: 2 }}>
                                <Badge badgeContent={allNotifications.filter((i) => !i.userViewedTheAlert).length} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
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
                                open={(openAlerts)}
                                onClose={() => setOpenAlerts(false)}
                            >

                                {allNotifications?.map((alert, index) => (
                                    <AlertItem key={index} alert={alert} initNotifications={initNotifications} />
                                ))}
                            </Menu>
                        </Box>
                    }

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
                                ml: 2,
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

