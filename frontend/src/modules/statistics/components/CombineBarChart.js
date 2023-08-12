import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CombinedBarChart = ({ title, men, woman }) => {

    const combinedData = {};
    const allAttributes = new Set([...Object.keys(men), ...Object.keys(woman)]);

    allAttributes.forEach(attribute => {
        combinedData[attribute] = {
            men: men[attribute] || 0,
            woman: woman[attribute] || 0,
        };
    });

    const data = Object.keys(combinedData).map(attribute => ({
        attribute,
        men: combinedData[attribute].men,
        woman: combinedData[attribute].woman,
    }));

    return (
        <div>
            <h4>{title}</h4>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="attribute" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="men" fill="#8884d8" name="Hombres" />
                    <Bar dataKey="woman" fill="#82ca9d" name="Mujeres" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CombinedBarChart;
