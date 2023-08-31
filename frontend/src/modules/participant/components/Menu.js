import React, {useState} from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from '@mui/material';
import {Menu as MenuIcon, NoteAdd, Visibility, WorkHistory} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const Menu = ({participant}) => {
    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleEdit = () => {
        navigate('/participant/workInsertion/' + participant.idParticipant);
    };

    const handleViewData = () => {
        navigate('/participant/data');
    };

    const handleObservationForm = () => {
        navigate('/participant/observationForm');
    };

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <div>

            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                <MenuIcon/>
            </IconButton>

            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
                <List style={{width: '250px'}}>
                    <ListItem button onClick={handleViewData}>
                        <ListItemIcon>
                            <Visibility/>
                        </ListItemIcon>
                        <ListItemText primary="Datos"/>
                    </ListItem>
                    <ListItem button onClick={handleEdit}>
                        <ListItemIcon>
                            <WorkHistory/>
                        </ListItemIcon>
                        <ListItemText primary="Inserciones laborales"/>
                    </ListItem>
                    <ListItem button onClick={handleObservationForm}>
                        <ListItemIcon>
                            <NoteAdd/>
                        </ListItemIcon>
                        <ListItemText primary="Añadir Atención"/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default Menu;
