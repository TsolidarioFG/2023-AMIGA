import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
} from '@mui/material';

const CollaborationCreateModal = ({ open, onClose, onCreate }) => {
    const [collaborationData, setCollaborationData] = useState({
        startDate: '',
        numberHours: '',
        observation: ''
    });

    const handleFieldChange = (field, value) => {
        setCollaborationData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleCreate = () => {
        onCreate(collaborationData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Crear Colaboración</DialogTitle>
            <DialogContent>
                <TextField
                    label="Fecha de Inicio"
                    margin="normal"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={collaborationData.startDate}
                    onChange={(e) => handleFieldChange('startDate', e.target.value)}
                />
                <TextField
                    label="Número de Horas"
                    margin="normal"
                    fullWidth
                    type="number"
                    value={collaborationData.numberHours}

                    onChange={(e) => handleFieldChange('numberHours', e.target.value)}
                />
                <TextField
                    label="Observación"
                    margin="normal"
                    fullWidth
                    multiline
                    rows={4}
                    value={collaborationData.observation}
                    onChange={(e) => handleFieldChange('observation', e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreate} color="primary">
                    Crear
                </Button>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CollaborationCreateModal;
