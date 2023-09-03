import React, {useState} from "react";
import './Form/Confirm.css';
import Typography from "@mui/material/Typography";
import './Participant.css'
import Menu from "./Menu";
import {useDispatch, useSelector} from "react-redux";
import * as userSelector from "../selectors";
import ObservationList from "./ObservationList";
import {Alert, Grid, Select, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import * as actions from "../actions";
import {useNavigate} from "react-router-dom";

const ParticipantDetails = () => {
    const participant = useSelector(userSelector.getParticipantData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const date = new Date();
    const [selectedItems, setSelectedItems] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const handleSelectChange = (event) => {
        setSelectedItems(event.target.value);
    }
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    }

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    }
    const handleNewAnnualData = () => {
        navigate('/participant/newAnnualData');
    }
    const handleFindClick = () => {
        dispatch(actions.findObservations({
            idParticipant: participant.idParticipant,
            page: 0,
            startDate: startDate,
            endDate: endDate,
            types: selectedItems
        }))
    }

    if (!participant)
        return null

    return (
        <div className="container">

            {date.getFullYear() !== Math.max(...participant.yearList) ?
                <Alert elevation={3} color="info" style={{marginBottom: '20px'}} className="banner"
                       onClick={handleNewAnnualData}>
                    <Typography variant="h6" align="center">
                        Haz click para registrar datos año actual
                    </Typography>
                </Alert>
                : null
            }

            <div className="details-container">
                <div className="details-menu-header">
                    <Menu participant={participant}/>
                    <Typography variant="h6" align="left">
                        {"Listado atenciones " + participant.name}
                    </Typography>
                </div>
                <div className="details-container">
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <TextField
                                label="Fecha inicio"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{shrink: true}}
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Fecha fin"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{shrink: true}}
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined">
                                <InputLabel>Tipo</InputLabel>
                                <Select
                                    label="Tipo"
                                    multiple
                                    value={selectedItems}
                                    onChange={handleSelectChange}
                                    className="item"
                                >
                                    <MenuItem value="GENERAL">General</MenuItem>
                                    <MenuItem value="LEGAL">Juridico</MenuItem>
                                    <MenuItem value="LABOUR">Laboral</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleFindClick}>
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <ObservationList></ObservationList>
        </div>

    );
};

export default ParticipantDetails;
