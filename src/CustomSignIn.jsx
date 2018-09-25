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
        password:''
      }
    }

handleEmailChange(event){
  this.setState({email: event.target.value})

}


handlePasswordChange(event){
  this.setState({password: event.target.value})

}
    handleSubmit(event) {
        console.log(this.state.email);
        console.log(this.state.password);
      
        event.preventDefault();
      }

  render(){
    const { classes } = this.props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
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
                  onChange = {this.handleEmailChange.bind(this)}
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
                  onChange={this.handlePasswordChange.bind(this)}
                  autoComplete="current-password"
                  margin="normal"
                  name="password"

                />
            </FormControl>
            <br />

            <a href="#" className = {classes.forgotPassword}> Forgot Password?</a>

          <CardActions>
              <Button variant="contained" type="submit" className = {classes.marginAuto} value="Submit" color="primary">Sign In</Button>
          </CardActions>
      </form>
      </CardContent>
        <p className = {classes.newUserText}> New User? <a href="#">Register Here!</a></p>
    </Card>

  );
}
}

SignInCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignInCard);
