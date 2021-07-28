import React, { Component } from "react";
import { FlatList, Image, View } from "react-native";
// import { StyleSheet, Text } from "react-native";
// import { ListItem } from "react-native-elements";
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
    const { navigate } = this.props.navigation;
    const dimensions = Dimensions.get("window");
    const imageHeight = dimensions.width / 680;
    const imageWidth = dimensions.width;
    const renderHotMemesItem = ({ item }) => {
      return (
        // <ListItem
        //   title={item.name}
        //   onPress={() => navigate("Comments", { hotMemeId: item.id })}
        //   leftAvatar={{ source: require("./images/memelord.jpg") }}
        // />
        //     <ListItem onPress={() => navigate("Comments", { hotMemeId: item.id })}>
        //       <ListItem.Content>
        //         <ListItem.Title>{item.name}</ListItem.Title>
        //         <View style={styles.subtitleView}>
        //           <Image
        //             source={require("./images/memelord.jpg")}
        //             style={styles.ratingImage}
        //           />
        //         </View>
        //       </ListItem.Content>
        //     </ListItem>
        //   );
        // };
        // styles = StyleSheet.create({
        //   subtitleView: {
        //     flexDirection: "row",
        //     paddingLeft: 10,
        //     paddingTop: 5,
        //   },
        //   ratingImage: {
        //     height: 19.21,
        //     width: 100,
        //   },
        //   ratingText: {
        //     paddingLeft: 10,
        //     color: "grey",
        //   },
        // });
        <View
          // onPress={() => navigate("Comments", { hotMemeId: item.id })}
          style={{ marginTop: 50 }}
        >
          <Text
            h3
            style={{
              color: "#004080",
              textAlign: "center",
              // fontFamily: "sans-serif",
            }}
            onPress={() => navigate("Comments", { hotMemeId: item.id })}
          >
            {item.name}
          </Text>
          <Divider />
          <Image
            source={require("./images/soup.png")}
            style={{ height: 727 * imageHeight, width: imageWidth }}
            onPress={() => navigate("Comments", { hotMemeId: item.id })}
          />
          <Button
            title="comments"
            type="outline"
            width="50"
            onPress={() => navigate("Comments", { hotMemeId: item.id })}
          />

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
