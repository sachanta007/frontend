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
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
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
import FormLabel from '@material-ui/core/FormLabel'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import StarRatings from 'react-star-ratings';



// -------------------- Declaring constants here -------------------//
const drawerWidth = 240;
const axios = require('axios');


  const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '-webkit-fill-available',
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
  displayInlineBlock:{
    display:'inline-block'
  },
  boldText:{
    fontWeight: 'bold'
  },
  buttonStyles:{
    marginRight: 20
  },
  commentBox:{
    width: 850
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
    this.wrapperForCourseSearch = this.wrapperForCourseSearch.bind(this);
    this.PaymentMode = this.PaymentMode.bind(this);

    this.state = {
      isHomePageHidden: false,
      isPaymentPortalHidden: true,
      isCalendarHidden: true,
      isSearchHidden: true,
      courseCardStyle: {marginBottom: 18, width: 440},
      inheritWidth: {width: 'inherit'},
      courseNameStyle: {fontSize: 20, fontWeight: 'bold', fontFamily: 'Comfortaa'},
      spacing : '16',
      isAdmin: false,
      isAddNewCourseHidden: true,
      isEditCourseHidden: true,
      isEditSingleCourseHidden: true,
      isViewStudentsHidden: true,
      isViewProfessorsHidden: true,
      isIndividualCoursePageHidden: true,
      isCartPageHidden:true,
      selectedRadioValue: [],
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,

      editMon: false,
      editTue: false,
      editWed: false,
      editThu: false,
      editFri: false,

      newCourseName: '',
      newCourseDesc: '',
      newCourseLocation: '',
      newCourseProf: '',
      newCourseDays: '',
      newCourseStartTime: '',
      newCourseEndTime: '',
      newCourseID:'',

      editCourseName: '',
      editCourseDesc: '',
      editCourseLocation: '',
      editCourseProf: '',
      editCourseDays: '',
      editCourseStartTime: '',
      editCourseEndTime: '',
      editCourseID: '',

      allProfessorsForSelect: [],
      allStudents: [],
      allProfessors: [],
      allCoursesForAdminHome: [],
      detailsOfCurrentCourseToEdit: [],

      searchCourseName: '',
      searchResults: [],
      dataOfClickedCourse: {},
      courseComment: '',
      courseRating:0,

      cartData: [],

      firstCourse:'',
      SecondCourse:'',
      ThirdCourse:'',
      TotalAmount:'',
      isPaymentModeCardHidden:true,
      isPaymentSuccessfulCardHidden:true

    }
    let currentUserRole = sessionStorage.getItem('user_role')
    console.log(currentUserRole);

    if(currentUserRole == 1){
      this.state.isAdmin = true
      console.log('Admin is in the house!!!');

    }

    else
    {
     this.state.isAdmin = false
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

       // This is only for the checkboxes
       // at add a new course page
       if(e.target.name == 'newCourseDays')
       {

         switch(e.target.value){
           case '1': this.state.mon == false? this.setState({mon: true}) : this.setState({mon: false}) ; break;
           case '2': this.state.tue == false? this.setState({tue: true}) : this.setState({tue: false}) ; break;
           case '3': this.state.wed == false? this.setState({wed: true}) : this.setState({wed: false}) ; break;
           case '4': this.state.thu == false? this.setState({thu: true}) : this.setState({thu: false}) ; break;
           case '5': this.state.fri == false? this.setState({fri: true}) : this.setState({fri: false}) ; break;
         }
       }
       // This is for the checkboxes at EDIT a course page
       if(e.target.name == 'editCourseDays'){
         switch(e.target.value){
           case '1': this.state.editMon == false? this.setState({editMon: true}) : this.setState({editMon: false}) ; break;
           case '2': this.state.editTue == false? this.setState({editTue: true}) : this.setState({editTue: false}) ; break;
           case '3': this.state.editWed == false? this.setState({editWed: true}) : this.setState({editWed: false}) ; break;
           case '4': this.state.editThu == false? this.setState({editThu: true}) : this.setState({editThu: false}) ; break;
           case '5': this.state.editFri == false? this.setState({editFri: true}) : this.setState({editFri: false}) ; break;
         }
       }
    }

// Below is custom handle Change ONLY FOR STAR Rating
// For courses
handleChangeForRating(e){
  this.setState({courseRating: e})
}


// Below is handle change specifically for course search field
handleChangeAndGetMatchingCourses(e){
      let change = {}
      change[e.target.name] = e.target.value
      this.setState(change)

      //Hit API and get results that matches
      return axios({
        method:'get',
        url:'http://localhost:5000/getCourseBy/name/'+e.target.value+'/start/0/end/100000',
        headers: {'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('token')}
      })
      .then((response)=>{

        if(response.status == 200)
        {
          return(response.data)
        }
        else{
          return([{'course_name': 'No Results Found', 'location':'','professor':'','start_time':'','end_time':''}])
        }
      }).catch(err => {
        console.log("No search results ", err)
        return([{'course_name': 'No Results Found', 'location':'','professor':'','start_time':'','end_time':'','days':['']}])
      })
}

 //-------------------------------------------
 // This function is called each time a user inputs a character
 // to be searched in course search feature
 // This function inturn hits the API and gets an array of searchResults
 // This is added to this.state
 //-------------------------------------------
  wrapperForCourseSearch(e){
    let searchTerm = e.target.value

    this.handleChangeAndGetMatchingCourses(e).then((returnVal) => {
      for(let i = 0; i < returnVal.length; i++){
        returnVal[i]['days'].forEach(function(item,index){

          switch(item){
            case 1: returnVal[i]['days'][index] = "Mon"; break;
            case 2: returnVal[i]['days'][index] = "Tue"; break;
            case 3: returnVal[i]['days'][index] = "Wed"; break;
            case 4: returnVal[i]['days'][index] = "Thu"; break;
            case 5: returnVal[i]['days'][index] = "Fri"; break;
          }
        })
      }

        this.setState({searchResults: returnVal});
    })

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
      this.setState({isPaymentModeCardHidden: true});
      this.setState({isPaymentSuccessfulCardHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});

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
      this.setState({isPaymentModeCardHidden: true});
      this.setState({isPaymentSuccessfulCardHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});
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
      this.setState({isPaymentModeCardHidden: true});
      this.setState({isPaymentSuccessfulCardHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});

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
      this.setState({isPaymentModeCardHidden: true});
      this.setState({isPaymentSuccessfulCardHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});

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
      this.setState({isPaymentModeCardHidden: true});
      this.setState({isPaymentSuccessfulCardHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});

      this.getAllProfessorsForSelect().then((returnVal) => {
        this.setState({allProfessors: returnVal});

      })
      .catch(err => console.log("Something messed up with Axios!: ", err))
    }

    else if(value == 'search'){
      this.setState({isHomePageHidden: true});
      this.setState({isPaymentPortalHidden: true});
      this.setState({isCalendarHidden: true});
      this.setState({isSearchHidden: false});
      this.setState({isAddNewCourseHidden: true});
      this.setState({isEditCourseHidden: true});
      this.setState({isViewStudentsHidden: true});
      this.setState({isViewProfessorsHidden: true});
      this.setState({isEditSingleCourseHidden: true})
      this.setState({isPaymentModeCardHidden: true});
      this.setState({isPaymentSuccessfulCardHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({searchCourseName: ''});
      this.setState({searchResults: []});
      this.setState({isCartPageHidden: true});
    }

    else if(value=='payment'){
      this.setState({isHomePageHidden: true});
      this.setState({isPaymentPortalHidden: false});
      this.setState({isCalendarHidden: true});
      this.setState({isSearchHidden: true});
      this.setState({isAddNewCourseHidden: true});
      this.setState({isEditCourseHidden: true});
      this.setState({isViewStudentsHidden: true});
      this.setState({isViewProfessorsHidden: true});
      this.setState({isEditSingleCourseHidden: true})
      this.setState({isPaymentModeCardHidden: true});
      this.setState({isPaymentSuccessfulCardHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});
    }
  }


  // --- Kriti's functions ----------//
    PaymentMode(event) {
      this.setState({isPaymentPortalHidden: true});
      this.setState({isPaymentModeCardHidden: false});
      this.setState({isPaymentSuccessfulCardHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});
    }

   EnterDetails(event){
       this.setState({isPaymentPortalHidden: true});
       this.setState({isPaymentModeCardHidden: true});
       this.setState({isPaymentSuccessfulCardHidden: false});
       this.setState({isIndividualCoursePageHidden: true});
       this.setState({isCartPageHidden: true});
   }
//-------------- End of Kriti's functions ---//



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
  let currentUserRole = sessionStorage.getItem('user_role')
  console.log('inside mount',currentUserRole);
  if(currentUserRole == 1){
    this.setState({isAdmin: true });
    console.log('Admin is in the house!!!');
  }
  else
  {
    this.setState({isAdmin: false });
    this.enrolledCourses = this.getListOfEnrolledCourses()
  }

  if(sessionStorage.getItem('user_role')==1)
  {
    this.hitAPIForAdminHomePageCourses().then((returnVal) => {
      // must convert day numbers into words
      for(let i = 0; i < returnVal.length; i++){
        returnVal[i]['days'].forEach(function(item,index){

          switch(item){
            case 1: returnVal[i]['days'][index] = "Mon"; break;
            case 2: returnVal[i]['days'][index] = "Tue"; break;
            case 3: returnVal[i]['days'][index] = "Wed"; break;
            case 4: returnVal[i]['days'][index] = "Thu"; break;
            case 5: returnVal[i]['days'][index] = "Fri"; break;
          }
        })
      }
      this.setState({allCoursesForAdminHome: returnVal})
      console.log(this.state.allCoursesForAdminHome);
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
    let days_array = []
    if(this.state.mon) {days_array.push(1)}
    if(this.state.tue) {days_array.push(2)}
    if(this.state.wed) {days_array.push(3)}
    if(this.state.thu) {days_array.push(4)}
    if(this.state.fri) {days_array.push(5)}

    const dataJSON = {
            course_name: this.state.newCourseName,
            description : this.state.newCourseDesc,
            location: this.state.newCourseLocation,
            prof_id: this.state.newCourseProf,
            days: days_array,
            start_time: this.state.newCourseStartTime,
            end_time: this.state.newCourseEndTime,
            course_code: this.state.newCourseID,
            role_id: sessionStorage.getItem('user_role'),
            department: 'DEFAULT_DEPT'
        }

        console.log(dataJSON);
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
              this.setState({newCourseID: ''});
              this.setState({isAddNewCourseHidden: true});
              this.setState({isHomePageHidden: false});
              this.setState({isIndividualCoursePageHidden: true});

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
    this.state.editCourseID = (this.state.editCourseID == '') ? this.state.detailsOfCurrentCourseToEdit['course_code'] : this.state.editCourseID

    let days_array = []
    if(this.state.editMon) {days_array.push(1)}
    if(this.state.editTue) {days_array.push(2)}
    if(this.state.editWed) {days_array.push(3)}
    if(this.state.editThu) {days_array.push(4)}
    if(this.state.editFri) {days_array.push(5)}


    const dataJSON = {
            course_name: this.state.editCourseName,
            course_id: this.state.detailsOfCurrentCourseToEdit['course_id'],
            description : this.state.editCourseDesc,
            location: this.state.editCourseLocation,
            prof_id: this.state.editCourseProf,
            days: days_array,
            start_time: this.state.editCourseStartTime,
            end_time: this.state.editCourseEndTime,
            course_code: this.state.editCourseID,
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
              this.setState({editCourseID: ''});
              this.componentDidMount();

              this.setState({isEditSingleCourseHidden: true})
              this.setState({isEditCourseHidden: false})
              this.setState({isIndividualCoursePageHidden: true});
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
              this.setState({editCourseID: ''});

              this.componentDidMount();

              this.setState({isEditSingleCourseHidden: true})
              this.setState({isEditCourseHidden: false})
              this.setState({isIndividualCoursePageHidden: true});
            }
        });
  }

  //-----------------
  // On clicking a card from course search, go to a page
  // showing only details of that particular card2
  //-----------------
  goToCoursePage(courseClicked,v){
      console.log('COURSE CLICKED!!',courseClicked);
      this.setState({dataOfClickedCourse: courseClicked})
      this.setState({isIndividualCoursePageHidden: false});

  }

//-------------------
// Submits student's comment to Database
//-----------------
submitComment(e){
  const dataJSON = {
          course_id: this.state.dataOfClickedCourse['course_id'].toString(),
          user_id: sessionStorage.getItem('user_id'),
          comment: this.state.courseComment,
          ratings: this.state.courseRating.toString()
      }

  axios({
        method:'post',
        url:'http://localhost:5000/commentOnACourse',
        data: dataJSON,
        headers: {'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('token')},
      })
      .then((response) => {
          if(response.data != 'Error : Something went wrong')
          {
            alert("Thank you for your review! We appreciate it!")
            this.setState({courseComment: ''});
            this.setState({courseRating: 0});
            this.getLatestCourseDetails(this.state.dataOfClickedCourse['course_id'])

          }
      }).catch(err => {
        console.log("SUBMIT COMMENT ERROR: ", err)
        this.setState({courseComment: ''});
        this.setState({courseRating: 0});

      });
}

////////////////////////////////////////
// Given courseID, gets details
///////////////////////////////////////
getLatestCourseDetails(course_id){
  return axios({
    method:'get',
    url:'http://localhost:5000/getCourseBy/course/'+course_id,
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    console.log(response.data);
    this.setState({dataOfClickedCourse: response.data})
  });
}

//-------------
// Adds clicked course to cart
//-------------
addCourseToCart(id,e){
  const dataJSON = {
          course_id: id,
          user_id: sessionStorage.getItem('user_id'),
      }
  axios({
        method:'post',
        url:'http://localhost:5000/addToCart',
        data: dataJSON,
        headers: {'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('token')},
      })
      .then((response) => {
          if(response.data != 'Error : Something went wrong')
          {
            alert("Success! You can checkout now!!!")
          }
      }).catch(err => {
        console.log("ADD TO CART ERR: ", err)
      });
}

//---------------------------
// Get Cart data for user ID
//
//---------------------------
getCartDetails(id){
  return axios({
    method:'get',
    url:'http://localhost:5000/getCart/userId/'+id,
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    return(response.data);
  });
}

// navigate to cart page from nav AppBar
// GIVEN USER ID
// Sets state with cart data
goToCartPage(id,e){
  this.getCartDetails(id).then((returnVal) => {

    for(let i = 0; i < returnVal.length; i++){
      returnVal[i]['days'].forEach(function(item,index){

        switch(item){
          case 1: returnVal[i]['days'][index] = "Mon"; break;
          case 2: returnVal[i]['days'][index] = "Tue"; break;
          case 3: returnVal[i]['days'][index] = "Wed"; break;
          case 4: returnVal[i]['days'][index] = "Thu"; break;
          case 5: returnVal[i]['days'][index] = "Fri"; break;
        }
      })
    }

    this.setState({cartData: returnVal});
    this.setState({isCartPageHidden: false});
    console.log(returnVal);
  })
  .catch(err => console.log("Cart page err", err))
}

// -------------------------
// Deletes course from cart given course id
// -------------------------
deleteFromCart(id,e){
  let user_id = sessionStorage.getItem('user_id')
  axios({
    method:'get',
    url:'http://localhost:5000/delete/course/'+id+'/fromCart/for/user/'+user_id,
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    alert('Course Deleted From Cart!!')
    this.goToCartPage(user_id,e)
  });
}

/////////////////////////////////////////////////////////
/////////////// RENDER FUNCTION /////////////////////////
////////////////////////////////////////////////////////
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
                    {el.location} || {
                      el.days.map(function(element){

                        return <span>{element} &nbsp;</span>
                      })
                    }
                       || {el.start_time} - {el.end_time}
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

                <span className = {classes.rightSpacing}>Course Code</span>
                <FormControl required>
                    <TextField
                        id="newCourseID"
                        className={classes.textField}
                        value={this.state.newCourseID}
                        onChange={this.handleChange.bind(this)}
                        name="newCourseID"
                        margin="normal"
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


              <FormControl require className = {classes.displayInline}>
                <FormControlLabel control = {<Checkbox checked={this.state.mon}  name = "newCourseDays" onChange={this.handleChange.bind(this)} value="1"/>} label = "Mon"/>
                <FormControlLabel control = {<Checkbox checked={this.state.tue}  name = "newCourseDays" onChange={this.handleChange.bind(this)} value="2"/>} label = "Tue"/>
                <FormControlLabel control = {<Checkbox checked={this.state.wed}  name = "newCourseDays" onChange={this.handleChange.bind(this)} value="3"/>} label = "Wed"/>
                <FormControlLabel control = {<Checkbox checked={this.state.thu}  name = "newCourseDays" onChange={this.handleChange.bind(this)} value="4"/>} label = "Thu"/>
                <FormControlLabel control = {<Checkbox checked={this.state.fri}  name = "newCourseDays" onChange={this.handleChange.bind(this)} value="5"/>} label = "Fri"/>
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

              <span className = {classes.rightSpacing}>Course Code</span>
                  <FormControl required>
                      <TextField
                          id="editCourseID"
                          className={classes.textField}
                          value={this.state.editCourseID}
                          helperText={this.state.detailsOfCurrentCourseToEdit['course_code']}
                          onChange={this.handleChange.bind(this)}
                          margin="normal"
                          name="editCourseID"
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


                  <FormControl require className = {classes.displayInline}>
                    <FormControlLabel control = {<Checkbox checked={this.state.editMon}  name = "editCourseDays" onChange={this.handleChange.bind(this)} value="1"/>} label = "Mon"/>
                    <FormControlLabel control = {<Checkbox checked={this.state.editTue}  name = "editCourseDays" onChange={this.handleChange.bind(this)} value="2"/>} label = "Tue"/>
                    <FormControlLabel control = {<Checkbox checked={this.state.editWed}  name = "editCourseDays" onChange={this.handleChange.bind(this)} value="3"/>} label = "Wed"/>
                    <FormControlLabel control = {<Checkbox checked={this.state.editThu}  name = "editCourseDays" onChange={this.handleChange.bind(this)} value="4"/>} label = "Thu"/>
                    <FormControlLabel control = {<Checkbox checked={this.state.editFri}  name = "editCourseDays" onChange={this.handleChange.bind(this)} value="5"/>} label = "Fri"/>
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




    // --------------------------------- STUDENT/PROF VIEW BEGINS---------------------------------------------- //
    if(!(this.state.isAdmin)){

      //---------------------------- HOME PAGE OF STUDENT/PROFESSOR ---------------------------------------------//
      if(!(this.state.isHomePageHidden)){
        currentContent =   <main className={classes.content}>
            <div className={classes.toolbar} />
              <h2> Your Courses</h2>
              {this.enrolledCourses}
          </main>
      }

      // --------------- SEARCH COURSES FOR STUDENT ------------------------------//
      else if(!(this.state.isSearchHidden)){
        currentContent = <main className={classes.content}>
            <div className={classes.toolbar} />
              <h2> Search for a course</h2>
                <TextField
                   id="searchCourseName"
                   placeholder="Enter a course name"
                   style={{ margin: 8 }}
                   fullWidth
                   value={this.state.searchCourseName}
                   onChange={this.wrapperForCourseSearch.bind(this)}
                   margin="normal"
                   variant="outlined"
                   name="searchCourseName"
                   InputLabelProps={{
                     shrink: true,
                   }}
                />
                {
                  this.state.searchResults.map((el,i) => (<Card key={i} style={this.state.courseCardStyle}>
                    <CardActionArea style= {this.state.inheritWidth} onClick = {this.goToCoursePage.bind(this, el)}>
                      <CardContent>
                        <Typography style={this.state.courseNameStyle} >
                            {el.course_name}
                        </Typography>
                        {el.professor.first_name} {el.professor.last_name} ||  &nbsp;
                      {el.location} || {
                        el.days.map(function(element){

                          return <span>{element} &nbsp;</span>
                        })
                      }|| {el.start_time} - {el.end_time}
                         <br /> <br />
                      </CardContent>
                    </CardActionArea>
                  </Card>))
                }

          </main>
      }

      // ----- INDIVIDUAL COURSE PAGE ------------- ///
      if(!(this.state.isIndividualCoursePageHidden)){
        currentContent = <main className={classes.content}>
            <div className={classes.toolbar} />
            {
              <div>
                <Card>
                  <CardContent>

                    <div name="courseNameAndAdd">
                      <h1> {this.state.dataOfClickedCourse.course_code} - {this.state.dataOfClickedCourse.course_name}</h1>
                        <IconButton color="inherit" onClick={this.addCourseToCart.bind(this, this.state.dataOfClickedCourse.course_id)} style={{float:"right"}}>
                          <AddShoppingCartIcon  />
                        </IconButton>
                    </div>


                    <span> {this.state.dataOfClickedCourse.professor['first_name']} {this.state.dataOfClickedCourse.professor['last_name']}</span> || {this.state.dataOfClickedCourse.professor['email']}
                    <p> Location: {this.state.dataOfClickedCourse.location}</p>
                    <p> Time: {this.state.dataOfClickedCourse.start_time} - {this.state.dataOfClickedCourse.end_time}</p>
                    <p> Days Offered: {
                        this.state.dataOfClickedCourse.days.map(function(element){
                      return <span>{element} &nbsp;</span>
                    })
                  }
                  </p>
                  <p> Description: {this.state.dataOfClickedCourse.description}</p>
                  </CardContent>
                </Card>
                <br />

              <Card>
                <CardContent>
                  <h1>Comments about this course</h1>
                    {
                      this.state.dataOfClickedCourse.comment.map((el,i) => (
                      <div name="outerWrapper" key={i}>
                         <div name="commenterAndStars" className={classes.displayInlineBlock}>

                                <div name="commenter" className={classes.displayInlineBlock} style={{paddingRight:10}}>
                                  <AccountCircle/>
                                  <span name="name">{el.first_name} {el.last_name}</span>
                                </div>
                                <br />
                                <div name="stars" className={classes.displayInlineBlock}>
                                  <StarRatings
                                    rating={el.rating}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    starDimension="15px"
                                    starSpacing="1px"
                                    />
                                </div>
                            </div>

                            <div name="commentGiven" className={classes.displayInlineBlock}>
                                <TextField
                                    disabled
                                    className ={classes.commentBox}
                                    value={el.comment}
                                    margin="normal"
                                    variant="filled"
                                  />
                            </div>
                        </div>
                      ))
                    }
                </CardContent>
              </Card>
              <br /> <br />

                <Card>
                  <CardContent>
                    <h1>Write a comment?</h1>
                    <AccountCircle className = {classes.rightSpacing10}/>
                          <TextField
                              id="courseComment"
                              multiline
                              rows = "3"
                              rowsMax="6"
                              className ={classes.commentBox}
                              value={this.state.courseComment}
                              onChange={this.handleChange.bind(this)}
                              margin="normal"
                              name="courseComment"
                              variant="filled"
                            />
                          <br />
                      <span className = {classes.rightSpacing10}> Rate this course!</span>
                      <StarRatings
                        rating={this.state.courseRating}
                        starRatedColor="gold"
                        starHoverColor="gold"
                        changeRating={this.handleChangeForRating.bind(this)}
                        numberOfStars={5}
                        name='courseRating'
                        id='courseRating'
                        starDimension="20px"
                        starSpacing="4px"
                        />
                      </CardContent>
                    <CardActions>
                      <Button variant="contained" onClick = {this.submitComment.bind(this)} className = {classes.marginAuto} color="primary">Submit</Button>
                    </CardActions>
                </Card>
              </div>
           }
          </main>
      }

      if(!(this.state.isCartPageHidden)){
        currentContent =   <main className={classes.content}>
            <div className={classes.toolbar} />
              <h1> Your Cart</h1>
                {
                  this.state.cartData.map((el,i) => (<Card key={i} style={this.state.courseCardStyle}>
                    <CardContent>
                      <div name="cartCourseAndDelete">
                          <p className= {classes.displayInline} style={this.state.courseNameStyle} >
                              {el.course_name}
                          </p>
                          <IconButton onClick={this.deleteFromCart.bind(this, el.course_id)} style={{float:"right"}}>
                              <DeleteIcon />
                          </IconButton>
                      </div>
                      {el.professor.first_name} {el.professor.last_name} ||  &nbsp;
                      {el.location} || {
                        el.days.map(function(element){
                          return <span>{element} &nbsp;</span>
                        })
                      }
                         || {el.start_time} - {el.end_time}
                       <br /> <br />
                    </CardContent>
                  </Card>))
                }
          </main>
      }

      // ---------- KRITI'S PAYMENT PORTAL SECTION --------------------------//
        else if(!(this.state.isPaymentPortalHidden)){
          currentContent = <main className={classes.content}>
              <div className={classes.toolbar} />
                <div>
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
                    <DeleteIcon className={classes.icon, classes.deleteIcon} />
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

                    <CardActions>
                      <Button variant="contained" onClick = {this.PaymentMode.bind(this)} className = {classes.marginAuto}  color="primary">Checkout</Button>
                    </CardActions>
                  </div>
            </main>
        }


else if(!(this.state.isPaymentModeCardHidden))
{
  currentContent=
    <main className={classes.content}>
        <div className={classes.toolbar} />
          <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Payment Mode</FormLabel>
                      <RadioGroup
                        aria-label="Payment Mode"
                        name="Payment Mode"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
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
          </main>
}

else if(!(this.state.isPaymentSuccessfulCardHidden))
{
  currentContent =   <main className={classes.content}>
    <div className={classes.toolbar} />
        <Card className={classes.card}>
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
  </main>
}


      // ------------------------------ SIDE NAV FOR STUDENT ALWAYS EXISTS ---------------------------------------//
      sideNav =
          <div className={classes.root}>

              <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    <Typography className = {classes.appBarHeading} variant="headline" color="inherit">
                      Course360
                    </Typography>

                    <IconButton color="inherit" aria-label="ShoppingCartNav" onClick={this.goToCartPage.bind(this, sessionStorage.getItem('user_id'))}>
                        <ShoppingCartIcon />
                   </IconButton>

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
              {currentContent}
        </div>
    }
    // ---------------------------------- END OF STUDENT/PROFS VIEW ---------------------------------------- //

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
