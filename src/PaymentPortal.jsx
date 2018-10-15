import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import { render } from "react-dom";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio';
import FormHelperText from '@material-ui/core/FormHelperText';



const styles = {
  card: {
    marginTop: 80,
    width: 400,
    margin: 'auto'
  },
  card1: {
    marginTop: 80,
    width: 400,
    margin: 'auto'
  },
  card2: {
    marginTop: 80,
    width: 400,
    margin: 'auto'
  },
  deleteIcon:{
    marginTop: 20,
    marginLeft: 350
  },
  marginAuto:{
    margin:'auto'
  }


};
const axios = require('axios');


  class PaymentPortal extends React.Component {
  constructor()
  {
    super();
    this.state ={
      firstCourse:'',
      SecondCourse:'',
      ThirdCourse:'',
      TotalAmount:'',
      isPaymentPortalCardHidden:false,
      isPaymentModeCardHidden:true,
      isPaymentSuccessfulCardHidden:true

      }
    }

    prompt(e) {
    alert(e);
    console.log('The link was clicked.');
    }

    handleChange = event => {
    this.setState({ value: event.target.value });
  };

  PaymentMode(event) {
    this.setState({isPaymentPortalCardHidden: true});
    this.setState({isPaymentModeCardHidden: false});
    this.setState({isPaymentSuccessfulCardHidden: true});
  }

 EnterDetails(event){
 this.setState({isPaymentPortalCardHidden: true});
 this.setState({isPaymentModeCardHidden: true});
 this.setState({isPaymentSuccessfulCardHidden: false});

 }


    render() {
    const { classes } = this.props;
    let currentCard;

    if(!this.state.isPaymentPortalCardHidden){

    currentCard = <div>
    <Card className={classes.card}>
               <DeleteIcon className={classes.icon, classes.deleteIcon} />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                Course 1
                </Typography>
                <Typography component="p">
                  Mon, Tues 1:45
                </Typography>
              </CardContent>
          </Card>

          <Card className={classes.card1}>
          <Button onClick={this.prompt.bind(this,'hello')}>
          <DeleteIcon className={classes.icon, classes.deleteIcon} />
          </Button>
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                      Course 2
                      </Typography>
                      <Typography component="p">
                        Mon, Wed 4:00
                      </Typography>
                    </CardContent>
                </Card>


                <Card className={classes.card2}>
                        <DeleteIcon className={classes.icon, classes.deleteIcon} />
                          <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                            Course 3
                            </Typography>
                            <Typography component="p">
                            Thurs, Fri 1:00
                            </Typography>
                          </CardContent>
                      </Card>

                      <div>
                          <CardActions>
                      <Button variant="contained" onClick = {this.PaymentMode.bind(this)} className = {classes.marginAuto}  color="primary">Checkout</Button>
                         </CardActions>
                      </div>
          </div>
}
if(!this.state.isPaymentModeCardHidden)
{

currentCard=

      <div className={classes.root}>


        <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Payment Mode</FormLabel>
                  <RadioGroup
                    aria-label="Payment Mode"
                    name="Payment Mode"
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="Credit Card"
                      control={<Radio color="primary" />}
                      label="Credit Card"
                    labelPlacement="end"
                    />
                    <FormControlLabel
                      value="eCheck"
                      control={<Radio color="primary" />}
                      label="eCheck"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="Coupon"
                      control={<Radio color="primary" />}
                      label="Coupon"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                  <Button variant="contained" onClick = {this.EnterDetails.bind(this)} className = {classes.marginAuto}  color="primary">Pay</Button>

                </FormControl>

    </div>

}



if(!this.state.isPaymentSuccessfulCardHidden)
{

currentCard =   <Card className={classes.card}>
  <CardContent>
    <Typography class='login-page-headers' color="textSecondary">
      Enter your details
    </Typography>

    <form>
<FormControl required>
    <TextField
        id="Details"
        type="text"
        label="Card Number"
        className={classes.textField}
        value={this.state.Details}
        onChange={this.handleChange.bind(this)}
        margin="normal"
        name="Details"
      />

      <Button variant="outlined" className = {classes.marginAuto}  color="primary">Submit</Button>


      </FormControl>

            </form>

          </CardContent>
            </Card>


}


      return (
           <div>
             {currentCard}
           </div>
         );

    }
  }




    PaymentPortal.propTypes = {
      classes: PropTypes.object.isRequired,
    };


    export default withStyles(styles)(PaymentPortal);
