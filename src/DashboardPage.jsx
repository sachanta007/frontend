import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

// -------------------- Declaring constants here -------------------//
const drawerWidth = 240;
const axios = require('axios');


  const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 660,
    zIndex: 2,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBarHeading: {
    marginRight: 1160,

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});

// ------------------------------------------- Constants end here -----------------------------------------------//

class DashboardPage extends Component {
  constructor(){
    super()

    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    let currentUserRole = sessionStorage.getItem('user_role')

    this.state = {
      isHomePageHidden: false,
      isPaymentPortalHidden: true,
      isCalendarHidden: true,
      isSearchHidden: true,
      courseCardStyle: {marginBottom: 18, width: 500},
      courseNameStyle: {fontSize: 20, fontWeight: 'bold', fontFamily: 'Comfortaa'},
      isAdmin: false
    }

    if(currentUserRole == 1){
      this.state.isAdmin = true
      console.log('Admin is in the house!!!');
    }

    if(currentUserRole != 1)
    {
     this.enrolledCourses = this.getListOfEnrolledCourses()
    }
  }


// ---------------------------------------------
// Show/Hides pages based on side nav link clicks
// ---------------------------------------------
  handleMenuItemClick(value,event){
    if(value == 'home'){
      this.setState({isHomePageHidden: false});
      this.setState({isPaymentPortalHidden: true});
      this.setState({isCalendarHidden: true});
      this.setState({isSearchHidden: true});
    }
  }


// ---------------------------
// Hit API to get enrolled courses for current USER
// Can be courses a prof is teaching too, if current user is a professor
// Returns Cards to be rendered directly
// ----------------------------
  getListOfEnrolledCourses(){
    let courses = [
      {'course_name' : 'Applied Algorithms', 'location': 'BH 101', 'marks': '100%', 'professor':'Funda Ergun', 'start_time': '4.00 PM', 'end_time': '5.15 PM', 'attendance': '100%','days':'1' },
      {'course_name' : 'Elements of AI', 'location': 'BH 101', 'marks': '100%', 'professor':'Funda Ergun', 'start_time': '4.00 PM', 'end_time': '5.15 PM', 'attendance': '100%','days':'2' },
      {'course_name' : 'Software Engineering', 'location': 'BH 101', 'marks': '100%', 'professor':'Funda Ergun', 'start_time': '4.00 PM', 'end_time': '5.15 PM', 'attendance': '100%','days':'3' },

    ]

    let contentToReturn = courses.map((element) => {
      return(<Card style={this.state.courseCardStyle}>
                <CardContent>
                  <Typography style={this.state.courseNameStyle} >
                      {element.course_name}
                  </Typography>
                {element.professor} || <nbsp />
                {element.location} || {element.days == '1' ? 'MW' : element.days == '2' ? 'TuTh' : 'F'} || {element.start_time} - {element.end_time}
                 <br /> <br />
                 Marks: {element.marks}
                 <br />
                 Attendance: {element.attendance}
                </CardContent>
      </Card>)
    })

    return(contentToReturn)
  }

  render() {
    const { classes } = this.props;
    let currentView; //this contains the html for the page to be viewed now

    // --------------------------------- CURRENT USER IS AN ADMIN ------------------------------------//
    if(this.state.isAdmin){
      // ---- HOME PAGE OF ADMIN --- //
      if(!(this.state.isHomePageHidden)){
            currentView =
              <div className={classes.root}>


              <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                  <Typography className = {classes.appBarHeading} variant="headline" color="inherit">
                    Course360
                  </Typography>
                  <IconButton color="inherit" aria-label="Menu">
                   <AccountCircle />
                 </IconButton>
                </Toolbar>
              </AppBar>


              <Drawer
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div className={classes.toolbar} />
                <List>
                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "home")}>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItem>

                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "add")}>
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add New Course" />
                    </ListItem>

                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "edit")}>
                      <ListItemIcon>
                        <CalendarTodayIcon />
                      </ListItemIcon>
                      <ListItemText primary="Edit Course" />
                    </ListItem>

                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "view students")}>
                      <ListItemIcon>
                        <CalendarTodayIcon />
                      </ListItemIcon>
                      <ListItemText primary="View Students" />
                    </ListItem>

                </List>
                <Divider />
              </Drawer>

              <main className={classes.content}>
                <div className={classes.toolbar} />
                  <h2> Hello Admin!! </h2>
              </main>
             </div>

        }
          // ------------- ADMIN HOME PAGE ENDS -----------------------------//

    }
  // -------------- ADMIN SECTION ENDS HERE.... NOW STUDENT AND PROF ---------------------------------//


    //checks which page has been clicked from the side navigation

    // --------------------------------- HOME PAGE OF STUDENTS / PROFS---------------------------------------------- //
    if(!(this.state.isHomePageHidden) && !(this.state.isAdmin)){
      currentView = <div>
              <div className={classes.root}>

              <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                  <Typography className = {classes.appBarHeading} variant="headline" color="inherit">
                    Course360
                  </Typography>
                  <IconButton color="inherit" aria-label="Menu">
                   <AccountCircle />
                 </IconButton>
                </Toolbar>
              </AppBar>

              <Drawer
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <div className={classes.toolbar} />
                <List>
                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "home")}>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItem>

                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "search")}>
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary="Course Search" />
                    </ListItem>

                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "payment")}>
                      <ListItemIcon>
                        <AttachMoneyIcon />
                      </ListItemIcon>
                      <ListItemText primary="Payment Portal" />
                    </ListItem>

                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "calendar")}>
                      <ListItemIcon>
                        <CalendarTodayIcon />
                      </ListItemIcon>
                      <ListItemText primary="Calendar" />
                    </ListItem>

                </List>
                <Divider />
              </Drawer>

            
              <main className={classes.content}>
                <div className={classes.toolbar} />
                  <h2> Your Courses</h2>
                  {this.enrolledCourses}
              </main>
          </div>
        </div>
    }
    // ---------------------------------- END OF HOME PAGE ---------------------------------------- //


    return (
      <div>
        {currentView}
      </div>
    )
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardPage);
