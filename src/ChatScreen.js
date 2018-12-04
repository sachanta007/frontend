import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'

const axios = require('axios');

class ChatScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
      personalRoomObj: {},
      accessTokenForPrivateChat: '',
      roomToJoin:''
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }

  sendTypingEvent() {
      this.state.currentUser
        .isTypingIn({ roomId: this.state.currentRoom.id })
        .catch(error => console.error('error', error))
    }

  sendMessage(text) {
      this.state.currentUser.sendMessage({
        text,
        roomId: this.state.currentRoom.id,
      })
    }

 /// gets all rooms for curr user
    getAllRooms(){
      console.log("HITTING THE BELOW LINK WITH GET");
      console.log('https://us1.pusherplatform.io/services/chatkit/v2/1a111cfa-e268-4391-84a5-484c7faccc84/users/'+this.state.currentUser.id+'/rooms?joinable=false');
      return axios({
        method:'get',
        url:'https://us1.pusherplatform.io/services/chatkit/v2/1a111cfa-e268-4391-84a5-484c7faccc84/users/'+this.state.currentUser.id+'/rooms?joinable=false',
        headers: {'Authorization': 'Bearer '+this.state.accessTokenForPrivateChat}
      })
      .then((response)=>{
        console.log("GET ALL ROOMS FINISHED!!!!",response.data, this.state.currentUser.id);
          return(response.data)
      });
    }

    //if a room already exists return that ID
    getWhichRoomToJoin(roomData, callback){
      console.log('roooms',roomData);
          for(let item of roomData){ //remove public room
            if(item.id == "19494079" || item.id == "19420562"){
              console.log("Popping public room at index......",roomData.indexOf(item));
              roomData.splice(roomData.indexOf(item),1)
              console.log("Popped",roomData);
            }
          }
          console.log("Check for matching rooms in", roomData);
          // If theres already a room where currentUser is a member, that means somebody else added
          // him to a private chat session..we need to get THAT ROOMS ID!!!
          for(let item of roomData){
            if(item.member_user_ids.includes(this.state.currentUser.id)){
              console.log("MATCH FOUND", item);
              this.setState({roomToJoin: item.id})
              console.log("Room to join now....",this.state.roomToJoin);
            }
          }
          console.log("final room to join before return",this.state.roomToJoin);
          callback();
    }

    // if a room with that person already exists, directly subscribe
    // otherwise, create a room and subscribe
    subscriptionToARoom(){
      console.log("GOT INSIDE THE CALLBACK!!!! YAAAAAAY!!!");

      if(this.state.roomToJoin != ''){
        console.log("ROOM EXISTS WITH CURRENT USER!!!!!!",this.state.roomToJoin);
        return this.state.currentUser.subscribeToRoom({
          roomId: this.state.roomToJoin,
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message],
              })
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
             })
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                ),
              })
            },
            onPresenceChange: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate(),
          }, // hooks end
        }) // subscribeToRoom ends
          .then(currentRoom => {
            this.setState({ currentRoom })
           })
         .catch(error => console.error('error', error))
      }

      //create a new room and add the guy you wanna chat with to it!!!!
      else{
        console.log("ROOM TO JOIN IS EMPTY",this.state.roomToJoin);
        this.state.currentUser.createRoom({
            name: 'privateChatSession',
            addUserIds: [this.props.chatWith],
            }).then(room => {
              console.log("Created a new room SUCCESSFULLY",room);

                return this.state.currentUser.subscribeToRoom({
                  roomId: room.id,
                  messageLimit: 100,
                  hooks: {
                    onMessage: message => {
                      this.setState({
                        messages: [...this.state.messages, message],
                      })
                    },
                    onUserStartedTyping: user => {
                      this.setState({
                        usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                     })
                    },
                    onUserStoppedTyping: user => {
                      this.setState({
                        usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                          username => username !== user.name
                        ),
                      })
                    },
                    onPresenceChange: () => this.forceUpdate(),
                    onUserJoined: () => this.forceUpdate(),
                  }, //hooks
                }) // subscribe to room
                .then(currentRoom =>{
                    this.setState({ currentRoom })
                })   //then currentroom ends
            }) //then room ends
            .catch(err => {
              console.log(`Error creating room ${err}`)
            })
          } // else ends -- create new pvt room
    }

  componentDidMount () {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:1a111cfa-e268-4391-84a5-484c7faccc84',
      userId: sessionStorage.getItem('user_email'),
      tokenProvider: new Chatkit.TokenProvider({
        url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1a111cfa-e268-4391-84a5-484c7faccc84/token?user_id='+sessionStorage.getItem('user_email'),
      }),
    })
    var isPersonalChat = this.props.chatWith; //has ID of who you wanna chat personally with

    // Go to group chat room
    if(!isPersonalChat){
        chatManager
          .connect()
          .then(currentUser => {
            this.setState({ currentUser })
            return currentUser.subscribeToRoom({
              roomId: "19494079",
              messageLimit: 100,
              hooks: {
                onMessage: message => {
                  this.setState({
                    messages: [...this.state.messages, message],
                  })
                },
                onUserStartedTyping: user => {
                  this.setState({
                    usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                 })
                },
                onUserStoppedTyping: user => {
                  this.setState({
                    usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                      username => username !== user.name
                    ),
                  })
                },
                onPresenceChange: () => this.forceUpdate(),
                onUserJoined: () => this.forceUpdate(),
              },
            })
          })
          .then(currentRoom => {
            this.setState({ currentRoom })
           })
         .catch(error => console.error('error', error))
   }

   // Private chat room
   else{
     //Get accessToken for api request
     axios({
       method:'post',
       url:'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/1a111cfa-e268-4391-84a5-484c7faccc84/token?user_id='+sessionStorage.getItem('user_email'),
     })
     .then((response) => {
       this.setState({accessTokenForPrivateChat: response.data.access_token})
     });

     chatManager
       .connect()
       .then(currentUser => {
                 this.setState({ currentUser })
                  //GET ALL ROOMS for current user
                  this.getAllRooms()
                  .then((roomData)=>{
                      this.getWhichRoomToJoin(roomData, this.subscriptionToARoom.bind(this))
                  }) //getAllRooms ends

       }) // first then for currentUser
      .catch(error => console.error('error', error))

   } //else ends
 } //componentDidMount ends

  render() {
      const styles = {
      container: {
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
      },
      whosOnlineListContainer: {
        width: '200px',
        flex: 'none',
        padding: 20,
        backgroundColor: 'rgb(44, 93, 170)',
        color: 'white',
      },
      chatListContainer: {
        padding: 20,
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
      },
   }

    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <h2> Online</h2>
            <WhosOnlineList
                currentUser={this.state.currentUser}
                users={this.state.currentRoom.users}
              />
          </aside>
          <section style={styles.chatListContainer}>
            <MessageList
              messages={this.state.messages}
              style={styles.chatList}
             />
           <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
           <SendMessageForm onSubmit={this.sendMessage}
             onChange={this.sendTypingEvent}/>
          </section>
        </div>
      </div>
    )
  } //render
} //class

export default ChatScreen;
