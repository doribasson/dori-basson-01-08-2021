import React from "react";
import { Provider } from "react-redux";
import Header from "../components/Header";
import Home from "../components/Home";
import Favorite from "../components/Favorite";
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import { store } from "../redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Header>
                <Home />
              </Header>
            )}
          />
          <Route
            path="/favorite"
            render={() => (
              <Header>
                <Favorite />
              </Header>
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
