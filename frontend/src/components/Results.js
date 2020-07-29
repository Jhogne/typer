import React from 'react'
import { Typography, Container, Grid } from '@material-ui/core';

function getItem(text) {
    return(
        <Grid 
            item
        >
        <Typography>
            {text}
        </Typography>
        </Grid>
    )
}

export default function Results(props) {
    return(
        <Grid 
            container
            spacing={3}
            justify="space-evenly">
        {getItem(`Time: ${Math.floor((Date.now() - props.startTime) / 1000)}s`)}
        {getItem(`Words: ${props.words}`)}
        {getItem(`Mistakes: ${props.errors}`)}
        {getItem(`Accuracy: ${Math.round(props.accuracy * 10000)/100}%`)}
        </Grid>
    );
}