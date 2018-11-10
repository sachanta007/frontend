import React, {Component} from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";


import SignInPage from './SignInPage.jsx';
import UserActivatedPage from './UserActivatedPage.jsx';
import DashboardPage from './DashboardPage.jsx';
import PaymentPortal from './PaymentPortal.jsx';
import StudentDetails from './StudentDetails.jsx';

class App extends Component {

  render() {
    return (
      <HashRouter>
        <div>
            <Route path="/" exact component={SignInPage}/>
            <Route path="/activated" component={UserActivatedPage}/>
            <Route path="/DashboardPage" component={DashboardPage} />
            <Route path="/PaymentPortal" component={PaymentPortal} />
            <Route path="/StudentDetails" component={StudentDetails} />
        </div>
      </HashRouter>
    )
  }
}
export default App;
