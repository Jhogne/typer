import React from 'react'
import { Typography, Container, Grid, Paper } from '@material-ui/core';

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
            className={props.style}
            container
            spacing={2}
            justify="center">
        <Grid item xs={6}>
            <Typography align="right" style={{marginRight: '20%'}}>
              Time: {Math.floor((props.time) / 1000)}s
            </Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography align="left" style={{marginLeft: '20%'}}>
                Mistakes: {props.errors}
            </Typography>

        </Grid>
        <Grid item xs={6}>
        <Typography align="right" style={{marginRight: '20%'}}>
                Words: {props.words}
            </Typography>

        </Grid>
        <Grid item xs={6}>
            <Typography align="left" style={{marginLeft: '20%'}}>
            Accuracy: {Math.round(props.accuracy * 10000)/100}%
            </Typography>
        </Grid>
        </Grid>
    );
}