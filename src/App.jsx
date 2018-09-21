import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import NavBar from './NavBar.jsx';
import SignInPage from './SignInPage.jsx';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route name="signInPage" exact path="/" component={SignInPage} />
        </div>
      </Router>
    )
  }
}
export default App;
