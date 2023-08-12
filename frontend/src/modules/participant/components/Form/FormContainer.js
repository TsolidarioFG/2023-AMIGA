import React, {useState} from 'react';
import FormPage3 from "./FormPage3";
import FormPage4 from "./FormPage4";
import FormPage1 from "./FormPage1";
import FormPage1Continue from "./FormPage2";
import {format} from "date-fns";
import backend from "../../../../backend";
import FormConfirm from "./FormConfirm";

const FormContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
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
        date: format(new Date(), 'yyyy-MM-dd'),
        returned: false,
        nationalities: [],
        situation: '',
        studies: null,
        languages: [],
        approved: '',
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
        observation: ''
    });

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    function backendCall(onSucess, onErrors) {
        backend.participant.createParticipant(
            formData, onSucess, onErrors);
    }

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

                    <FormPage3
                        formData={formData}
                        setFormData={setFormData}
                        nextPage={nextPage}
                        previousPage={previousPage}
                    />

                );
            case 4:
                return (

                    <FormPage4
                        formData={formData}
                        setFormData={setFormData}
                        nextPage={nextPage}
                        previousPage={previousPage}
                    />

                );
            case 5:
                return (

                    <FormConfirm
                        formData={formData}
                        previousPage={previousPage}
                        submitAction={backendCall}
                    ></FormConfirm>

                );
            default:
                return null;
        }
    };

    return <div>{renderPage()}</div>;
};

export default FormContainer;
