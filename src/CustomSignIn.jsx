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
      securityQuestion: "What is your cat's name?",
      securityAnswer:''
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

// Below function hides/shows forgot password card and sign-in card according to
// button clicks of 'Forgot Password?' Toggling is done here based on prevState
// Can add multiple other flags here, e.g. for registration page show/hide
  handleForgotPassword(event){
    this.setState(prevState => ({
      isSignInCardHidden: !prevState.isSignInCardHidden,
      isForgotPasswordCardHidden: !prevState.isForgotPasswordCardHidden
    }));
  }

  render(){
    const { classes } = this.props;
    const isSignInCardHidden = this.state.isSignInCardHidden; //bool value to indicate whether card is hidden or not
    const isForgotPasswordCardHidden = this.state.isForgotPasswordCardHidden;
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
              id="answer"
              className={classes.textField}
              value={this.state.securityAnswer}
              onChange={this.handleChange.bind(this)}
              margin="normal"
              name="answer"
            />
          <br />
          <br />

          {/* This is the line of code that hides/shows forgot password VS signin page. Same function is used as above */}
            <a href="#" onClick={this.handleForgotPassword.bind(this)} className = {classes.forgotPassword}> I remember now! Go back</a>

            <CardActions>
              <Button variant="contained" className = {classes.marginAuto} value="Next" color="primary">Next</Button>
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
