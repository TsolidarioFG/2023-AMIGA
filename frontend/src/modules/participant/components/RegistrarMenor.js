import React, { useState } from "react";
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import {TextField, Button, Table, TableHead, TableBody, TableRow,
    TableCell, MenuItem, Select, InputLabel,} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {Errors} from "../../common";
import Typography from "@mui/material/Typography";

const RegistrarMenor = ({ formData, setFormData }) => {
    const [backendErrors, setBackendErrors] = useState(null);
    const [newChild, setNewChild] = useState({
        sex: "",
        birthDate: "",
    });

    function isMinor(fechaNacimiento) {
        const partes = fechaNacimiento.split('-');
        const fechaActual = new Date();

        const edad = fechaActual.getFullYear() - Number(partes[0]);

        if (edad < 18) {
            return false;
        }

        if (edad === 18) {

            const mesNacimiento = fechaNacimiento.getMonth();
            const diaNacimiento = fechaNacimiento.getDate();
            const mesActual = fechaActual.getMonth();
            const diaActual = fechaActual.getDate();

            if (mesActual < mesNacimiento) {
                return false;
            }
            if (mesActual === mesNacimiento && diaActual < diaNacimiento) {
                return false;
            }
        }
        return true;
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewChild((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddChild = (e) => {
        e.preventDefault();

        // Validar los campos antes de añadir una nueva fila
        if (newChild.sex.trim() === "" || newChild.birthDate.trim() === "") {
            alert("Por favor, complete ambos campos.");
            return;
        }
        if(isMinor(newChild.birthDate)) {
            setBackendErrors({globalError: 'No es un menor'});
            return;
        }

        const kidList = formData.kids;
        kidList.push(newChild)
        setFormData({ ...formData, kids: kidList});

        // Restaurar los valores del formulario
        setNewChild({
            sex: "",
            birthDate: "",
        });
    };

    return (
        <div className="participant-details">
            <Typography variant="h6" align="center">
                Añadir menores
            </Typography>
            <form onSubmit={handleAddChild}>
                <div className="row-container">
                    <FormControl
                        className="item">
                        <InputLabel id="kid-label">Sexo menor</InputLabel>
                <Select
                    labelId="kid-label"
                    label="Sexo"
                    name="sex"
                    value={newChild.sex}
                    onChange={handleInputChange}
                    required
                >
                    <MenuItem value="H">Masculino</MenuItem>
                    <MenuItem value="M">Femenino</MenuItem>
                </Select>
                    </FormControl>
                <TextField
                    className="item"
                    placeholder="Fecha de nacimiento"
                    label="Fecha de nacimiento"
                    type="date"
                    name="birthDate"
                    value={newChild.birthDate}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <div className="space"></div>
                <Button variant="contained" color="primary" type="submit">
                    Añadir menor
                </Button>
                </div>
            </form>
            <br/>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Sexo</TableCell>
                        <TableCell>Fecha de nacimiento</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formData.kids.map((child, index) => (
                        <TableRow key={index}>
                            <TableCell>{child.sex === "H" ? "Masculino" : "Femenino"}</TableCell>

                            <TableCell>{format(new Date(child.birthDate), "dd 'de' MMMM 'de' yyyy", { locale: esLocale })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default RegistrarMenor;
