import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const YearBarChart = ({ yearsMen, yearsWoman }) => {
    const data = [
        { edad: '0 a 29 años', hombres: yearsMen[0], mujeres: yearsWoman[0] },
        { edad: '30 a 44 años', hombres: yearsMen[1], mujeres: yearsWoman[1] },
        { edad: '45 a 59 años', hombres: yearsMen[2], mujeres: yearsWoman[2] },
        { edad: '60 o más', hombres: yearsMen[3], mujeres: yearsWoman[3] },
    ];

    return (
        <div>
            <h4>Distribución edad</h4>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="edad" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hombres" fill="#8884d8" name="Hombres" />
                    <Bar dataKey="mujeres" fill="#82ca9d" name="Mujeres" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default YearBarChart;
