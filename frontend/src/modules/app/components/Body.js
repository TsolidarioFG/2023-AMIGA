import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import {Login, UpdateProfile, ChangePassword, Logout} from '../../users';
import {
    Participant,
    FormParticipant,
    ParticipantDetails,
    EditParticipant,
    ParticipantData,
    NewAnnualData, ObservationForm, ObservationView
} from '../../participant';
import "./Body.css"
import users from '../../users';

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
   return (

        <div className="body-container">
            <br/>
            <AppGlobalComponents/>
            <Routes>
                <Route path="/*" element={<Participant/>}/>
                <Route path="/participant/form" element={<FormParticipant/>}/>
                <Route path="/participant/details" element={<ParticipantDetails/>}></Route>
                <Route path="/participant/data" element={<ParticipantData/>}></Route>
                <Route path="/participant/edit" element={<EditParticipant/>}></Route>
                <Route path="/participant/newAnnualData" element={<NewAnnualData/>}></Route>
                <Route path="/participant/observationForm" element={<ObservationForm/>}></Route>
                <Route path="/participant/observationView/:id" element={<ObservationView/>}></Route>
                {loggedIn && <Route path="/users/update-profile" element={<UpdateProfile/>}/>}
                {loggedIn && <Route path="/users/change-password" element={<ChangePassword/>}/>}
                {loggedIn && <Route path="/users/logout" element={<Logout/>}/>}
                {!loggedIn && <Route path="/users/login" element={<Login/>}/>}
            </Routes>
        </div>

    );

};

export default Body;
