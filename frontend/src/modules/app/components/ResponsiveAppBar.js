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


function ResponsiveAppBar() {
    const [value, setValue] = useState(0);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color="inherit">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Avatar
                        alt="AMIGA Logo"
                        src={process.env.PUBLIC_URL + '/logopng.png'}
                        sx={{
                            display: 'flex',
                            mr: 1,
                            width: 1892 / 8, // Adjust the size according to your needs
                            height: 692 / 8, // Adjust the size according to your needs
                            borderRadius: 0,
                            marginTop: 2,
                            marginBottom: 1
                        }}
                        onClick={() => navigate('/')}
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
                            <MenuItem variant="contained" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Participantes</Typography>
                            </MenuItem>
                            <MenuItem variant="contained" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Estadísticas</Typography>
                            </MenuItem>
                            <MenuItem variant="contained" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Voluntariado</Typography>
                            </MenuItem>
                            <MenuItem variant="contained" onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Técnicos</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Tabs value={value} onChange={handleChange}
                            variant="fullWidth"
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="Navigation tabs"
                        >
                            <Tab label="Participantes" onClick={handleCloseNavMenu} />
                            <Tab label="Estadísticas" onClick={handleCloseNavMenu} />
                            <Tab label="Voluntariado" onClick={handleCloseNavMenu} />
                            <Tab label="Técnicos" onClick={handleCloseNavMenu} />
                        </Tabs>
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
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
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
