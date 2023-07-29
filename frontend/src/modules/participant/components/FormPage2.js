import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import * as selectors from '../../app/selectors';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './Form.css';
import Autocomplete from "@mui/material/Autocomplete";
import {Errors, HomeLink} from "../../common";

const FormPage2 = ({formData, setFormData, nextPage, previousPage}) => {
    const studies = useSelector(selectors.getStudies);
    const employment = useSelector(selectors.getEmployments);
    const languages = useSelector(selectors.getLanguages);

    const [selectedStudies, setSelectedStudies] =
        useState(studies.find((study) => study.id === formData.studies) || null);
    const [selectedEmployment, setSelectedEmployment] =
        useState(employment.find((employment) => employment.id === formData.employment) || null);

    const [backendErrors, setBackendErrors] = useState(null);
    const [homologados, setHomologados] = useState(formData.approved || '');
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [hasDrivingLicense, setHasDrivingLicense] = useState(formData.drivingLicence || false);
    const [isValidSpain, setIsValidSpain] = useState(formData.valid || false);
    const [hasVehicle, setHasVehicle] = useState(formData.vehicle || false);
    const [isSEPERegistered, setIsSEPERegistered] = useState(formData.sepe || false);
    const [unemploymentDuration, setUnemploymentDuration] = useState(formData.monthsSepe || '');
    const [benefit, setBenefit] = useState(formData.benefit || 'NO');
    const [specialBenefit, setSpecialBenefit] = useState(formData.specialBenefit || '');
    const [dateBenefit, setDateBenefit] = useState(formData.dateBenefit || '');

    const handleBenefitChange = (event) => {

        const value = event.target.value;
        if (formData.benefit === 'OTRA' && value !== 'OTRA'){
            setFormData({...formData, specialBenefit: ''});
            setSpecialBenefit('');
        }
        if(value === 'NO') {
            setDateBenefit('');
            setFormData({...formData, dateBenefit: ''});
        }
        setBenefit(value);
        setFormData({...formData, benefit: value});
    };

    const handleSpecialBenefitChange = (event) => {
        const value = event.target.value;
        setSpecialBenefit(value);
        setFormData({...formData, specialBenefit: value});
    };

    const handleDateBenefitChange = (event) => {
        const value = event.target.value;
        setDateBenefit(value);
        setFormData({...formData, dateBenefit: value});
    };
    const handleDrivingLicenseChange = (event) => {
        const value = event.target.value === 'true';
        setHasDrivingLicense(value);
        setFormData({...formData, drivingLicence: value});
    };

    const handleValidSpainChange = (event) => {
        const value = event.target.value === 'true';
        setIsValidSpain(value);
        setFormData({...formData, valid: value});
    };

    const handleHasVehicleChange = (event) => {
        const value = event.target.value === 'true';
        setHasVehicle(value);
        setFormData({...formData, vehicle: value});
    };

    const handleSEPERegisteredChange = () => {
        if(isSEPERegistered) {
            setFormData({...formData, monthsSepe: '', sepe: false});
            setIsSEPERegistered(false);
            setUnemploymentDuration('');
        } else {
            setFormData({...formData,  sepe: true});
            setIsSEPERegistered(true);
        }

    };

    const handleUnemploymentDurationChange = (event) => {
        const value = event.target.value;
        setUnemploymentDuration(value);
        setFormData({...formData, monthsSepe: value});
    };

    const handleStudiesChange = (event, value) => {
        if (value) {
            setFormData({...formData, studies: value.id});
            setSelectedStudies(studies.find((study) => study.id === value.id))
        } else {
            setFormData({...formData, studies: null});
            setSelectedStudies(null);
        }
    };

    const handleEmploymentChange = (event, value) => {
        if (value) {
            setFormData({...formData, employment: value.id});
            setSelectedEmployment(employment.find((employment) => employment.id === value.id));
        } else {
            setFormData({...formData, employment: null});
            setSelectedEmployment(null);
        }
    };

    const handleLanguagesChange = (event, value) => {
        const selectedLanguages = value.map((program) => program.id);
        setSelectedLanguages(value);
        setFormData({...formData, languages: selectedLanguages});
    };

    const handleChangeHomologated = (e) => {
        setHomologados(e.target.value);
        setFormData({...formData, approved: e.target.value});
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    useEffect(() => {
        if (formData.languages && formData.languages.length > 0) {
            const selected = formData.languages.map((languageId) =>
                languages.find((language) => language.id === languageId)
            );
            setSelectedLanguages(selected);
        }
    }, [formData.languages, languages, setSelectedLanguages]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name } = event.nativeEvent.submitter;

        if (formData.studies === null && formData.employment === null) {
            setBackendErrors({globalError:" Por favor, complete estudios y situacion laboral."});
            return;
        }

        if (formData.studies === null ) {
            setBackendErrors({globalError:" Por favor, complete estudios."});
            return;
        }

        if (formData.employment === null) {
            setBackendErrors({globalError:" Por favor, complete situacion laboral."});
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
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <h1>Experiencia Laboral</h1>
                    <HomeLink></HomeLink>
                </div>
                <div className="row-container">
                    <Autocomplete
                        required
                        className="item"
                        options={studies}
                        getOptionLabel={(study) => study.name}
                        value={selectedStudies}
                        onChange={handleStudiesChange}
                        renderInput={(params) => <TextField {...params} label="Seleccionar estudios"/>}
                    />

                    <FormControl
                        className="item">
                        <InputLabel id="homo-label">Titulación homologada</InputLabel>
                        <Select
                            required
                            labelId="homo-label"
                            label="Titulación homologada"
                            value={homologados}
                            onChange={handleChangeHomologated}
                        >
                            <MenuItem value="SI">Sí</MenuItem>
                            <MenuItem value="NO">No</MenuItem>
                            <MenuItem value="EN_TRAMITE">En trámite</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="row-container">
                    <Autocomplete
                        required
                        className="item"
                        multiple
                        options={languages}
                        getOptionLabel={(language) => language.name}
                        value={selectedLanguages}
                        onChange={handleLanguagesChange}
                        renderInput={(params) => <TextField {...params} label="Seleccionar idiomas"/>}
                    />

                    <TextField
                        required
                        className="item"
                        name="demandedStudies"
                        label="Formación demandada"
                        value={formData.demandedStudies}
                        onChange={handleChange}
                    />
                </div>
                <div className="row-container">
                    <Autocomplete
                        required
                        className="item"
                        options={employment}
                        getOptionLabel={(employment) => employment.name}
                        value={selectedEmployment}
                        onChange={handleEmploymentChange}
                        renderInput={(params) => <TextField {...params} label="Situación laboral"/>}
                    />

                    <TextField
                        required
                        className="item"
                        name="qualification"
                        label="Cualificación profesional"
                        value={formData.qualification}
                        onChange={handleChange}
                    />
                </div>
                <div className="row-container">
                    <TextField
                        required
                        className="item"
                        name="profExpOrigin"
                        label="Experiencia profesional en país de origen"
                        value={formData.profExpOrigin}
                        onChange={handleChange}
                    />
                </div>
                <div className="row-container">
                    <TextField
                        required
                        className="item"
                        name="profExpSpain"
                        label="Experiencia profesional en España"
                        value={formData.profExpSpain}
                        onChange={handleChange}
                    />
                </div>
                <div className="row-container">
                    <TextField
                        required
                        className="item"
                        name="skills"
                        label="Habilidades y limitaciones"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                </div>
                <div className="row-container">
                    <TextField
                        required
                        className="item"
                        name="availableHours"
                        label="Horario disponible"
                        value={formData.availableHours}
                        onChange={handleChange}
                    />
                </div>
                <div className="row-container">
                    <FormControl className="item">
                        <InputLabel id="driving-lavel">Permiso de conducir</InputLabel>
                        <Select
                            labelId="driving-lavel"
                            label="Permiso de conducir"
                            value={hasDrivingLicense}
                            onChange={handleDrivingLicenseChange}
                        >
                            <MenuItem value={'false'}>No</MenuItem>
                            <MenuItem value={'true'}>Sí</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className="item">
                        <InputLabel id="valid-label">Válido en España</InputLabel>
                        <Select
                            labelId="valid-label"
                            label="Válido en España"
                            value={isValidSpain}
                            onChange={handleValidSpainChange}
                        >
                            <MenuItem value={'false'}>No</MenuItem>
                            <MenuItem value={'true'}>Sí</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="row-container">

                    <FormControl className="item">
                        <InputLabel id="Vehículo">Vehículo</InputLabel>
                        <Select
                            labelId="Vehículo"
                            label="Vehículo"
                            value={hasVehicle}
                            onChange={handleHasVehicleChange}
                        >
                            <MenuItem value={'false'}>No</MenuItem>
                            <MenuItem value={'true'}>Sí</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className="item">
                        <InputLabel id="sepe-label">Inscrito a SEPE</InputLabel>
                        <Select
                            labelId="sepe-label"
                            label="Inscrito a SEPE"
                            value={isSEPERegistered}
                            onChange={handleSEPERegisteredChange}
                        >
                            <MenuItem value={'false'}>No</MenuItem>
                            <MenuItem value={'true'}>Sí</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className="item"
                        name="unemploymentDuration"
                        label="Duración meses desempleo"
                        value={unemploymentDuration}
                        type="number"
                        onChange={handleUnemploymentDurationChange}
                        disabled={!isSEPERegistered}
                    />

                </div>
                <div className="row-container">
                    <FormControl className="item">
                        <InputLabel id="benefit-label">Tipo de prestación</InputLabel>
                        <Select
                            labelId="benefit-label"
                            label="Tipo de prestación"
                            value={benefit}
                            onChange={handleBenefitChange}
                        >
                            <MenuItem value="CONTRIBUTIVA">Contributiva</MenuItem>
                            <MenuItem value="SUBSIDIO_FAMILIAR">Subsidio familiar</MenuItem>
                            <MenuItem value="SUBSIDIO_RETORNADO">Subsidio retornado</MenuItem>
                            <MenuItem value="IMV">IMV</MenuItem>
                            <MenuItem value="RAI">RAI</MenuItem>
                            <MenuItem value="RISGA">RISGA</MenuItem>
                            <MenuItem value="OTRA">Otra</MenuItem>
                            <MenuItem value="NO">No</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="row-container">

                    <TextField
                        className="item"
                        name="specialBenefit"
                        label="Otra prestación"
                        value={specialBenefit}
                        onChange={handleSpecialBenefitChange}
                        disabled={benefit !== 'OTRA'}
                    />

                    <TextField
                        className="item"
                        name="dateBenefit"
                        label="Fecha de prestación"
                        placeholder="Fecha de prestación"
                        InputLabelProps={{shrink: true}}
                        value={dateBenefit}
                        type="date"
                        onChange={handleDateBenefitChange}
                        disabled={benefit === 'NO'}
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

export default FormPage2;
