import React, { Component } from "react";
import { withAuth } from '@okta/okta-react';
import NotSignedIn from "../components/NotSignedIn";
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

export default withAuth(class Grocery extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          authenticated: null,
        };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }
  
    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }
  
    componentDidUpdate() {
      this.checkAuthentication();
    }
  
    async login() {
      // Redirect to '/' after login
      this.props.auth.login('/');
    }
  
    async logout() {
      // Redirect to '/' after logout
      this.props.auth.logout('/');
    } 

    
    render() {
      const classes = useStyles();
        if (this.state.authenticated){
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
        else {
            return(
                <NotSignedIn item="groceries" img="http://www.locker14.com/wp-content/uploads/2014/11/Apple.LF_.2.jpg" />
            )
        }
        

    }

  });

