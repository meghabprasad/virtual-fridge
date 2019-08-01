import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Grocery from "./pages/Grocery";
import NoMatch from "./pages/NoMatch";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/grocery" component={Grocery} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;