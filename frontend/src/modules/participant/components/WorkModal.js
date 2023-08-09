import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    Button,
} from '@mui/material';
import {useSelector} from "react-redux";
import * as appSelectors from "../../app/selectors";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import {Errors} from "../../common";

const WorkModal = ({ isCreate, onClose, onSubmit, initialValues }) => {
    const contracts = useSelector(appSelectors.getContracts);

    const [selectedContract, setSelectedContract] = useState(null);
    const [editData, setEditData] = useState(initialValues);
    const [backendErrors, setBackendErrors] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditData({
            ...editData,
            [name]: value,
        });
    };

    const handleContractChange = (event, value) => {
        if (value) {
            setSelectedContract(contracts.find((contract) => contract.id === value.id))
            if(value.name !== "Otros")
                setEditData({...editData, specialContract: ''})
        } else {
            setSelectedContract(null);
        }
    };

    useEffect(() => {
        if (contracts && initialValues.contract !== null) {
            setSelectedContract(contracts.find((m) => m.id === initialValues.contract));
        }
    }, [contracts, initialValues]);

    const handleSubmit = () => {
        if(editData.date === ''){
            setBackendErrors({globalError: 'Indicar fecha'});
            return;
        }
        if(selectedContract === null){
            setBackendErrors({globalError: 'Indicar tipo contrato'});
            return;
        }
        if(editData.workField === ''){
            setBackendErrors({globalError: 'Indicar sector'});
            return;
        }
        if(editData.workingDay === ''){
            setBackendErrors({globalError: 'Tipo jornada'});
            return;
        }
        onSubmit({...editData, contract: selectedContract.id});
    };

    return (
        <Dialog open={true} onClose={onClose} classes={{ paper: 'modal-paper' }}>
            {isCreate ? <DialogTitle>Crear inserción laboral</DialogTitle> :
                <DialogTitle>Editar inserción laboral</DialogTitle>}
            <DialogContent>
                <TextField
                    name="date"
                    label="Fecha"
                    placeholder="Fecha"
                    type="date"
                    value={editData.date}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />
                <br />
                <Autocomplete
                    fullWidth
                    margin="normal"
                    options={contracts}
                    getOptionLabel={(contract) => contract.name}
                    value={selectedContract}
                    onChange={handleContractChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Tipo contrato" placeholder="Tipo contrato"/>
                    )}
                />
                <TextField
                    disabled={selectedContract === null || selectedContract.name !== "Otros"}
                    name="specialContract"
                    label="Contrato especial"
                    value={editData.specialContract}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    name="workField"
                    label="Sector"
                    value={editData.workField}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="work-label">Tipo jornada</InputLabel>
                    <Select
                        name="workingDay"
                        label="Tipo jornada"
                        labelId="work-label"
                        value={editData.workingDay}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    >
                        <MenuItem value="FULL_TIME">Jornada completa</MenuItem>
                        <MenuItem value="PART_TIME">Jornada parcial</MenuItem>
                    </Select>
                </FormControl>

                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkModal;
