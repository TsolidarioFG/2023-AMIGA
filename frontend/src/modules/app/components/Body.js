import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import {Login, UpdateProfile, ChangePassword} from '../../users';
import {
    Participant,
    FormParticipant,
    ParticipantDetails,
    EditParticipant,
    ParticipantData,
    NewAnnualData, ObservationForm, ObservationView, WorkInsertion
} from '../../participant';
import "./Body.css"
import users from '../../users';
import {GenerateStatistics, Graphics} from "../../statistics";

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
   return (

        <div className="body-container">
            <br/>
            <AppGlobalComponents/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                {loggedIn && <Route path="/participant" element={<Participant/>}/>}
                {loggedIn && <Route path="/participant/form" element={<FormParticipant/>}/>}
                {loggedIn && <Route path="/participant/details" element={<ParticipantDetails/>}></Route>}
                {loggedIn && <Route path="/participant/data" element={<ParticipantData/>}></Route>}
                {loggedIn && <Route path="/participant/edit" element={<EditParticipant/>}></Route>}
                {loggedIn && <Route path="/participant/newAnnualData" element={<NewAnnualData/>}></Route>}
                {loggedIn && <Route path="/participant/observationForm" element={<ObservationForm/>}></Route>}
                {loggedIn && <Route path="/participant/observationView/:id" element={<ObservationView/>}></Route>}
                {loggedIn && <Route path="/participant/workInsertion/:id" element={<WorkInsertion/>}></Route>}
                {loggedIn && <Route path="/statistics" element={<GenerateStatistics/>}></Route>}
                {loggedIn && <Route path="/statistics/graphics" element={<Graphics/>}></Route>}
                {loggedIn && <Route path="/users/update-profile" element={<UpdateProfile/>}/>}
                {loggedIn && <Route path="/users/change-password" element={<ChangePassword/>}/>}
            </Routes>
        </div>

    );

};

export default Body;
