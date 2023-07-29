import React, {useEffect, useState} from 'react';
import FormPage2 from "./FormPage2";
import FormPage3 from "./FormPage3";
import FormPage1 from "./FormPage1";
import * as selectors from "../selectors"
import {useSelector} from "react-redux";
import FormEditConfirm from "./FormEditConfirm";
import FormPage1Continue from "./FormPage1Continue";

const FormContainer = () => {
    const participant = useSelector(selectors.getParticipantData);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        idParticipant: null,
        idAnnualData: null,
        name: '',
        surnames: '',
        dni: '',
        pas: '',
        nie: '',
        birthDate: '',
        sex: '',
        address: '',
        municipality: null,
        postalAddress: '',
        province: null,
        phone: '',
        email: '',
        datePi: '',
        interviewPi: '',
        kids: [],
        country: null,
        date: '',
        returned: '',
        nationalities: [],
        situation: '',
        studies: null,
        languages: [],
        approved: false,
        demandedStudies: '',
        registered: false,
        dateRegister: '',
        numberRegistered: '',
        cohabitation: null,
        housing: null,
        maritalStatus: null,
        exclusionFactors: [],
        socialWorker: '',
        healthCoverage: '',
        disability: 'NO',
        unemployedHousehold: false,
        oneAdultHousehold: false,
        dependants: false,
        employment: null,
        qualification: '',
        profExpOrigin: '',
        profExpSpain: '',
        skills: '',
        availableHours: '',
        drivingLicence: false,
        valid: false,
        vehicle: false,
        sepe: false,
        monthsSepe: '',
        benefit: 'NO',
        dateBenefit: '',
        specialBenefit: '',
        demand: null,
        programs: [],
        derivation: '',
    });

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
            for (const attribute in participant) {
                if (participant.hasOwnProperty(attribute) && formData.hasOwnProperty(attribute)) {
                    formData[attribute] = participant[attribute];
                }
            }

        }, [participant]
    )
    const renderPage = () => {
        switch (currentPage) {
            case 1:
                return (

                    <FormPage1
                        formData={formData}
                        setFormData={setFormData}
                        nextPage={nextPage}
                    />
                );
            case 2:
                return (

                    <FormPage1Continue
                        formData={formData}
                        setFormData={setFormData}
                        nextPage={nextPage}
                        previousPage={previousPage}
                    />

                );
            case 3:
                return (
                    <FormPage2
                        formData={formData}
                        setFormData={setFormData}
                        nextPage={nextPage}
                        previousPage={previousPage}
                    />
                );
            case 4:
                return (
                    <FormPage3
                        formData={formData}
                        setFormData={setFormData}
                        nextPage={nextPage}
                        previousPage={previousPage}
                    />
                );
            case 5:
                return (
                    <FormEditConfirm
                        formData={formData}
                        previousPage={previousPage}
                    ></FormEditConfirm>
                );
            default:
                return null;
        }
    };

    return <div>{renderPage()}</div>;
};

export default FormContainer;
