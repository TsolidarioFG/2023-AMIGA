import * as actions from './actions';
import * as actionTypes from './actionTypes';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as GenerateStatistics} from './components/GenerateStatitics'


// eslint-disable-next-line import/no-anonymous-default-export
export default {actions, actionTypes, reducer, selectors};