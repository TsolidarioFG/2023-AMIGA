import React from 'react';

import Button from '@mui/material/Button';
import './Form.css';
import RegistrarMenor from "./RegistrarMenor";
import FormPage1Part3 from "./FormPage1Part3";
import {HomeLink} from "../../common";


const FormPage1 = ({formData, setFormData, previousPage, nextPage}) => {

    return (
        <div className="container">
            <div className="header">
                <h1>Datos personales</h1>
                <HomeLink></HomeLink>
            </div>
            <RegistrarMenor formData={formData} setFormData={setFormData}></RegistrarMenor>
            <br/>
            <FormPage1Part3 formData={formData} setFormData={setFormData}></FormPage1Part3>

            <div className="center">
                <Button variant="contained" onClick={previousPage}>Anterior</Button>
                <div className="bigSpace"></div>
                <Button variant="contained" onClick={nextPage}>Siguiente</Button>
            </div>

        </div>
    );
};

export default FormPage1;
