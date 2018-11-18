import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import WhosOnlineList from './components/WhosOnlineList'

class PersonalChatList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {}
    }

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
        return currentUser.subscribeToRoom({
          roomId: "19420562",
          messageLimit: 100,
          hooks: {
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
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
      },
      chatContainer: {
        display: 'flex',
        flex: 1,
      },
      whosOnlineListContainer: {
        flex: 'none',

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
          <div style={styles.whosOnlineListContainer}>

            <WhosOnlineList
                 navigateToPersonalChatPage = {this.props.pageChanger}            
                isThisForPersonalChatList = {this.props.isThisPersonalChatList}
                currentUser={this.state.currentUser}
                users={this.state.currentRoom.users}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default PersonalChatList;
