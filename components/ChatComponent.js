import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";


class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }
  static navigationOptions = {
    title: "Chat",
  };
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{

        }}
        showAvatarForEveryMessage={true}
      />
    );
  }
}

export default Chat;
