import React, {useEffect, useState} from 'react';
import './Form.css';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import * as selectors from "../../app/selectors";
import {useSelector} from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const FormPage1Part3 = ({formData, setFormData}) => {
    const exclusionFactors = useSelector(selectors.getExclusions);

    const [selectedExclusionFactors, setSelectedExclusionFactors] = useState([]);
    const [isInternationalProtection, setIsInternationalProtection] = useState(false);
    const [hasSocialWorker, setHasSocialWorker] = useState(false);
    const [hasSocialCoverage, setHasSocialCoverage] = useState(false);
    const [unemployedHousehold, setUnemployedHousehold] = useState( false);
    const [returned, setReturned] = useState(false);
    const [oneAdultHousehold, setOneAdultHousehold] = useState(false);
    const [dependants, setDependants] = useState(false);
    const [situation, setSituation] = useState('');

    const handleSituationChange = (event) => {
        const value = event.target.value;
        setSituation(value);
        setFormData({...formData, situation: value});
    };
    const handleUnemployedHouseholdChange = (event) => {
        const value = event.target.value === 'true';
        setUnemployedHousehold(value);
        setFormData({...formData, unemployedHousehold: value});
    };

    const handleOneAdultHouseholdChange = (event) => {
        const value = event.target.value === 'true';
        setOneAdultHousehold(value);
        setFormData({...formData, oneAdultHousehold: value});
    };

    const handleDependantsChange = (event) => {
        const value = event.target.value === 'true';
        setDependants(value);
        setFormData({...formData, dependants: value});
    };
    const handleReturnedChange = (event) => {
        const value = event.target.value === 'true';
        setReturned(value);
        setFormData({...formData, returned: value});
    };
    const handleFactorsChange = (event, value) => {
        const selectedFactors = value.map((factor) => factor.id);
        setSelectedExclusionFactors(value);
        setFormData({...formData, exclusionFactors: selectedFactors});
    };

    useEffect(() => {
        if (formData.exclusionFactors && formData.exclusionFactors.length > 0) {
            const selected = formData.exclusionFactors.map((factorId) =>
                exclusionFactors.find((factor) => factor.id === factorId)
            );
            setSelectedExclusionFactors(selected);
        }
    }, [formData.exclusionFactors, exclusionFactors]);

    useEffect(() => {
            setOneAdultHousehold(formData.oneAdultHousehold || false);
            setDependants(formData.dependants || false);
            setReturned(formData.returned || false);
            setUnemployedHousehold(formData.unemployedHousehold || false);
            setHasSocialCoverage(formData.healthCoverage !== '');
            setHasSocialWorker(formData.socialWorker !== '');
            setIsInternationalProtection(formData.datePi !== '');
            setSituation(formData.situation || '');
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleProtectionChange = () => {
        if (isInternationalProtection) {
            setFormData({...formData, datePi: '', interviewPi: ''})
        }
        setIsInternationalProtection(!isInternationalProtection)


    };
    const handleSocialWorkerChange = () => {
        if (hasSocialWorker)
            setFormData({...formData, socialWorker: ''})
        setHasSocialWorker(!hasSocialWorker)

    };
    const handleSocialCoverageChange = () => {
        if (hasSocialCoverage)
            setFormData({...formData, healthCoverage: ''})
        setHasSocialCoverage(!hasSocialCoverage);

    };
    if(!exclusionFactors)
        return null;

    return (
        <div>
            <div className="row-container">
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isInternationalProtection"
                            checked={isInternationalProtection}
                            onChange={handleProtectionChange}
                        />
                    }
                    label="Protección Internacional"
                />


                <TextField
                    className="item"
                    type="date"
                    name="datePi"
                    value={formData.datePi}
                    onChange={handleChange}
                    label="Fecha de Manifestación PI"
                    placeholder="Fecha de Manifestación PI"
                    InputLabelProps={{shrink: true}}
                    disabled={!isInternationalProtection}
                />
                <TextField
                    className="item"
                    type="date"
                    name="interviewPi"
                    value={formData.interviewPi}
                    onChange={handleChange}
                    label="Fecha de 1ª Entrevista PI"
                    placeholder="Fecha de 1ª Entrevista PI"
                    InputLabelProps={{shrink: true}}
                    disabled={!isInternationalProtection}
                />


            </div>
            <div className="row-container">
                <Autocomplete
                    className="item"
                    required
                    multiple
                    options={exclusionFactors}
                    getOptionLabel={(factor) => factor.name}
                    value={selectedExclusionFactors}
                    onChange={handleFactorsChange}
                    renderInput={(params) => <TextField {...params} label="Seleccionar factores exclusión"/>}
                />
            </div>
            <div className="row-container">
                <FormControl className="item">
                    <InputLabel id="returned-lavel">E. retornado</InputLabel>
                    <Select
                        labelId="returned-lavel"
                        label="E. retornado"
                        value={returned}
                        onChange={handleReturnedChange}
                    >
                        <MenuItem value={'false'}>No</MenuItem>
                        <MenuItem value={'true'}>Sí</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="item">
                    <InputLabel id="unemployed-lavel">Hogar sin empleo</InputLabel>
                    <Select
                        labelId="unemployed-lavel"
                        label="Hogar sin empleo"
                        value={unemployedHousehold}
                        onChange={handleUnemployedHouseholdChange}
                    >
                        <MenuItem value={'false'}>No</MenuItem>
                        <MenuItem value={'true'}>Sí</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className="item">
                    <InputLabel id="one-label">Hogar 1 adulto</InputLabel>
                    <Select
                        labelId="one-label"
                        label="Hogar 1 adulto"
                        value={oneAdultHousehold}
                        onChange={handleOneAdultHouseholdChange}
                    >
                        <MenuItem value={'false'}>No</MenuItem>
                        <MenuItem value={'true'}>Sí</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="item">
                    <InputLabel id="dependent-label">Dependientes a cargo</InputLabel>
                    <Select
                        labelId="dependent-label"
                        label="Dependientes a cargo"
                        value={dependants}
                        onChange={handleDependantsChange}
                    >
                        <MenuItem value={'false'}>No</MenuItem>
                        <MenuItem value={'true'}>Sí</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="row-container">
                <FormControlLabel
                    control={
                        <Checkbox
                            name="hasSocialWorker"
                            checked={hasSocialWorker}
                            onChange={handleSocialWorkerChange}
                        />
                    }
                    label="Trabajador Social"
                />
                <TextField
                    className="item"
                    type="text"
                    name="socialWorker"
                    value={formData.socialWorker}
                    onChange={handleChange}
                    label="Datos del Trabajador Social"
                    placeholder="Datos del Trabajador Social"
                    InputLabelProps={{shrink: true}}
                    disabled={!hasSocialWorker}
                />
            </div>
            <div className="row-container">
                <FormControlLabel
                    control={
                        <Checkbox
                            name="hasSocialCoverage"
                            checked={hasSocialCoverage}
                            onChange={handleSocialCoverageChange}
                        />
                    }
                    label="Cobertura Social"
                />
                <TextField
                    className="item"
                    type="text"
                    name="healthCoverage"
                    value={formData.healthCoverage}
                    onChange={handleChange}
                    label="Datos de Cobertura Sanitaria"
                    placeholder="Datos de Cobertura Sanitaria"
                    InputLabelProps={{shrink: true}}
                    disabled={!hasSocialCoverage}
                />
            </div>
            <div className="row-container">
                <FormControl className="item">
                    <InputLabel id="disability-label">Discapacidad</InputLabel>
                    <Select
                        id="disability"
                        required
                        labelId="disability-label"
                        label="Discapacidad"
                        name="disability"
                        className="item"
                        value={formData.disability}
                        onChange={handleChange}
                    >
                        <MenuItem value="NO">No</MenuItem>
                        <MenuItem value="LESS_33">Menos del 33%</MenuItem>
                        <MenuItem value="MORE_33">Más del 33%</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className="item">
                    <InputLabel id="admin-label">Situación administrativa</InputLabel>
                    <Select
                        id="admin"
                        required
                        labelId="admin-label"
                        label="Situación administrativa"
                        name="admin"
                        className="item"
                        value={situation}
                        onChange={handleSituationChange}
                    >
                        <MenuItem value="REGULAR">Regular</MenuItem>
                        <MenuItem value="IRREGULAR">Irregular</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default FormPage1Part3;
