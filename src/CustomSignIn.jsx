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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FacebookLogin from 'react-facebook-login';
import {ToastContainer, ToastStore} from 'react-toasts'

const styles = {
  card: {
    width: 275,
    margin: 'auto'
  },
  registrationCard:{
    width: 300,
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
    margin:'auto',
    backgroundColor: '#ff6660',
    color:'white'

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
      emailForForgotPassword: '',
      isSignInCardHidden:false,
      isForgotPasswordCardHidden:true,
      isValidateOTPCardHidden:true,
      isVerifyOTPCardHidden:true,
      isRegisterNewUserCardHidden:true,
      isVerifyOTPForSigninMFAHidden:true,
      securityQuestion: '',
      securityAnswer:'',
      otp:'',
      OTPForLogin:'',
      newPassword:'',
      confirmPassword:'',
      newEmail:'',
      firstName:'',
      lastName:'',
      setSecurityAnswer:'',
      setSecurityQuestion:'',
      newUserPassword:'',
      loginSuccess:false,
      role:'',
      selectedRadioValue: '3',
      promptRole: false,
      fbAccessToken:''
    }
      sessionStorage.setItem('token','')
      sessionStorage.setItem('user_role','')
      sessionStorage.setItem('user_id','')
      sessionStorage.setItem('user_first_name','')
      sessionStorage.setItem('user_email','')
      sessionStorage.setItem('user_theme', '')
  }

// Below is a common handleChange function
// for use with all text fields. No need to modify this
  handleChange(e){
     let change = {}
     change[e.target.name] = e.target.value
     this.setState(change)

     // This is for registration view radio buttons ONLY
     if(e.target.name == 'role')
     {
      this.setState({ selectedRadioValue: e.target.value });
     }
  }


//This sends OTP to user when he tries to log in..
sendOTPForLogin = (event) =>{
      const dataJSON = {
        'email': this.state.email,
        'password': this.state.password
      }

      axios({
        method:'post',
        url:'https://course360.herokuapp.com/authenticate',
        data: dataJSON,
        headers: {'Access-Control-Allow-Origin': '*'},
      })
      .then((response)=>{
        if(response.status != 500){

          ToastStore.success("An email with an OTP has been sent to you!",4000,"whiteFont")
          this.setState({isSignInCardHidden: true});
          this.setState({isVerifyOTPForSigninMFAHidden: false});
        }
        else{
          ToastStore.error("Ooops! Something went wrong! Please check your email and password again!!",6000,"whiteFont")
          console.log('OTP SENDING FAIL!',response);
          this.setState({loginSuccess: false});
          this.goBackToSignIn(event)
        }
      }).catch(err => {
        ToastStore.error("Ooops! Something went wrong! Please check your email and password again!!",6000,"whiteFont")
        console.log('Probably wrong creds!!',err);

      });
}

// User is ready to Log in..provided otp also..
handleSubmit(e) {
  this.wrapperForLoginSubmit(e).then((returnVal) => {
        console.log('What did the login api return?', returnVal);
        if(returnVal){
            // Stuff stored in session...can get using .getItem[<thingy>] from ANYWHERE IN THE UNIVERSE!!!!!
            sessionStorage.setItem('token',returnVal['token'])
            sessionStorage.setItem('user_role',returnVal['role_id'])
            sessionStorage.setItem('user_id',returnVal['user_id'])
            sessionStorage.setItem('user_first_name', returnVal['first_name'])
            sessionStorage.setItem('user_email', returnVal['email'])
            sessionStorage.setItem('user_theme', returnVal['color_theme'])

            this.setState({loginSuccess: true});
          }
        else{
          console.log('ERROR OCCURRED',returnVal);
          ToastStore.error("OOPS! Wrong OTP..Try again!",5000)
          this.goBackToSignIn()
        }
  });

}

// This is called when user tries to signin with OTP
  wrapperForLoginSubmit = (event) =>  {
    const dataJSON = {
      'email': this.state.email,
      'password': this.state.password,
      'otp': this.state.OTPForLogin
    }

    return axios({
      method:'post',
      url:'https://course360.herokuapp.com/login',
      data: dataJSON,
      headers: {'Access-Control-Allow-Origin': '*'},
    })
    .then((response)=>{
      if(response.status != 500){
          return(response.data)
      }
      else{
        console.log('login FAIL');
        return(false)
      }
    }).catch(err => {
      ToastStore.error("Ooops! Something went wrong! Please check your details!!",6000,"whiteFont")
      console.log('LOGIN error occurred',err);
      return(false)
    })
  }

// Below function is called when user remembers Password
// when he enters the forgot password screens i.e., go back to sign-in
  goBackToSignIn(event){
    this.setState({isForgotPasswordCardHidden: true});
    this.setState({isSignInCardHidden: false});
    this.setState({isValidateOTPCardHidden: true});
    this.setState({isVerifyOTPCardHidden: true});
    this.setState({isRegisterNewUserCardHidden: true});
    this.setState({isVerifyOTPForSigninMFAHidden: true});
  }

// check if security answer is correct
// API returns True or False, based on whether
// security answer given by user matches that in DB for his/her email
verifySecurityAnswer(event){
  const dataJSON = {
    'email': this.state.emailForForgotPassword,
    'answer': this.state.securityAnswer
  }

  axios({
    method:'get',
    url:'https://course360.herokuapp.com/sendOtp/email/'+this.state.emailForForgotPassword+'/answer/'+this.state.securityAnswer,
    headers: {'Access-Control-Allow-Origin': '*'},
  })
  .then((response)=>{
    if(response){
      this.setState({isForgotPasswordCardHidden: true});
      this.setState({isSignInCardHidden: true});
      this.setState({isValidateOTPCardHidden: true});
      this.setState({isVerifyOTPCardHidden: false});
      this.setState({isRegisterNewUserCardHidden: true});
      this.setState({isVerifyOTPForSigninMFAHidden: true});
    }

    else{ //answer was wrong...go back to sign in
      ToastStore.error("Sorry!! Wrong answer! Try again!!",5000)
      this.goBackToSignIn(event)
    }
  });

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
      this.setState({isVerifyOTPForSigninMFAHidden: true});
  }

// User types a new password twice
// check if both are same. If yes, call API
// to update DB and go back to sign-in page
// Also check if OTP entered is correct
updateNewPassword(event){

  if(this.state.newPassword == this.state.confirmPassword){
    const dataJSON = {
      'email': this.state.emailForForgotPassword,
      'password': this.state.newPassword
    }

    axios({
      method:'post',
      url:'https://course360.herokuapp.com/updatePassword',
      data: dataJSON,
      headers: {'Access-Control-Allow-Origin': '*'},
    })
    .then((response)=>{
      if(response.data['wasUpdateSuccessful']){

        ToastStore.success("Password changed successfully!!! Please sign in again!!!",4000,"whiteFont")
        this.goBackToSignIn(event)
      }

      else{
        ToastStore.error("Sorry!! Something messed up.... :(",5000)

        this.goBackToSignIn(event)
      }
    });
  }

  else{
      ToastStore.error("Passwords do not match!!!!",5000)
  }

}
// Only show the enter security answer card. Hide everything else
// Gets Sec Question by hitting API securityQuestion/<email>

fetchSecurityQuestion(event){

  axios({
    method:'get',
    url:'https://course360.herokuapp.com/securityQuestion/'+this.state.emailForForgotPassword,
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
      this.setState({isVerifyOTPForSigninMFAHidden: true});
    }

    else{
      ToastStore.error("Sorry!! Something messed up.... :(",5000)
      this.goBackToSignIn(event);

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
registerNewUser = (event) =>{

     const registrationData = {
           firstName: this.state.firstName,
           lastName: this.state.lastName,
           email: this.state.newEmail,
           password: this.state.newUserPassword,
           securityQuestion: this.state.setSecurityQuestion,
           securityAnswer: this.state.setSecurityAnswer,
           role: this.state.role
         }
         console.log(registrationData);
     axios({
       method:'post',
       url:'https://course360.herokuapp.com/register',
       data: registrationData,
       headers: {'Access-Control-Allow-Origin': '*'},
     })
     .then( (response) => {
       ToastStore.success("Thank you! An email with an activation link has been sent to your email! Please activate your account :)",5000)
       // Reset all state variables for registration so that new users do not see it again
       this.setState({firstName: ''});
       this.setState({lastName: ''});
       this.setState({newEmail: ''});
       this.setState({newUserPassword: ''});
       this.setState({setSecurityQuestion: ''});
       this.setState({setSecurityAnswer: ''});
       this.setState({role: ''});
     });

    this.goBackToSignIn(event)

}

  tryToLogin = (email) =>{
    axios({
      method:'get',
      url:'https://course360.herokuapp.com/checkFbUserExistence/email/'+email,
      headers: {'Access-Control-Allow-Origin': '*'}
    })
    .then( (response) => {
      console.log("LOG IN API RETURNED",response.data)
      sessionStorage.setItem('token',response.data['token'])
      sessionStorage.setItem('user_role',response.data['role_id'])
      sessionStorage.setItem('user_id',response.data['user_id'])
      sessionStorage.setItem('user_first_name', response.data['first_name'])
      sessionStorage.setItem('user_email', response.data['email'])
      sessionStorage.setItem('user_theme', response.data['color_theme'])
      this.setState({loginSuccess: true});

    }).catch((error)=>{
      this.setState({promptRole: true});
    })
  }

  responseFacebook = (response) => {
    if(response){
      console.log("LOG IN API RETURNED",response.data)
      this.setState({firstName: response.name, newEmail:response.email, fbAccessToken: response.accessToken, type: 'fb'},
      ()=>{
          this.tryToLogin(response.email);
      });
    }
  }

  sendFBData =() => {
    const registrationData = {
          firstName: this.state.firstName,
          email: this.state.newEmail,
          accessToken: this.state.fbAccessToken,
          role: this.state.selectedRadioValue,
          type: this.state.type
        }
    axios({
      method:'post',
      url:'https://course360.herokuapp.com/registerFbUser',
      data: registrationData,
      headers: {'Access-Control-Allow-Origin': '*'},
    })
    .then( (response) => {
      console.log("LOGIN FB SEND FB DATA",response.data);
      sessionStorage.setItem('token',response.data['token'])
      sessionStorage.setItem('user_role',response.data['role_id'])
      sessionStorage.setItem('user_id',response.data['user_id'])
      sessionStorage.setItem('user_first_name', response.data['first_name'])
      sessionStorage.setItem('user_email', response.data['email'])
      sessionStorage.setItem('user_theme', response.data['color_theme'])
      this.setState({loginSuccess: true});
    });
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
          {this.state.promptRole?
            <CardContent>
              <RadioGroup
                aria-label="Role"
                name="role"
                className={classes.group}
                value={this.state.role}
                onChange={this.handleChange.bind(this)}>

                    <FormControlLabel  value="3" control={<Radio color="primary" checked = {this.state.selectedRadioValue==="3"} />} label="Student" />
                    <FormControlLabel value="2" control={<Radio color="primary" checked = {this.state.selectedRadioValue==="2"}  />} label="Professor" />

              </RadioGroup>
              <CardActions>
                <Button variant="contained" onClick = {this.sendFBData.bind(this)} className = {classes.marginAuto} value="Submit" color="primary">Sign In</Button>
              </CardActions>
            </CardContent>
            :
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
                  <Button variant="contained"
                    onClick = {this.sendOTPForLogin.bind(this)} className = {classes.marginAuto} value="Submit" >Sign In</Button>
                </CardActions>
                <br/>

                <FacebookLogin
                  appId="1932450986840445"
                  autoLoad={false}
                  fields="name,email,picture"
                  textButton="   Login with Facebook"
                  icon="fa-facebook"
                  cssClass="btn"
                  callback={(response)=>this.responseFacebook(response)} />
              </form>
            }
            <div className = {classes.newUserText} >New User? <a onClick = {this.showRegistrationCard.bind(this)} href="#">Register Here!</a></div>
        </CardContent>
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

            {/* The email being entered here is diff from email in login page */}
            <FormControl required>
              <TextField
                id="email-input"
                type="email"
                name="emailForForgotPassword"
                label="Enter your email"
                value={this.state.emailForForgotPassword}
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

/**************************************** Below chunk shows card having security ques  ******************************************************/
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
              We sent a One Time Password to your email :)
            </p>
            <p class='comfortaa-font '>Enter the One Time Password :</p>
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
                  <br />
              <FormControl component="fieldset" className={classes.formControl}>
                  <RadioGroup
                    aria-label="Role"
                    name="role"
                    className={classes.group}
                    value={this.state.role}
                    onChange={this.handleChange.bind(this)}>

                        <FormControlLabel  value="3" control={<Radio color="primary" checked = {this.state.selectedRadioValue==="3"} />} label="Student" />
                        <FormControlLabel value="2" control={<Radio color="primary" checked = {this.state.selectedRadioValue==="2"}  />} label="Professor" />

                  </RadioGroup>
            </FormControl>
        </FormControl>
            <CardActions>
              <Button variant="contained" onClick = {this.registerNewUser.bind(this)} className = {classes.marginAuto} value="Next" color="primary">Register</Button>
            </CardActions>
          </form>
        </CardContent>
          <a href="#" onClick={this.goBackToSignIn.bind(this)} className = {classes.forgotPassword}> Back to Sign In</a>
      </Card>
    }

    //-------------
    // User prompted to enter OTP for Logging in
    //--------------
    if(!(this.state.isVerifyOTPForSigninMFAHidden)){
      currentCard = <Card className={classes.card}>
        <CardContent>
          <Typography class='login-page-headers' color="textSecondary">
            Multifactor Authentication
          </Typography>

          <form>
            <p class='comfortaa-font '>Enter the OTP :</p>
            <TextField
              id="OTPForLogin"
              className={classes.textField}
              value={this.state.OTPForLogin}
              onChange={this.handleChange.bind(this)}
              margin="normal"
              name="OTPForLogin"
            />
            <CardActions>
              <Button variant="contained" onClick = {this.handleSubmit.bind(this)} className = {classes.marginAuto} value="Submit" color="primary">Submit</Button>
            </CardActions>
          </form>

        </CardContent>
        <p onClick = {this.showRegistrationCard.bind(this)} className = {classes.newUserText}> New User? <a href="#">Register Here!</a></p>
      </Card>
    }

    return (
      <div>
        {currentCard}
        <ToastContainer position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore}/>
      </div>
    );
  }
}

SignInCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInCard);
