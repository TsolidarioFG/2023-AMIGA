import * as actions from './actions';
import * as actionTypes from './actionTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as Participant} from './components/Participant';
export {default as FormParticipant} from './components/Form/FormContainer';
export {default as ParticipantDetails} from './components/ParticipantDetails'
export {default as ParticipantData} from './components/ParticipantData'
export {default as EditParticipant} from './components/Form/EditParticipant'
export {default as NewAnnualData} from './components/Form/NewAnnualData'
export {default as ObservationForm} from './components/ObservationForm'
export {default as ObservationView} from './components/ObservationView'
export {default as WorkInsertion} from './components/WorkInsertion'


// eslint-disable-next-line import/no-anonymous-default-export
export default {actions, actionTypes, reducer, selectors};