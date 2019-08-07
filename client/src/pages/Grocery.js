import React, { Component } from "react";
import { withAuth } from '@okta/okta-react';
import NotSignedIn from "../components/NotSignedIn";

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
        if (this.state.authenticated){
            return (
                // <Container maxWidth='lg'>
            <div>
                <h1>This is the grocery page!</h1>
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

