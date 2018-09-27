import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';


const styles = {
  card: {
    width: 275,
    margin: 'auto'
  },
  title: {
    fontSize: 35,
    color: "orange",
    margin: 'auto'
  },
  pos: {
    marginBottom: 12,
  },
  marginAuto:{
    margin:'auto'
  },
  forgotPassword :{
    fontSize: 12,
    marginTop:'12',
    fontStyle: 'italic'
  },
  newUserText:{
    marginTop: 12,
    marginBottom: 12,
    fontSize: 12
  }
};

class SignInCard extends Component {
  constructor()
  {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state ={
      email: '',
      password:'',
      isSignInCardHidden:false,
      isForgotPasswordCardHidden:true,
      isValidateOTPCardHidden:true,
      isVerifyOTPCardHidden:true,
      securityQuestion: "What is your cat's name?",
      securityAnswer:'',
      otp:''
    }
  }

// Below is a common handleChange function
// for use with all text fields. No need to modify this
  handleChange(e){
    let change = {}
   change[e.target.name] = e.target.value
   this.setState(change)
  }

// This is called when user tries to signin
  handleSubmit(event) {
    const dataJSON = {
      'email': this.state.email,
      'password': this.state.password
    }
    console.log(dataJSON);
    event.preventDefault();
  }

// Below function is called when user remembers Password
// when he enters the forgot password screens i.e., go back to sign-in
  goBackToSignIn(event){
    this.setState({isForgotPasswordCardHidden: true});
    this.setState({isSignInCardHidden: false});
    this.setState({isValidateOTPCardHidden: true});
    this.setState({isVerifyOTPCardHidden: true});

  }

// If user enters otp, check if otp matches
// If yes, show a new password selection screen and
// update db with new password (make an API call!!)

verifyAndChangePassword(event){
  this.setState({isForgotPasswordCardHidden: true});
  this.setState({isSignInCardHidden: true});
  this.setState({isValidateOTPCardHidden: true});
  this.setState({isVerifyOTPCardHidden: false});

  console.log(this.state.otp);
}
  // Below function hides/shows forgot password card and sign-in card according to
  // button clicks of 'Forgot Password?' Toggling is done here based on prevState
  // Can add multiple other flags here, e.g. for registration page show/hides

  handleForgotPassword(event){
  this.setState({isForgotPasswordCardHidden: false});
  this.setState({isSignInCardHidden: true});
  this.setState({isValidateOTPCardHidden: true});
  this.setState({isVerifyOTPCardHidden: true});

}

// Only show the Validate OTP card. Hide everything else
// Send email ID and security Answer to backend for checking
validateOTPScreen(event){
  this.setState({isForgotPasswordCardHidden: true});
  this.setState({isSignInCardHidden: true});
  this.setState({isValidateOTPCardHidden: false});
  this.setState({isVerifyOTPCardHidden: true});

  console.log(this.state.securityAnswer);
  console.log(this.state.email);

 // if response from backend is error, show alert saying
 // such an email does not exist OR securityAnswer wrong
  let response;
  response = 'error'
  if(response == 'error'){
    alert('hold on a sec')
  }
}

  render(){
    const { classes } = this.props;
    const isSignInCardHidden = this.state.isSignInCardHidden; //bool value to indicate whether card is hidden or not
    const isForgotPasswordCardHidden = this.state.isForgotPasswordCardHidden;
    const isValidateOTPCardHidden = this.state.isValidateOTPCardHidden;
    const isVerifyOTPCardHidden = this.state.isVerifyOTPCardHidden;

    let currentCard; //this var will contain the html of which card to show on screen


    // Below chunk of code assigns the Signin card to currentCard
    // whenever signIn card is not hidden i.e. isSignInCardHidden == True
    if(!isSignInCardHidden){
      currentCard = <Card className={classes.card}>
        <CardContent>

          {/*  the class login-page-headers is defined in home.scss. A warning will component
            in console as we are not using className instead of class */ }
          <Typography class='login-page-headers'  color="textSecondary">
            Sign In
          </Typography>

          <form onSubmit = {this.handleSubmit}>
            <FormControl required>
              <TextField
                id="email-input"
                type="email"
                name="email"
                label="Email"
                value={this.state.email}
                className={classes.textField}
                margin="normal"
                autoComplete = 'email'
                onChange = {this.handleChange.bind(this)}
                />
            </FormControl>
            <br />

            <FormControl required>
              <TextField
                id="password-input"
                label="Password"
                className={classes.textField}
                type="password"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
                autoComplete="current-password"
                margin="normal"
                name="password"

                />
            </FormControl>
            <br />

            {/* This is the line of code that hides/shows forgot password VS signin page. Same function is used below too! */}
            <a href="#" onClick={this.handleForgotPassword.bind(this)} className = {classes.forgotPassword}> Forgot Password?</a>

            <CardActions>
              <Button variant="contained" type="submit" className = {classes.marginAuto} value="Submit" color="primary">Sign In</Button>
            </CardActions>
          </form>
        </CardContent>
        <p className = {classes.newUserText}> New User? <a href="#">Register Here!</a></p>
      </Card>
    }

/* Below chunk is the card for Forgot Password screen....*/
    else if(!isForgotPasswordCardHidden){
      currentCard = <Card className={classes.card}>
        <CardContent>
          <Typography class='login-page-headers' color="textSecondary">
            Forgot your password?
          </Typography>

          <form>
            <p class='comfortaa-font '>Answer your security question:</p>

            {/* need to get the user's respective security question by
             calling an API and populating that variable */}
            <p class='comfortaa-font small-font-size'>
              {this.state.securityQuestion}
            </p>

          <TextField
              id="securityAnswer"
              className={classes.textField}
              value={this.state.securityAnswer}
              onChange={this.handleChange.bind(this)}
              margin="normal"
              name="securityAnswer"
            />

            <FormControl required>
              <TextField
                id="email-input"
                type="email"
                name="email"
                label="Enter your email"
                value={this.state.email}
                className={classes.textField}
                margin="normal"
                autoComplete = 'email'
                onChange = {this.handleChange.bind(this)}
                />
            </FormControl>

          <br />



          {/* This is the line of code that hides/shows forgot password VS signin page. Same function is used as above */}
            <a href="#" onClick={this.goBackToSignIn.bind(this)} className = {classes.forgotPassword}> I remember now! Go back</a>

            <CardActions>
              <Button variant="contained" onClick={this.validateOTPScreen.bind(this)} className = {classes.marginAuto} value="Next" color="primary">Continue</Button>
            </CardActions>
          </form>
        </CardContent>
        <p className = {classes.newUserText}> New User? <a href="#">Register Here!</a></p>
      </Card>
    }

/**************************************** Below chunk is for Validate OTP card ******************************************************/
    else if(!isValidateOTPCardHidden){
      currentCard = <Card className={classes.card}>
        <CardContent>
          <Typography class='login-page-headers' color="textSecondary">
            Forgot your password?
          </Typography>

          <form>
            <p class='comfortaa-font small-font-size'>
              We sent an OTP to your email :)
            </p>
            <p class='comfortaa-font '>Enter the OTP :</p>
          <TextField
              id="otp"
              className={classes.textField}
              value={this.state.otp}
              onChange={this.handleChange.bind(this)}
              margin="normal"
              name="otp"
            />
          <br />

          {/* This is the line of code that hides/shows forgot password VS signin page. Same function is used as above */}
            <a href="#" onClick={this.goBackToSignIn.bind(this)} className = {classes.forgotPassword}> I remember now! Go back</a>

            <CardActions>
              <Button variant="contained" onClick = {this.verifyAndChangePassword.bind(this)} className = {classes.marginAuto} value="Next" color="primary">Verify</Button>
            </CardActions>
          </form>
        </CardContent>
        <p className = {classes.newUserText}> New User? <a href="#">Register Here!</a></p>
      </Card>
    }

    /************************* Verified OTP successfully...Choose new Password!!! *********/

    else if(!isVerifyOTPCardHidden){
      currentCard = <Card className={classes.card}>
        <CardContent>
          <Typography class='login-page-headers' color="textSecondary">
            Set a new password
          </Typography>

          <form>

            <p class='comfortaa-font '>New Password</p>
          <TextField
              id="newPassword"
              type="password"
              className={classes.textField}
              value={this.state.newPassword}
              onChange={this.handleChange.bind(this)}
              margin="normal"
              name="newPassword"
            />
          <br />

            <p class='comfortaa-font '>Confirm Password</p>
          <TextField
              id="confirmPassword"
                  type="password"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange.bind(this)}
              margin="normal"
              name="confirmPassword"
            />
          <br />

            <CardActions>
              <Button variant="contained" className = {classes.marginAuto} value="Next" color="primary">Finish</Button>
            </CardActions>
          </form>
        </CardContent>
        <p className = {classes.newUserText}> New User? <a href="#">Register Here!</a></p>
      </Card>
    }

    return (
      <div>
        {currentCard}
      </div>
    );
  }
}

SignInCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInCard);
