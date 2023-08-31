import React, {useEffect} from 'react';
import GenderBarChart from './GenderBarChart';
import {useDispatch, useSelector} from "react-redux";
import * as selector from "../selectors"
import YearBarChart from "./YearBarChart";
import CombineBarChart from "./CombineBarChart";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import * as appActions from "../../app/actions"

const Graphics = () => {

    const stats = useSelector(selector.getStatisticsState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (stats !== null) {
            dispatch(appActions.loaded());
        }
    }, [stats, dispatch]);if(stats === null)
        return null;

    return (
        <div>
            <div className="header">
                <h1>Gráficos</h1>
                <Button variant="contained" onClick={() => navigate(-1)}>Nuevas estadísticas</Button>
            </div>
            <br/>
            <GenderBarChart numberMen={stats.numberMen} numberWoman={stats.numberWoman} />
            <br/>
            <YearBarChart yearsMen={stats.yearsMen} yearsWoman={stats.yearsWoman} />
            <br/>
            <CombineBarChart title={"Factores exclusión"} men={stats.exclusionFactorCountMen} woman={stats.exclusionFactorCountWoman} />
            <br/>
            <CombineBarChart title={"Nacionalidades"} men={stats.nationalitiesCountMen} woman={stats.nationalitiesCountWoman} />
            <br/>
            <CombineBarChart title={"Contratos"} men={stats.contractCountMen} woman={stats.contractCountWoman} />
            <br/>
            <CombineBarChart title={"Tipo jornada"} men={stats.workTimeCountMen} woman={stats.workTimeCountWoman} />

        </div>
    );
};

export default Graphics;


