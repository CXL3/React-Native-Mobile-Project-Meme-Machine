import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";

class Upload extends Component {
  static navigationOptions = {
    title: "Upload",
  };
  render() {
    return (
      <ScrollView>
        <Card wrapperStyle={{ margin: 20 }} title={"Upload meme placebo info"}>
          <Text>title</Text>
          <Text>picture</Text>
        </Card>
      </ScrollView>
    );
  }
}

export default Upload;