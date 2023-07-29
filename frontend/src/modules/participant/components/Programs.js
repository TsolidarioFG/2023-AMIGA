import React, {useState} from "react";
import {
    Table, TableHead, TableBody, TableRow, TableCell,
    InputLabel, Select, MenuItem, TextField, Button
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import {Errors} from "../../common";
import * as selectors from "../../app/selectors";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";


const Programs = ({formData, setFormData}) => {

    const programs = useSelector(selectors.getPrograms);

    const [errors, setErrors] = useState(null);
    const [newProgram, setNewProgram] = useState({program: null, itinerary: false})

    const handleProgramsChange = (event, value) => {
        setNewProgram({...newProgram, program: value});
    };

    const handleItineraryChange = (event) => {
        setNewProgram({...newProgram, itinerary: event.target.value === 'true'});
    };

    const handleDelete = (index) => {
        const programList = [...formData.programs];
        programList.splice(index, 1);
        setFormData({...formData, programs: programList});
    };

    const handleAdd = (e) => {
        e.preventDefault();

        if (newProgram.program === null) {
            setErrors({globalError: 'Introduce programa'});
            return;
        }

        const programList = formData.programs;
        programList.push({program: newProgram.program.id, itinerary: newProgram.itinerary});
        setFormData({...formData, programs: programList});
        setNewProgram({program: null, itinerary: false});
    };

    if (!programs)
        return null;

    return (
        <div className="participant-details">
            <Typography variant="h6" align="center">
                Añadir Programas
            </Typography>
            <form onSubmit={handleAdd}>
                <div className="row-container">
                    <Autocomplete
                        required
                        className="item"
                        options={programs}
                        getOptionLabel={(program) => program?.name}
                        value={newProgram.program}
                        onChange={handleProgramsChange}
                        renderInput={(params) => <TextField {...params} label="Seleccionar programa"/>}
                    />
                    <FormControl className="item">
                        <InputLabel id="itinerary">Itinerario</InputLabel>
                        <Select
                            labelId="itinerary"
                            label="Itinerario"
                            value={newProgram.itinerary}
                            onChange={handleItineraryChange}
                        >
                            <MenuItem value={'false'}>No</MenuItem>
                            <MenuItem value={'true'}>Sí</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="space"></div>
                    <Button variant="contained" color="primary" type="submit">
                        Añadir
                    </Button>
                </div>
            </form>
            <br/>
            <Errors errors={errors} onClose={() => setErrors(null)}/>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Programa</TableCell>
                        <TableCell>Itinerario</TableCell>
                        <TableCell>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formData.programs.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{selectors.getProgramName(programs, item.program)}</TableCell>
                            <TableCell>{item.itinerary ? 'Si' : 'No'}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleDelete(index)}>
                                    <Delete/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Programs;
