import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Card } from "react-native-elements";

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
