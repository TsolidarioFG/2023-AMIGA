import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import React from "react";

const BackLink = () => {

    const navigate = useNavigate();

    return (
        <Button variant="contained" onClick={() => navigate("/participant/details")}>Anterior</Button>

    );
};

export default BackLink;
