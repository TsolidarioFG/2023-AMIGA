import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {Typography} from "@mui/material";

const GenderBarChart = ({numberMen, numberWoman}) => {
    const data = [
        {name: 'Hombres', Numero: numberMen},
        {name: 'Mujeres', Numero: numberWoman},
    ];

    return (
        <div>
            <h4>Distribución sexo</h4>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={400} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="Numero" fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer>
            <div className="center">
                <div>
                    <Typography variant="caption">Hombres</Typography>
                    <Typography variant="h5">{numberMen}</Typography>
                </div>
                <div className="bigSpace"></div>
                <div>
                    <Typography variant="caption">Mujeres</Typography>
                    <Typography variant="h5">{numberWoman}</Typography>
                </div>
            </div>
        </div>
    );
};

export default GenderBarChart;