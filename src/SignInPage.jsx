import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import SignInCard from './CustomSignIn.jsx'
class SignInPage extends Component {
  constructor(){
    super()

  }
  render() {
    return (
      <div >
        <img src='build/login_bg.png' className="bg" />
        <h1 className="login-banner"> Course360</h1>
        <SignInCard />
     </div>
    )
  }

}
export default SignInPage;
