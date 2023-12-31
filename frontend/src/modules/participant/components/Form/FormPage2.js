import React, {useState} from 'react';

import Button from '@mui/material/Button';
import './Form.css';
import RegisterMinor from "./RegisterMinor";
import FormPage2Part2 from "./FormPage2Part2";
import {ButtonLink, Errors} from "../../../common";


const FormPage1 = ({formData, setFormData, previousPage, nextPage, exit}) => {

    const [backendErrors, setBackendErrors] = useState(null);

    const handleSubmitNext = () => {

        if(formData.situation === ''){
            setBackendErrors({globalError: 'Rellena situación administrativa'});
        }else{
            nextPage();
        }
    }

    const handleSubmitPrevious = () => {

        if(formData.situation === ''){
            setBackendErrors({globalError: 'Rellena situación administrativa'});
        }else{
            previousPage();
        }

    }

    return (
        <div className="container">
            <div className="header">
                <h1>Datos personales</h1>
                <ButtonLink route={exit}></ButtonLink>
            </div>
            <RegisterMinor formData={formData} setFormData={setFormData}></RegisterMinor>
            <br/>
            <FormPage2Part2 formData={formData} setFormData={setFormData}></FormPage2Part2>
            <br/>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="center">
                <Button variant="contained" onClick={handleSubmitPrevious}>Anterior</Button>
                <div className="bigSpace"></div>
                <Button variant="contained" onClick={handleSubmitNext}>Siguiente</Button>
            </div>

        </div>
    );
};

export default FormPage1;
