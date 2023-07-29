import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Body from './Body';
import Footer from './Footer';
import users from '../../users';
import * as actions from "../actions";
import ResponsiveAppBar from "./ResponsiveAppBar";

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(users.actions.tryLoginFromServiceToken(
            () => dispatch(users.actions.logout())));

        dispatch(actions.findAllCountries());
        dispatch(actions.findAllProvinces());
        dispatch(actions.findAllMunicipalities());
        dispatch(actions.findAllLanguages());
        dispatch(actions.findAllEmployments());
        dispatch(actions.findAllStudies());
        dispatch(actions.findAllMaritalStatus());
        dispatch(actions.findAllHousings());
        dispatch(actions.findAllCohabitations());
        dispatch(actions.findAllExclusions());
        dispatch(actions.findAllPrograms());
        dispatch(actions.findAllDemands());
    });

    return (
        <div>
            <ResponsiveAppBar/>
            <Body/>
            <Footer/>
        </div>
    );

}
    
export default App;
