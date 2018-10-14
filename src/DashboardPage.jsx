import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircle from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import SchoolIcon from '@material-ui/icons/School';
import FaceIcon from '@material-ui/icons/Face';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
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
    padding: theme.spacing.unit * 3,
    overflowY: 'auto'
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
  },
  boldText:{
    fontWeight: 'bold'
  },
  buttonStyles:{

    marginRight: 20
  }
});

// ------------------------------------------- Constants end here -----------------------------------------------//

class DashboardPage extends Component {
  constructor(){
    super()
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.editSingleCourse = this.editSingleCourse.bind(this);
    this.updateCourseInDB = this.updateCourseInDB.bind(this);
    this.addNewCourse = this.addNewCourse.bind(this);
    this.deleteCourseInDB = this.deleteCourseInDB.bind(this);


    this.state = {
      isHomePageHidden: false,
      isPaymentPortalHidden: true,
      isCalendarHidden: true,
      isSearchHidden: true,
      courseCardStyle: {marginBottom: 18, width: 440},
      courseNameStyle: {fontSize: 20, fontWeight: 'bold', fontFamily: 'Comfortaa'},
      spacing : '16',
      isAdmin: false,
      isAddNewCourseHidden: true,
      isEditCourseHidden: true,
      isEditSingleCourseHidden: true,
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

      editCourseName: '',
      editCourseDesc: '',
      editCourseLocation: '',
      editCourseProf: '',
      editCourseDays: '',
      editCourseStartTime: '',
      editCourseEndTime: '',

      allProfessorsForSelect: [],
      allStudents: [],
      allProfessors: [],
      allCoursesForAdminHome: [],
      detailsOfCurrentCourseToEdit: []

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
  // Make sure name property and state variable for the
  // input tag are same!!!!

    handleChange(e){
       let change = {}
       change[e.target.name] = e.target.value
       this.setState(change)

       // This is only for the radio buttons
       // at add a new course page
       if(e.target.name == 'newCourseDays' || e.target.name =='editCourseDays')
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
      this.setState({isEditCourseHidden: true});
      this.setState({isViewStudentsHidden: true});
      this.setState({isViewProfessorsHidden: true});
      this.setState({isEditSingleCourseHidden: true})

      this.componentDidMount()
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
      this.setState({isEditSingleCourseHidden: true})

      // hits api, when result is returned, update state var
      this.getAllProfessorsForSelect().then((returnVal) => {
          this.setState({allProfessorsForSelect: returnVal});
      })
      .catch(err => console.log("Axios err at add course: ", err))
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
      this.setState({isEditSingleCourseHidden: true})

      this.componentDidMount()
      this.getAllProfessorsForSelect().then((returnVal) => {
          this.setState({allProfessorsForSelect: returnVal});
      })
      .catch(err => console.log("Axios err at add course: ", err))
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
      this.setState({isEditSingleCourseHidden: true})

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
      this.setState({isEditSingleCourseHidden: true})

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

    if(sessionStorage.getItem('user_role') == 3){
        let contentToReturn = courses.map((element) => {
          return(<Card style={this.state.courseCardStyle}>
                    <CardContent>
                      <Typography style={this.state.courseNameStyle} >
                          {element.course_name}
                      </Typography>
                    {element.professor} || &nbsp;
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

  else if(sessionStorage.getItem('user_role') == 2){
        let contentToReturn = courses.map((element) => {
          return(<Card style={this.state.courseCardStyle}>
                    <CardContent>
                      <Typography style={this.state.courseNameStyle} >
                          {element.course_name}
                      </Typography>

                    {element.location} || {element.days == '1' ? 'MW' : element.days == '2' ? 'TuTh' : 'F'} || {element.start_time} - {element.end_time}
                     <br /> <br />
                    </CardContent>
          </Card>)
        })
        return(contentToReturn)
      }
  }

//----------------------------------
// Lifecycle method that gets all courses
// when 'edit' in menu is clicked and
// when page loads (sorta like a constructor yeah??)
//----------------------------------
componentDidMount() {
  if(sessionStorage.getItem('user_role')==1)
  {
    this.hitAPIForAdminHomePageCourses().then((returnVal) => {
      this.setState({allCoursesForAdminHome: returnVal})

    })
    .catch(err => console.log("Component Did mount Exception!!: ", err))
  }
}

// Calls API for admin home page courseCard

hitAPIForAdminHomePageCourses(){
  return axios({
    method:'get',
    url:'http://localhost:5000/getAllCourses/start/0/end/100000',
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    return(response.data)
  });
}


  // Get list of all professors to be populated
  // in select drop down while adding new courses
  getAllProfessorsForSelect(){
    return axios({
      method:'get',
      url:'http://localhost:5000/getAllProfessors/start/0/end/100000',
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
      url:'http://localhost:5000/getAllStudents/start/0/end/100000',
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
  addNewCourse = (e) => {

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
        .then((response) => {
            if(response.data != 'Error : Something went wrong')
            {
              this.componentDidMount()
              alert('Course has been added successfully!!')
              this.setState({newCourseName: ''});
              this.setState({newCourseDesc: ''});
              this.setState({newCourseLocation: ''});
              this.setState({newCourseProf: ''});
              this.setState({newCourseDays: ''});
              this.setState({newCourseStartTime: ''});
              this.setState({newCourseEndTime: ''});

              this.setState({isAddNewCourseHidden: true});
              this.setState({isHomePageHidden: false});

            }
        });
  }

  //------------------------------------------------
  // Search by course_name for a particular course
  // in whole array of objects containing all courses
  // and their corresponding details
  //-------------------------------------------------
  getDetailsOfCourseToEdit(key, array){
       for (var i=0; i < array.length; i++) {
           if (array[i].course_name === key) {
               return array[i];
           }
       }
   }


  //-----------------------------
  // When clicked on a course card in Edit screen
  // navigate the admin to a different screen
  // with form fields to edit CURRENT course's details
  // and hit api to update CURRENT record in Database
  //------------------------------
  editSingleCourse(value,event){

    let details = this.getDetailsOfCourseToEdit(value,this.state.allCoursesForAdminHome)
    this.setState({detailsOfCurrentCourseToEdit: details})
    this.setState({isEditCourseHidden: true})
    this.setState({isEditSingleCourseHidden: false})

  }

//-----------------------------
// Calls API to update record for a course
//-----------------------------

  updateCourseInDB(e){
    console.log('Previous details',this.state.detailsOfCurrentCourseToEdit);
    this.state.editCourseName = (this.state.editCourseName == '') ? this.state.detailsOfCurrentCourseToEdit['course_name'] : this.state.editCourseName

    this.state.editCourseDesc = (this.state.editCourseDesc == '') ? this.state.detailsOfCurrentCourseToEdit['description'] : this.state.editCourseDesc
    this.state.editCourseLocation = (this.state.editCourseLocation == '') ? this.state.detailsOfCurrentCourseToEdit['location'] : this.state.editCourseLocation
    this.state.editCourseProf = (this.state.editCourseProf == '') ? this.state.detailsOfCurrentCourseToEdit['professor'].user_id : this.state.editCourseProf
    this.state.editCourseDays = (this.state.editCourseDays == '') ? this.state.detailsOfCurrentCourseToEdit['days'].toString() : this.state.editCourseDays
    this.state.editCourseStartTime = (this.state.editCourseStartTime == '') ? this.state.detailsOfCurrentCourseToEdit['start_time'] : this.state.editCourseStartTime
    this.state.editCourseEndTime = (this.state.editCourseEndTime == '') ? this.state.detailsOfCurrentCourseToEdit['end_time'] : this.state.editCourseEndTime

    const dataJSON = {
            course_name: this.state.editCourseName,
            course_id: this.state.detailsOfCurrentCourseToEdit['course_id'],
            description : this.state.editCourseDesc,
            location: this.state.editCourseLocation,
            prof_id: this.state.editCourseProf,
            days: this.state.editCourseDays,
            start_time: this.state.editCourseStartTime,
            end_time: this.state.editCourseEndTime,
            role_id: sessionStorage.getItem('user_role'),
            department: 'DEFAULT_DEPT'
        }
        console.log('data to be sent',dataJSON);
        axios({
          method:'post',
          url:'http://localhost:5000/updateCourses',
          data: dataJSON,
          headers: {'Access-Control-Allow-Origin': '*',
          'Authorization': sessionStorage.getItem('token')},
        })
        .then((response) => {
            if(response.data != 'Error : Something went wrong')
            {
              alert('Course has been updated successfully!!')
              this.setState({editCourseName: ''});
              this.setState({editCourseDesc: ''});
              this.setState({editCourseLocation: ''});
              this.setState({editCourseProf: ''});
              this.setState({editCourseDays: ''});
              this.setState({editCourseStartTime: ''});
              this.setState({editCourseEndTime: ''});

              this.componentDidMount();

              this.setState({isEditSingleCourseHidden: true})
              this.setState({isEditCourseHidden: false})
            }
        });

  }

  //-------------------------------------------
  // Delete chosen course
  //-------------------------------------------
  deleteCourseInDB(e){
    const dataJSON = {
            course_id: this.state.detailsOfCurrentCourseToEdit['course_id'].toString(),
            role_id: sessionStorage.getItem('user_role').toString()
        }

    axios({
          method:'post',
          url:'http://localhost:5000/deleteCourses',
          data: dataJSON,
          headers: {'Access-Control-Allow-Origin': '*',
          'Authorization': sessionStorage.getItem('token')},
        })
        .then((response) => {
            if(response.data != 'Error : Something went wrong')
            {
              alert('Course has been deleted successfully!!')
              this.setState({editCourseName: ''});
              this.setState({editCourseDesc: ''});
              this.setState({editCourseLocation: ''});
              this.setState({editCourseProf: ''});
              this.setState({editCourseDays: ''});
              this.setState({editCourseStartTime: ''});
              this.setState({editCourseEndTime: ''});

              this.componentDidMount();

              this.setState({isEditSingleCourseHidden: true})
              this.setState({isEditCourseHidden: false})
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
            <h2> Hello, Admin! Here are all the courses available now!</h2>
              {
                this.state.allCoursesForAdminHome.map((el,i) => (<Card key={i} style={this.state.courseCardStyle}>
                  <CardContent>
                    <Typography style={this.state.courseNameStyle} >
                        {el.course_name}
                    </Typography>
                    {el.professor.first_name} {el.professor.last_name} ||  &nbsp;
                  {el.location} || {el.days == '1' ? 'MW' : el.days == '2' ? 'TuTh' : 'F'} || {el.start_time} - {el.end_time}
                     <br /> <br />
                  </CardContent>
                </Card>))
              }
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
                  <span> Start Time</span>
                  <TextField
                        id="newCourseStartTime"
                        name="newCourseStartTime"

                        type="time"
                        value={this.state.newCourseStartTime}
                        onChange={this.handleChange.bind(this)}

                        className={classes.textField}
                      />
                </FormControl>

                <FormControl required className = {classes.rightSpacing25}>
                  <span> End Time</span>
                  <TextField
                        id="newCourseEndTime"
                        name="newCourseEndTime"

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
                      label="Days"
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
            <Grid container spacing={16}>
                 <Grid item xs={12}>
                   <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>

                     {
                       this.state.allStudents.map((el,i) => (
                         <Grid key={i} item>
                           <Card >
                             <CardContent>
                                <FaceIcon className = {classes.rightSpacing10}/>
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
            <Grid container spacing={16}>
                 <Grid item xs={12}>
                   <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>

                     {
                       this.state.allProfessors.map((el,i) => (
                         <Grid key={i} item>
                           <Card >
                             <CardContent>
                                <SchoolIcon className = {classes.rightSpacing10}/>
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

      // ---------------- ADMIN GRID VIEW TO EDIT A COURSE ---------------------------------------------//
      if(!(this.state.isEditCourseHidden)){
        currentContent = <main className = {classes.content}>
          <div className = {classes.toolbar} />
            <Grid container spacing={16}>
                 <Grid item xs={12}>
                   <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>

                     {
                       this.state.allCoursesForAdminHome.map((el,i) => (
                         <Grid key={el.course_id} item>
                           <Card >
                             <CardActionArea onClick={this.editSingleCourse.bind(this, el.course_name)}>
                               <CardContent>
                                   <span className = {classes.boldText}>{el.course_name}</span> <br />
                                 {el.location}
                               </CardContent>
                             </CardActionArea>
                           </Card>
                         </Grid>
                       ))
                     }

                   </Grid>
            </Grid>
          </Grid>
        </main>
      }

      //------------------------- ADMIN EDITS DETAILS OF A SINGLE COURSE ----------------------------------- //
      if(!(this.state.isEditSingleCourseHidden)){
        currentContent = <main className = {classes.content}>
          <div className = {classes.toolbar} />
            <Card>
              <CardContent>
                <span className = {classes.rightSpacing}>Course Title</span>
                <FormControl required>
                    <TextField
                        id="editCourseName"
                        className={classes.textField}
                        value={this.state.editCourseName}
                        helperText={this.state.detailsOfCurrentCourseToEdit['course_name']}
                        onChange={this.handleChange.bind(this)}
                        margin="normal"
                        name="editCourseName"
                      />
                </FormControl>
                <br /><br />

                <span className = {classes.rightSpacing}>Description</span>
                <FormControl required>
                    <TextField
                        id="editCourseDesc"
                        multiline
                        rows = "2"
                        rowsMax="5"
                        className={classes.textField}
                        helperText={this.state.detailsOfCurrentCourseToEdit['description']}
                        value={this.state.editCourseDesc}
                        onChange={this.handleChange.bind(this)}
                        margin="normal"
                        name="editCourseDesc"

                      />
                </FormControl>
                    <br /><br />

                <span className = {classes.rightSpacing}>Location</span>
                <FormControl required>
                    <TextField
                        id="editCourseLocation"
                        className={classes.textField}
                        value={this.state.editCourseLocation}
                        helperText={this.state.detailsOfCurrentCourseToEdit['location']}
                        onChange={this.handleChange.bind(this)}
                        name="editCourseLocation"
                        margin="normal"
                      />
                </FormControl>
                <br /><br />

                <span className = {classes.rightSpacing}>Professor</span>
                <FormControl required>
                  <Select
                        value={this.state.editCourseProf}
                        onChange={this.handleChange.bind(this)}
                        name="editCourseProf"
                        >
                            {
                              this.state.allProfessorsForSelect.map((el,i) => (<MenuItem key={i} value={el.user_id}> {el.first_name} {el.last_name}</MenuItem>))
                            }
                      </Select>
                </FormControl>
                <br /><br /><br />

                  <FormControl required className = {classes.rightSpacing}>
                    <span> Start Time</span>
                    <TextField
                          id="editCourseStartTime"
                          name="editCourseStartTime"
                          type="time"
                          value={this.state.editCourseStartTime}
                          helperText={this.state.detailsOfCurrentCourseToEdit['start_time']}
                          onChange={this.handleChange.bind(this)}
                          className={classes.textField}
                        />
                  </FormControl>

                  <FormControl required className = {classes.rightSpacing25}>
                    <span> End Time</span>
                    <TextField
                          id="editCourseEndTime"
                          name="editCourseEndTime"
                          type="time"
                          value={this.state.editCourseEndTime}
                          helperText={this.state.detailsOfCurrentCourseToEdit['end_time']}
                          onChange={this.handleChange.bind(this)}

                          className={classes.textField}
                        />
                  </FormControl>


                  <FormControl component="fieldset" className={classes.formControl}>

                      <RadioGroup
                        aria-label="Days"
                        name="editCourseDays"
                        className={classes.displayInline}
                        value={this.state.editCourseDays}
                        onChange={this.handleChange.bind(this)}>

                            <FormControlLabel  value="1" control={<Radio color="primary" checked = {this.state.selectedRadioValue==="1"} />} label="Mon & Wed" />
                            <FormControlLabel value="2" control={<Radio color="primary" checked = {this.state.selectedRadioValue==="2"}  />} label="Tue & Thu" />
                            <FormControlLabel value="3" control={<Radio color="primary" checked = {this.state.selectedRadioValue==="3"}  />} label="Fri" />

                      </RadioGroup>
                </FormControl>
                <br />
                <CardActions>
                  <Button variant="contained" onClick = {this.updateCourseInDB.bind(this)} className = {classes.buttonStyles} color="primary">Edit</Button>

                  <div>
                    <Button variant="contained" onClick = {this.deleteCourseInDB.bind(this)} className = {classes.marginAuto} color="secondary">Delete</Button>
                  </div>
                </CardActions>
              </CardContent>

            </Card>

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
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary="Add New Course" />
              </ListItem>

              <ListItem button onClick={this.handleMenuItemClick.bind(this, "edit")}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Course" />
              </ListItem>

              <ListItem button onClick={this.handleMenuItemClick.bind(this, "view students")}>
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText primary="View Students" />
              </ListItem>

              <ListItem button onClick={this.handleMenuItemClick.bind(this, "view profs")}>
                <ListItemIcon>
                  <SchoolIcon />
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
