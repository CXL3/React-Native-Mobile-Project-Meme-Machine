import React, { Component } from "react";
import { FlatList, Image, View } from "react-native";
import { HOTMEMES } from "../shared/hotMemes";
import { Dimensions } from "react-native";
import { Divider, Text, Button } from "react-native-elements";

class PopularMemes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotMemes: HOTMEMES,
    };
  }
  static navigationOptions = {
    title: "Popular Memes",
  };
  render() {
    // const { navigate } = this.props.navigation;
    const dimensions = Dimensions.get("window");
    const imageHeight = dimensions.width / 680;
    const imageWidth = dimensions.width;
    const renderHotMemesItem = ({ item }) => {
      return (
        <View style={{ marginTop: 50 }}>
          <Text
            h3
            style={{
              color: "#004080",
              textAlign: "center",
              // fontFamily: "sans-serif",
            }}
          >
            {item.name}
          </Text>
          <Divider />
          <Image
            source={require("./images/soup.png")}
            style={{ height: 727 * imageHeight, width: imageWidth }}
          />

          <Button title="comments" type="outline" width="50" />

          <Divider style={{ width: 500 }} />
        </View>
      );
    };

    return (
      <FlatList
        data={this.state.hotMemes}
        renderItem={renderHotMemesItem}
        keyExtractor={(hotMeme) => hotMeme.id.toString()}
      />
    );
  }
}

export default PopularMemes;
