import React, { Component } from 'react'
 class WhosOnlineList extends Component {

     constructor(props) {
       super(props);
     }

  renderUsers() {
    return (
      <ul>
        {
          this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <WhosOnlineListItem key={index} presenceState="online">
                {user.name} (You)
              </WhosOnlineListItem>
            )
          }
          return (
            <WhosOnlineListItem key={index} presenceState={user.presence.state}>
              {user.name}
            </WhosOnlineListItem>
          )
        })
      }
      </ul>
    )
  }

// Does not have list item for logged in user
  renderUsersForPersonalChatList() {
    return (
      <ul>
        {
          this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return([])
          }
          return (
            <div onClick={this.whoThis.bind(this,user)} key={index} presenceState={user.presence.state}>
              {user.name}
            </div>
          )
        })
      }
      </ul>
    )
  }

whoThis(user){
  console.log("Going to private with", user.id);
  sessionStorage.setItem('personal_chat_with',user.id);
  this.props.navigateToPersonalChatPage()
  
}
   render() {
       var isThisForPersonalChatList = this.props.isThisForPersonalChatList;
       if(!isThisForPersonalChatList){
            if (this.props.users) {
              return this.renderUsers()
            } else {
              return <p>Loading...</p>
            }
        }
       else{
         if(this.props.users){
           return this.renderUsersForPersonalChatList()
         }
         else{
           return <p>Loading...</p>
         }
       }
   }
}
 class WhosOnlineListItem extends Component {

  render() {
    const styles = {
      li: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 2,
        paddingBottom: 2,
      },
      div: {
        borderRadius: '50%',
        width: 11,
        height: 11,
        marginRight: 10,
      },
    }
    return (
      <li style={styles.li}>
        <div
          style={{
            ...styles.div,
            backgroundColor:
              this.props.presenceState === 'online' ? '#539eff' : '#414756',
          }}
        />
        {this.props.children}
      </li>
    )
  }
}
 export default WhosOnlineList;
