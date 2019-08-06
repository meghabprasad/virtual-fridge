import React, { Fragment, Component } from 'react';
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import { Security, ImplicitCallback } from '@okta/okta-react';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Grocery from "./pages/Grocery";
import NoMatch from "./pages/NoMatch";
import ReactDOM from "react-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const config = {
  issuer: 'https://dev-622585.okta.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oa11poaf4Foygnfy357'
}

const tabStyle = {
  margin: "0auto",
  textAlign: "center"
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Security issuer={config.issuer}
            client_id={config.client_id}
            redirect_uri={config.redirect_uri}>

              <Route 
                path = "/"
                render={({ location }) => (
                  <Fragment>
                    <Tabs value={location.pathname} style={tabStyle}>
                      <Tab label="Login" value="/" component={Link} to="/" />
                      <Tab label="Home" value="/home" component={Link} to="/home" />
                      <Tab value="/recipes" label="Recipes" component={Link} to="/recipes"/>
                      <Tab label="Groceries" value="/grocery" component={Link} to="/grocery" />
                    </Tabs>
                    <Switch>
                      <Route exact path="/" component = {Login} />
                      <Route exact path="/home" component = {Home} />
                      <Route exact path="/recipes" component = {Recipes} />
                      <Route exact path="/grocery" component = {Grocery}/>
                      <Route exact path='/implicit/callback' component={ImplicitCallback}/>
                    </Switch>
                  </Fragment>
                )}
                />

          </Security>

        </div>
      </BrowserRouter>
    )
  }
}

export default App;