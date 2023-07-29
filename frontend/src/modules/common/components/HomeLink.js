import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import React from "react";

const HomeLink = () => {

    const navigate = useNavigate();

    return (
        <Button variant="contained" onClick={() => navigate(-1)}>Cancelar</Button>

    );

};

export default HomeLink;
