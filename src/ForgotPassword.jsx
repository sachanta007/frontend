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

class ForgotPasswordCard extends Component {
  constructor()
    {
      super();
      this.handleSubmit = this.handleSubmit.bind(this)
      this.state ={
        email: '',
        password:'',
        isHidden:false
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
        const dataJSON = {
          'email': this.state.email,
          'password': this.state.password
        }
        console.log(dataJSON);
        event.preventDefault();
      }

handleForgotPassword(event){
  this.setState({isHidden: true});

}
  render(){
    const { classes } = this.props;
    const style = this.state.isHidden ? {'display':'none'} : {};

  return (
    <div>
      stupidity
    </div>

  );
}
}

ForgotPasswordCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPasswordCard);
