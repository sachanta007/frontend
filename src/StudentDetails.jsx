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
import Input from '@material-ui/core/Input';
import { render } from "react-dom";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Select from '@material-ui/core/Select';
import {ToastContainer, ToastStore} from 'react-toasts';


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  margin1: {
  margin: theme.spacing.unit*3,
  },
  card: {
    marginTop: 80,
    width: 700,
    height:900,
    margin: 'auto'
  },

});

function DatePickers(props) {
  const { classes } = props;
  };

function InputWithIcon(props) {
  const { classes } = props;
};


const axios = require('axios');


  class StudentDetails extends React.Component {
  constructor()
  {
    super();
    console.log("hhhhhh")
    this.state ={

      isStudentDetailsFormHidden:false,


      }
    }


  handleSubmit = (e) => {
     console.log(e);
}

componentDidMount(){
console.log('sss')
}
  StudentDetailsForm(event) {
    this.setState({isPaymentModeCardHidden: false});
  }


    render() {
    const { classes } = this.props;
    let currentCard;

    if(!this.state.isPaymentPortalCardHidden){

    currentCard = <div>
    <Card className={classes.card}>

              <CardContent>


              <div>
              <Typography class='login-page-headers' color="primary">
                Student Details
              </Typography>
                   <FormControl className={classes.margin}>
                     <InputLabel htmlFor="input-with-icon-adornment">First Name</InputLabel>
                     <Input
                       id="input-with-icon-adornment"
                       startAdornment={
                         <InputAdornment position="start">
                           <AccountCircle />
                         </InputAdornment>
                       }
                     />
                   </FormControl>

                   <FormControl className={classes.margin}>
                     <InputLabel htmlFor="input-with-icon-adornment">Middle Name</InputLabel>
                     <Input
                       id="input-with-icon-adornment"
                       startAdornment={
                         <InputAdornment position="start">
                           <AccountCircle />
                         </InputAdornment>
                       }
                     />
                   </FormControl>

                   <FormControl className={classes.margin}>
                     <InputLabel htmlFor="input-with-icon-adornment">Last Name</InputLabel>
                     <Input
                       id="input-with-icon-adornment"
                       startAdornment={
                         <InputAdornment position="start">
                           <AccountCircle />
                         </InputAdornment>
                       }
                     />
                   </FormControl>



                <form className={classes.container} noValidate>
                 <TextField
                   id="date"
                   label="Birthday"
                   type="date"
                   defaultValue="2018-10-29"
                   className={classes.textField}
                   InputLabelProps={{
                   shrink: true,
                   }}
                  />

<Typography style={{display: 'inline-block'}}></Typography>
                       <FormControl className={classes.formControl, classes.margin1}>
                         <InputLabel htmlFor="Gender-simple">Gender</InputLabel>
                         <Select
                           value={this.state.Gender}
                           onChange={this.handleChange}
                           inputProps={{
                             name: 'Gender',
                             id: 'Gender-simple',
                           }}
                         >
                           <MenuItem value="">
                             <em>N/A</em>
                           </MenuItem>
                           <MenuItem value={0}>Male</MenuItem>
                           <MenuItem value={1}>Female</MenuItem>

                         </Select>
                       </FormControl>
                       </form>

                    <form>
                      <TextField
                       id="standard-multiline-static"
                       label="Permanent Address"
                       multiline
                       rows="4"
                       defaultValue="Street 1"
                       className={classes.textField}
                       margin="normal"
                      />

                      <FormControl className={classes.margin1}>
                      <TextField
                      id="standard-multiline-static"
                       label="Temporary Address"
                       multiline
                       rows="4"
                       defaultValue="Street 1"
                       className={classes.textField}
                       margin="normal"
                      />
                        </FormControl>
                      </form>

                      <form>
                      <TextField
                        id="email-input"
                        type="email"
                        name="newEmail"
                        label="Email"

                        value={this.state.newEmail}
                        className={classes.textField}
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        />

                        <FormControl className={classes.margin1}>
                        <TextField
                        label="Mobile Number"
                        id="margin-none"
                        defaultValue="+ code"
                        className={classes.textField}
                        helperText="Enter US number"
                        />
                        </FormControl>
                        </form>

                        <form>
                        <TextField
                        label="CGPA"
                        id="margin-none"
                        defaultValue=" "
                        className={classes.textField}
                        helperText="upto Current semester"
                        />

                        <FormControl className={classes.margin1}>
                        <TextField
                        label="Program"
                        id="margin-none"
                        defaultValue=" "
                        className={classes.textField}
                        helperText="e.g CS/DS etc."
                        />




                        </FormControl>

                        </form>


                       <Button variant="outlined"  onClick={() => ToastStore.success(" Submitted the form successfully!!")}  className = {classes.marginBottom}  color="primary">Submit</Button>

                      <ToastContainer position={ToastContainer.POSITION.BOTTOM_CENTER} lightBackground store={ToastStore}/>



                 </div>



              </CardContent>
          </Card>
          </div >
          }

          return (
               <div>
                 {currentCard}
               </div>
             );


      }
  }


StudentDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};


  export default withStyles(styles)(StudentDetails);
