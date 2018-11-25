import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import ChatIcon from '@material-ui/icons/Chat';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import SchoolIcon from '@material-ui/icons/School';
import FaceIcon from '@material-ui/icons/Face';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TodayIcon from '@material-ui/icons/Today';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {ToastContainer, ToastStore} from 'react-toasts'
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import ChatScreen from './ChatScreen.js';
import PersonalChatList from './PersonalChatList.js';
import Chatkit from '@pusher/chatkit-client'
import Modal from '@material-ui/core/Modal';

// -------------------- Declaring constants here -------------------//
const drawerWidth = 240;
const axios = require('axios');
const localizer = BigCalendar.momentLocalizer(moment)
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

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
    fontFamily:'Lobster',
    fontSize: 30
  },
  changed:{
    position: 'relative',
    width: drawerWidth,
    backgroundColor:'red',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#4285f4',
  },
  drawerPaperDefault: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerPaperNight: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor: '#2e3033'
  },
  drawerTextNight:{
    color: 'yellow'
  },
  drawer: {
   width: drawerWidth,
   flexShrink: 0,
 },
 paper:{
   width: 240
 },
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
myProfileCard:{
  marginTop: 80,
   width: 800,
  margin: 'auto'
},
media:{
  height:140,
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
  },
  subheading:{
    fontFamily:'Saira Semi Condensed',
    color:"black"
  },
  bulletpoint:{
    display: 'list-item',
    listStyleType: "disc",
    listStylePosition: "inside"
  },
  userDrawerPic:{
      display: "inline-block",
      width: 50,
      height: 5,
      borderRadius: "50%",
      objectFit: "cover"
  },
  modalPaper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[9],
    padding: theme.spacing.unit * 4,
  },
});

// ------------------------------------------- Constants end here -----------------------------------------------//

class DashboardPage extends Component {
  constructor(props){
    super(props)
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.editSingleCourse = this.editSingleCourse.bind(this);
    this.updateCourseInDB = this.updateCourseInDB.bind(this);
    this.addNewCourse = this.addNewCourse.bind(this);
    this.deleteCourseInDB = this.deleteCourseInDB.bind(this);
    this.wrapperForCourseSearch = this.wrapperForCourseSearch.bind(this);
    this.PaymentMode = this.PaymentMode.bind(this);

    this.state = {

      drawerPaper : {position: 'relative',width: 240, backgroundColor: '#4285f4'},
      subheading: {fontFamily:'Saira Semi Condensed', color:"black"},
      appBar: {zIndex: 1202, backgroundColor: '#4285f4'},
      content: {flexGrow: 1, backgroundColor: '#F5F5F5', padding: 24, overflowY: 'auto'},
      navDrawerIcon: {color: "black"},
      drawer: {flexShrink:0, width: 240,backgroundColor: '#4285f4'},
      currentTheme: 'default',
      themeRadio:'1',

      isHomePageHidden: false,
      isPaymentPortalHidden: true,
      isCalendarHidden: true,
      isSearchHidden: true,
      courseCardStyle: {marginBottom: 18, width: 380},
      widthForGrid: {width: '75%'},
      inheritWidth: {width: 'inherit'},
      courseNameStyle: {fontSize: 20, fontWeight: 'bold', fontFamily: 'Saira Semi Condensed'},
      courseCardIcons: {width:15, height:15},
      spacing : '8',
      loggedinUserFirstName: '',
      isAdmin: false,
      isAddNewCourseHidden: true,
      isEditCourseHidden: true,
      isEditSingleCourseHidden: true,
      isViewStudentsHidden: true,
      isViewProfessorsHidden: true,
      isIndividualCoursePageHidden: true,
      isStudentDetailsFormHidden: true,
      isCartPageHidden:true,
      isChatPageHidden:true,
      isGroupChatPageHidden:true,
      isPersonalChatPageHidden:true,
      isThemeModalOpen: false,
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
      profSchedule:[],
      studentSchedule: [],
      eventsForProfessorCalendar:[],
      eventsForStudentCalendar: [],
      studentEnrolledCourses: [],
      isThisAnEnrolledCourse: false,

      firstCourse:'',
      SecondCourse:'',
      ThirdCourse:'',
      TotalAmount:'',
      cartCost:0,
      finanical_aid:0,
      isPaymentModeCardHidden:true,
      isPaymentSuccessfulCardHidden:true,

      anchorEl: null,
      open: false,
      studentsEnrolledForCourse: [],

      chatUser: {}

    }
    let currentUserRole = sessionStorage.getItem('user_role')
    console.log('CURRENT ROLE',currentUserRole);

    if(currentUserRole == 1){
      this.state.isAdmin = true
      console.log('Admin is in the house!!!');
    }

    else if(currentUserRole == 3)
    {
     this.state.isAdmin = false
     this.getListOfEnrolledCourses()
    }

    let currentUserTheme =   sessionStorage.getItem('user_theme')
    this.state.currentTheme = currentUserTheme
    console.log("Inside constructor =>", this.state.currentTheme);
    if(this.state.currentTheme == 'night'){
      this.state.drawerPaper = {position: 'relative',width: 240, backgroundColor: '#070707'}
      this.state.subheading = {fontFamily:'Saira Semi Condensed', color:"yellow"}
      this.state.appBar = {zIndex: 1202, backgroundColor: '#0c0d0e', color:'#ffe85e'}
      this.state.content = {flexGrow: 1, backgroundColor: '#43464A', color:'#ffe85e', padding: 24, overflowY: 'auto'}
      this.state.navDrawerIcon = {color: "yellow"}
      this.state.drawer = {flexShrink:0, width: 240,backgroundColor: '#4285f4'}
      this.state.themeRadio = '2'
    }

    else if(this.state.currentTheme == 'default'){
      this.state.drawerPaper = {position: 'relative',width: 240, backgroundColor: '#4285f4'}
      this.state.subheading =  {fontFamily:'Saira Semi Condensed', color:"black"}
      this.state.appBar = {zIndex: 1202, backgroundColor: '#4285f4'}
      this.state.content = {flexGrow: 1, backgroundColor: '#F5F5F5', padding: 24, overflowY: 'auto'}
      this.state.navDrawerIcon =  {color: "black"}
      this.state.drawer =  {flexShrink:0, width: 240,backgroundColor: '#4285f4'}
      this.state.themeRadio = '1'
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

       // This is for theme selection view radio buttons ONLY
       if(e.target.name == 'themeRadio')
       {
         console.log("Radio for css clicked",e.target.value);
        this.setState({ themeRadio: e.target.value });

        if(e.target.value == '1'){
          this.setState({ currentTheme: 'default' }, () => {
                  this.changeThemeStates('default')
                  this.updateThemeInDB('default')
                });
      }

        else if(e.target.value == '2'){
          console.log("About to set state to night mode");
          this.setState({ currentTheme: 'night' }, () => {
                  this.changeThemeStates('night')
                  this.updateThemeInDB('night')
              });
        } // night if ends

      } // themeRadio if ends
    }

// Calls api to update theme info in DB for user

updateThemeInDB(theme){
  var user_id = sessionStorage.getItem('user_id');
  axios({
    method:'get',
    url:'http://localhost:5000/updateColorTheme/theme/'+theme+'/student/'+user_id,
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    if(response.status == 200)
    {
      ToastStore.success('Updated your theme preference!',4000,"whiteFont")
      console.log('UPDATED THEME DB',response.data)
    }
  }).catch(err => {
    console.log("DAMN! Update CSS messed up ", err)
    ToastStore.error('Oops! Please try again!',4000,"whiteFont")
  })

}

// Below is custom handle Change ONLY FOR STAR Rating
// For courses
handleChangeForRating(e){
  this.setState({courseRating: e})
}

//Sets state var for showing group hat pages
goToGroupChat(e){
  this.setState({isHomePageHidden: true});
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
  this.setState({isStudentDetailsFormHidden:true});
  this.setState({isChatPageHidden: true});
  this.setState({isGroupChatPageHidden: false});
  this.setState({isPersonalChatPageHidden:true})
}

// Set state for private chat on!!!
goToPersonalChatPage(e){
   console.log("TIME TO GO TO PRIVATE CHAAAT!!");
    this.setState({isHomePageHidden: true});
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
    this.setState({isStudentDetailsFormHidden:true});
    this.setState({isChatPageHidden: true});
    this.setState({isGroupChatPageHidden: true});
    this.setState({isPersonalChatPageHidden:false})
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
          return([])
        }
      }).catch(err => {
        console.log("No search results ", err)
        return([])
      })
}


//LOGS OUT USER!!!
logout(e){

  // close pop down menu
  this.handleClose()
  // Leaving chat room
    this.leaveAllChatRooms();

  // Resetting session variables
  sessionStorage.setItem('token','')
  sessionStorage.setItem('user_role','')
  sessionStorage.setItem('user_id','')
  sessionStorage.setItem('user_first_name','')
  sessionStorage.setItem('user_email','')
  sessionStorage.setItem('user_theme', '')

  //Resetting state vars for all page flags...go back to Sign in Page!!
  this.setState({isHomePageHidden: true});
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
  this.setState({isChatPageHidden: true})
  this.setState({isStudentDetailsFormHidden: true})
  this.setState({isGroupChatPageHidden: true})
  this.setState({isPersonalChatPageHidden: true})
  window.location = '#/'
}

// Leaves public and private room
leaveAllChatRooms(){
      this.state.chatUser.leaveRoom({ roomId: '19420562' })
      .then(room => {
        console.log("Left room public")
      })
      .catch(err => {
        console.log('Error leaving PUBLIC room ${"19420562"}',err)
      })
}


// Used for closing menu when clicked elsewhere
handleClickAway = () => {
    this.setState({ open: false});
  };


// Below is for Account popdown menu state setting
// null means no menu item clicked
handleClose = () => {
    this.setState({ anchorEl: null });
  };

//Opens the dropdown menu
profileMenu(event){
  this.setState(state => ({
      open: !this.state.open,
    }));

    this.setState({ anchorEl: event.currentTarget })

}

//navigates to profile page
goToMyProfilePage(e){
  console.log("Moving to person's profile");
  this.handleClose()
  this.setState({isHomePageHidden: true});
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
  this.setState({isStudentDetailsFormHidden:false});
  this.setState({isChatPageHidden: true});
  this.setState({isGroupChatPageHidden: true});
  this.setState({isPersonalChatPageHidden:true})
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
      this.setState({isThisAnEnrolledCourse: false})
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isChatPageHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})

      this.leaveAllChatRooms();
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
      this.setState({isStudentDetailsFormHidden: true})
       this.setState({isChatPageHidden: true})
       this.setState({isGroupChatPageHidden: true});
       this.setState({isPersonalChatPageHidden:true})
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
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isChatPageHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
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
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isCartPageHidden: true});
      this.setState({isChatPageHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
      this.leaveAllChatRooms();

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
      this.setState({isChatPageHidden: true})
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
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
      this.setState({isChatPageHidden: true});
      this.setState({searchResults: []});
      this.setState({isCartPageHidden: true});
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isThisAnEnrolledCourse: false})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})

      this.leaveAllChatRooms();
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
      this.setState({isChatPageHidden: true});
      this.setState({isThisAnEnrolledCourse: false})
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})

      this.leaveAllChatRooms();
    }

    else if(value=='calendar'){
      this.setState({isHomePageHidden: true});
      this.setState({isPaymentPortalHidden: true});
      this.setState({isCalendarHidden: false});
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
      this.setState({isChatPageHidden: true});
      this.setState({isThisAnEnrolledCourse: false})
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})

      this.leaveAllChatRooms();

      if(sessionStorage.getItem('user_role')==2)
      {
        this.getProfessorSchedule()

      }
      else if(sessionStorage.getItem('user_role')==3){
        this.getStudentSchedule()
      }

    }

    else if(value == 'chat'){
      this.setState({isHomePageHidden: true});
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
      this.setState({isThisAnEnrolledCourse: false})
      this.setState({isChatPageHidden: false});
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
     }
  }


  // --- Kriti's functions ----------//
    PaymentMode(event) {
      const dataJSON = {
        user_id: sessionStorage.getItem('user_id')
      }
      axios({
        method:'post',
        url:'http://localhost:5000/enrollCourses',
        data: dataJSON,
        headers: {'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('token')},
      })
      .then((response) => {
          if(response.status != 500)
          {
            this.setState({cartCost: 7800});
            this.setState({finanical_aid: 2532});
            this.setState({isStudentDetailsFormHidden: true})

            this.setState({isPaymentPortalHidden: true});
            this.setState({isPaymentModeCardHidden: false});
            this.setState({isPaymentSuccessfulCardHidden: true});
            this.setState({isIndividualCoursePageHidden: true});
            this.setState({isCartPageHidden: true});
            this.setState({isGroupChatPageHidden: true});
            this.setState({isPersonalChatPageHidden:true})
          }
          else{
            this.setState({isPaymentPortalHidden: true});
            this.setState({isPaymentModeCardHidden: true});
            this.setState({isPaymentSuccessfulCardHidden: true});
            this.setState({isIndividualCoursePageHidden: true});
            this.setState({isStudentDetailsFormHidden: true})
            this.setState({isCartPageHidden: false});
            this.setState({isGroupChatPageHidden: true});
            this.setState({isPersonalChatPageHidden:true})
            console.log("Error in enrollment");
          }
      });


    }

   EnterDetails(event){
       this.setState({isPaymentPortalHidden: true});
       this.setState({isPaymentModeCardHidden: true});
       this.setState({isPaymentSuccessfulCardHidden: false});
       this.setState({isIndividualCoursePageHidden: true});
       this.setState({isCartPageHidden: true});
       this.setState({isStudentDetailsFormHidden: true})
       this.setState({isGroupChatPageHidden: true});
       this.setState({isPersonalChatPageHidden:true})
   }
//-------------- End of Kriti's functions ---//


// ---------------------------
// Hit API to get enrolled courses for current USER
// ONLY FOR STUDENTS!! NOT FOR PROFESSORS!!!
// Returns Cards to be rendered directly
// ----------------------------
  getListOfEnrolledCourses(){
    this.setState({studentEnrolledCourses: []})
    axios({
      method:'get',
      url:'http://localhost:5000/getEnrolledCourses/userId/'+sessionStorage.getItem('user_id'),
      headers: {'Access-Control-Allow-Origin': '*',
      'Authorization': sessionStorage.getItem('token')}
    })
    .then((response)=>{
      if(response.status == 200)
      {
         var filtered = []
          for(let item of response.data){if(item.length != 0) { filtered.push(item)}}
          for(let i = 0; i < filtered.length; i++){
            filtered[i]['days'].forEach(function(item,index){
              switch(item){
                case 1: filtered[i]['days'][index] = "Mon"; break;
                case 2: filtered[i]['days'][index] = "Tue"; break;
                case 3: filtered[i]['days'][index] = "Wed"; break;
                case 4: filtered[i]['days'][index] = "Thu"; break;
                case 5: filtered[i]['days'][index] = "Fri"; break;
              }
            })
          }

          this.setState({studentEnrolledCourses: filtered})
      }
      else{
        console.log('Status is not 200 fetching students enrolled courses!!',response);
      }
    }).catch(err => {
        console.log('Error fetching students enrolled courses!!',err);
        this.setState({studentEnrolledCourses: []})
    })
  }

changeThemeStates(theme){
  console.log("INSIDE CHANGE THEME STATES FUNCTION!!!!!!", this.state.currentTheme);
  if(theme == 'night'){
    console.log("Inside night mode........");
    this.setState({drawerPaper : {position: 'relative',width: 240, backgroundColor: '#070707'}})
    this.setState({subheading: {fontFamily:'Saira Semi Condensed', color:"black"}})
    this.setState({appBar: {zIndex: 1202, backgroundColor: '#0c0d0e', color:'#ffe85e'}})
    this.setState({content: {flexGrow: 1, backgroundColor: '#43464A', color:'#ffe85e', padding: 24, overflowY: 'auto'}})
    this.setState({navDrawerIcon: {color: "yellow"}})
    this.setState({drawer: {flexShrink:0, width: 240,backgroundColor: '#4285f4'}})

    this.state.themeRadio = '2'
  }

  if(theme == 'default'){

    this.setState({drawerPaper :  {position: 'relative',width: 240, backgroundColor: '#4285f4'}})
    this.setState({subheading: {fontFamily:'Saira Semi Condensed', color:"black"}})
    this.setState({appBar: {zIndex: 1202, backgroundColor: '#4285f4'}})
    this.setState({content: {flexGrow: 1, backgroundColor: '#F5F5F5', padding: 24, overflowY: 'auto'}})
    this.setState({navDrawerIcon: {color: "black"}})
    this.setState({drawer: {flexShrink:0, width: 240,backgroundColor: '#4285f4'}})

    this.state.themeRadio = '1'
  }
}
//----------------------------------
// Lifecycle method that gets all courses
// when 'edit' in menu is clicked and
// when page loads (sorta like a constructor yeah??)
//----------------------------------
componentDidMount() {
  let currentUserRole = sessionStorage.getItem('user_role')
  this.setState({loggedinUserFirstName: sessionStorage.getItem('user_first_name')})

  //gettng the theme for logged in user

  console.log("Inside compoment did mount", this.state.currentTheme);
  this.changeThemeStates(this.state.currentTheme)


    // ADMIN SECTION
  if(currentUserRole == 1){
    this.setState({isAdmin: true });
    console.log('Admin is in the house!!!');

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

//STUDENT SECTION
  else if(currentUserRole == 3)
  {
    this.setState({isAdmin: false });
    this.getListOfEnrolledCourses()
    this.getStudentSchedule()
  }

// PROFESSOR
  if(currentUserRole == 2)
  {
    this.setState({isAdmin: false });
    this.getProfessorSchedule()
  }

  // chat user
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:1a111cfa-e268-4391-84a5-484c7faccc84',
      userId: sessionStorage.getItem('user_email'),
      tokenProvider: new Chatkit.TokenProvider({
        url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1a111cfa-e268-4391-84a5-484c7faccc84/token?user_id='+sessionStorage.getItem('user_email'),
      }),
    })
     chatManager
      .connect()
      .then(currentUser => {
        this.setState({chatUser: currentUser });
      })

      // on browser tab Close
      window.addEventListener("beforeunload", (ev) =>
      {
        this.leaveAllChatRooms();
      });
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

              ToastStore.success('Course has been added successfully!!',4000,"whiteFont")
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
              this.setState({isStudentDetailsFormHidden: true})

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

              ToastStore.success('Course has been updated successfully!!',4000,"whiteFont")
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
              this.setState({isStudentDetailsFormHidden: true})

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

              ToastStore.success('Course has been deleted successfully!!',4000,"whiteFont")
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
            else{
              console.log('Error in deleting course');
            }
        });
  }

  //-----------------
  // On clicking a card from course search, go to a page
  // showing only details of that particular card2
  //-----------------
  goToCoursePage(courseClicked,v){
      if(sessionStorage.getItem('user_role') == 3){
        var allEnrolledCoursesOfStudent = this.state.studentEnrolledCourses

        for(var i=0; i<allEnrolledCoursesOfStudent.length; i++){
          if(allEnrolledCoursesOfStudent[i].course_id == courseClicked.course_id ){
            this.setState({isThisAnEnrolledCourse: true})
          }

        }
      }
      if(sessionStorage.getItem('user_role') == 2){
            this.getEnrolledStudentsForCourse(courseClicked.course_id)
      }
      this.setState({dataOfClickedCourse: courseClicked})
      console.log("Clicked course",courseClicked);
      this.setState({isIndividualCoursePageHidden: false});

  }

//-------------------
// Submits student comment to Database
//--------------------
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

            ToastStore.success("Thank you for your review! We appreciate it!",4000,"whiteFont")
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

            ToastStore.success("Success! You can checkout now!",4000,"whiteFont")
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
    console.log('response code',response.status);
    if(response.status ==200)
      {
        return(response.data);
      }
    else{
      return([]);
    }
  });
}

// navigate to cart page from nav AppBarss
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

    this.setState({isHomePageHidden: true});
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
    this.setState({isStudentDetailsFormHidden: true})
  })
  .catch(
    err => {
      this.setState({cartData: []});
      this.setState({isCartPageHidden: false});

      this.setState({isHomePageHidden: true});
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
      this.setState({isStudentDetailsFormHidden: true})
    });
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

    ToastStore.success('Course Deleted From Cart!!',4000,"whiteFont")
    this.goToCartPage(user_id,e)
  });
}

///////////
// Get Professor Schedule
//////////
getProfessorSchedule(){
  let user_id = sessionStorage.getItem('user_id')
  console.log('Professor ID is:',user_id);
  axios({
    method:'get',
    url:'http://localhost:5000/getProfessorSchedule/id/'+user_id,
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    if(response.status == 200){
      for(let i = 0; i < response.data.length; i++){
        response.data[i]['days'].forEach(function(item,index){

          switch(item){
            case 1: response.data[i]['days'][index] = "Mon"; break;
            case 2: response.data[i]['days'][index] = "Tue"; break;
            case 3: response.data[i]['days'][index] = "Wed"; break;
            case 4: response.data[i]['days'][index] = "Thu"; break;
            case 5: response.data[i]['days'][index] = "Fri"; break;
          }
        })
      }
      this.setState({profSchedule: response.data});
      console.log('Schedule of prof',this.state.profSchedule);
      this.populateEventsForProfCalendar() //events array being populated for calendar
    }
  });
}


///////////
// Get Student Schedule
//////////
getStudentSchedule(){
  let user_id = sessionStorage.getItem('user_id')
  axios({
    method:'get',
    url:'http://localhost:5000/getStudentSchedule/id/'+user_id,
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    if(response.status == 200){
      for(let i = 0; i < response.data.length; i++){
        response.data[i]['days'].forEach(function(item,index){

          switch(item){
            case 1: response.data[i]['days'][index] = "Mon"; break;
            case 2: response.data[i]['days'][index] = "Tue"; break;
            case 3: response.data[i]['days'][index] = "Wed"; break;
            case 4: response.data[i]['days'][index] = "Thu"; break;
            case 5: response.data[i]['days'][index] = "Fri"; break;
          }
        })
      }
      this.setState({studentSchedule: response.data});
      this.populateEventsForStudentCalendar() //events array being populated for calendar
    }
  }).catch(err => {
    console.log("COULDN'T FETCH STUDENT SCHEDULE!!!", err)
    this.setState({studentSchedule : []})
  });;
}


//// PROF CALENDAR EVENTS DATA POPULATION //////
populateEventsForProfCalendar(){
  let profSchedule = this.state.profSchedule
  let events = []
  profSchedule.map(function(element){
    for(var i =0; i < element.start_dates.length; i++)
    {
          let temp_event = {
          id: element.course_id,
          title: element.course_name,
          desc: element.location,
          start: new Date(element.start_dates[i]+'T'+element.start_time),
          end: new Date(element.start_dates[i]+'T'+element.end_time)
        }
        events.push(temp_event)
   }
 });

  let repeatedEvents = []
  for(var j=0; j < events.length; j++){
    for(var counter = 1; counter < 6; counter++){
      let temp_event = {
        id: events[j].id,
        title: events[j].title,
        desc: events[j].desc,
        start: new Date(events[j].start.setTime( events[j].start.getTime() + 7*(counter) * 86400000 )),
        end: new Date(events[j].end.setTime( events[j].end.getTime() + 7*(counter)  * 86400000 ))
      }
      repeatedEvents.push(temp_event)
    }
  }
  this.setState({eventsForProfessorCalendar : repeatedEvents})
}

//////////////////////////////
// STUDENT CALENDAR
//////////////////////////////
populateEventsForStudentCalendar(){
  let studentSchedule = this.state.studentSchedule
  let events = []
  studentSchedule.map(function(element){
    for(var i =0; i < element.start_dates.length; i++)
    {
          let temp_event = {
          id: element.course_id,
          title: element.course_name,
          desc: element.location,
          start: new Date(element.start_dates[i]+'T'+element.start_time),
          end: new Date(element.start_dates[i]+'T'+element.end_time)
        }
        events.push(temp_event)
   }
 });

  let repeatedEvents = []
  for(var j=0; j < events.length; j++){
    for(var counter = 1; counter < 6; counter++){
      let temp_event = {
        id: events[j].id,
        title: events[j].title,
        desc: events[j].desc,
        start: new Date(events[j].start.setTime( events[j].start.getTime() + 7*(counter) * 86400000 )),
        end: new Date(events[j].end.setTime( events[j].end.getTime() + 7*(counter)  * 86400000 ))
      }
      repeatedEvents.push(temp_event)
    }
  }
  this.setState({eventsForStudentCalendar : repeatedEvents})
}

// Get students who have enrolled to a course, given prof id and course id
getEnrolledStudentsForCourse(courseId){
  var profId = sessionStorage.getItem('user_id')
  console.log('Course clicked',courseId,'For professor',profId);
  axios({
    method:'get',
    url:'http://localhost:5000/getStudentsByCourseAndProfessor/course/'+courseId+'/professor/'+profId,
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    if(response.status == 200){
      this.setState({studentsEnrolledForCourse : response.data.students})
      console.log('students here',response.data.students);
    }
    else{
      this.setState({studentsEnrolledForCourse : []})
    }
  }).catch(err => {
    console.log("Most probably this course is taught by another prof and NOT YOU!!! ", err)
    this.setState({studentsEnrolledForCourse : []})
  });

}

//dummy function fr showing alert after payment Success
dummySuccessPayment(){

  ToastStore.success("Congratulations! You have enrolled for the chosen courses!",4000,"whiteFont")
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
  this.setState({isStudentDetailsFormHidden: true})
  this.componentDidMount();

}

// Drop enrolled course for a student
dropEnrolledCourse(element,v){
  console.log('Dropping course',element);

  axios({
    method:'get',
    url:'http://localhost:5000/dropCourse/courseId/'+element+'/userId/'+sessionStorage.getItem('user_id'),
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    if(response.status == 200){

        ToastStore.success('This course has been dropped from your schedule!',4000,"whiteFont")
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
        this.setState({isStudentDetailsFormHidden: true})
        this.componentDidMount()

    }
    else{
      console.log("Error with dropping course");
      ToastStore.error("Oops! We couldn't process that right now! Sorry!",4000,"whiteFont")
    }
  }).catch(err => {
    ToastStore.error("Oops! We couldn't process that right now! Sorry!",4000,"whiteFont")
    console.log("Error with dropping course",err);
  });;

}

// Adjusts the position of the modal
getModalStyle() {
  const top = 100;
  const left = 100;

  return {
    top: `100%`,
    left: `100%`,
    transform: `translate(-100%, -100%)`,
  };
}

// Show Change theme modal
showThemeModal(e){
  this.setState({ isThemeModalOpen: true });
}

// Hide the change theme modal
hideThemeModal(e){
  this.setState({ isThemeModalOpen: false });
}



/////////////////////////////////////////////////////////
/////////////// RENDER FUNCTION /////////////////////////
////////////////////////////////////////////////////////
  render() {
    const { classes } = this.props;
    const { spacing } = this.state; // this is for student grid in admin
    let sideNav; //this contains the html for the sideNav of page to be viewed now
    let currentContent;

    // --------------------------------- CURRENT USER IS AN ADMIN ------------------------------------//
    if(this.state.isAdmin){

      // ------------- ADMIN HOME PAGE -------------------------- //
      if(!(this.state.isHomePageHidden))
      {
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
            <h2> Hello, Admin! Here are all the courses available now!</h2>
              <Grid container
                spacing = {24}
                justify="flex-start"
                style={this.state.widthForGrid}
                alignItems="flex-start"
                >
                {
                  this.state.allCoursesForAdminHome.map((element,i) => {
                    return(
                      <Grid key={i} item xs={6}>
                        <Card style={this.state.courseCardStyle}>
                              <CardActionArea style= {this.state.inheritWidth} onClick = {this.goToCoursePage.bind(this, element)}>
                                <CardMedia
                                    className={classes.media}
                                    image="build/computer-science.jpg"

                                  />
                                <CardContent>
                                  <div name="courseNameAndDrop" style={{paddingBottom:15}}>
                                      <Typography className ={classes.displayInline} style={this.state.courseNameStyle} >
                                          {element.course_name}
                                      </Typography>
                                  </div>

                               <div name="InfoContainer">
                                 <div style={{float:'left'}} name="leftDetails">
                                   <div name="locationDiv" style={{paddingBottom:5}}>
                                       <i class="fas fa-map-marker-alt" style={{paddingRight: 7, color:'black'}}></i>
                                       <div className={classes.displayInlineBlock} style={{marginLeft: 10}}>
                                         <span style={this.state.subheading}>{element.location} </span>
                                       </div>
                                   </div>

                                       <div style={{paddingBottom:5}}>
                                         <i class="fas fa-graduation-cap" style={{paddingRight: 7, color:'black'}}></i>
                                         <span style={this.state.subheading}> {element.professor.first_name} {element.professor.last_name}</span>
                                       </div>
                                 </div>

                                 <div style={{float:'right'}} name="rightDetails">
                                   <div name="daysOfferedMainDiv" style={{paddingBottom:5}}>
                                         <i class="far fa-calendar-alt" style={{paddingRight: 7, color:'black'}}></i>
                                         <div name="daysDiv" className={classes.displayInlineBlock} style={{marginLeft: 1}}>
                                           {
                                            element.days.map((e) =>{
                                              return <span style={this.state.subheading}>{e} </span>
                                            })
                                          }
                                         </div>
                                     </div>
                                     <div name="classTimeDiv" style={{paddingBottom:5}}>
                                       <i class="far fa-clock" style={{paddingRight: 7, color:'black'}}></i>
                                       <span style={this.state.subheading}>{element.start_time} - {element.end_time}</span>
                                     </div>
                                 </div>
                               </div>

                                </CardContent>
                              </CardActionArea>
                            </Card>
                    </Grid>)

                  })
                }
              </Grid>

          </main>
      }

      // ------------- ADMIN ADD NEW COURSE ---------------------//
      if(!(this.state.isAddNewCourseHidden)){
        currentContent = <main style={this.state.content}>
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
        currentContent = <main style={this.state.content}>
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
        currentContent = <main style={this.state.content}>
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
        currentContent = <main style={this.state.content}>
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
        currentContent = <main style={this.state.content}>
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
      if(this.state.currentTheme == 'default')
      {
          var drawerProps = {
            classes: {
              paper: classes.drawerPaperDefault
            }
          }
        }
      else if(this.state.currentTheme == 'night'){
        var drawerProps = {
          classes: {
            paper: classes.drawerPaperNight
          }
        }

        var drawerTextColor = {
          classes: {
            primary: classes.drawerTextNight
          }
        }
      }

      sideNav =
        <div className={classes.root}>
          <AppBar position="absolute" style={this.state.appBar}>
            <Toolbar>
              <Typography className = {classes.appBarHeading} variant="headline" color="inherit">
                Course 360
              </Typography>

              <div name="ActionIconsDiv" style={{marginLeft:60}}>
                    <IconButton color="inherit" onClick = {this.profileMenu.bind(this)}
                      aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                      aria-haspopup="true">
                        <AccountCircle />
                      </IconButton>
                             <div>
                                 <Menu
                                    anchorEl ={this.state.anchorEl}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleClose}
                                    >

                                  <MenuItem onClick={this.logout.bind(this)}>Logout</MenuItem>
                                </Menu>
                             </div>
                     </div>
            </Toolbar>
          </AppBar>

        <Drawer
          variant="permanent"
          {...drawerProps}
        >
          <div className={classes.toolbar} />
          <List>
              <ListItem button onClick={this.handleMenuItemClick.bind(this, "home")}>
                <ListItemIcon style={this.state.navDrawerIcon}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Home" />
              </ListItem>

              <ListItem button onClick={this.handleMenuItemClick.bind(this, "add")}>
                <ListItemIcon style={this.state.navDrawerIcon}>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Add New Course" />
              </ListItem>

              <ListItem button onClick={this.handleMenuItemClick.bind(this, "edit")}>
                <ListItemIcon style={this.state.navDrawerIcon}>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Edit Course" />
              </ListItem>

              <ListItem button onClick={this.handleMenuItemClick.bind(this, "view students")}>
                <ListItemIcon style={this.state.navDrawerIcon}>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="View Students" />
              </ListItem>

              <ListItem button onClick={this.handleMenuItemClick.bind(this, "view profs")}>
                <ListItemIcon style={this.state.navDrawerIcon}>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="View Professors" />
              </ListItem>

          </List>
          <Divider />
        </Drawer>
        {currentContent}
        </div>

    }
  // -------------- ADMIN SECTION ENDS HERE.... NOW STUDENT AND PROF ---------------------------------//



    // --------------------------------- STUDENT VIEW BEGINS---------------------------------------------- //
    if(sessionStorage.getItem('user_role')==3){

      //---------------------------- HOME PAGE OF STUDENT ---------------------------------------------//
      if(!(this.state.isHomePageHidden)){
        currentContent = <main style={this.state.content}>
          <div className={classes.toolbar} />
           <h2> Hello, {this.state.loggedinUserFirstName}! Here are your courses</h2>

                 <Grid container
                   spacing = {24}
                   justify="flex-start"
                   style={this.state.widthForGrid}
                   alignItems="flex-start"
                   >
                   {
                     this.state.studentEnrolledCourses.map((element,i) => {
                       return(
                         <Grid key={i} item xs={6}>
                           <Card style={this.state.courseCardStyle}>
                                 <CardActionArea style= {this.state.inheritWidth} onClick = {this.goToCoursePage.bind(this, element)}>
                                   <CardMedia
                                       className={classes.media}
                                       image="build/computer-science.jpg"

                                     />
                                   <CardContent>
                                     <div name="courseNameAndDrop" style={{paddingBottom:15}}>
                                         <Typography className ={classes.displayInline} style={this.state.courseNameStyle} >
                                             {element.course_name}
                                         </Typography>
                                     </div>

                                  <div name="InfoContainer">
                                    <div style={{float:'left'}} name="leftDetails">
                                      <div name="locationDiv" style={{paddingBottom:5}}>
                                          <i class="fas fa-map-marker-alt" style={{paddingRight: 7, color:'black'}}></i>
                                          <div className={classes.displayInlineBlock} style={{marginLeft: 10}}>
                                            <span style={this.state.subheading}>{element.location} </span>
                                          </div>
                                      </div>

                                          <div style={{paddingBottom:5}}>
                                            <i class="fas fa-graduation-cap" style={{paddingRight: 7, color:'black'}}></i>
                                            <span style={this.state.subheading}> {element.professor.first_name} {element.professor.last_name}</span>
                                          </div>
                                    </div>

                                    <div style={{float:'right'}} name="rightDetails">
                                      <div name="daysOfferedMainDiv" style={{paddingBottom:5}}>
                                            <i class="far fa-calendar-alt" style={{paddingRight: 7, color:'black'}}></i>
                                            <div name="daysDiv" className={classes.displayInlineBlock} style={{marginLeft: 1}}>
                                              {
                                               element.days.map((e) => {
                                                 return <span style={this.state.subheading}>{e} </span>
                                               })
                                             }
                                            </div>
                                        </div>
                                        <div name="classTimeDiv" style={{paddingBottom:5}}>
                                          <i class="far fa-clock" style={{paddingRight: 7, color:'black'}}></i>
                                          <span style={this.state.subheading}>{element.start_time} - {element.end_time}</span>
                                        </div>
                                    </div>
                                  </div>

                                   </CardContent>
                                 </CardActionArea>
                               </Card>
                       </Grid>)

                     })
                   }
                 </Grid>

            {
               this.state.studentEnrolledCourses.length == 0 &&
               <p> You are not enrolled to any courses!</p>
             }
      </main>
      }

      if(!(this.state.isChatPageHidden)){
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
            <Card style={{height:400, color:'black'}}>
              <CardContent>
              <Grid container
                spacing = {24}
                justify="flex-start"
                style={this.state.widthForGrid}
                alignItems="flex-start"
                >
                  <Grid item xs={6}>
                    <h2> Hang out with everyone!</h2>
                    <Divider />
                      <Button style={{marginTop:20}} onClick= {this.goToGroupChat.bind(this)}variant="contained" color="primary"> Join Public Room</Button>
                  </Grid>
                  <Grid item xs={6}>
                      <h2> Personal Chat </h2>
                        <Divider />
                        <PersonalChatList pageChanger = {this.goToPersonalChatPage.bind(this)} isThisPersonalChatList={1}/>
                  </Grid>
              </Grid>
              </CardContent>
            </Card>
          </main>
      }

      // Nav to a private room!!
      else if(sessionStorage.getItem('personal_chat_with') != null && !this.state.isPersonalChatPageHidden){
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
            <Card >
              <CardContent>
                    <ChatScreen chatWith={sessionStorage.getItem('personal_chat_with')} currentUser={this.state.chatUser}/>
              </CardContent>
            </Card>
          </main>
      }

        //// Nav to group chat room!!
      else if(!this.state.isGroupChatPageHidden){
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
            <Card style={{color:'black'}}>
              <CardContent>
                  <ChatScreen chatWith={false} currentUser={this.state.chatUser}/>
              </CardContent>
            </Card>
          </main>
      }

      // --------------- SEARCH COURSES FOR STUDENT ------------------------------//
      else if(!(this.state.isSearchHidden)){
        currentContent = <main style={this.state.content}>
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
                <Grid container
                  spacing = {24}
                  justify="flex-start"
                  style={this.state.widthForGrid}
                  alignItems="flex-start"
                  >
                  {
                    this.state.searchResults.map((element,i) => {
                      return(
                        <Grid key={i} item xs={6}>
                          <Card style={this.state.courseCardStyle}>
                                <CardActionArea style= {this.state.inheritWidth} onClick = {this.goToCoursePage.bind(this, element)}>
                                  <CardMedia
                                      className={classes.media}
                                      image="build/computer-science.jpg"

                                    />
                                  <CardContent>
                                    <div name="courseNameAndDrop" style={{paddingBottom:15}}>
                                        <Typography className ={classes.displayInline} style={this.state.courseNameStyle} >
                                            {element.course_name}
                                        </Typography>
                                    </div>

                                 <div name="InfoContainer">
                                   <div style={{float:'left'}} name="leftDetails">
                                     <div name="locationDiv" style={{paddingBottom:5}}>
                                         <i class="fas fa-map-marker-alt" style={{paddingRight: 7, color:'black'}}></i>
                                         <div className={classes.displayInlineBlock} style={{marginLeft: 10}}>
                                           <span style={this.state.subheading}>{element.location} </span>
                                         </div>
                                     </div>

                                         <div style={{paddingBottom:5}}>
                                           <i class="fas fa-graduation-cap" style={{paddingRight: 7, color:'black'}}></i>
                                           <span style={this.state.subheading}> {element.professor.first_name} {element.professor.last_name}</span>
                                         </div>
                                   </div>

                                   <div style={{float:'right'}} name="rightDetails">
                                     <div name="daysOfferedMainDiv" style={{paddingBottom:5}}>
                                           <i class="far fa-calendar-alt" style={{paddingRight: 7, color:'black'}}></i>
                                           <div name="daysDiv" className={classes.displayInlineBlock} style={{marginLeft: 1}}>
                                             {
                                              element.days.map((e)=>{
                                                return <span style={this.state.subheading}>{e} </span>
                                              })
                                            }
                                           </div>
                                       </div>
                                       <div name="classTimeDiv" style={{paddingBottom:5}}>
                                         <i class="far fa-clock" style={{paddingRight: 7, color:'black'}}></i>
                                         <span style={this.state.subheading}>{element.start_time} - {element.end_time}</span>
                                       </div>
                                   </div>
                                 </div>

                                  </CardContent>
                                </CardActionArea>
                              </Card>
                      </Grid>)

                    })
                  }
                </Grid>

                {
                  this.state.searchResults.length == 0 && this.state.searchCourseName.length !=0 &&
                  <h2> No results found!</h2>
                }
                {
                  this.state.searchCourseName.length == 0 &&
                  <p style={{paddingTop:10}}> Start typing to search for courses!</p>
                }

          </main>
      }

      // ----- INDIVIDUAL COURSE PAGE ------------- ///
      if(!(this.state.isIndividualCoursePageHidden)){
        currentContent = <main style={this.state.content}>
            <div className={classes.toolbar} />
            {
              <div style={{color:'black'}}>
                <Card>
                  <CardContent>
                    <div name="courseNameAndAdd">
                      <h1> {this.state.dataOfClickedCourse.course_code} - {this.state.dataOfClickedCourse.course_name}</h1>
                        {!(this.state.isThisAnEnrolledCourse) &&
                        <IconButton color="inherit" title="Add to cart" onClick={this.addCourseToCart.bind(this, this.state.dataOfClickedCourse.course_id)} style={{float:"right"}}>
                          <AddShoppingCartIcon  />
                        </IconButton>
                      }
                      {this.state.isThisAnEnrolledCourse &&
                        <IconButton color="inherit" title="Drop Course" onClick={this.dropEnrolledCourse.bind(this, this.state.dataOfClickedCourse.course_id)} style={{float:"right"}}>
                          <DeleteIcon  />
                        </IconButton>
                      }
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

                    {
                      this.state.dataOfClickedCourse.comment.length ==0 &&
                      <div>
                        No comments so far!
                      </div>
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

      /////////////////// CART PAGE ///////////////////////////////////////////
      if(!(this.state.isCartPageHidden)){
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
              <h1> Your Cart</h1>
                {
                  this.state.cartData.length>0 &&
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

                {
                  this.state.cartData.length > 0 &&
                  <Button variant="contained" onClick = {this.PaymentMode.bind(this)} className = {classes.marginAuto} color="primary"> Checkout</Button>
                }
                {
                  this.state.cartData.length == 0 &&
                  <div>
                      <h2>You have no courses in the cart yet!</h2>
                      <h3>Search for a course to begin adding!!</h3>
                  </div>
                }

          </main>
      }

  //--------- CALENDAR SCHEDULE VIEW FOR STUDENT --------//
      if(!(this.state.isCalendarHidden)){
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
              <h2> Your Schedule</h2>
                <div style={{color:'black'}}>
                  <Card>
                    <BigCalendar
                      events={this.state.eventsForStudentCalendar}
                      views={allViews}
                      step={60}
                      timeslots={8}
                      style={{height:'-webkit-fill-available'}}
                      defaultView={BigCalendar.Views.MONTH}
                      defaultDate={new Date(2018, 7, 1)}
                      localizer={localizer}
                    />
                </Card>
              </div>
          </main>
      }

      // ---------- KRITI'S PAYMENT PORTAL SECTION --------------------------//
        else if(!(this.state.isPaymentPortalHidden)){
          currentContent = <main style={this.state.content}>
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

// Hit checkout from cart and lands here
else if(!(this.state.isPaymentModeCardHidden))
{
  currentContent=
    <main style={this.state.content}>
        <div className={classes.toolbar} />
          <div className={classes.root}>
            <div>
              <h2> Amount to be paid:</h2>
              {this.state.cartCost}
              <h2> Financial aid available:</h2>
              {this.state.finanical_aid}
            </div>
            <br /> <br />
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

// chose a payment mode and lands here
else if(!(this.state.isPaymentSuccessfulCardHidden))
{
  currentContent =   <main style={this.state.content}>
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
                            <Button variant="outlined"  onClick={this.dummySuccessPayment.bind(this)} className = {classes.marginAuto}  color="primary">Submit</Button>
                            </FormControl>
                          </form>
                    </CardContent>
            </Card>
  </main>
}

// Individual profile page @author: Kriti shree
else if(!(this.state.isStudentDetailsFormHidden)){
    currentContent =  <main style={this.state.content}>
        <div>
          <Card className={classes.myProfileCard}>
              <CardContent>
              <div>
              <Typography class='login-page-headers' color="primary">
                Your Details
              </Typography>
                   <FormControl >
                     <InputLabel htmlFor="input-with-icon-adornment">First Name</InputLabel>
                     <Input
                       id="input-with-icon-adornment"
                       value="Aravind"
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
                       value=""
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
                       value="Parappil"
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
                           value={0}
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
                       defaultValue="Luxe Gardens, Koppam, Palakkad, Kerala, India"
                       className={classes.textField}
                       margin="normal"
                      />

                      <FormControl className={classes.margin1}>
                          <TextField
                          id="standard-multiline-static"
                           label="Temporary Address"
                           multiline
                           rows="4"
                           defaultValue="C101 1750 N Range Rd Bloomington Indiana"
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
                        value="aravindparappil@gmail.com"
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
                        defaultValue="+ 8123254730"
                        className={classes.textField}
                        helperText="Enter US number"
                        />
                        </FormControl>
                        </form>

                        <form>
                        <TextField
                        label="CGPA"
                        id="margin-none"
                        defaultValue="3.9"
                        className={classes.textField}
                        helperText="upto Current semester"
                        />

                        <FormControl className={classes.margin1}>
                        <TextField
                        label="Program"
                        id="margin-none"
                        defaultValue="Computer Science"
                        className={classes.textField}
                        helperText="e.g CS/DS etc."
                        />
                        </FormControl>
                        </form>
                       <Button variant="outlined"  onClick={() => ToastStore.success(" Submitted the form successfully!!",4000,"whiteFont")}  className = {classes.marginBottom}  color="primary">Submit</Button>

                      <ToastContainer position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore}/>
                 </div>
              </CardContent>
          </Card>
          </div >
      </main>
}

      // ------------------------------ SIDE NAV FOR STUDENT ALWAYS EXISTS ---------------------------------------//
      if(this.state.currentTheme == 'default')
      {
          var drawerProps = {
            classes: {
              paper: classes.drawerPaperDefault
            }
          }
        }
      else if(this.state.currentTheme == 'night'){
        var drawerProps = {
          classes: {
            paper: classes.drawerPaperNight
          }
        }
        var drawerTextColor = {
          classes: {
            primary: classes.drawerTextNight
          }
        }
      }

      sideNav =
          <div className={classes.root}>
              <AppBar position="absolute" style={this.state.appBar} >
                <Toolbar>
                      <Typography className = {classes.appBarHeading} variant="headline" color="inherit">
                        Course 360
                      </Typography>

                      <div name="ActionIconsDiv" style={{marginLeft:60}}>
                          <IconButton color="inherit" aria-label="ShoppingCartNav" onClick={this.goToCartPage.bind(this, sessionStorage.getItem('user_id'))}>
                              <ShoppingCartIcon />
                         </IconButton>
                             <IconButton color="inherit" onClick = {this.profileMenu.bind(this)}
                               aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                               aria-haspopup="true">
                                 <AccountCircle />
                               </IconButton>
                                      <div>
                                          <Menu
                                             anchorEl ={this.state.anchorEl}
                                             open={Boolean(this.state.anchorEl)}
                                             onClose={this.handleClose}
                                             >
                                           <MenuItem onClick={this.goToMyProfilePage.bind(this)}>My Profile</MenuItem>
                                           <MenuItem onClick={this.showThemeModal.bind(this)}>Change Theme</MenuItem>
                                           <MenuItem onClick={this.logout.bind(this)}>Logout</MenuItem>
                                         </Menu>
                                      </div>
                          </div>
                          <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.isThemeModalOpen}
                            onClose={this.hideThemeModal.bind(this)}
                          >
                            <div style={{
                              top: `50%`,
                              left: `65%`,
                              transform: `translate(-100%, -100%)`,
                            }} className={classes.modalPaper}
                            >

                              <Typography class="theme-modal-font" id="modal-title">
                                Choose a theme
                              </Typography>

                              <RadioGroup
                                aria-label="themeRadio"
                                name="themeRadio"
                                className={classes.group}
                                value={this.state.themeRadio}
                                onChange={this.handleChange.bind(this)}>

                                    <FormControlLabel  value="1" control={<Radio color="primary" checked = {this.state.themeRadio==="1"} />} label="Default" />
                                    <FormControlLabel  value="2" control={<Radio color="primary" checked = {this.state.themeRadio==="2"}  />} label="Night Mode" />

                              </RadioGroup>
                            </div>
                          </Modal>
                </Toolbar>
              </AppBar>

                <Drawer
                    variant="permanent"

                      {...drawerProps}
                      >

                      <div className={classes.toolbar} />
                      <List>
                        <div name="profileSectionDiv" style={{textAlign:"center", paddingBottom:25}}>
                          <div style={{display:"inline-block", width:"80%"}}>
                            <section class="profile">
                                <figure>
                                  <div class="front">
                                    <img src = "build/P_20150718_120437_HDR.jpg" alt="Your photo"/>
                                  </div>

                                  <div class="back">
                                    <span> CGPA: 3.9</span>
                                  </div>
                                  </figure>
                              </section>
                              </div>
                            </div>

                          <ListItem button onClick={this.handleMenuItemClick.bind(this, "home")}  >
                            <ListItemIcon style={this.state.navDrawerIcon}>
                              <HomeIcon />
                            </ListItemIcon>
                            <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Home" />
                          </ListItem>

                          <ListItem button onClick={this.handleMenuItemClick.bind(this, "search")}>
                            <ListItemIcon style={this.state.navDrawerIcon}>
                              <SearchIcon />
                            </ListItemIcon>
                            <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Course Search" />
                          </ListItem>

                          <ListItem button onClick={this.handleMenuItemClick.bind(this, "calendar")}>
                            <ListItemIcon style={this.state.navDrawerIcon}>
                              <CalendarTodayIcon />
                            </ListItemIcon>
                            <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Calendar" />
                          </ListItem>

                          <ListItem button onClick={this.handleMenuItemClick.bind(this, "chat")}>
                           <ListItemIcon style={this.state.navDrawerIcon}>
                             <ChatIcon />
                           </ListItemIcon>
                           <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Chat" />
                         </ListItem>

                      </List>
                      <Divider />
                </Drawer>
              {currentContent}
        </div>
    }
    // ---------------------------------- END OF STUDENT VIEW ---------------------------------------- //



    ////////////////////////////////////////////////////////
    // ------------------ PROF VIEW ------           //////
    ///////////////////////////////////////////////////////

    if(sessionStorage.getItem('user_role')==2){
      //---------------------------- HOME PAGE OF PROF ---------------------------------------------//
      if(!(this.state.isHomePageHidden)){
        currentContent = <main style={this.state.content}>
          <div className={classes.toolbar} />
           <h2> Hello, {this.state.loggedinUserFirstName}! Here are your courses</h2>

                 <Grid container
                   spacing = {24}
                   justify="flex-start"
                   style={this.state.widthForGrid}
                   alignItems="flex-start"
                   >
                   {
                     this.state.profSchedule.map((element,i) => {
                       return(
                         <Grid key={i} item xs={6}>
                           <Card style={this.state.courseCardStyle}>
                                 <CardActionArea style= {this.state.inheritWidth} onClick = {this.goToCoursePage.bind(this, element)}>
                                   <CardMedia
                                       className={classes.media}
                                       image="build/computer-science.jpg"

                                     />
                                   <CardContent>
                                     <div name="courseNameAndDrop" style={{paddingBottom:15}}>
                                         <Typography className ={classes.displayInline} style={this.state.courseNameStyle} >
                                             {element.course_name}
                                         </Typography>
                                     </div>

                                  <div name="InfoContainer">
                                    <div style={{float:'left'}} name="leftDetails">
                                      <div name="locationDiv" style={{paddingBottom:5}}>
                                          <i class="fas fa-map-marker-alt" style={{paddingRight: 7, color:'black'}}></i>
                                          <div className={classes.displayInlineBlock} style={{marginLeft: 10}}>
                                            <span style={this.state.subheading}>{element.location} </span>
                                          </div>
                                      </div>

                                          <div style={{paddingBottom:5}}>
                                            <i class="fas fa-graduation-cap" style={{paddingRight: 7, color:'black'}}></i>
                                            <span style={this.state.subheading}> {element.professor.first_name} {element.professor.last_name}</span>
                                          </div>
                                    </div>

                                    <div style={{float:'right'}} name="rightDetails">
                                      <div name="daysOfferedMainDiv" style={{paddingBottom:5}}>
                                            <i class="far fa-calendar-alt" style={{paddingRight: 7,color:'black'}}></i>
                                            <div name="daysDiv" className={classes.displayInlineBlock} style={{marginLeft: 1}}>
                                              {
                                               element.days.map((e)=>{
                                                 return <span style={this.state.subheading}>{e} </span>
                                               })
                                             }
                                            </div>
                                        </div>
                                        <div name="classTimeDiv" style={{paddingBottom:5}}>
                                          <i class="far fa-clock" style={{paddingRight: 7, color:'black'}}></i>
                                          <span style={this.state.subheading}>{element.start_time} - {element.end_time}</span>
                                        </div>
                                    </div>
                                  </div>

                                   </CardContent>
                                 </CardActionArea>
                               </Card>
                       </Grid>)

                     })
                   }
                 </Grid>

            {
               this.state.profSchedule.length == 0 &&
               <p> You are not teaching any courses :(</p>
             }
      </main>
      }

      // --------------- SEARCH COURSES FOR PROFESSOR ------------------------------//
      else if(!(this.state.isSearchHidden)){
        currentContent = <main style={this.state.content}>
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
                <Grid container
                  spacing = {24}
                  justify="flex-start"
                  style={this.state.widthForGrid}
                  alignItems="flex-start"
                  >
                  {
                    this.state.searchResults.map((element,i) => {
                      return(
                        <Grid key={i} item xs={6}>
                          <Card style={this.state.courseCardStyle}>
                                <CardActionArea style= {this.state.inheritWidth} onClick = {this.goToCoursePage.bind(this, element)}>
                                  <CardMedia
                                      className={classes.media}
                                      image="build/computer-science.jpg"

                                    />
                                  <CardContent>
                                    <div name="courseNameAndDrop" style={{paddingBottom:15}}>
                                        <Typography className ={classes.displayInline} style={this.state.courseNameStyle} >
                                            {element.course_name}
                                        </Typography>
                                    </div>

                                 <div name="InfoContainer">
                                   <div style={{float:'left'}} name="leftDetails">
                                     <div name="locationDiv" style={{paddingBottom:5}}>
                                         <i class="fas fa-map-marker-alt" style={{paddingRight: 7, color:'black'}}></i>
                                         <div className={classes.displayInlineBlock} style={{marginLeft: 10}}>
                                           <span style={this.state.subheading}>{element.location} </span>
                                         </div>
                                     </div>

                                         <div style={{paddingBottom:5}}>
                                           <i class="fas fa-graduation-cap" style={{paddingRight: 7, color:'black'}}></i>
                                           <span style={this.state.subheading}> {element.professor.first_name} {element.professor.last_name}</span>
                                         </div>
                                   </div>

                                   <div style={{float:'right'}} name="rightDetails">
                                     <div name="daysOfferedMainDiv" style={{paddingBottom:5}}>
                                           <i class="far fa-calendar-alt" style={{paddingRight: 7, color:'black'}}></i>
                                           <div name="daysDiv" className={classes.displayInlineBlock} style={{marginLeft: 1}}>
                                             {
                                              element.days.map((e) => {
                                                return <span style={this.state.subheading}>{e} </span>
                                              })
                                            }
                                           </div>
                                       </div>
                                       <div name="classTimeDiv" style={{paddingBottom:5}}>
                                         <i class="far fa-clock" style={{paddingRight: 7, color:'black'}}></i>
                                         <span style={this.state.subheading}>{element.start_time} - {element.end_time}</span>
                                       </div>
                                   </div>
                                 </div>

                                  </CardContent>
                                </CardActionArea>
                              </Card>
                      </Grid>)

                    })
                  }
                </Grid>

                {
                  this.state.searchResults.length == 0 && this.state.searchCourseName.length !=0 &&
                  <h2> No results found!</h2>
                }
                {
                  this.state.searchCourseName.length == 0 &&
                  <p style={{paddingTop:10}}> Start typing to search for courses!</p>
                }
          </main>
      }

      // ----- INDIVIDUAL COURSE PAGE ------------- ///
      if(!(this.state.isIndividualCoursePageHidden)){
        currentContent = <main style={this.state.content}>
            <div className={classes.toolbar} />
            {
              <div style={{color:'black'}}>
                <Card>
                  <CardContent>
                    <div name="courseNameProfView">
                      <h1> {this.state.dataOfClickedCourse.course_code} - {this.state.dataOfClickedCourse.course_name}</h1>
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
                      this.state.dataOfClickedCourse.comment.length >0 &&
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
                    {
                      this.state.dataOfClickedCourse.comment.length ==0 &&
                      <div>
                        No comments so far!
                      </div>
                    }
                </CardContent>
              </Card>

              <br />

              {
                this.state.dataOfClickedCourse.professor['user_id'] == sessionStorage.getItem('user_id') &&
              <Card>
                <CardContent>
                    <h1> Students roster</h1>
                      {
                        this.state.studentsEnrolledForCourse.length > 0 &&
                        this.state.studentsEnrolledForCourse.map((el,i) => (
                          <div name="enrolledStudentsDiv" key={i}>
                            <span className={classes.bulletpoint} name="name">{el.first_name} {el.last_name}</span>
                          </div>
                        ))
                      }
                      {
                        this.state.studentsEnrolledForCourse.length ==0 &&
                        <div>
                          No students have enrolled for this course so far!
                        </div>
                      }
                </CardContent>
              </Card>
            }
              <br /> <br />
              </div>
           }
          </main>
      }

      //---CALENDAR VIEW --//
      if(!(this.state.isCalendarHidden)){
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
              <h2> Your Schedule</h2>
                <div style={{color:'black'}}>
                  <Card>
                    <BigCalendar
                      events={this.state.eventsForProfessorCalendar}
                      views={allViews}
                      step={60}
                      timeslots={8}
                      style={{height:'-webkit-fill-available'}}
                      defaultView={BigCalendar.Views.MONTH}
                      defaultDate={new Date(2018, 7, 1)}
                      localizer={localizer}
                    />
                </Card>
              </div>
          </main>
      }

      if(!(this.state.isChatPageHidden)){
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
            <Card style={{height:400, color:'black'}}>
              <CardContent>
              <Grid container
                spacing = {24}
                justify="flex-start"
                style={this.state.widthForGrid}
                alignItems="flex-start"
                >
                  <Grid item xs={6}>
                    <h2> Hang out with everyone!</h2>
                    <Divider />
                      <Button style={{marginTop:20}} onClick= {this.goToGroupChat.bind(this)}variant="contained" color="primary"> Join Public Room</Button>
                  </Grid>
                  <Grid item xs={6}>
                      <h2> Personal Chat </h2>
                        <Divider />
                        <PersonalChatList pageChanger = {this.goToPersonalChatPage.bind(this)} isThisPersonalChatList={1}/>
                  </Grid>
              </Grid>
              </CardContent>
            </Card>
          </main>
      }

      // Nav to a private room!!
      else if(sessionStorage.getItem('personal_chat_with') != null && !this.state.isPersonalChatPageHidden){
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
            <Card >
              <CardContent>
                    <ChatScreen chatWith={sessionStorage.getItem('personal_chat_with')} currentUser={this.state.chatUser}/>
              </CardContent>
            </Card>
          </main>
      }

        //// Nav to group chat room!!
      else if(!this.state.isGroupChatPageHidden){
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
            <Card style={{color:'black'}}>
              <CardContent>
                  <ChatScreen chatWith={false} currentUser={this.state.chatUser}/>
              </CardContent>
            </Card>
          </main>
      }

      // ------------------------------ SIDE NAV FOR PROF ALWAYS EXISTS ---------------------------------------//
      if(this.state.currentTheme == 'default')
      {
          var drawerProps = {
            classes: {
              paper: classes.drawerPaperDefault
            }
          }
        }
      else if(this.state.currentTheme == 'night'){
        var drawerProps = {
          classes: {
            paper: classes.drawerPaperNight
          }
        }
        var drawerTextColor = {
          classes: {
            primary: classes.drawerTextNight
          }
        }
      }

      sideNav =
          <div className={classes.root}>
              <AppBar position="absolute" style={this.state.appBar} >
                <Toolbar>
                    <Typography className = {classes.appBarHeading} variant="headline" color="inherit">
                      Course 360
                    </Typography>

                    <div name="ActionIconsDiv" style={{marginLeft:60}}>
                          <IconButton color="inherit" onClick = {this.profileMenu.bind(this)}
                            aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true">
                              <AccountCircle />
                            </IconButton>
                                   <div>
                                       <Menu
                                          anchorEl ={this.state.anchorEl}
                                          open={Boolean(this.state.anchorEl)}
                                          onClose={this.handleClose}
                                          >
                                        <MenuItem onClick={this.goToMyProfilePage.bind(this)}>My Profile</MenuItem>
                                        <MenuItem onClick={this.logout.bind(this)}>Logout</MenuItem>
                                      </Menu>
                                   </div>
                           </div>
                </Toolbar>
              </AppBar>

              <Drawer
                variant="permanent"
              {...drawerProps}
              >
                <div className={classes.toolbar} />
                <List>
                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "home")}>
                      <ListItemIcon style={this.state.navDrawerIcon}>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Home" />
                    </ListItem>

                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "search")}>
                      <ListItemIcon style={this.state.navDrawerIcon}>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Course Search" />
                    </ListItem>

                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "calendar")}>
                      <ListItemIcon style={this.state.navDrawerIcon}>
                        <CalendarTodayIcon />
                      </ListItemIcon>
                      <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Calendar" />
                    </ListItem>

                    <ListItem button onClick={this.handleMenuItemClick.bind(this, "chat")}>
                     <ListItemIcon style={this.state.navDrawerIcon}>
                       <ChatIcon />
                     </ListItemIcon>
                     <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Chat" />
                   </ListItem>

                </List>
                <Divider />
              </Drawer>
              {currentContent}
        </div>
    }
    //////////////// END OF PROF VIEW ////////////////////////


    return (
      <div>
        {sideNav}
        <ToastContainer position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore}/>
      </div>
    )
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardPage);
