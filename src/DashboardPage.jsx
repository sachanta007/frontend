import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EmailIcon from '@material-ui/icons/Email';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Grid from '@material-ui/core/Grid';

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
  toolbar: theme.mixins.toolbar,
  rightSpacing: {
    paddingRight: 15
  },
  rightSpacing10: {
    paddingRight: 10
  },
  rightSpacing25: {
    paddingRight: 25
  },
  displayInline:{
    display: 'inline'
  }
});

// ------------------------------------------- Constants end here -----------------------------------------------//

class DashboardPage extends Component {


  constructor(){
    super()
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.state = {
      isHomePageHidden: false,
      isPaymentPortalHidden: true,
      isCalendarHidden: true,
      isSearchHidden: true,
      courseCardStyle: {marginBottom: 18, width: 500},
      courseNameStyle: {fontSize: 20, fontWeight: 'bold', fontFamily: 'Comfortaa'},
      spacing : '16',
      isAdmin: false,
      isAddNewCourseHidden: true,
      isEditCourseHidden: true,
      isViewStudentsHidden: true,
      isViewProfessorsHidden: true,
      selectedRadioValue: '',
      newCourseName: '',
      newCourseDesc: '',
      newCourseLocation: '',
      newCourseProf: '',
      newCourseDays: '',
      newCourseStartTime: '',
      newCourseEndTime: '',
      allProfessorsForSelect: [],
      allStudents: [],
      allProfessors: []
    }
    let currentUserRole = sessionStorage.getItem('user_role')
    console.log(currentUserRole);

    if(currentUserRole == 1){
      this.state.isAdmin = true
      console.log('Admin is in the house!!!');

    }

    else
    {
     this.enrolledCourses = this.getListOfEnrolledCourses()
    }
  }

  // Below is a common handleChange function
  // for use with all input fields. No need to modify this
  // Sets value of state variable with user input.
  // IMPORTANT:
  // Make sure name property and state variable for each
  // input tag are same!!!!

    handleChange(e){
       let change = {}
       change[e.target.name] = e.target.value
       this.setState(change)

       // This is only for the radio buttons
       // at add a new course page
       if(e.target.name == 'newCourseDays')
       {
        this.setState({ selectedRadioValue: e.target.value });
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
      this.setState({isAddNewCourseHidden: true});
    }
    else if(value == 'add'){
      this.setState({isHomePageHidden: true});
      this.setState({isPaymentPortalHidden: true});
      this.setState({isCalendarHidden: true});
      this.setState({isSearchHidden: true});
      this.setState({isAddNewCourseHidden: false});
      this.setState({isEditCourseHidden: true});
      this.setState({isViewStudentsHidden: true});
      this.setState({isViewProfessorsHidden: true});

      // hits api, when result is returned, update state var
      this.getAllProfessorsForSelect().then((returnVal) => {
          this.setState({allProfessorsForSelect: returnVal});
      })
      .catch(err => console.log("Axios err: ", err))
    }

    else if(value == 'edit'){
      this.setState({isHomePageHidden: true});
      this.setState({isPaymentPortalHidden: true});
      this.setState({isCalendarHidden: true});
      this.setState({isSearchHidden: true});
      this.setState({isAddNewCourseHidden: true});
      this.setState({isEditCourseHidden: false});
      this.setState({isViewStudentsHidden: true});
      this.setState({isViewProfessorsHidden: true});
    }

    else if(value == 'view students'){
      this.setState({isHomePageHidden: true});
      this.setState({isPaymentPortalHidden: true});
      this.setState({isCalendarHidden: true});
      this.setState({isSearchHidden: true});
      this.setState({isAddNewCourseHidden: true});
      this.setState({isEditCourseHidden: true});
      this.setState({isViewStudentsHidden: false});
      this.setState({isViewProfessorsHidden: true});

      this.getAllStudents().then((returnVal) => {
        this.setState({allStudents: returnVal});

      })
      .catch(err => console.log("Something messed up with Axios!: ", err))
    }

    else if(value == 'view profs'){
      this.setState({isHomePageHidden: true});
      this.setState({isPaymentPortalHidden: true});
      this.setState({isCalendarHidden: true});
      this.setState({isSearchHidden: true});
      this.setState({isAddNewCourseHidden: true});
      this.setState({isEditCourseHidden: true});
      this.setState({isViewStudentsHidden: true});
      this.setState({isViewProfessorsHidden: false});

      this.getAllProfessorsForSelect().then((returnVal) => {
        this.setState({allProfessors: returnVal});

      })
      .catch(err => console.log("Something messed up with Axios!: ", err))
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


  // Get list of all professors to be populated
  // in select drop down while adding new courses

  getAllProfessorsForSelect(){

    return axios({
      method:'get',
      url:'http://localhost:5000/getAllProfessors/start/1/end/100000',
      headers: {'Access-Control-Allow-Origin': '*',
      'Authorization': sessionStorage.getItem('token')}
    })
    .then((response)=>{
      return(response.data)
    });

  }

  // ---------------------------------------------
  // Get list of all students to be shown in ADMIN
  // view, when clicked on corresponding side nav option
  // ----------------------------------------------

  getAllStudents(){
    return axios({
      method:'get',
      url:'http://localhost:5000/getAllStudents/start/1/end/100000',
      headers: {'Access-Control-Allow-Origin': '*',
      'Authorization': sessionStorage.getItem('token')}
    })
    .then((response)=>{
      return(response.data)
    });
  }


  // -------------------------
  // Get all form input data and hit api
  // Success is a new record in Courses table in DB!
  // -------------------------
  addNewCourse(e){
    const dataJSON = {
            course_name: this.state.newCourseName,
            description : this.state.newCourseDesc,
            location: this.state.newCourseLocation,
            prof_id: this.state.newCourseProf,
            days: this.state.newCourseDays,
            start_time: this.state.newCourseStartTime,
            end_time: this.state.newCourseEndTime,
            role_id: sessionStorage.getItem('user_role'),
            department: 'DEFAULT_DEPT'
        }

        axios({
          method:'post',
          url:'http://localhost:5000/insertCourses',
          data: dataJSON,
          headers: {'Access-Control-Allow-Origin': '*',
          'Authorization': sessionStorage.getItem('token')},
        })
        .then(function (response) {
            if(response.data != 'Error : Something went wrong')
            {
              alert('Course has been added successfully!!')
            }
        });
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state; // this is for student grid in admin
    let sideNav; //this contains the html for the page to be viewed now
    let currentContent;

    // --------------------------------- CURRENT USER IS AN ADMIN ------------------------------------//
    if(this.state.isAdmin){

      // ------------- ADMIN HOME PAGE -------------------------- //
      if(!(this.state.isHomePageHidden))
      {
        currentContent =   <main className={classes.content}>
            <div className={classes.toolbar} />
              <h2> How ya doing? </h2>
          </main>
      }

      // ------------- ADMIN ADD NEW COURSE ---------------------//
      if(!(this.state.isAddNewCourseHidden)){
        currentContent = <main className = {classes.content}>
          <div className = {classes.toolbar} />

          <h2> Details of new course</h2>
          <Card>
            <CardContent>
              <span className = {classes.rightSpacing}>Course Title</span>
              <FormControl required>
                  <TextField
                      id="newCourseName"
                      className={classes.textField}
                      value={this.state.newCourseName}
                      onChange={this.handleChange.bind(this)}
                      margin="normal"
                      name="newCourseName"
                    />
              </FormControl>
              <br /><br />

              <span className = {classes.rightSpacing}>Description</span>
              <FormControl required>
                  <TextField
                      id="newCourseDesc"
                      multiline
                      rows = "2"
                      rowsMax="5"
                      className={classes.textField}
                      value={this.state.newCourseDesc}
                      onChange={this.handleChange.bind(this)}
                      margin="normal"
                      name="newCourseDesc"

                    />
              </FormControl>
                  <br /><br />

              <span className = {classes.rightSpacing}>Location</span>
              <FormControl required>
                  <TextField
                      id="newCourseLocation"
                      className={classes.textField}
                      value={this.state.newCourseLocation}
                      onChange={this.handleChange.bind(this)}
                      name="newCourseLocation"
                      margin="normal"
                    />
              </FormControl>
              <br /><br />

              <span className = {classes.rightSpacing}>Professor</span>
              <FormControl required>
                <Select
                      value={this.state.newCourseProf}
                      onChange={this.handleChange.bind(this)}
                      name="newCourseProf"
                      >
                          {
                            this.state.allProfessorsForSelect.map((el,i) => (<MenuItem key={i} value={el.user_id}> {el.first_name} {el.last_name}</MenuItem>))
                          }
                    </Select>
              </FormControl>
              <br /><br /><br />

                <FormControl required className = {classes.rightSpacing}>
                  <TextField
                        id="newCourseStartTime"
                        name="newCourseStartTime"
                        label="Start Time"
                        type="time"
                        value={this.state.newCourseStartTime}
                        onChange={this.handleChange.bind(this)}

                        className={classes.textField}
                      />
                </FormControl>

                <FormControl required className = {classes.rightSpacing25}>
                  <TextField
                        id="newCourseEndTime"
                        name="newCourseEndTime"
                        label="End Time"
                        type="time"
                        value={this.state.newCourseEndTime}
                        onChange={this.handleChange.bind(this)}

                        className={classes.textField}
                      />
                </FormControl>


                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup
                      aria-label="Days"
                      name="newCourseDays"
                      className={classes.displayInline}
                      value={this.state.newCourseDays}
                      onChange={this.handleChange.bind(this)}>

                          <FormControlLabel  value="1" control={<Radio color="primary" checked = {this.state.selectedRadioValue==="1"} />} label="Mon & Wed" />
                          <FormControlLabel value="2" control={<Radio color="primary" checked = {this.state.selectedRadioValue==="2"}  />} label="Tue & Thu" />
                          <FormControlLabel value="3" control={<Radio color="primary" checked = {this.state.selectedRadioValue==="3"}  />} label="Fri" />

                    </RadioGroup>
              </FormControl>
              <CardActions>
                <Button variant="contained" onClick = {this.addNewCourse.bind(this)} className = {classes.marginAuto} color="primary">Add</Button>
              </CardActions>
            </CardContent>

          </Card>

        </main>
      }

      //------------------ ADMIN VIEW ALL STUDENTS PAGE ----------------------------------//
      if(!this.state.isViewStudentsHidden){
        currentContent = <main className = {classes.content}>
          <div className = {classes.toolbar} />
            <Grid container className={classes.root} spacing={16}>
                 <Grid item xs={12}>
                   <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>

                     {
                       this.state.allStudents.map((el,i) => (
                         <Grid key={i} item>
                           <Card >
                             <CardContent>
                                <AccountCircle className = {classes.rightSpacing10}/>
                                 {el.first_name}  {el.last_name} <br />
                               <EmailIcon className = {classes.rightSpacing10}/> {el.email}
                             </CardContent>
                           </Card>
                         </Grid>
                       ))
                     }

                   </Grid>
            </Grid>
          </Grid>
        </main>
      }

      //--------------------- ADMIN VIEW ALL PROFESSORS ---------------------------------//
      if(!this.state.isViewProfessorsHidden){
        currentContent = <main className = {classes.content}>
          <div className = {classes.toolbar} />
            <Grid container className={classes.root} spacing={16}>
                 <Grid item xs={12}>
                   <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>

                     {
                       this.state.allProfessors.map((el,i) => (
                         <Grid key={i} item>
                           <Card >
                             <CardContent>
                                <AccountCircle className = {classes.rightSpacing10}/>
                                 {el.first_name}  {el.last_name} <br />
                               <EmailIcon className = {classes.rightSpacing10}/> {el.email}
                             </CardContent>
                           </Card>
                         </Grid>
                       ))
                     }

                   </Grid>
            </Grid>
          </Grid>
        </main>
      }

      //------------------- ADMIN SIDE NAV IS ALWAYS PRESENT --------------------//
      sideNav =
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

              <ListItem button onClick={this.handleMenuItemClick.bind(this, "view profs")}>
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary="View Professors" />
              </ListItem>

          </List>
          <Divider />
        </Drawer>
        {currentContent}
        </div>

    }
  // -------------- ADMIN SECTION ENDS HERE.... NOW STUDENT AND PROF ---------------------------------//


    //checks which page has been clicked from the side navigation

    // --------------------------------- HOME PAGE OF STUDENTS / PROFS---------------------------------------------- //
    if(!(this.state.isHomePageHidden) && !(this.state.isAdmin)){
      sideNav = <div>
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
        {sideNav}
      </div>
    )
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardPage);
