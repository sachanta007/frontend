import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SignIn from './SignInComponent.jsx';
import React, { Component } from 'react';

class SignInPage extends Component {
  render() {
    return (
      <div >
        <img src='build/login_bg.png' className="bg" />
        <h1 class="login-header"> Course360</h1>
          <SignIn />
        </div>
    )
  }

}
export default SignInPage;
