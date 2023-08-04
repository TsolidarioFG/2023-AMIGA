import React from 'react';

import Button from '@mui/material/Button';
import './Form.css';
import RegisterMinor from "./RegisterMinor";
import FormPage2Part2 from "./FormPage2Part2";
import {HomeLink} from "../../../common";


const FormPage1 = ({formData, setFormData, previousPage, nextPage}) => {

    return (
        <div className="container">
            <div className="header">
                <h1>Datos personales</h1>
                <HomeLink></HomeLink>
            </div>
            <RegisterMinor formData={formData} setFormData={setFormData}></RegisterMinor>
            <br/>
            <FormPage2Part2 formData={formData} setFormData={setFormData}></FormPage2Part2>

            <div className="center">
                <Button variant="contained" onClick={previousPage}>Anterior</Button>
                <div className="bigSpace"></div>
                <Button variant="contained" onClick={nextPage}>Siguiente</Button>
            </div>

        </div>
    );
};

export default FormPage1;
