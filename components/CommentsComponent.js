import React, { Component } from "react";
import { Text, View } from "react-native";
import { Card, Image } from "react-native-elements";
import { HOTMEMES } from "../shared/hotMemes";

function RenderComments({ hotMeme }) {
  if (hotMeme) {
    return (
      <Card>
        <Card.Title>{hotMeme.name}</Card.Title>
        <Card.Divider />
        <Card.Image source={require("./images/soup.png")}></Card.Image>
        {/* <Image source={require("./images/soup.png")}></Image> */}
        <Text style={{ margin: 10 }}>{hotMeme.comments}</Text>
      </Card>
    );
  }
  return <View />;
}
class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotMemes: HOTMEMES,
    };
  }
  static navigationOptions = {
    title: "Comments",
  };
  render() {
    const hotMemeId = this.props.navigation.getParam("hotMemeId");
    const hotMeme = this.state.hotMemes.filter(
      (hotMeme) => hotMeme.id === hotMemeId
    )[0];
    return <RenderComments hotMeme={hotMeme} />;
  }
}

export default Comments;
