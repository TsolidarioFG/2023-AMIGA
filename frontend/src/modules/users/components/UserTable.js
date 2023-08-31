import React, {useState} from 'react';
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from '@mui/material';
import {ArrowUpward, ArrowDownward, Delete} from '@mui/icons-material';
import backend from "../../../backend";
import {useNavigate} from "react-router-dom";

const UserTable = () => {
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);

    const handleSearch = () => {
        backend.userService.search(searchText, result => setUsers(result));
    };

    const handleDelete = (id) => {
        backend.userService.deleteUser(id, () => {
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
        });
    };

    const handlePromote = (id) => {
        backend.userService.promoteUser(id, () => {
            const updatedUsers = users.map(user =>
                user.id === id ? {...user, role: 'ADMIN'} : user
            );
            setUsers(updatedUsers);
        });
        const updatedUsers = users.map(user =>
            user.id === id ? {...user, role: 'ADMIN'} : user
        );
        setUsers(updatedUsers);
    };

    const handleDemote = (id) => {

        backend.userService.demoteUser(id, () => {
            const updatedUsers = users.map(user =>
                user.id === id ? {...user, role: 'USER'} : user
            );
            setUsers(updatedUsers);
        });
        const updatedUsers = users.map(user =>
            user.id === id ? {...user, role: 'USER'} : user
        );
        setUsers(updatedUsers);
    };

    return (
        <div className="container">
            <div className="button">
                <Button variant="contained" onClick={() => {
                    navigate('/users/register');
                }}>
                    Registrar técnico
                </Button>
            </div>
            <h3> {'Buscador técnicos'}</h3>
            <div className="row-container">
                <TextField
                    className="item"
                    label="Buscar Usuario"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button onClick={handleSearch} variant="contained" color="primary" style={{margin: '10px'}}>
                    Buscar
                </Button>
            </div>
            <TableContainer component={Paper} style={{marginTop: '20px'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellidos</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Dar/Quitar privilegios</TableCell>
                            <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    {user.role === 'USER' ? (
                                        <IconButton onClick={() => handlePromote(user.id)}>
                                            <ArrowUpward/>
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleDemote(user.id)}>
                                            <ArrowDownward/>
                                        </IconButton>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(user.id)}>
                                        <Delete/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserTable;
