import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { Header } from "./Header";
import { App } from "./App";
import { Repositories } from "./Repositories";
import { RepoInfo } from "./RepoInfo";

import { store } from "./store";

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <div>  
        <Router>
          <Fragment>
            <Header />
            <div>
              <Route exact path="/" component={App} />
              <Route exact path="/repositories/:user" component={Repositories} />
              <Route exact path="/repo/:id" component={RepoInfo} />
            </div>
          </Fragment>
        </Router>
      </div>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
