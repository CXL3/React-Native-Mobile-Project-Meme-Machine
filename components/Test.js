//I am trying different layout for the font page. issue is the item.image doesn't load.

import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { HOTMEMES } from "../shared/hotMemes";

function RenderhotItem({ item }) {
  if (item) {
    return (
      <Card title={item.name} image={item.image}>
          {/* image={require("./images/memelord.jpg") */}
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  }
  return <View />;
}

class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotMemes: HOTMEMES,
    };
  }
  render() {
    return (
      <ScrollView>
        <RenderhotItem
          item={this.state.hotMemes.filter((hotMemes) => hotMemes.featured)[0]}
        />
      </ScrollView>
    );
  }
}

export default Directory;
