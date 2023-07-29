import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as selectors from "../../app/selectors";
import "./Form.css";
import {format} from "date-fns";
import {Errors, HomeLink} from "../../common";
import Programs from "./Programs";

const FormPage3 = ({formData, setFormData, previousPage, nextPage}) => {
    const demands = useSelector(selectors.getDemands);
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [backendErrors, setBackendErrors] = useState(null);
    const [selectedDemand, setSelectedDemand] =
        useState(demands.find((demands) => demands.id === formData.demand) || null);

    const handleDemandChange = (event, value) => {
        if (value) {
            setFormData({...formData, demand: value.id});
            setSelectedDemand(demands.find((demands) => demands.id === value.id))
        } else {
            setFormData({...formData, demand: null});
            setSelectedDemand(null);
        }
    };

    const handleDerivationChange = (event) => {
        setFormData({...formData, derivation: event.target.value});
    };

    const handleObservationsChange = (event) => {
        setFormData({...formData, observations: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const {name} = event.nativeEvent.submitter;

        if (formData.demand === null ) {
            setBackendErrors({globalError:"Ninguna demanda seleccionada."});
            return;
        }

        if (name === 'previous') {
            previousPage();
        } else {
            nextPage();
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Tipo demanda</h1>
                <HomeLink></HomeLink>
            </div>
            <Programs formData={formData} setFormData={setFormData}></Programs>
            <form onSubmit={handleSubmit}>
                <div className="row-container">
                    <Autocomplete
                        className="item"
                        options={demands}
                        getOptionLabel={(demand) => demand.name}
                        value={selectedDemand}
                        onChange={handleDemandChange}
                        renderInput={(params) => <TextField {...params} label="Seleccionar demanda"/>}
                    />
                    <TextField
                        required
                        className="item2"
                        label="Derivación"
                        value={formData.derivation || ""}
                        onChange={handleDerivationChange}
                    />

                </div>

                <div className="row-container">
                    <TextField
                        className="item"
                        label="Observaciones"
                        multiline
                        rows={4}
                        value={formData.observations || ""}
                        onChange={handleObservationsChange}
                    />
                </div>
                <br/>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="center">
                    <Button variant="contained" type="submit" name="previous">Anterior</Button>
                    <div className="bigSpace"></div>
                    <Button variant="contained" type="submit" name="next">Siguiente</Button>
                </div>
            </form>
        </div>
    );
};

export default FormPage3;
