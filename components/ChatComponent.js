import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";


class Chat extends Component {
  static navigationOptions = {
    title: "Chat",
  };
  render() {
    return (
      <ScrollView>
        <Card wrapperStyle={{ margin: 20 }} title={"Chat placebo info"}>
          <Text>chat 1</Text>
          <Text>chat 2</Text>
        </Card>
        <Card wrapperStyle={{ margin: 20 }} >
          <Text>chat 1</Text>
          <Text>chat 2</Text>
        </Card>
      </ScrollView>
    );
  }
}

export default Chat;