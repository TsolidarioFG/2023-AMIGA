import React, {useEffect, useState} from 'react';
import FormPage3 from "./FormPage3";
import FormPage4 from "./FormPage4";
import FormPage1 from "./FormPage1";
import * as selectors from "../../selectors"
import {useDispatch, useSelector} from "react-redux";
import FormPage1Continue from "./FormPage2";
import {format} from "date-fns";
import backend from "../../../../backend";
import * as actions from "../../actions";
import FormConfirm from "./FormConfirm";

const NewAnnualData = () => {
    const dispatch = useDispatch();

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
        observation: ''
    });
    function backendCall(onSucess, onErrors) {
        backend.participant.createParticipant(
            formData, data => {
                onSucess();
                dispatch(actions.findParticipantCompleted(data));
            }, onErrors);
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect( () => {
            for (const attribute in participant) {
                if (participant.hasOwnProperty(attribute) && formData.hasOwnProperty(attribute)) {
                    formData[attribute] = participant[attribute];
                }
            }
            setFormData({...formData, date: format(new Date(), 'yyyy-MM-dd')})
        // eslint-disable-next-line
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
                    <div className="container">
                        <FormPage1Continue
                            formData={formData}
                            setFormData={setFormData}
                            nextPage={nextPage}
                            previousPage={previousPage}
                        />
                    </div>
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

export default NewAnnualData;
