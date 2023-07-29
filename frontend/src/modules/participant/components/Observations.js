import React from 'react';
import {List, ListItem, Card, CardContent} from '@mui/material';
import PropTypes from 'prop-types';
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

const Observations = ({ observations }) => {

    const navigate = useNavigate();
    const handleChange = (id) => {
        navigate(`/participant/observationView/${id}`)
    };

    return(
        <List>
            {observations.map((item) => (
                <ListItem key={item.id} onClick={() => handleChange(item.id)}>
                    <Card className="item">
                        <CardContent className="observation-header">
                            <Typography variant="subtitle1" >
                                {item.date.split("-").reverse().join("-")}
                            </Typography>
                            <div className="bigSpace"></div>
                            <Typography variant="subtitle1">
                                {item.title}
                            </Typography>
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
}

Observations.propTypes = {
    observations: PropTypes.array.isRequired
};

export default Observations;
