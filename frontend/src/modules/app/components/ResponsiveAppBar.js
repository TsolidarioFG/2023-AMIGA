import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import {Tab, Tabs} from "@mui/material";
import {useState} from "react";
import users from "../../users";
import {useDispatch, useSelector} from "react-redux";
import * as selectors from "../../users/selectors";


function ResponsiveAppBar() {
    const [value, setValue] = useState(0);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(selectors.getUser);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleParticipant = () => {
        navigate('/participant');
        setAnchorElNav(null);
    }
    const handleStatistics = () => {
        navigate('/statistics');
        setAnchorElNav(null);
    }
    const handleUsers = () => {
        navigate('/users');
        setAnchorElNav(null);
    }

    const handleVolunteers = () => {
        navigate('/volunteers');
        setAnchorElNav(null);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(users.actions.logout());
        navigate('/login');
        setAnchorElUser(null);
    };

    const handleChangePassword = () => {
        navigate('/users/change-password');
        setAnchorElUser(null);
    };

    const handleUpdateProfile = () => {
        navigate('/users/update-profile');
        setAnchorElUser(null);
    };


    if(user === null)
        return null

    return (
        <AppBar position="static" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar
                        alt="AMIGA Logo"
                        src={process.env.PUBLIC_URL + '/logo.png'}
                        sx={{
                            display: 'flex',
                            mr: 1,
                            width: 1892 / 8, // Adjust the size according to your needs
                            height: 692 / 8, // Adjust the size according to your needs
                            borderRadius: 0,
                            marginTop: 2,
                            marginBottom: 1
                        }}
                        onClick={() => navigate('/participant')}
                    />
                    <div className="space"></div>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuItem variant="contained" onClick={handleParticipant}>
                                <Typography textAlign="center">Participantes</Typography>
                            </MenuItem>
                            <MenuItem variant="contained" onClick={handleStatistics}>
                                <Typography textAlign="center">Estadísticas</Typography>
                            </MenuItem>
                            <MenuItem variant="contained" onClick={handleVolunteers}>
                                <Typography textAlign="center">Voluntariado</Typography>
                            </MenuItem>
                            { user.role === "ADMIN" &&
                            <MenuItem variant="contained" onClick={handleUsers}>
                                <Typography textAlign="center">Técnicos</Typography>
                            </MenuItem>
                            }
                        </Menu>
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Tabs value={value} onChange={handleChange}
                            variant="fullWidth"
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="Navigation tabs"
                        >
                            <Tab label="Participantes" onClick={handleParticipant} />
                            <Tab label="Estadísticas" onClick={handleStatistics} />
                            <Tab label="Voluntariado" onClick={handleVolunteers} />
                            { user.role === "ADMIN" && <Tab label="Técnicos" onClick={handleUsers} />}

                        </Tabs>
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Abrir opciones">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt={user.firstName} src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
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
                            <MenuItem onClick={handleUpdateProfile}>
                                <Typography textAlign="center">Actualizar usuario</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleChangePassword}>
                                <Typography textAlign="center">Cambiar contraseña</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Cerrar sesión</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
