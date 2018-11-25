import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { Component } from 'react';
import BackgroundSlideshow from 'react-background-slideshow'
import BackgroundSlider from 'react-background-slider'

class UserActivatedPage extends Component {



  render() {
    return (
      <div >



           <div>
            <BackgroundSlider images={['build/login_bg.png', 'build/2.jpg', 'build/6.jpg', 'build/7.jpg','build/8.jpg']}
              duration={10} transition={2} classname="ImageAnimation"/>
            </div>
            <h1 className="login-banner" style={{position:'absolute'}}>  Course360</h1>
            <p className = "login-page-headers center-text"> Success! Your details have been validated!</p>
            <p className = "comfortaa-font user-added-font center-text"> Please go
              <a href='#'> back </a>
              and sign in again with your new credentials!</p>






     </div>
    )
  }

}
export default UserActivatedPage;
