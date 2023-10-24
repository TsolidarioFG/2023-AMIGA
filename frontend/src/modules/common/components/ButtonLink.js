import {useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import React from "react";

const ButtonLink = ({route}) => {

    const navigate = useNavigate();

    return (
        <Button variant="contained" onClick={() => navigate(route)}>Cancelar</Button>

    );

};

export default ButtonLink;
