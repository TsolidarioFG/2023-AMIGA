import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Toolbar} from "@mui/material";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import './Confirm.css';
import {useSelector} from "react-redux";
import ParticipantPdf from "./ParticipantPdf";
import Typography from "@mui/material/Typography";
import * as selectors from "../../app/selectors";
import {Errors} from "../../common";
import backend from "../../../backend";

const FormCreateConfirm = ({formData, previousPage}) => {
    const [open, setOpen] = useState(false);
    const [verPDF, setVerPDF] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);
    const [data, setData] = useState({
        factors: '',
        municipalities: '',
        nationalities: '',
        countries: '',
        housings: '',
        maritalStatus: '',
        cohabitation: '',
        studies: '',
        employment: '',
        languages: '',
        demands: '',
        programs: '',
        province: '',
        kids: ''
    });
    const navigate = useNavigate();

    const municipalities = useSelector(selectors.getMunicipalities);
    const provinces = useSelector(selectors.getProvinces);
    const countries = useSelector(selectors.getCountries);
    const housings = useSelector(selectors.getHousings);
    const maritalStatus = useSelector(selectors.getMaritalStatus);
    const cohabitation = useSelector(selectors.getCohabitations);
    const studies = useSelector(selectors.getStudies);
    const employment = useSelector(selectors.getEmployments);
    const languages = useSelector(selectors.getLanguages);
    const demands = useSelector(selectors.getDemands);
    const programs = useSelector(selectors.getPrograms);
    const exclusionFactors = useSelector(selectors.getExclusions);

    useEffect(() => {
        if (formData.exclusionFactors.length > 0 && exclusionFactors) {
            const exclusionFactorNames = exclusionFactors
                .filter(factor => formData.exclusionFactors.includes(factor.id))
                .map(factor => factor.name);

            const exclusionFactorString = exclusionFactorNames.join(", ");
            setData(prevData => ({...prevData, factors: exclusionFactorString}));
        }
        if (formData.languages.length > 0 && languages) {
            const languageNames = languages
                .filter(m => formData.languages.includes(m.id))
                .map(x => x.name);

            const languageNamesString = languageNames.join(", ");
            setData(prevData => ({...prevData, languages: languageNamesString}));
        }
        if (formData.programs?.length > 0) {
            const programNames = formData.programs.map((item) => {
                const program = programs.find((p) => p.id === item.program);
                if (program) {
                    return item.itinerary ? `${program.name} en itinerario` : program.name;
                }
                return "";
            }).join(", ");

            setData(prevData => ({...prevData, programs: programNames}));
        }
        if (formData.nationalities.length > 0 && countries) {
            const nationalitiesNames = countries
                .filter(m => formData.nationalities.includes(m.id))
                .map(x => x.name);

            const nationalitiesNamesString = nationalitiesNames.join(", ");
            setData(prevData => ({...prevData, nationalities: nationalitiesNamesString}));
        }
        if (formData.municipality && municipalities) {
            const municipalityObject = municipalities.find(m => m.id === formData.municipality);

            if (municipalityObject) {
                const municipalityString = municipalityObject.name;
                setData(prevData => ({...prevData, municipalities: municipalityString}));
            }
        }
        if (formData.housing && housings) {
            const housingsObject = housings.find(m => m.id === formData.housing);

            if (housingsObject) {
                const housingsString = housingsObject.name;
                setData(prevData => ({...prevData, housings: housingsString}));
            }
        }
        if (formData.maritalStatus && maritalStatus) {
            const maritalStatusObject = maritalStatus.find(m => m.id === formData.maritalStatus);

            if (maritalStatusObject) {
                const maritalStatusString = maritalStatusObject.name;
                setData(prevData => ({...prevData, maritalStatus: maritalStatusString}));
            }
        }
        if (formData.cohabitation && cohabitation) {
            const cohabitationObject = cohabitation.find(m => m.id === formData.cohabitation);

            if (cohabitationObject) {
                const cohabitationString = cohabitationObject.name;
                setData(prevData => ({...prevData, cohabitation: cohabitationString}));
            }
        }
        if (formData.studies && studies) {
            const studiesObject = studies.find(m => m.id === formData.studies);

            if (studiesObject) {
                const studiesString = studiesObject.name;
                setData(prevData => ({...prevData, studies: studiesString}));
            }
        }
        if (formData.employment && employment) {
            const employmentObject = employment.find(m => m.id === formData.employment);

            if (employmentObject) {
                const employmentString = employmentObject.name;
                setData(prevData => ({...prevData, employment: employmentString}));
            }
        }
        if (formData.demand && demands) {
            const demandObject = demands.find(m => m.id === formData.demand);

            if (demandObject) {
                const demandString = demandObject.name;
                setData(prevData => ({...prevData, demands: demandString}));
            }
        }
        if (formData.country && countries) {
            const countryObject = countries.find(m => m.id === formData.country);

            if (countryObject) {
                const countryString = countryObject.name;
                setData(prevData => ({...prevData, countries: countryString}));
            }
        }
        if (formData.province && provinces) {
            const provinceObject = provinces.find(m => m.id === formData.province);

            if (provinceObject) {
                const provinceString = provinceObject.name;
                setData(prevData => ({...prevData, province: provinceString}));
            }
        }
        if (formData.kids.length > 0) {
            const children = formData.kids.map(function (kid) {
                return  kid.birthDate.split("-").reverse().join("-") + ' ' + kid.sex;
            });

            const childrenString = children.join(", ");
            setData(prevData => ({...prevData, kids: childrenString}));

        }


    }, [municipalities, provinces, countries]);

    const handleSubmit = () => {
        backend.participant.createParticipant(
            formData, setOpen(true),
                errors => setBackendErrors(errors));
    }

    const handleCloseModal = () => {
        setOpen(false);
        navigate('/');
    }
    if(!municipalities && !provinces && !countries && !housings && !maritalStatus && !cohabitation
        && !studies && !employment && !languages && !demands && !programs && !exclusionFactors)
        return null;

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <Typography variant="h6" align="center">
                Descargar el documento a firmar y guardar datos
            </Typography>
            <br/>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <Button variant="contained" onClick={previousPage}>Anterior</Button>
                    <Button variant="contained" color="primary" size="large" onClick={() => setVerPDF(true)}>
                        Ver PDF
                    </Button>
                    <PDFDownloadLink
                        document={<ParticipantPdf formData={formData} selectors={data}/>}
                        fileName={formData.name + formData.surnames.replace(/\s+/g, '')}
                    >
                        <Button variant="contained" color="primary" size="large">Descargar PDF</Button>
                    </PDFDownloadLink>
                    <Button variant="contained" color="primary" size="large" onClick={() => handleSubmit()}>
                        Guardar
                    </Button>
                </Toolbar>
            </AppBar>
            <br/>
            {verPDF ? (
                <PDFViewer style={{width: "100%", height: "90vh"}}>
                    <ParticipantPdf formData={formData} selectors={data}/>
                </PDFViewer>
            ) : null}
            <Dialog open={open} onClose={handleCloseModal}>
                <DialogTitle>Datos guardados correctamente</DialogTitle>
                <DialogContent>
                    {/* Aquí puedes mostrar los detalles de los datos guardados */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormCreateConfirm;
