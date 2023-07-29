import React, {useEffect, useState} from "react";
import {PDFViewer} from "@react-pdf/renderer";
import './Confirm.css';
import {useDispatch, useSelector} from "react-redux";
import ParticipantPdf from "./ParticipantPdf";
import Typography from "@mui/material/Typography";
import * as selectors from "../../app/selectors";
import * as userSelector from "../selectors"
import * as actions from "../actions"
import './Participant.css'
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import {BackLink} from "../../common";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const ParticipantData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(userSelector.getParticipantData);
    const state = useSelector(selectors.selectors);
    const [year, setYear] = useState(null);
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
    const handleYearChange = (event, value) => {
        setYear(value);
        dispatch(actions.findParticipant(user.idParticipant, value));
    }

    const handleEdit = () => {
        navigate('/participant/edit');
    }



    useEffect(() => {
        if (state && user) {
            if (user.exclusionFactors?.length > 0) {
                const exclusionFactorNames = state.exclusions
                    .filter(factor => user.exclusionFactors.includes(factor.id))
                    .map(factor => factor.name);

                const exclusionFactorString = exclusionFactorNames.join(", ");
                setData(prevData => ({...prevData, factors: exclusionFactorString}));
            }
            if (user.languages?.length > 0) {
                const languageNames = state.languages
                    .filter(m => user.languages.includes(m.id))
                    .map(x => x.name);

                const languageNamesString = languageNames.join(", ");
                setData(prevData => ({...prevData, languages: languageNamesString}));
            }
            if (user.programs?.length > 0) {
                const programNames = user.programs.map((item) => {
                    const program = state.programs.find((p) => p.id === item.program);
                    if (program) {
                        return item.itinerary ? `${program.name} en itinerario` : program.name;
                    }
                    return "";
                }).join(", ");

                setData(prevData => ({...prevData, programs: programNames}));
            }
            if (user.nationalities?.length > 0) {
                const nationalitiesNames = state.countries
                    .filter(m => user.nationalities.includes(m.id))
                    .map(x => x.name);

                const nationalitiesNamesString = nationalitiesNames.join(", ");
                setData(prevData => ({...prevData, nationalities: nationalitiesNamesString}));
            }
            if (user.municipality) {
                const municipalityObject = state.municipalities.find(m => m.id === user.municipality);

                if (municipalityObject) {
                    const municipalityString = municipalityObject.name;
                    setData(prevData => ({...prevData, municipalities: municipalityString}));
                }
            }
            if (user.housing) {
                const housingsObject = state.housings.find(m => m.id === user.housing);

                if (housingsObject) {
                    const housingsString = housingsObject.name;
                    setData(prevData => ({...prevData, housings: housingsString}));
                }
            }
            if (user.maritalStatus) {
                const maritalStatusObject = state.maritalStatus.find(m => m.id === user.maritalStatus);

                if (maritalStatusObject) {
                    const maritalStatusString = maritalStatusObject.name;
                    setData(prevData => ({...prevData, maritalStatus: maritalStatusString}));
                }
            }
            if (user.cohabitation) {
                const cohabitationObject = state.cohabitations.find(m => m.id === user.cohabitation);

                if (cohabitationObject) {
                    const cohabitationString = cohabitationObject.name;
                    setData(prevData => ({...prevData, cohabitation: cohabitationString}));
                }
            }
            if (user.studies) {
                const studiesObject = state.studies.find(m => m.id === user.studies);

                if (studiesObject) {
                    const studiesString = studiesObject.name;
                    setData(prevData => ({...prevData, studies: studiesString}));
                }
            }
            if (user.employment) {
                const employmentObject = state.employments.find(m => m.id === user.employment);

                if (employmentObject) {
                    const employmentString = employmentObject.name;
                    setData(prevData => ({...prevData, employment: employmentString}));
                }
            }
            if (user.demand) {
                const demandObject = state.demands.find(m => m.id === user.demand);

                if (demandObject) {
                    const demandString = demandObject.name;
                    setData(prevData => ({...prevData, demands: demandString}));
                }
            }
            if (user.country) {
                const countryObject = state.countries.find(m => m.id === user.country);

                if (countryObject) {
                    const countryString = countryObject.name;
                    setData(prevData => ({...prevData, countries: countryString}));
                }
            }
            if (user.province) {
                const provinceObject = state.provinces.find(m => m.id === user.province);

                if (provinceObject) {
                    const provinceString = provinceObject.name;
                    setData(prevData => ({...prevData, province: provinceString}));
                }
            }
            if (user.kids?.length > 0) {
                const children = user.kids.map(function (kid) {
                    const formattedDate = kid.birthDate.split("-").reverse().join("/");
                    return formattedDate + ' ' + kid.sex;
                });

                if (children) {
                    const childrenString = children.join(", ");
                    setData(prevData => ({...prevData, kids: childrenString}));
                }
            }
            if (year === null)
                setYear(Math.max(...user.yearList));
        }
    }, [user, state]);

    if (!user) return null

    return (

        <div className="container">
            <div className="separed-container">
                <BackLink></BackLink>
                <Button variant="contained" onClick={handleEdit}>Editar</Button>
            </div>
            <div className="header-details">
                <Typography variant="h6" align="center">
                    Datos {user.name + ' ' + user.surnames}
                </Typography>
                <div className="space"></div>
                <Autocomplete
                    className="item"
                    options={user.yearList}
                    getOptionLabel={(option) => option.toString()}
                    value={year}
                    onChange={handleYearChange}
                    renderInput={(params) => <TextField {...params} label="Seleccionar año"/>}
                />
            </div>
            <br/>
            <br/>

            <PDFViewer style={{width: "100%", height: "90vh"}}>
                <ParticipantPdf formData={user} selectors={data}/>
            </PDFViewer>
        </div>

    );
};

export default ParticipantData;
