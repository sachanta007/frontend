import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'

class ChatScreen extends Component {

  constructor(props) {
    Function.prototype.toJSON = function() { return "Unstorable function" }
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: []
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

  componentDidMount () {
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

        this.setState({ currentUser })
        console.log("THIS IS CHAT OBJECT",currentUser)
        return currentUser.subscribeToRoom({
          roomId: "19420562",
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

  render() {
      const styles = {
      container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
      },
      whosOnlineListContainer: {
        width: '300px',
        flex: 'none',
        padding: 20,
        backgroundColor: '#2c303b',
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
  }
}

export default ChatScreen;
