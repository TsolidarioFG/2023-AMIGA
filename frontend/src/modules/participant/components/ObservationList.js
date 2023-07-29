import {useSelector, useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import * as actions from '../actions';
import {Pager} from '../../common';
import Observations from "./Observations";

const ObservationList = () => {

    const observations = useSelector(selectors.getObservations);
    const dispatch = useDispatch();

    if (!observations) {
        return null;
    }

    if (observations.result.items.length === 0) {
        return (
            <div className="alert alert-danger" role="alert">
                No hay comentarios
            </div>
        );
    }

    return (

        <div>
            <Observations observations={observations.result.items}/>
            <Pager
                back={{
                    enabled: observations.criteria.page >= 1,
                    onClick: () => dispatch(actions.previousFindProductsResultPage(observations.criteria))}}
                next={{
                    enabled: observations.result.existMoreItems,
                    onClick: () => dispatch(actions.nextFindProductsResultPage(observations.criteria))}}/>
        </div>

    );

}
export default ObservationList;