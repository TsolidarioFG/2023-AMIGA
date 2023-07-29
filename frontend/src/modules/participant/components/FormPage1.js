import React, {useState} from 'react';

import Button from '@mui/material/Button';
import './Form.css';
import FormPage1Part1 from "./FormPage1Part1";
import {Errors, HomeLink} from "../../common";
import FormPage1Part2 from "./FormPage1Part2";
import {validarFormatoDNI, validarFormatoNIE} from "../actions";

const FormPage1 = ({formData, setFormData, nextPage}) => {

    const [backendErrors, setBackendErrors] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.dni !== ''){
            if(!validarFormatoDNI(formData.dni)){
                setBackendErrors({globalError: 'Formato DNI incorrecto'});
                return;
            }

        }
        if(formData.nie !== ''){
            if(!validarFormatoNIE(formData.nie)){
                setBackendErrors({globalError: 'Formato NIE incorrecto'});
                return;
            }
        }
        if(formData.nie === '' && formData.dni === '' && formData.pas === ''){
            setBackendErrors({globalError:"Falta documento identificativo."});
            return;
        }

        if (formData.province === null ) {
            setBackendErrors({globalError:"Provincia no seleccionada."});
            return;
        }

        if ( formData.municipality === null) {
            setBackendErrors({globalError:"Municipio no seleccionado."});
            return;
        }

        if ( formData.country === null) {
            setBackendErrors({globalError:"País de origen no seleccionado."});
            return;
        }
        if ( formData.maritalStatus === null) {
            setBackendErrors({globalError:"Estado civil no seleccionado."});
            return;
        }
        if ( formData.housing === null) {
            setBackendErrors({globalError:"Vivienda no seleccionada."});
            return;
        }
        if ( formData.cohabitation === null) {
            setBackendErrors({globalError:"Tipo convivencia no seleccionado."});
            return;
        }
        nextPage();
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Datos personales</h1>
                <HomeLink></HomeLink>
            </div>

            <form onSubmit={handleSubmit}>
                <FormPage1Part1 formData={formData} setFormData={setFormData}></FormPage1Part1>
                <FormPage1Part2 formData={formData} setFormData={setFormData}></FormPage1Part2>
                <br/>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="center">
                    <Button variant="contained" type="submit">
                        Siguiente
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormPage1;
