import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Security, ImplicitCallback } from '@okta/okta-react';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Grocery from "./pages/Grocery";
import NoMatch from "./pages/NoMatch";

const config = {
  issuer: 'https://dev-622585.okta.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oa11poaf4Foygnfy357'
}

class App extends Component {
  render(){
  return (
    <Router>
      <div>

      <Security issuer={config.issuer}
                  client_id={config.client_id}
                  redirect_uri={config.redirect_uri}
        >
          
          <Switch>
          <Route path='/' exact={true} component={Login}/>
          <Route path='/implicit/callback' component={ImplicitCallback}/>
          <Route exact path="/home" component={Home} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/grocery" component={Grocery} />
          <Route component={NoMatch} />
        </Switch>
        </Security>
      </div>
    </Router>
  );
  }
}

export default App;