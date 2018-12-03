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
import DoneIcon from '@material-ui/icons/Done';

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
import {NewsHeaderCard, UserCard} from 'react-ui-cards';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert'
import Chip from '@material-ui/core/Chip';



// -------------------- Declaring constants here -------------------//
const drawerWidth = 240;
const axios = require('axios');
const image2base64 = require('image-to-base64');
const pdfConverter = require('jspdf');

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
  rootTable: {
    width: 400,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginBottom:25,
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
rightIcon: {
    marginLeft: theme.spacing.unit,
  },
card: {
  marginTop: 80,
   width: 700,
  height:900,
  margin: 'auto'

},
myProfileCard:{


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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
    this.handleChangeForFilter = this.handleChangeForFilter.bind(this);

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
      cartCardStyle:{width: 470, height:100, marginBottom: 18},
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
      isIndividualStudentPageHidden: true,
      isPayNowOrLaterHidden: true,
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
      newCourseImageBase64:'',
      newCourseImageFileName:'',

      editCourseName: '',
      editCourseDesc: '',
      editCourseLocation: '',
      editCourseProf: '',
      editCourseDays: '',
      editCourseStartTime: '',
      editCourseEndTime: '',
      editCourseID: '',
      editCourseImageBase64:'',
      editCourseImageFileName:'',

      personalLN:'',
      personalFN: sessionStorage.getItem('user_first_name'),
      personalMN:'',
      personalMob:'',
      personalProg:'',
      personalPermAddr:'',
      personalTempAddr:'',
      personalEmail: sessionStorage.getItem('user_email'),
      personalDOB:'',
      personalGender:'Male',
      personalImageFileName:'',
      personalImageBase64:'',
      personalImageURL:'',
      personalCGPA:'',

      allProfessorsForSelect: [],
      allStudents: [],
      allProfessors: [],
      allProfessorsNames:[],
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
      isfeeReceiptPageHidden:true,

      anchorEl: null,
      open: false,
      studentsEnrolledForCourse: [],

      chatUser: {},

      isLoading: true,
      msElapsed: 0,
      dataOfCurrentStudent: {},
      finAidForStudent: 0,
      allSems :[],
      semSelected: 1,
      latePayPenalty:0,
      lateRegPenalty: 0,
      netAmount: 0,
      payRadio: 0,
      coursesFromPayment: [],
      name:[],
      courseGPA:''

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
     this.getProfileDetails().then((data)=>{

       this.state.personalCGPA = data['cgpa'];
       this.state.personalImageURL = data['image']
     })
    }

    else if(currentUserRole == 2)
    {
      console.log('constructor for prof');
     this.state.isAdmin = false
     this.getProfileDetails().then((data)=>{
       this.state.personalImageURL = data['image']
     })
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

      // PAYMENT PORTAL RADIO BUTTONS... PAYMENT MODES SELECTION
      if(e.target.name =='payRadio'){
          this.setState({ payRadio: e.target.value });
      }

      //----- When user tries to upload banner image for course ----//
      if(e.target.name=="fileUploadInput"){
          var fileObj = e.target.files[0]
          var imageURL = URL.createObjectURL(fileObj)
          this.setState({newCourseImageFileName: fileObj.name})
          image2base64(imageURL)
              .then(
                  (response) => {
                    var base64encoded = 'data:image/jpeg;base64,'+response
                    this.setState({newCourseImageBase64: base64encoded})
                  }
              )
              .catch(
                  (error) => {
                      console.log('base 64 conversion failed',error); //Exepection error....
                  }
                 )
      } //file upload innput end


      //----- When user tries to upload personal image ----//
      if(e.target.name=="PersonalfileUploadInput"){
          var fileObj = e.target.files[0]
          var imageURL = URL.createObjectURL(fileObj)
          this.setState({personalImageFileName: fileObj.name})
          image2base64(imageURL)
              .then(
                  (response) => {
                    var base64encoded = 'data:image/jpeg;base64,'+response
                    console.log("successful base64encoded");
                    this.setState({personalImageBase64: base64encoded})
                  }
              )
              .catch(
                  (error) => {
                      console.log('base 64 conversion failed',error); //Exepection error....
                  }
                 )
      } //file upload innput end

      // when admin edits a course---------------
      if(e.target.name=="fileUploadInputEditCourse"){
          var fileObj = e.target.files[0]
          var imageURL = URL.createObjectURL(fileObj)
          this.setState({editCourseImageFileName: fileObj.name})
          console.log("Editing imagefile:",fileObj,  fileObj.name);
          console.log("image url", imageURL);
          image2base64(imageURL)
              .then(
                  (response) => {
                    var base64encoded = 'data:image/jpeg;base64,'+response
                    this.setState({editCourseImageBase64: base64encoded})
                  }
              )
              .catch(
                  (error) => {
                      console.log('base 64 conversion failed',error); //Exepection error....
                  }
                 )
      } //file upload innput end



} //HandleChange ends

//filtering dropdown pop
handleChangeForFilter(callback,e){
  let change = {}
  change[e.target.name] = e.target.value
  this.setState(change, ()=>{
        callback();
      });
}

//called each time a prof is chosen in filter dropdown
showOnlyFilteredCourses(e){
  var searchTerm = this.state.searchCourseName
  var profs = this.state.name
  console.log("filtering..................", searchTerm,'  ',profs);
  this.onlyGetSearchResults(searchTerm).then((beforeFilter)=>{
    var filtered = []
    if(beforeFilter.length > 0)
    {
      if(profs.length > 0){
        for(let i = 0; i < beforeFilter.length; i++){
          beforeFilter[i]['days'].forEach(function(item,index){
            switch(item){
              case 1: beforeFilter[i]['days'][index] = "Mon"; break;
              case 2: beforeFilter[i]['days'][index] = "Tue"; break;
              case 3: beforeFilter[i]['days'][index] = "Wed"; break;
              case 4: beforeFilter[i]['days'][index] = "Thu"; break;
              case 5: beforeFilter[i]['days'][index] = "Fri"; break;
            }
          })

            if(profs.includes(beforeFilter[i]['professor'].full_name)) {
              console.log('found a prof');
              filtered.push(beforeFilter[i])
            }
          } // for loop
          this.setState({searchResults: filtered})
        } //prof length > 0

        // not filtering for anyone
        else
        {
          for(let i = 0; i < beforeFilter.length; i++){
            beforeFilter[i]['days'].forEach(function(item,index){
              switch(item){
                case 1: beforeFilter[i]['days'][index] = "Mon"; break;
                case 2: beforeFilter[i]['days'][index] = "Tue"; break;
                case 3: beforeFilter[i]['days'][index] = "Wed"; break;
                case 4: beforeFilter[i]['days'][index] = "Thu"; break;
                case 5: beforeFilter[i]['days'][index] = "Fri"; break;
              }
            })
            } // for loop
          this.setState({searchResults: beforeFilter})
        } //else
     } // results exist length >0

  });

}

//submit cgpa for user
submitGPA(data,e){
      var courseClicked = this.state.dataOfClickedCourse
      axios({
        method:'get',
        url:'http://localhost:5000/updateGPAByCourse/course/'+courseClicked.course_id+'/user/'+data.user_id+'/gpa/'+this.state.courseGPA,
        headers: {'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('token')}
      })
      .then((response)=>{
        if(response.status == 200)
        {
          ToastStore.success('Grade changed',4000,"whiteFont")
        }
      }).catch(err => {
        console.log("DAMN! grade change messed up ", err)
        ToastStore.error('Oops! Please try again!',4000,"whiteFont")
      })
}

// Personal details
submitPersonalDetails(e){
        var dataJSON = {
          image: this.state.personalImageBase64,
          dob: this.state.personalDOB,
          altEmail: this.state.personalEmail,
          firstName: this.state.personalFN,
          lastName: this.state.personalLN,
          middleName: this.state.personalMN,
          gender: this.state.personalGender,
          phone:this.state.personalMob,
          presentAddress: this.state.personalTempAddr,
          permanentAddress: this.state.personalPermAddr,
          course: this.state.personalProg,
          userId: sessionStorage.getItem('user_id'),
          cgpa: 3.9
        }

        console.log('DATAsent==>',dataJSON);
        axios({
          method:'post',
          url:'http://localhost:5000/personalDetails',
          data: dataJSON,
          headers: {'Access-Control-Allow-Origin': '*',
          'Authorization': sessionStorage.getItem('token')},
        })
        .then((response) => {
            if(response.status != 500)
            {
              ToastStore.success("Successfully updated your details!", 4000, "whiteFont")
              sessionStorage.setItem('user_img','https://s3.amazonaws.com/course-360/u'+sessionStorage.getItem('user_id')+'.jpg')

              this.setState({personalImageURL: response.data.data['image']});

                            window.location.reload();
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
              this.setState({isfeeReceiptPageHidden: true});
              this.setState({isIndividualCoursePageHidden: true});
              this.setState({isCartPageHidden: true});
              this.setState({isThisAnEnrolledCourse: false})
              this.setState({isStudentDetailsFormHidden: true})
              this.setState({isChatPageHidden: true})
              this.setState({isGroupChatPageHidden: true});
              this.setState({isPersonalChatPageHidden:true})
              this.setState({isIndividualStudentPageHidden: true });
              this.setState({isPayNowOrLaterHidden:true})

            }
        }).catch(err => {
          console.log("DAMN! ==>personalDetails<== ", err)
          ToastStore.error('Oops! Please try again!',4000,"whiteFont")
        });
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
  this.setState({isfeeReceiptPageHidden: true});
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
    this.setState({isfeeReceiptPageHidden: true});
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
        url:'http://localhost:5000/getCourseBy/name/'+e.target.value+'/start/0/end/100',
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

// No handle change..used in filtering courses
onlyGetSearchResults(key){
      //Hit API and get results that matches
      return axios({
        method:'get',
        url:'http://localhost:5000/getCourseBy/name/'+key+'/start/0/end/100',
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
  sessionStorage.setItem('user_img', '')

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
  this.setState({isfeeReceiptPageHidden: true});
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

goToMyProfilePage(e){
  this.getProfileDetails().then( (data) => {
    if(data){
    this.handleClose()
    console.log('da',data);
    this.setState({personalDOB: data['dob'] })
    this.setState({personalFN: data['first_name'] })
    this.setState({personalLN: data['last_name'] })
    this.setState({personalMN: data['middle_name'] })
    this.setState({personalEmail: data['alt_email'] })
    this.setState({personalGender: data['gender'] })
    this.setState({personalPermAddr: data['permanent_address'] })
    this.setState({personalTempAddr: data['present_address'] })
    this.setState({personalMob: data['phone'] })
    this.setState({personalProg: data['course'] })
    this.setState({personalCGPA: data['cgpa'] })
    this.setState({personalImageURL: data['image'] })

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
    this.setState({isfeeReceiptPageHidden: true});
    this.setState({isIndividualCoursePageHidden: true});
    this.setState({isCartPageHidden: true});
    this.setState({isStudentDetailsFormHidden:false});
    this.setState({isChatPageHidden: true});
    this.setState({isGroupChatPageHidden: true});
    this.setState({isPersonalChatPageHidden:true})}

    else{
      ToastStore.error("Oops!Something messed up!",4000,"whiteFont")
    }

  });
}
//navigates to profile page
getProfileDetails(){

  return axios({
    method:'get',
    url:'http://localhost:5000/getProfileDetails/user/'+sessionStorage.getItem('user_id')+'/role/'+sessionStorage.getItem('user_role'),
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    if(response.status == 200)
    {
      return response.data
    }
    else{
        return false
    }
  }).catch(err => {
    console.log("personal profile fetch failed results ", err)
      return false
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
    var profs = this.state.name
    var filtered = []

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
      this.setState({isfeeReceiptPageHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});
      this.setState({isThisAnEnrolledCourse: false})
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isChatPageHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
      this.setState({isIndividualStudentPageHidden: true });
      this.setState({isPayNowOrLaterHidden:true})
      if(sessionStorage.getItem('user_role')!=1)
      {
        this.leaveAllChatRooms();
      }
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
      this.setState({isfeeReceiptPageHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});
      this.setState({isStudentDetailsFormHidden: true})
       this.setState({isChatPageHidden: true})
       this.setState({isGroupChatPageHidden: true});
       this.setState({isPersonalChatPageHidden:true})
       this.setState({isIndividualStudentPageHidden: true });

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
      this.setState({isfeeReceiptPageHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isChatPageHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
      this.setState({isIndividualStudentPageHidden: true });

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
      this.setState({isfeeReceiptPageHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isCartPageHidden: true});
      this.setState({isChatPageHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
      this.setState({isIndividualStudentPageHidden: true });


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
      this.setState({isfeeReceiptPageHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});
      this.setState({isChatPageHidden: true})
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
      this.setState({isIndividualStudentPageHidden: true });

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
      this.setState({isfeeReceiptPageHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({searchCourseName: ''});
      this.setState({isChatPageHidden: true});
      this.setState({searchResults: []});
      this.setState({isCartPageHidden: true});
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isThisAnEnrolledCourse: false})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
      this.setState({isPayNowOrLaterHidden:true})
      this.setState({name:[]})

      //for populating filter dropdown
      this.getAllProfessorsForSelect().then((returnVal) => {
        var profNames = []
        for(let i = 0; i < returnVal.length; i++){
          profNames.push(returnVal[i]['full_name'])
        }
          this.setState({allProfessorsNames: profNames});
      })
      .catch(err => console.log("Axios err at add course: ", err))

      this.leaveAllChatRooms();
    }

    else if(value=='payment'){

      this.getPaymentDetails().then((returnVal) => {

        if(returnVal)
        {
            this.setState({cartCost: returnVal['cost']})
            this.setState({finanical_aid: returnVal['finanical_aid']})
            this.setState({lateRegPenalty: returnVal['late_reg_penality']})
            this.setState({latePayPenalty: returnVal['late_payment_penality']})
            this.setState({coursesFromPayment: returnVal['courses']})

            this.setState({netAmount: returnVal['cost']+ returnVal['late_reg_penality']+returnVal['late_payment_penality']- returnVal['finanical_aid']})
            this.setState({isPaymentModeCardHidden: false});
            this.setState({isHomePageHidden: true});
            this.setState({isPaymentPortalHidden: true});
            this.setState({isCalendarHidden: true});
            this.setState({isSearchHidden: true});
            this.setState({isAddNewCourseHidden: true});
            this.setState({isEditCourseHidden: true});
            this.setState({isViewStudentsHidden: true});
            this.setState({isViewProfessorsHidden: true});
            this.setState({isEditSingleCourseHidden: true})

            this.setState({isfeeReceiptPageHidden: true});
            this.setState({isIndividualCoursePageHidden: true});
            this.setState({isCartPageHidden: true});
            this.setState({isChatPageHidden: true});
            this.setState({isThisAnEnrolledCourse: false})
            this.setState({isStudentDetailsFormHidden: true})
            this.setState({isGroupChatPageHidden: true});
            this.setState({isPersonalChatPageHidden:true})
            this.setState({isPayNowOrLaterHidden:true})
            this.leaveAllChatRooms();
        }

        else{
              console.log("Return Value from Payment details empty", returnVal);
              this.setState({cartCost: 0})
              this.setState({finanical_aid: 0})
              this.setState({lateRegPenalty: 0})
              this.setState({latePayPenalty: 0})
              this.setState({coursesFromPayment: 0})
              this.setState({netAmount: 0})

              this.setState({isPaymentModeCardHidden: false});
              this.setState({isHomePageHidden: true});
              this.setState({isPaymentPortalHidden: true});
              this.setState({isCalendarHidden: true});
              this.setState({isSearchHidden: true});
              this.setState({isAddNewCourseHidden: true});
              this.setState({isEditCourseHidden: true});
              this.setState({isViewStudentsHidden: true});
              this.setState({isViewProfessorsHidden: true});
              this.setState({isEditSingleCourseHidden: true})

              this.setState({isfeeReceiptPageHidden: true});
              this.setState({isIndividualCoursePageHidden: true});
              this.setState({isCartPageHidden: true});
              this.setState({isChatPageHidden: true});
              this.setState({isThisAnEnrolledCourse: false})
              this.setState({isStudentDetailsFormHidden: true})
              this.setState({isGroupChatPageHidden: true});
              this.setState({isPersonalChatPageHidden:true})
              this.setState({isPayNowOrLaterHidden:true})
              this.leaveAllChatRooms();
        }

      });
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
      this.setState({isfeeReceiptPageHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});
      this.setState({isChatPageHidden: true});
      this.setState({isThisAnEnrolledCourse: false})
      this.setState({isStudentDetailsFormHidden: true})
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
      this.setState({isPayNowOrLaterHidden:true})

      this.leaveAllChatRooms();

      if(sessionStorage.getItem('user_role')==2)
      {
        this.getProfessorSchedule()

      }
      else if(sessionStorage.getItem('user_role')==3){
        this.getStudentSchedule(sessionStorage.getItem('user_id'))
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
      this.setState({isfeeReceiptPageHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isCartPageHidden: true});
      this.setState({isThisAnEnrolledCourse: false})
      this.setState({isChatPageHidden: false});
      this.setState({isGroupChatPageHidden: true});
      this.setState({isPersonalChatPageHidden:true})
     }
  }

  // search for a sem value in an array of obj
   search(myArray,nameKey){
     console.log('inside ss',myArray,nameKey);
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].sem['sem_name'] === nameKey) {
              return true;
          }
      }
      return false;
  }

  // --------------------------------//
  // --- Kriti's functions ----------//
  // ---- CHECKOUT FROM CART --------//
  // --------------------------------//
    PaymentMode(sem, event) {
      const dataJSON = {
        user_id: sessionStorage.getItem('user_id'),
        sem_id : sem
      }

      console.log('To be sent to enroll Courses ==>',dataJSON);
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
            console.log('enrollment response', response.data);

            if(!(response.data['is_clash']))
            {
              this.setState({cartCost: response.data['cost']});
              this.setState({finanical_aid: response.data['finanical_aid']});
              this.setState({latePayPenalty: response.data['late_payment_penality']});
              this.setState({lateRegPenalty: response.data['late_reg_penality']});
              this.setState({netAmount: response.data['cost']+ response.data['late_reg_penality']+response.data['late_payment_penality']- response.data['finanical_aid']})


              this.setState({isStudentDetailsFormHidden: true})
              this.setState({isPaymentPortalHidden: true});
              this.setState({isPayNowOrLaterHidden: false});
              this.setState({isPaymentModeCardHidden: true});
              this.setState({isfeeReceiptPageHidden: true});
              this.setState({isIndividualCoursePageHidden: true});
              this.setState({isCartPageHidden: true});
              this.setState({isGroupChatPageHidden: true});
              this.setState({isPersonalChatPageHidden:true})
          }
          else{
            var alertMsg = "Some of your courses have overlapping times!\n\n"+response.data['courses'][0][0]+'\n'+response.data['courses'][0][1]+'\n\nPlease fix the clash to proceed.'
            swal('Uh Oh!',alertMsg, 'error')

          }

          // STATUS IS 500
          }
          else{
            this.setState({isPaymentPortalHidden: true});
            this.setState({isPaymentModeCardHidden: true});
            this.setState({isfeeReceiptPageHidden: true});
            this.setState({isPayNowOrLaterHidden: true});
            this.setState({isIndividualCoursePageHidden: true});
            this.setState({isStudentDetailsFormHidden: true})
            this.setState({isCartPageHidden: false});
            this.setState({isGroupChatPageHidden: true});
            this.setState({isPersonalChatPageHidden:true})
            console.log("Error in enrollment");
          } //not 200 ends
      });
    }

// gets payment info for that student
getPaymentDetails(){
      return axios({
        method:'get',
        url:'http://localhost:5000/getPaymentDetails/user/'+sessionStorage.getItem('user_id'),
        headers: {'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('token')}
      })
      .then((response)=>{
        console.log("inside getPaymentDetails---",response.data);
          return response.data
      }).catch(err => {
          console.log('Error fetching payment details',err);
          return false
      })

}

/// click submit at payment portal
 payFee(event){
   var dataJSON = {
     user_id : sessionStorage.getItem('user_id'),
     courses : this.state.coursesFromPayment
   }

   axios({
     method:'post',
     url:'http://localhost:5000/payfee',
     data: dataJSON,
     headers: {'Access-Control-Allow-Origin': '*',
     'Authorization': sessionStorage.getItem('token')},
   })
   .then((response) => {
       if(response.status != 500)
       {
         ToastStore.success("Success! You have paid your fees!", 4000, "whiteFont")
         this.setState({isStudentDetailsFormHidden: true})
         this.setState({isPaymentPortalHidden: true});
         this.setState({isPayNowOrLaterHidden: true});
         this.setState({isPaymentModeCardHidden: true});
         this.setState({isfeeReceiptPageHidden: true});
         this.setState({isIndividualCoursePageHidden: true});
         this.setState({isCartPageHidden: true});
         this.setState({isGroupChatPageHidden: true});
         this.setState({isPersonalChatPageHidden:true})
         this.setState({isfeeReceiptPageHidden: false})


       }
   });
 }

// EMAIL PAYMENT RECEIPT
sendEmailReceipt(e){

  var cartCost = this.state.cartCost
  var financial = this.state.finanical_aid
  var payPen = this.state.latePayPenalty
  var regPen = this.state.lateRegPenalty

  console.log("sending email...", cartCost,' ', financial,' ', regPen,"+",payPen);

  axios({
    method:'get',
    url:'http://localhost:5000/sendReceipt/email/'+sessionStorage.getItem('user_email')+'/cost/'+cartCost+'/fiAid/'+financial+'/reg/'+regPen+'/pay/'+payPen,
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    console.log("inside send email succ---",response.data);
    ToastStore.success('Success! Check your inbox for the receipt!',4000,"whiteFont")
  }).catch(err => {
      console.log('Error fetching payment details',err);
    ToastStore.error('Oops! Please try again!',4000,"whiteFont")
  })
}

//DOWNLOAD PDF OF Receipt
downloadPDF(e){
  console.log("Downloading pdf");

    var cartCost = this.state.cartCost
    var financial = this.state.finanical_aid
    var payPen = this.state.latePayPenalty
    var regPen = this.state.lateRegPenalty
    var netAmount = cartCost+ regPen + payPen - financial

   var doc = new pdfConverter('p','pt','c6')
   doc.setFontSize(35);
   doc.text(70, 50, 'Course360');
   doc.setFontSize(16);
   doc.text(70, 80, 'Fee Payment Receipt');
   doc.line(20,100,300,100)

   doc.setFontSize(12);
   doc.text(20, 150, 'Cost of courses enrolled:');
   doc.text(220, 150, '$ ' + cartCost);

   doc.text(20, 170, 'Late Registration Penalty:');
   doc.text(220, 170, '$ ' + regPen);

   doc.text(20, 190, 'Late Fee Payment Penalty:');
   doc.text(220, 190, '$ ' + payPen);

   doc.setFontStyle("italic")
   doc.text(20, 240, 'Financial Aid:');
   doc.text(220, 240, '$ ' + financial);


   doc.text(20, 260, 'Total amount paid:');
   doc.text(220, 260, '$ ' + netAmount);

    doc.setFontStyle("normal")
    doc.text(20, 320, 'Happy learning!');
    doc.text(20, 340, 'Team Course 360');
    doc.text(20, 360, 'reach.course360@gmail.com');
    doc.line(20,380,300,380)

    doc.save('Course360-Receipt.pdf')
    ToastStore.success("Your PDF has been downloaded!", 4000, "whiteFont")
}


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
          console.log("getEnrolledCourses-------",filtered);
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
  sessionStorage.setItem('user_theme',theme)
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

  console.log("Inside compoment did mount..Theme is..", this.state.currentTheme);
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
    this.getStudentSchedule(sessionStorage.getItem('user_id'))
    this.getProfileDetails().then((data)=>{

      this.setState({personalCGPA: data['cgpa'] });
      this.setState({personalImageURL: data['image'] });
    })
  }

// PROFESSOR
  if(currentUserRole == 2)
  {
    this.setState({isAdmin: false });
    this.getProfessorSchedule()
    this.getProfileDetails().then((data)=>{
      this.setState({personalImageURL: data['image'] });
    })
  }

  // chat user
   if(currentUserRole != 1)
  {
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
      url:'http://localhost:5000/getAllProfessors/start/0/end/1000',
      headers: {'Access-Control-Allow-Origin': '*',
      'Authorization': sessionStorage.getItem('token')}
    })
    .then((response)=>{
      console.log('profs',response.data);
      return(response.data)
    });
  }

  // Get list of all semesters to be populated
  // in select drop down while adding new courses
  getSemestersForSelect(){
    return axios({
      method:'get',
      url:'http://localhost:5000/semesters',
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
      url:'http://localhost:5000/getAllStudents/start/0/end/100',
      headers: {'Access-Control-Allow-Origin': '*',
      'Authorization': sessionStorage.getItem('token')}
    })
    .then((response)=>{
      console.log("Students:",response.data);
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
            department: 'DEFAULT_DEPT',
            image: this.state.newCourseImageBase64
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
              this.setState({newCourseImageBase64: ''});
              this.setState({newCourseImageFileName: ''});
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
    this.state.editCourseImageBase64 = (this.state.editCourseImageBase64 == '') ? '' : this.state.editCourseImageBase64

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
            image: this.state.editCourseImageBase64,
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
            if(response.status == 200)
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
              this.setState({editCourseImageBase64: ''});
              this.componentDidMount();

              this.setState({isEditSingleCourseHidden: true})
              this.setState({isEditCourseHidden: false})
              this.setState({isIndividualCoursePageHidden: true});
              this.setState({isStudentDetailsFormHidden: true})

            }
        }).catch(err => {
          console.log("Update course details ERROR: ", err)
          ToastStore.error('Oops! Something went wrong! Please try again!',4000,"whiteFont")
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
            if(response.status == 200)
            {

              swal('Success!','Course has been deleted successfully!!','success')
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
        console.log("Enrolled ==", allEnrolledCoursesOfStudent);

        var notEnrolledFlag = true

        for(var i=0; i<allEnrolledCoursesOfStudent.length; i++){
          if(allEnrolledCoursesOfStudent[i].course_id == courseClicked.course_id ){
            this.setState({isThisAnEnrolledCourse: true})
            this.setState({dataOfClickedCourse: allEnrolledCoursesOfStudent[i]})
            notEnrolledFlag = false
          }
        }

        // clicked on an un-enrolled course....no sem details
        if(notEnrolledFlag){
          this.setState({dataOfClickedCourse: courseClicked})
        }

        this.getSemestersForSelect().then((returnVal) => {
            this.setState({allSems: returnVal});
        })
        .catch(err => console.log("Error with fetching sems ", err))
      } //STUDENT ENDS

      // PROFESSOR
      if(sessionStorage.getItem('user_role') == 2){
            this.getEnrolledStudentsForCourse(courseClicked.course_id)
            this.setState({dataOfClickedCourse: courseClicked})

      }

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
          sem_id: this.state.semSelected
      }
      console.log("Data to be sent",dataJSON);
  axios({
        method:'post',
        url:'http://localhost:5000/addToCart',
        data: dataJSON,
        headers: {'Access-Control-Allow-Origin': '*',
        'Authorization': sessionStorage.getItem('token')},
      })
      .then((response) => {
          if(response.status == 200)
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
    console.log('response code',response.status, response.data);
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
  console.log("goToCartPage ID",id);
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

    console.log("Moving to cart page...............", returnVal);
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
    this.setState({isfeeReceiptPageHidden: true});
    this.setState({isIndividualCoursePageHidden: true});;
    this.setState({isStudentDetailsFormHidden: true})
  })
  .catch(
    err => {
      console.log("ERO",err);
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
      this.setState({isfeeReceiptPageHidden: true});
      this.setState({isIndividualCoursePageHidden: true});
      this.setState({isStudentDetailsFormHidden: true})
    });
}

// -------------------------
// Deletes course from cart given course id
// -------------------------
deleteFromCart(id,e){
  let user_id = sessionStorage.getItem('user_id')
  console.log("Del ob",id);
  axios({
    method:'get',
    url:'http://localhost:5000/delete/course/'+id.course_id+'/fromCart/for/user/'+user_id+'/sem/'+id.sem['sem_id'],
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    console.log("DELETE RESPONSE",response);
    ToastStore.success('Course Deleted From Cart!!',4000,"whiteFont")
    this.goToCartPage(user_id,id)
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

// Chooses to Pay now
goToPaymentPortal(e){
  this.setState({isStudentDetailsFormHidden: true})
  this.setState({isPaymentPortalHidden: true});
  this.setState({isPayNowOrLaterHidden: true});
  this.setState({isPaymentModeCardHidden: false});
  this.setState({isfeeReceiptPageHidden: true});
  this.setState({isIndividualCoursePageHidden: true});
  this.setState({isCartPageHidden: true});
  this.setState({isGroupChatPageHidden: true});
  this.setState({isPersonalChatPageHidden:true});
}

// pay later option
goToHomePage(e){
  ToastStore.success("Please remember to pay the amount before deadlines!",4000,"whiteFont")
  this.setState({isPaymentPortalHidden: true});
  this.setState({isPayNowOrLaterHidden: true});
  this.setState({isPaymentModeCardHidden: true});
  this.setState({isfeeReceiptPageHidden: true});
  this.setState({isCartPageHidden: true});

  this.setState({isHomePageHidden: false});
  this.setState({isPaymentPortalHidden: true});
  this.setState({isCalendarHidden: true});
  this.setState({isSearchHidden: true});
  this.setState({isAddNewCourseHidden: true});
  this.setState({isEditCourseHidden: true});
  this.setState({isViewStudentsHidden: true});
  this.setState({isViewProfessorsHidden: true});
  this.setState({isEditSingleCourseHidden: true})
  this.setState({isIndividualCoursePageHidden: true});
  this.setState({isThisAnEnrolledCourse: false})
  this.setState({isStudentDetailsFormHidden: true})
  this.setState({isChatPageHidden: true})
  this.setState({isGroupChatPageHidden: true});
  this.setState({isPersonalChatPageHidden:true})
  this.setState({isIndividualStudentPageHidden: true });

}

///////////
// Get Student Schedule
//////////
getStudentSchedule(user_id){
console.log("Getting students schedule.....hold on");
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
      console.log("Students schedule is",response.data);

      if(sessionStorage.getItem('user_role') != 1) // NOT AN ADMIN
      {
        this.setState({studentSchedule: response.data});
        this.populateEventsForStudentCalendar() //events array being populated for calendar
      }
      else{ //ADMIN
        console.log("Admin sets student schedule.....");
        this.setState({studentSchedule: response.data},  () => {

          this.setState({isViewStudentsHidden: true});
          this.setState({isIndividualStudentPageHidden: false });
      });
      }
    } //if success
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
  this.setState({isfeeReceiptPageHidden: true});
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
    url:'http://localhost:5000/dropCourse/courseId/'+element.course_id+'/userId/'+sessionStorage.getItem('user_id')+'/sem/'+element.sem['sem_id'],
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    if(response.status == 200){

        swal('Success!','This course has been dropped from your schedule','success')

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
        this.setState({isfeeReceiptPageHidden: true});
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

/////////////////////////////////////////////
//// go to a students page from admin ///////
/////////////////////////////////////////////
moveToIndividualStudentPage(data,event){
  this.setState({dataOfCurrentStudent: data}); // does not have course info
  console.log("dataOfCurrentStudent",data);
  this.setState({finAidForStudent: data.finanical_aid});
  //populates state var studentSchedule
  this.getStudentSchedule(data.user_id)
}


// Update financial aid for student
submitFinAid(studentId, e){
  var finAid = this.state.finAidForStudent;
  axios({
    method:'get',
    url:'http://localhost:5000/updateFinancialAid/value/'+finAid+'/student/'+studentId,
    headers: {'Access-Control-Allow-Origin': '*',
    'Authorization': sessionStorage.getItem('token')}
  })
  .then((response)=>{
    if(response.status == 200)
    {
      ToastStore.success('Updated financial aid successfully',4000,"whiteFont")
    }
  }).catch(err => {
    console.log("DAMN! fin aid messed up ---> ", err)
    ToastStore.error('Oops! Please try again!',4000,"whiteFont")
  })

}

/////////////////////////////////////////////////////////
/////////////// RENDER FUNCTION /////////////////////////
////////////////////////////////////////////////////////
  render() {
    const { classes } = this.props;
    const { spacing } = this.state; // this is for student grid in admin
    let sideNav; //this contains the html for the sideNav of page to be viewed now
    let currentContent;
    let fall;

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
                                    image={element.image}

                                  />
                                <CardContent>
                                  <div name="courseNameAndDrop" style={{paddingBottom:15}}>
                                      <Typography className ={classes.displayInline} style={this.state.courseNameStyle} >
                                          {element.course_code} - {element.course_name}
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
              <br/> <br/>

              <span className = {classes.rightSpacing25} > Upload a banner image</span>
                <input
                  accept="image/*"
                  name="fileUploadInput"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  style={{display:'none'}}
                  onChange={this.handleChange.bind(this)}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span" className={classes.button} style={{marginRight:25}}>
                    Upload
                  </Button>
                </label>
                 <span style={{fontStyle:'italic'}}> {this.state.newCourseImageFileName}</span>
                  <br/> <br/>


                <Button variant="contained" onClick = {this.addNewCourse.bind(this)} className = {classes.marginAuto} color="primary">Add Course</Button>

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

                         <Grid key={i} item   onClick = {this.moveToIndividualStudentPage.bind(this, el)}>
                           <UserCard
                              cardClass='float'
                              avatar={el.image}
                              name={el.first_name}
                              positionName={el.email}

                              stats={[
                                {
                                  name: 'CGPA',
                                  value: 3.5
                                },
                                {
                                  name: 'Date of Birth',
                                  value: 'May 2, 1994'
                                }
                              ]}
                          />
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

                  <br/> <br/>

                  <span className = {classes.rightSpacing25} > Upload a banner image</span>
                    <input
                      accept="image/*"
                      name="fileUploadInputEditCourse"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      style={{display:'none'}}
                      onChange={this.handleChange.bind(this)}
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" component="span" className={classes.button} style={{marginRight:25}}>
                        Upload
                      </Button>
                    </label>
                     <span style={{fontStyle:'italic'}}> {this.state.editCourseImageFileName}</span>
                      <br/> <br/>

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
      // ADMIN INDIVIDUAL STUDENT PAGE
      if(!(this.state.isIndividualStudentPageHidden)){
        currentContent = <main style={this.state.content}>
          <div className = {classes.toolbar} />
            {
              <div style={{color:'black'}}>
                    <Card style={{width:500}}>
                      <CardContent>
                          <div name="studentNameAndImage" class="box">
                            <img style={{display:'inline-block', width:100, height:100, borderRadius:500}} src = {this.state.dataOfCurrentStudent.image} alt="studentImage"></img>
                          <div name="studText" style={{marginLeft:25}}>
                              <h1 style={{display:'inline-block', margin:0}}> {this.state.dataOfCurrentStudent.first_name}  {this.state.dataOfCurrentStudent.last_name}</h1>
                              <div> {this.state.dataOfCurrentStudent.email} </div>
                              <div> CGPA: {this.state.dataOfCurrentStudent.cgpa}</div>
                          </div>
                         </div>
                      </CardContent>
                    </Card>
                      <br/> <br/>

                      <Card style={{width:500}}>
                        <CardContent>
                          <h1 style={{display:'inline-block',marginRight:20}}> Financial Aid</h1>
                            <TextField
                                style={{display:'inline-block', width:100}}
                                id="finAidForStudent"
                                className={classes.textField}
                                value={this.state.finAidForStudent}
                                onChange={this.handleChange.bind(this)}
                                margin="normal"
                                name="finAidForStudent"
                              />
                            <Button style={{marginLeft:20}} onClick= {this.submitFinAid.bind(this, this.state.dataOfCurrentStudent.user_id)}
                              variant="contained" color="primary"> Edit</Button>

                        </CardContent>
                      </Card>
                  <br/> <br/>

                    <Card style={{width:500}}>
                      <CardContent>
                        <h1>Enrolled Courses</h1>
                          {
                            this.state.studentSchedule.map((el,i) => (
                            <div name="outerWrapper" key={i}>
                                <span className={classes.bulletpoint}>
                                    {el.course_code} - {el.course_name} <br/>
                                </span>

                                <div style={{fontStyle:'italic', marginLeft:20}}>
                                    {el.professor['first_name']} {el.professor['last_name']}
                                </div>

                            </div>
                            ))
                          }

                          {
                            this.state.studentSchedule.length ==0 &&
                            <div>
                              Not enrolled to any course!
                            </div>
                          }

                      </CardContent>
                    </Card>
              </div>
           }
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
                                       image={element.image}

                                     />
                                   <CardContent>
                                     <div name="courseNameAndDrop" style={{paddingBottom:15}}>
                                         <Typography className ={classes.displayInline} style={this.state.courseNameStyle} >
                                            {element.course_code} - {element.course_name}
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
                   style={{ margin: 8, width:700, marginRight:25 }}
                   value={this.state.searchCourseName}
                   onChange={this.wrapperForCourseSearch.bind(this)}
                   margin="normal"
                   variant="outlined"
                   name="searchCourseName"
                   InputLabelProps={{
                     shrink: true,
                   }}
                />
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-chip">Filter By Professor</InputLabel>
                  <Select
                    multiple
                    style={{width:300}}
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChangeForFilter.bind(this,this.showOnlyFilteredCourses.bind(this))}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {selected.map(value => (
                          <Chip key={value} label={value} className={classes.chip} />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {this.state.allProfessorsNames.map(name => (
                      <MenuItem key={name} value={name} style={{fontSize:11}}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


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
                                      image={element.image}

                                    />
                                  <CardContent>
                                    <div name="courseNameAndDrop" style={{paddingBottom:15}}>
                                        <Typography className ={classes.displayInline} style={this.state.courseNameStyle} >
                                          {element.course_code} - {element.course_name}
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
                          <div>
                              <FormControl required>
                                <Select
                                      value={this.state.semSelected}
                                      onChange={this.handleChange.bind(this)}
                                      name="semSelected"
                                      >
                                          {
                                            this.state.allSems.map((el,i) => (
                                              <MenuItem key={i} value={el.sem_id}>
                                                {el.name}
                                              </MenuItem>))
                                          }
                                    </Select>
                              </FormControl>

                            <IconButton color="inherit" title="Add to cart" onClick={this.addCourseToCart.bind(this, this.state.dataOfClickedCourse.course_id)} style={{float:"right"}}>
                              <AddShoppingCartIcon  />
                            </IconButton>
                        </div>
                      }
                      {
                        this.state.isThisAnEnrolledCourse &&
                        <div>
                          <IconButton color="inherit" title="Drop Course" onClick={this.dropEnrolledCourse.bind(this, this.state.dataOfClickedCourse)} style={{float:"right"}}>
                            <DeleteIcon  />
                          </IconButton>
                          <p> Semester: {this.state.dataOfClickedCourse.sem['name']}</p>
                        </div>
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
                 this.search(this.state.cartData, 'FA18') && <h2>Fall 18</h2>
              }
                {
                  this.state.cartData.length > 0 &&
                  this.state.cartData.map((el,i)=>{

                      if(el.sem['sem_name'] == 'FA18')
                      {
                        return <div key={i} name="Fall18">
                                  <Card style={this.state.cartCardStyle}
                                    >
                                  <CardContent>
                                    <div name="cartCourseAndDelete">
                                        <p className= {classes.displayInline} style={this.state.courseNameStyle} >
                                            {el.course_name}
                                        </p>
                                        <IconButton onClick={this.deleteFromCart.bind(this, el)} style={{float:"right"}}>
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
                                </Card>
                        </div>

                    } //if fall
                  }) //FALL 18 map
                }
                {
                   this.search(this.state.cartData, 'FA18') && <Button variant="contained" onClick = {this.PaymentMode.bind(this, '1')} className = {classes.marginAuto} color="primary"> Checkout</Button>
                }

                {
                   this.search(this.state.cartData, 'SP19') && <h2>Spring 19</h2>
                }

                {
                  this.state.cartData.length > 0 &&
                    this.state.cartData.map((el,i)=>{
                    if(el.sem['sem_name'] == 'SP19'){
                      return <div name="SP19">
                          <h2> Spring 19</h2>
                          <Card key={i} style={this.state.cartCardStyle}>
                          <CardContent>
                            <div name="cartCourseAndDelete">
                                <p className= {classes.displayInline} style={this.state.courseNameStyle} >
                                    {el.course_name}
                                </p>
                                <IconButton onClick={this.deleteFromCart.bind(this, el)} style={{float:"right"}}>
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
                        </Card>
                    </div>
                    }
                  }) //SPRING
                }
                {
                   this.search(this.state.cartData, 'SP19') && <Button variant="contained" onClick = {this.PaymentMode.bind(this, '2')} className = {classes.marginAuto} color="primary"> Checkout</Button>
                }

                {
                   this.search(this.state.cartData, 'SU19') && <h2>Summer 19</h2>
                }

                {
                  this.state.cartData.length > 0 &&
                    this.state.cartData.map((el,i)=>{
                    if(el.sem['sem_name'] == 'SU19'){
                      return <div name="SU19">
                          <h2> Summer 19</h2>
                          <Card key={i} style={this.state.cartCardStyle}>
                          <CardContent>
                            <div name="cartCourseAndDelete">
                                <p className= {classes.displayInline} style={this.state.courseNameStyle} >
                                    {el.course_name}
                                </p>
                                <IconButton onClick={this.deleteFromCart.bind(this, el)} style={{float:"right"}}>
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
                        </Card>

                      </div>
                    }
                  })//SUMMER
                }
                {
                   this.search(this.state.cartData, 'SU19') && <Button variant="contained" onClick = {this.PaymentMode.bind(this, '3')} className = {classes.marginAuto} color="primary"> Checkout</Button>
                }

                {
                  this.state.cartData.length == 0 &&
                  <div>
                      <h2>You have no courses in the cart yet!</h2>
                      <h3>Search for a course to enroll!</h3>
                  </div>
                }

          </main>
      }

      //-------- pay now or later --//
      if(!(this.state.isPayNowOrLaterHidden)){
        currentContent =   <main style={this.state.content}>
            <div className={classes.toolbar} />
              <h2>Payment Information</h2>
                <div style={{color:'black'}}>
                  <Card style={{padding: 10, marginBottom: 20}}>
                    <div> Cost of courses:   ${this.state.cartCost}</div>
                    <div> Financial Aid Available:   ${this.state.finanical_aid}</div>
                    <div> Late Registration Penalty:   ${this.state.lateRegPenalty}</div>
                    <div style={{fontWeight: "bold"}}> Total Amount to be paid:   ${this.state.netAmount}</div>
                  </Card>
                    <Button style={{marginRight:20}} variant="contained" onClick = {this.goToPaymentPortal.bind(this)} className = {classes.marginAuto} color="primary"> Pay Now </Button>
                    <Button variant="contained" onClick = {this.goToHomePage.bind(this)} className = {classes.marginAuto} color="primary"> Pay Later </Button>

              </div>
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

// Hit checkout from cart and lands here...
else if(!(this.state.isPaymentModeCardHidden))
{
  currentContent=
    <main style={this.state.content}>
        <div className={classes.toolbar} />
          <div className={classes.root}>
            {
              this.state.netAmount != 0 &&
              <div name="checkIfNetAmount">
                <div style={{marginRight:25, display:'inline-block'}}>
                  <Paper className={classes.rootTable}>
                     <Table className={classes.table}>
                       <TableHead>
                         <TableRow>
                           <TableCell> Item</TableCell>
                           <TableCell>Amount</TableCell>
                         </TableRow>
                       </TableHead>

                       <TableBody>
                             <TableRow key={1}>
                               <TableCell component="th" scope="row">
                                 Cost of Courses enrolled
                               </TableCell>
                               <TableCell >  ${this.state.cartCost}</TableCell>
                             </TableRow>

                             <TableRow key={2}>
                               <TableCell component="th" scope="row">
                                 Late Registration Penalty
                               </TableCell>
                               <TableCell >  ${this.state.lateRegPenalty}</TableCell>
                             </TableRow>

                             <TableRow key={3}>
                               <TableCell component="th" scope="row">
                                 Late Fee Payment Penalty
                               </TableCell>
                               <TableCell>  ${this.state.latePayPenalty}</TableCell>
                             </TableRow>

                             <TableRow key={4}>
                               <TableCell component="th" scope="row">
                                 Financial Aid
                               </TableCell>
                               <TableCell >  -${this.state.finanical_aid}</TableCell>
                             </TableRow>

                             <TableRow key={5}>
                               <TableCell style={{fontWeight:"bold"}}component="th" scope="row">
                                 Total Amount to be paid
                               </TableCell>
                               <TableCell style={{fontWeight:"bold"}} >  ${this.state.netAmount}</TableCell>
                             </TableRow>
                       </TableBody>
                     </Table>
                   </Paper>
            </div>

                <div name="paymentOptions" style={{display: "inline", marginLeft: 35}}>
                  <FormControl component="fieldset" className={classes.formControl}>
                            <h2>Payment Mode</h2>
                              <RadioGroup
                                aria-label="payRadio"
                                name="payRadio"
                                className={classes.group}
                                value={this.state.payRadio}
                                onChange={this.handleChange.bind(this)}>

                                    <FormControlLabel  value="1" control={<Radio color="primary" checked = {this.state.payRadio==="1"} />} label="Credit Card" />
                                    <FormControlLabel  value="2" control={<Radio color="primary" checked = {this.state.payRadio==="2"}  />} label="eCheck" />
                                    <FormControlLabel  value="3" control={<Radio color="primary" checked = {this.state.payRadio==="3"}  />} label="Coupon" />

                              </RadioGroup>

                              {
                                this.state.payRadio != 0 &&
                                <div name="details">
                                  <TextField
                                      id="Details"
                                      type="text"
                                      label="Number"
                                      className={classes.textField}
                                      value={this.state.Details}
                                      onChange={this.handleChange.bind(this)}
                                      margin="normal"
                                      name="Details"
                                    />
                                  <Button variant="contained" style={{marginTop: 25, marginLeft: 25}} onClick = {this.payFee.bind(this)} className = {classes.marginAuto}  color="primary">Pay</Button>
                                </div>
                              }
                          </FormControl>
                  </div>

            </div>
          }

          {
            this.state.netAmount == 0 &&
            <h2> You have no outstanding balances! </h2>
          }
            </div>
          </main>
}

// Finished paying fees..download receipt
else if(!(this.state.isfeeReceiptPageHidden))
{
  currentContent =   <main style={this.state.content}>
    <div className={classes.toolbar} />
          <h2>Your Receipt</h2>
            <Paper className={classes.rootTable}>
               <Table className={classes.table}>
                 <TableHead>
                   <TableRow>
                     <TableCell> Item</TableCell>
                     <TableCell>Amount</TableCell>
                   </TableRow>
                 </TableHead>

                 <TableBody>
                       <TableRow key={1}>
                         <TableCell component="th" scope="row">
                           Cost of Courses enrolled
                         </TableCell>
                         <TableCell >  ${this.state.cartCost}</TableCell>
                       </TableRow>

                       <TableRow key={2}>
                         <TableCell component="th" scope="row">
                           Late Registration Penalty
                         </TableCell>
                         <TableCell >  ${this.state.lateRegPenalty}</TableCell>
                       </TableRow>

                       <TableRow key={3}>
                         <TableCell component="th" scope="row">
                           Late Fee Payment Penalty
                         </TableCell>
                         <TableCell>  ${this.state.latePayPenalty}</TableCell>
                       </TableRow>

                       <TableRow key={4}>
                         <TableCell component="th" scope="row">
                           Financial Aid
                         </TableCell>
                         <TableCell >  -${this.state.finanical_aid}</TableCell>
                       </TableRow>

                       <TableRow key={5}>
                         <TableCell style={{fontWeight:"bold"}}component="th" scope="row">
                           Total Amount
                         </TableCell>
                         <TableCell style={{fontWeight:"bold"}} >  ${this.state.netAmount}</TableCell>
                       </TableRow>
                 </TableBody>
               </Table>
             </Paper>
             <Button variant="contained" style={{marginRight:25}} onClick = {this.sendEmailReceipt.bind(this)} className = {classes.marginAuto}  color="primary">Email Receipt</Button>
             <Button variant="contained" onClick = {this.downloadPDF.bind(this)} className = {classes.marginAuto}  color="primary">Download PDF</Button>
  </main>
}

// Individual profile page @author: Kriti shree
else if(!(this.state.isStudentDetailsFormHidden))
{
    currentContent =  <main style={this.state.content}>
      <div className={classes.toolbar} />
        <div>
          <Card className={classes.myProfileCard}>
              <CardContent>
              <div>
              <Typography class='login-page-headers' color="primary">
                Your Details
              </Typography>

                 <InputLabel style={{marginRight:10}} htmlFor="personalFN">First Name</InputLabel>
                     <Input
                       id="personalFN"
                       name="personalFN"
                       value={this.state.personalFN}
                       label='First Name'
                       onChange={this.handleChange.bind(this)}

                       style={{marginRight:25}}
                     />

                   <InputLabel style={{marginRight:10}} htmlFor="personalMN">Middle Name</InputLabel>
                     <Input
                       id="personalMN"
                       name="personalMN"
                       value={this.state.personalMN}
                       label='Middle Name'
                       onChange={this.handleChange.bind(this)}
                      style={{marginRight:25}}
                     />


                   <InputLabel style={{marginRight:10}} htmlFor="personalLN">Last Name</InputLabel>
                     <Input
                       id="personalLN"
                       name="personalLN"
                       value={this.state.personalLN}
                       label='Last Name'
                       onChange={this.handleChange.bind(this)}
                     />

                   <br/>
                   <TextField
                       id="personalDOB"
                       name="personalDOB"
                       label="Birthday"
                       type="date"
                       value={this.state.personalDOB}
                       className={classes.textField}
                       InputLabelProps={{
                         shrink: true,
                       }}
                        onChange={this.handleChange.bind(this)}
                          style={{marginRight:145, marginTop:25}}
                     />

                      <TextField
                        id="personalEmail"
                        type="email"
                        name="personalEmail"
                        label="Email"
                        className={classes.textField}
                        style={{marginTop:25}}
                        value={this.state.personalEmail}
                        InputLabelProps={{
                        shrink: true,
                        }}
                         onChange={this.handleChange.bind(this)}
                        />
                        <br/><br/>

                          <InputLabel htmlFor="personalGender" style={{marginRight:15}}>Gender</InputLabel>
                            <Select
                              value={this.state.personalGender}
                              onChange={this.handleChange.bind(this)}
                              name="personalGender"
                              id="personalGender"
                              style={{marginRight:175,marginTop:17}}

                            >
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                              <MenuItem value="Others">Others</MenuItem>
                          </Select>

                        <TextField

                        label="Mobile Number"
                        id="personalMob"
                        name="personalMob"
                        value={this.state.personalMob}
                        className={classes.textField}
                         onChange={this.handleChange.bind(this)}
                        />

<br/>

                        <TextField
                        style={{marginTop:25}}
                        label="Program"
                        id="personalProg"
                        name="personalProg"
                        value={this.state.personalProg}
                        className={classes.textField}
                         onChange={this.handleChange.bind(this)}
                        />
<br/>
                        <TextField
                         id="personalPermAddr"
                         name="personalPermAddr"
                         label="Permanent Address"
                         multiline
                         rows="4"
                         value={this.state.personalPermAddr}
                         className={classes.textField}
                        onChange={this.handleChange.bind(this)}
                          style={{marginRight:25, marginTop:25}}

                        />

                            <TextField
                              id="personalTempAddr"
                              name="personalTempAddr"
                             label="Temporary Address"
                             multiline
                             rows="4"
                             value={this.state.personalTempAddr}
                             className={classes.textField}
                             onChange={this.handleChange.bind(this)}
                             style={{marginLeft:105, marginTop:25}}

                            />
<br/><br/>

          <span className = {classes.rightSpacing25} > Upload a profile image</span>
            <input
              accept="image/*"
              name="PersonalfileUploadInput"
              className={classes.input}
              id="contained-button-file"
              type="file"
              style={{display:'none'}}
              onChange={this.handleChange.bind(this)}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" className={classes.button} style={{marginRight:25}}>
                Upload
              </Button>
            </label>
             <span style={{fontStyle:'italic'}}> {this.state.personalImageFileName}</span>
              <br/><br/>
                  <Button variant="outlined"  onClick={this.submitPersonalDetails.bind(this)}  className = {classes.marginBottom}  color="primary">Submit</Button>
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
                                    <img src = {this.state.personalImageURL} alt="Your photo"/>
                                  </div>

                                  <div class="back">
                                    <span> CGPA: {this.state.personalCGPA}</span>
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

                         <ListItem button onClick={this.handleMenuItemClick.bind(this, "payment")}>
                          <ListItemIcon style={this.state.navDrawerIcon}>
                            <AttachMoneyIcon />
                          </ListItemIcon>
                          <ListItemText {...drawerTextColor} style={this.state.navDrawerIcon} class="drawerFont" primary="Payment Portal" />
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
                                       image={element.image}

                                     />
                                   <CardContent>
                                     <div name="courseNameAndDrop" style={{paddingBottom:15}}>
                                         <Typography className ={classes.displayInline} style={this.state.courseNameStyle} >
                                            {element.course_code} - {element.course_name}
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
                  style={{ margin: 8, width:700, marginRight:25 }}
                   value={this.state.searchCourseName}
                   onChange={this.wrapperForCourseSearch.bind(this)}
                   margin="normal"
                   variant="outlined"
                   name="searchCourseName"
                   InputLabelProps={{
                     shrink: true,
                   }}
                />

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-multiple-chip">Filter By Professor</InputLabel>
                  <Select
                    multiple
                    style={{width:300}}
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChangeForFilter.bind(this,this.showOnlyFilteredCourses.bind(this))}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {selected.map(value => (
                          <Chip key={value} label={value} className={classes.chip} />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {this.state.allProfessorsNames.map(name => (
                      <MenuItem key={name} value={name} style={{fontSize:11}}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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
                                      image={element.image}

                                    />
                                  <CardContent>
                                    <div name="courseNameAndDrop" style={{paddingBottom:15}}>
                                        <Typography className ={classes.displayInline} style={this.state.courseNameStyle} >
                                            {element.course_code} - {element.course_name}
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
                      <div name="outerWrapper" key={i} style={{marginBottom:50}}>
                         <div name="commenterAndStars" style={{display:'inline-block', verticalAlign:'middle', width:200}}>

                                <div name="commenter"  style={{paddingRight:10, display:'inline-block'}}>
                                  <img src={el.image} style={{height:30, width:30, borderRadius:500, marginRight:10, verticalAlign:'middle'}} alt="Image"/>
                                  <span name="name">{el.first_name} {el.last_name}</span>
                                </div>
                                <br />
                                <div name="stars" >
                                  <StarRatings
                                    rating={el.rating}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    starDimension="15px"
                                    starSpacing="1px"
                                    />
                                </div>
                                <div name = 'semester'>
                                  {el.sem_id == 1 && <span> Fall 18</span>}
                                  {el.sem_id == 2 && <span> Spring 19</span>}
                                  {el.sem_id == 3 && <span> Summer 19</span>}
                                </div>
                            </div>

                            <span name="commentGiven" style={{fontStyle:'italic'}} >
                              {el.comment}
                            </span>
                              <Divider style={{marginTop:10}} />
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
                    <h1> Students roster and grades</h1>
                      {
                        this.state.studentsEnrolledForCourse.length > 0 &&
                        this.state.studentsEnrolledForCourse.map((el,i) => (
                          <div key={i}>
                              <div name="enrolledStudentsDiv" style={{width:200, display:'inline-block'}}>
                                <span className={classes.bulletpoint} name="name">{el.first_name} {el.last_name}</span>
                              </div>
                              <div name="gpa" style={{display:'inline-block'}}>
                                <TextField
                                    id="courseGPA"
                                    className={classes.textField}
                                    helperText={"Current GPA: " + el.gpa}
                                    value={this.state.courseGPA}
                                    onChange={this.handleChange.bind(this)}
                                    name="courseGPA"
                                    style={{width:95}}
                                  />
                                <IconButton style={{marginLeft:20, color:'green'}} onClick = {this.submitGPA.bind(this, el)}
                                    >
                                      <DoneIcon title='Update Grade'/>
                                    </IconButton>
                              </div>
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


      // Individual profile page FOR PROFESSOR @author: Kriti shree
      else if(!(this.state.isStudentDetailsFormHidden))
      {
          currentContent =  <main style={this.state.content}>
            <div className={classes.toolbar} />
              <div>
                <Card className={classes.myProfileCard}>
                    <CardContent>
                    <div>
                    <Typography class='login-page-headers' color="primary">
                      Your Details
                    </Typography>

                       <InputLabel style={{marginRight:10}} htmlFor="personalFN">First Name</InputLabel>
                           <Input
                             id="personalFN"
                             name="personalFN"
                             value={this.state.personalFN}
                             label='First Name'
                             onChange={this.handleChange.bind(this)}

                             style={{marginRight:25}}
                           />

                         <InputLabel style={{marginRight:10}} htmlFor="personalMN">Middle Name</InputLabel>
                           <Input
                             id="personalMN"
                             name="personalMN"
                             value={this.state.personalMN}
                             label='Middle Name'
                             onChange={this.handleChange.bind(this)}
                            style={{marginRight:25}}
                           />


                         <InputLabel style={{marginRight:10}} htmlFor="personalLN">Last Name</InputLabel>
                           <Input
                             id="personalLN"
                             name="personalLN"
                             value={this.state.personalLN}
                             label='Last Name'
                             onChange={this.handleChange.bind(this)}
                           />

                         <br/>
                         <TextField
                             id="personalDOB"
                             name="personalDOB"
                             label="Birthday"
                             type="date"
                             value={this.state.personalDOB}
                             className={classes.textField}
                             InputLabelProps={{
                               shrink: true,
                             }}
                              onChange={this.handleChange.bind(this)}
                                style={{marginRight:145, marginTop:25}}
                           />

                            <TextField
                              id="personalEmail"
                              type="email"
                              name="personalEmail"
                              label="Email"
                              className={classes.textField}
                              style={{marginTop:25}}
                              value={this.state.personalEmail}
                              InputLabelProps={{
                              shrink: true,
                              }}
                               onChange={this.handleChange.bind(this)}
                              />
                              <br/><br/>

                                <InputLabel htmlFor="personalGender" style={{marginRight:15}}>Gender</InputLabel>
                                  <Select
                                    value={this.state.personalGender}
                                    onChange={this.handleChange.bind(this)}
                                    name="personalGender"
                                    id="personalGender"
                                    style={{marginRight:175,marginTop:17}}

                                  >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </Select>

                              <TextField

                              label="Mobile Number"
                              id="personalMob"
                              name="personalMob"
                              value={this.state.personalMob}
                              className={classes.textField}
                               onChange={this.handleChange.bind(this)}
                              />

      <br/>

                              <TextField
                              style={{marginTop:25}}
                              label="School"
                              id="personalProg"
                              name="personalProg"
                              value={this.state.personalProg}
                              className={classes.textField}
                               onChange={this.handleChange.bind(this)}
                              />
      <br/>
                              <TextField
                               id="personalPermAddr"
                               name="personalPermAddr"
                               label="Permanent Address"
                               multiline
                               rows="4"
                               value={this.state.personalPermAddr}
                               className={classes.textField}
                              onChange={this.handleChange.bind(this)}
                                style={{marginRight:25, marginTop:25}}

                              />

                                  <TextField
                                    id="personalTempAddr"
                                    name="personalTempAddr"
                                   label="Temporary Address"
                                   multiline
                                   rows="4"
                                   value={this.state.personalTempAddr}
                                   className={classes.textField}
                                   onChange={this.handleChange.bind(this)}
                                   style={{marginLeft:105, marginTop:25}}

                                  />
      <br/><br/>

                <span className = {classes.rightSpacing25} > Upload a profile image</span>
                  <input
                    accept="image/*"
                    name="PersonalfileUploadInput"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    style={{display:'none'}}
                    onChange={this.handleChange.bind(this)}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" className={classes.button} style={{marginRight:25}}>
                      Upload
                    </Button>
                  </label>
                   <span style={{fontStyle:'italic'}}> {this.state.personalImageFileName}</span>
                    <br/><br/>
                        <Button variant="outlined"  onClick={this.submitPersonalDetails.bind(this)}  className = {classes.marginBottom}  color="primary">Submit</Button>
                        <ToastContainer position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore}/>
                       </div>
                    </CardContent>
                </Card>
                </div >
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
                  <div style={{display:"inline-block", width:"80%"}}>
                    <section class="profile">
                        <figure>
                          <div >
                            <img src = {this.state.personalImageURL} alt="Your photo"/>
                          </div>

                          </figure>
                      </section>
                      </div>

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
