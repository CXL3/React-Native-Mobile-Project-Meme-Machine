import React, { Component } from "react";
import { FlatList, StyleSheet, } from "react-native";
// import { StyleSheet, Text } from "react-native";
// import { ListItem } from "react-native-elements";

// import { Dimensions } from "react-native";
import { Button, Card, CardImage } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";


const mapStateToProps = (state) => {
  return {
    hotMemes: state.hotMemes,
  };
};

class PopularMemes extends Component {
  static navigationOptions = {
    title: "Popular Memes",
  };
  render() {
    const { navigate } = this.props.navigation;
    // const dimensions = Dimensions.get("window");
    // const imageHeight = dimensions.width / 680;
    // const imageWidth = dimensions.width;
    const renderHotMemesItem = ({ item }) => {
      return (
        <Card>
          <Card.Title style={{fontSize :25}}
            onPress={() => navigate("Comments", { hotMemeId: item.id })}
          >
            {item.name}
          </Card.Title>
          <Card.Image
            style={styles.imageStyle}
            source={{ uri: baseUrl + item.image }}
            onPress={() => navigate("Comments", { hotMemeId: item.id })}
          ></Card.Image>
          <Button
            title="comments"
            type="outline"
            width="50"
            onPress={() => navigate("Comments", { hotMemeId: item.id })}
          />
        </Card>
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

        // <View
        //   // onPress={() => navigate("Comments", { hotMemeId: item.id })}
        //   style={{ marginTop: 50 }}
        // >
        //   <Text
        //     h3
        //     style={{
        //       color: "#004080",
        //       textAlign: "center",
        //       // fontFamily: "sans-serif",
        //     }}
        //     onPress={() => navigate("Comments", { hotMemeId: item.id })}
        //   >
        //     {item.name}
        //   </Text>
        //   <Divider />
        //   <Image
        //     source={require("./images/soup.png")}
        //     style={{ height: 727 * imageHeight, width: imageWidth }}
        //     onPress={() => navigate("Comments", { hotMemeId: item.id })}
        //   />
        //   <Button
        //     title="comments"
        //     type="outline"
        //     width="50"
        //     onPress={() => navigate("Comments", { hotMemeId: item.id })}
        //   />

        //   <Divider style={{ width: 500 }} />
        // </View>
      );
    };

    return (
      <FlatList
        data={this.props.hotMemes.hotMemes}
        renderItem={renderHotMemesItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}
const styles = StyleSheet.create({
  imageStyle: {
    width: null,
    flex: 1,
    height: 300,
  },
});
export default connect(mapStateToProps)(PopularMemes);
