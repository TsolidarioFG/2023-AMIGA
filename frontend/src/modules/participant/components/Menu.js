import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText, Paper} from '@mui/material';
import {AddCircle, NoteAdd, Visibility, WorkHistory} from '@mui/icons-material';
import "./Participant.css";
import {useNavigate} from "react-router-dom";

const Menu = ({user}) => {
    const navigate = useNavigate();
    const date = new Date();
    const handleEdit = () => {
    }

    const handleViewData = () => {
        navigate('/participant/data');
    }

    const handleNewAnnualData = () => {
        navigate('/participant/newAnnualData');
    }

    const handleObservationForm = () => {
        navigate("/participant/observationForm");
    }

    return (
        <Paper className="toolbar">
            <List>
                <ListItem button onClick={handleViewData}>
                    <ListItemIcon>
                        <Visibility/>
                    </ListItemIcon>
                    <ListItemText primary="Datos"/>
                </ListItem>
                <ListItem button disabled={date.getFullYear() !== Math.max(...user.yearList)} onClick={handleEdit}>
                    <ListItemIcon>
                        <WorkHistory/>
                    </ListItemIcon>
                    <ListItemText primary="Inserciones laborales"/>
                </ListItem>
                <ListItem button disabled={ Math.max(...user.yearList) === date.getFullYear()} onClick={handleNewAnnualData}>
                    <ListItemIcon>
                        <AddCircle/>
                    </ListItemIcon>
                    <ListItemText primary="Nueva Inscripción Anual"/>
                </ListItem>
                <ListItem button onClick={handleObservationForm}>
                    <ListItemIcon>
                        <NoteAdd/>
                    </ListItemIcon>
                    <ListItemText primary="Añadir Observación"/>
                </ListItem>

            </List>
        </Paper>
    );
};

export default Menu;
