import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from "../components/ItemCard"


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      margin: 40,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


function Grocery (){

    const classes = useStyles();
    return (

        <div className={classes.root}>
        <Grid container spacing={3}>
        <Grid item xs={6}>
        <h1>
            I am the left side. I will house all the cool scrolly stuff that Greyson created.
        </h1>
        <br></br>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

        </Grid>

        <Grid item xs={6}>
        <h1>
            I am the right side. I have no purpose right now, but one day, i'll be known for something
        </h1>
        </Grid>

        </Grid>
        </div>
    )
}

export default Grocery;