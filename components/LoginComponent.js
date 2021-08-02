import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";

class LogIn extends Component {
  static navigationOptions = {
    title: "Log In",
  };
  render() {
    return (
      <ScrollView>
        <Card wrapperStyle={{ margin: 20 }} title={" placebo info"}>
          <Text>Log In</Text>
        </Card>
        <Card wrapperStyle={{ margin: 20 }} title={" placebo info"}>
          <Text>Sign Up</Text>
        </Card>
      </ScrollView>
    );
  }
}
export default LogIn;