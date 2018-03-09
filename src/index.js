import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Header from "./Header";
import { App } from "./App";
import { SearchForm } from "./SearchForm";
import { Repositories } from "./Repositories";
import { RepoInfo } from "./RepoInfo";

import { store } from "./store";

// render(<App />, document.getElementById("root"));

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <div>
        <Header />
        <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route exact path="/repositories/:user" component={Repositories} />
            <Route exact path="/repo/:id" component={RepoInfo} />
          </div>
        </Router>
      </div>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
