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
  forgotPasword :{
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
      this.state = {
        newUser :{"a": 12}
      }
    }

    handleChangeEmail(event) {
      this.setState({email: event.target.value})
  }

    handleSubmit(e){
      emailValue = this.state.email;
      e.preventDefault();
    }

  render(){
    const { classes } = this.props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
        Sign In
        </Typography>

        <form onSubmit = {this.handleSubmit.bind(this)}>
          <FormControl required>
          <TextField
          id="email-input"
          type="email"
          name="email"
          label="Email"
          ref = "email"
          value={this.state.email}
          onChange={this.handleChangeEmail.bind(this)}
          className={classes.textField}
          margin="normal"
          autoComplete = 'email'
        />
      </FormControl>
      <br />

      <FormControl required>
        <TextField
              id="password-input"
              label="Password"
              className={classes.textField}
              type="password"
              ref="password"
              autoComplete="current-password"
              margin="normal"
              name="password"
            />
        </FormControl>
        <br />

        <a href="#" className = {classes.forgotPasword}> Forgot Password?</a>



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
