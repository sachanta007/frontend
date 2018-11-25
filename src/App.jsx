import React, {Component} from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";


import SignInPage from './SignInPage.jsx';
import UserActivatedPage from './UserActivatedPage.jsx';
import DashboardPage from './DashboardPage.jsx';
import PaypalButton from './PaypalButton.jsx';

class App extends Component {

  render() {
    return (
      <HashRouter>
        <div>
            <Route path="/" exact component={SignInPage}/>
            <Route path="/activated" component={UserActivatedPage}/>
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/PaypalButton" component={PaypalButton} />
        </div>
      </HashRouter>
    )
  }
}
export default App;
