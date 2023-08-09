import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import {Errors, HomeLink} from "../../common";
import {useSelector} from "react-redux";
import * as selectors from "../selectors";
import * as appSelectors from "../../app/selectors";
import WorkModal from "./WorkModal";
import backend from "../../../backend";
import {useParams} from "react-router-dom";

const WorkInsertion = () => {

    const participant = useSelector(selectors.getParticipantData);
    const contracts = useSelector(appSelectors.getContracts);
    const {id} = useParams();

    const [backendErrors, setBackendErrors] = useState(null);
    const [data, setData] = useState(null);
    const [index, setIndex] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const newElement = {
        date: '',
        contract: null,
        workField: '',
        workingDay: '',
        specialContract: ''
    };

    const handleDelete = (index) => {
        setDeleteModalOpen(true);
        setIndex(index);
    };
    const handleCreate = () => {
        setCreateModalOpen(true);
    };
    const handleUpdate = (index) => {
        setUpdateModalOpen(true);
        setIndex(index);
    };

    const handleConfirmDelete = () => {
        backend.work.deleteWorkInsertion(data[index].id);
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
        setIndex(null);
        setDeleteModalOpen(false);
    };

    const handleConfirmCreate = (newData) => {
        backend.work.createWorkInsertion({...newData, participant: participant.idParticipant},
            setData([...data, newData]),
            errors => setBackendErrors(errors)
        )
        setCreateModalOpen(false);
    };

    const handleConfirmUpdate = (updatedData) => {
        backend.work.updateWorkInsertion(updatedData,
            () => {
                const newData = data.filter((_, i) => i !== index);
                setData([...newData, updatedData])
                setIndex(null);
            }
        )
        setUpdateModalOpen(false);
    };
    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setIndex(null);
    };
    const handleCreateCancel = () => {
        setCreateModalOpen(false);
    };
    const handleUpdateCancel = () => {
        setUpdateModalOpen(false);
        setIndex(null);
    };

    useEffect(() => {
        backend.work.getWorkInsertion(id, result => {
                setData(result.items)
                if (result.items === [])
                    setBackendErrors({globalError: "No hay inserciones laborales."})
            }
        );
    }, [id])

    if (data === null && backendErrors === null)
        return null;

    return (
        <div className="container">
            <div className="header">
                <h3> {'Inserciones laborales ' + participant.name + ' ' + participant.surnames}</h3>
                <HomeLink></HomeLink>
            </div>

            <br/>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Tipo contrato</TableCell>
                            <TableCell>Sector</TableCell>
                            <TableCell>Jornada</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.date.split("-").reverse().join("-")}</TableCell>
                                <TableCell>{appSelectors.getContractName(contracts, row.contract) === "Otros" ? row.specialContract : appSelectors.getContractName(contracts, row.contract)}</TableCell>
                                <TableCell>{row.workField}</TableCell>
                                <TableCell>{row.workingDay === "FULL_TIME" ? "Completa" : "Parcial"}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={() => handleUpdate(index)}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" onClick={() => handleDelete(index)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <br/>
                <Button variant="contained" color="primary" onClick={handleCreate}>
                    Nueva inserción
                </Button>
            </TableContainer>

            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <Dialog open={isDeleteModalOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirma borrado</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Estás seguro de querer eliminar esta entrada?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {isCreateModalOpen ?
                <WorkModal isCreate={true} onClose={handleCreateCancel} initialValues={newElement}
                           onSubmit={handleConfirmCreate}></WorkModal> : null
            }

            {isUpdateModalOpen ?
                <WorkModal isCreate={false} onClose={handleUpdateCancel} initialValues={data[index]}
                           onSubmit={handleConfirmUpdate}></WorkModal> : null
            }
        </div>

    );
};

export default WorkInsertion;
