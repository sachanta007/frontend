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
import { Redirect } from 'react-router';

const styles = {
  card: {
    width: 275,
    margin: 'auto'
  },
  registrationCard:{
    width: 400,
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
const axios = require('axios');

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
      isRegisterNewUserCardHidden:true,
      securityQuestion: '',
      securityAnswer:'',
      otp:'',
      newPassword:'',
      confirmPassword:'',
      newEmail:'',
      firstName:'',
      lastName:'',
      setSecurityAnswer:'',
      setSecurityQuestion:'',
      newUserPassword:'',
      loginSuccess:false
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
  handleSubmit = (event) =>  {
    console.log(this.state.loginSuccess);
    const dataJSON = {
      'email': this.state.email,
      'password': this.state.password
    }

    axios({
      method:'post',
      url:'http://localhost:5000/login',
      data: dataJSON,
      headers: {'Access-Control-Allow-Origin': '*'},
    })
    .then((response)=>{
      if(response.data != 'Not able to login'){
        console.log("Yaaaay! Logged in......");
        console.log(this)
        this.setState({loginSuccess: true});
      }

      else{
        alert("Ooops! Something went wrong! Please check your email and password again!!")
        console.log(this);
        this.setState({loginSuccess: false});
      }
    });
    event.preventDefault();
  }

// Below function is called when user remembers Password
// when he enters the forgot password screens i.e., go back to sign-in
  goBackToSignIn(event){
    this.setState({isForgotPasswordCardHidden: true});
    this.setState({isSignInCardHidden: false});
    this.setState({isValidateOTPCardHidden: true});
    this.setState({isVerifyOTPCardHidden: true});
    this.setState({isRegisterNewUserCardHidden: true});

  }

// If user enters otp, check if otp matches
// If yes, show a new password selection screen and
// update db with new password (make an API call!!)
// Also, check if security answer is correct too

verifySecurityAnswer(event){
  this.setState({isForgotPasswordCardHidden: true});
  this.setState({isSignInCardHidden: true});
  this.setState({isValidateOTPCardHidden: true});
  this.setState({isVerifyOTPCardHidden: false});
  this.setState({isRegisterNewUserCardHidden: true});
  console.log(this.state.otp);
  console.log(this.state.securityAnswer);
}
  // Below function hides/shows forgot password card and sign-in card according to
  // button clicks of 'Forgot Password?' Toggling is done here based on prevState
  // Can add multiple other flags here, e.g. for registration page show/hides

  handleForgotPassword(event){
  this.setState({isForgotPasswordCardHidden: false});
  this.setState({isSignInCardHidden: true});
  this.setState({isValidateOTPCardHidden: true});
  this.setState({isVerifyOTPCardHidden: true});
  this.setState({isRegisterNewUserCardHidden: true});
}

// User types a new password twice
// check if both are same. If yes, call API
// to update DB and go back to sign-in page
updateNewPassword(event){

  if(this.state.newPassword == this.state.confirmPassword){
    alert('Passwords match. Updating in DB...Sign in again!')
    this.setState({isForgotPasswordCardHidden: true});
    this.setState({isSignInCardHidden: false});
    this.setState({isValidateOTPCardHidden: true});
    this.setState({isVerifyOTPCardHidden: true});
    this.setState({isRegisterNewUserCardHidden: true});
  }
  else{
    alert("passwords do not match!!!!")
  }

}
// Only show the enter security ques card. Hide everything else
// Gets Sec Question by hitting API securityQuestion/<email>

fetchSecurityQuestion(event){

  axios({
    method:'get',
    url:'http://localhost:5000/securityQuestion/'+this.state.email,
    headers: {'Access-Control-Allow-Origin': '*'},
  })
  .then((response)=>{
    if(response){
      console.log(response.data['question'])
      this.setState({securityQuestion: response.data['question']})

      this.setState({isForgotPasswordCardHidden: true});
      this.setState({isSignInCardHidden: true});
      this.setState({isValidateOTPCardHidden: false});
      this.setState({isVerifyOTPCardHidden: true});
      this.setState({isRegisterNewUserCardHidden: true});
      
    }

    else{
      alert("Ooops! Something went wrong!")
      goBackToSignIn(event);
      console.log(this);
    }
  });
 // if response from backend is error, show alert saying
 // such an email does not exist
  let response;
}

// New user wants to register, navigate to that particular card
showRegistrationCard(event){
  this.setState({isForgotPasswordCardHidden: true});
  this.setState({isSignInCardHidden: true});
  this.setState({isValidateOTPCardHidden: true});
  this.setState({isVerifyOTPCardHidden: true});
  this.setState({isRegisterNewUserCardHidden: false});
}

// User has input all details
// Send all those to backend to create a new record
// and navigate back to sign in
registerNewUser(event){

     const registrationData = {
           firstName: this.state.firstName,
           lastName: this.state.lastName,
           email: this.state.newEmail,
           password: this.state.newUserPassword,
           securityQuestion: this.state.setSecurityQuestion,
           securityAnswer: this.state.setSecurityAnswer
         }

     axios({
       method:'post',
       url:'http://localhost:5000/register',
       data: registrationData,
       headers: {'Access-Control-Allow-Origin': '*'},
     })
     .then(function (response) {
       alert("Thank you! An email with an activation link has been sent to your email! Please activate your account :)")
     });

  this.setState({isForgotPasswordCardHidden: true});
  this.setState({isSignInCardHidden: false});
  this.setState({isValidateOTPCardHidden: true});
  this.setState({isVerifyOTPCardHidden: true});
  this.setState({isRegisterNewUserCardHidden: true});

}


  render(){
    const { classes } = this.props;
    const isSignInCardHidden = this.state.isSignInCardHidden; //bool value to indicate whether card is hidden or not
    const isForgotPasswordCardHidden = this.state.isForgotPasswordCardHidden;
    const isValidateOTPCardHidden = this.state.isValidateOTPCardHidden;
    const isVerifyOTPCardHidden = this.state.isVerifyOTPCardHidden;
    const isRegisterNewUserCardHidden = this.state.isRegisterNewUserCardHidden;
    let currentCard; //this var will contain the html of which card to show on screen

    if (this.state.loginSuccess) {
      return <Redirect to='/dashboard' />
    }

    // Below chunk of code assigns the Signin card to currentCard
    // whenever signIn card is not hidden i.e. isSignInCardHidden == True
    if(!isSignInCardHidden){
      currentCard = <Card className={classes.card}>
        <CardContent>

          {/*  the class login-page-headers is defined in home.scss. A warning will show
            in console as we are not using className instead of class */ }
          <Typography class='login-page-headers'  color="textSecondary">
            Sign In
          </Typography>

          <form>
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
              <Button variant="contained" onClick = {this.handleSubmit.bind(this)} className = {classes.marginAuto} value="Submit" color="primary">Sign In</Button>
            </CardActions>
          </form>
        </CardContent>
        <p onClick = {this.showRegistrationCard.bind(this)} className = {classes.newUserText} >New User? <a href="#">Register Here!</a></p>
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
              <Button variant="contained" onClick={this.fetchSecurityQuestion.bind(this)} className = {classes.marginAuto} value="Next" color="primary">Continue</Button>
            </CardActions>
          </form>
        </CardContent>
        <p onClick = {this.showRegistrationCard.bind(this)} className = {classes.newUserText}> New User? <a href="#">Register Here!</a></p>
      </Card>
    }

/**************************************** Below chunk shows card having security ques and OTP input ******************************************************/
    else if(!isValidateOTPCardHidden){
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
          <br />

          {/* This is the line of code that hides/shows forgot password VS signin page. Same function is used as above */}
            <a href="#" onClick={this.goBackToSignIn.bind(this)} className = {classes.forgotPassword}> I remember now! Go back</a>

            <CardActions>
              <Button variant="contained" onClick = {this.verifySecurityAnswer.bind(this)} className = {classes.marginAuto} value="Next" color="primary">Verify</Button>
            </CardActions>
          </form>
        </CardContent>
        <p onClick = {this.showRegistrationCard.bind(this)} className = {classes.newUserText}> New User? <a href="#">Register Here!</a></p>
      </Card>
    }

    /************************* Verified security answer successfully... Enter OTP & Choose new Password!!! *********/

    else if(!isVerifyOTPCardHidden){
      currentCard = <Card className={classes.card}>
        <CardContent>
          <Typography class='login-page-headers' color="textSecondary">
            Set a new password
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
              <Button variant="contained" onClick = {this.updateNewPassword.bind(this)} className = {classes.marginAuto} value="Next" color="primary">Finish</Button>
            </CardActions>
          </form>
        </CardContent>
        <p onClick = {this.showRegistrationCard.bind(this)} className = {classes.newUserText}> New User? <a href="#">Register Here!</a></p>
      </Card>
    }

    /*********************************** CARD FOR REGISTRATION OF NEW USER ****************************************************/
    else if(!isRegisterNewUserCardHidden){
      currentCard = <Card className={classes.registrationCard}>
        <CardContent>
          <Typography class='login-page-headers' color="textSecondary">
            Glad you wish to join us!
          </Typography>

          <form>
  <FormControl required>
          <TextField
              id="firstName"
              type="text"
              label="First Name"
              className={classes.textField}
              value={this.state.firstName}
              onChange={this.handleChange.bind(this)}
              margin="normal"
              name="firstName"
            />

            <TextField
                id="lastName"
                type="text"
                label="Last Name"
                className={classes.textField}
                value={this.state.lastName}
                onChange={this.handleChange.bind(this)}
                margin="normal"
                name="lastName"
              />
          <br />


              <TextField
                id="email-input"
                type="email"
                name="newEmail"
                label="Enter your email"
                value={this.state.newEmail}
                className={classes.textField}
                margin="normal"
                onChange = {this.handleChange.bind(this)}
                />

            <br />
              <TextField
                  id="newUserPassword"
                  type="password"
                  label="Enter a password"
                  className={classes.textField}
                  value={this.state.newUserPassword}
                  onChange={this.handleChange.bind(this)}
                  margin="normal"
                  name="newUserPassword"
                />

                <TextField
                    id="setSecurityQuestion"
                    type="text"
                    label="Set a security question"
                    className={classes.textField}
                    value={this.state.setSecurityQuestion}
                    onChange={this.handleChange.bind(this)}
                    margin="normal"
                    name="setSecurityQuestion"
                  />


                <TextField
                      id="setSecurityAnswer"
                      type="password"
                        label="Answer"
                      className={classes.textField}
                      value={this.state.setSecurityAnswer}
                      onChange={this.handleChange.bind(this)}
                      margin="normal"
                      name="setSecurityAnswer"
                    />
        </FormControl>
            <CardActions>
              <Button variant="contained" onClick = {this.registerNewUser.bind(this)} className = {classes.marginAuto} value="Next" color="primary">Register</Button>
            </CardActions>
          </form>
        </CardContent>
          <a href="#" onClick={this.goBackToSignIn.bind(this)} className = {classes.forgotPassword}> Back to Sign In</a>
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
