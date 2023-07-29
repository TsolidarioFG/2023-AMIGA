import React from 'react';
import TextField from '@mui/material/TextField';
import './Form.css';

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const FormPage1Part1 = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="row-container">
                <TextField
                    className="item"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    label="Nombre"
                    placeholder="Nombre"
                    required
                />

                <TextField
                    className="item2"
                    name="surnames"
                    value={formData.surnames}
                    onChange={handleChange}
                    label="Apellidos"
                    placeholder="Apellidos"
                    required
                />
            </div>
            <div className="row-container">
                <TextField
                    className="item"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    label="DNI"
                    placeholder="DNI"
                />

                <TextField
                    className="item"
                    name="pas"
                    value={formData.pas}
                    onChange={handleChange}
                    label="PAS"
                    placeholder="PAS"
                />

                <TextField
                    className="item"
                    name="nie"
                    value={formData.nie}
                    onChange={handleChange}
                    label="NIE"
                    placeholder="NIE"
                />
            </div>
            <div className="row-container">
                <TextField
                    className="item"
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    label="Fecha de Nacimiento"
                    placeholder="Fecha de Nacimiento"
                    InputLabelProps={{ shrink: true }}
                    required
                />


                <FormControl className="item">
                    <InputLabel id="gender-label">Sexo</InputLabel>
                    <Select
                        id="gender"
                        labelId="gender-label"
                        label="sexo"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="H">Hombre</MenuItem>
                        <MenuItem value="M">Mujer</MenuItem>
                    </Select>
                </FormControl>


                <TextField
                    className="item"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="Email"
                    placeholder="Email"
                />
            </div>
        </div>
    );
};

export default FormPage1Part1;
