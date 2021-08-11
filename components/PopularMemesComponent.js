import React, { Component } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
// import { StyleSheet, Text } from "react-native";
// import { ListItem } from "react-native-elements";

// import { Dimensions } from "react-native";
import { Card, Icon, Divider } from "react-native-elements";
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
          <Card.Title
            style={styles.cardText}
            onPress={() => navigate("Comments", { hotMemeId: item.id })}
          >
            {item.name}
          </Card.Title>
          <Card.Image
            style={styles.imageStyle}
            source={{ uri: baseUrl + item.image }}
            resizeMode="contain"
            onPress={() => navigate("Comments", { hotMemeId: item.id })}
          ></Card.Image>
          <View style={styles.cardRow}>
            <Divider />
            <Icon
              name="arrow-up"
              type="font-awesome"
              raised
              reverse
              size="15"
              color="#9d9fa3"
            />
            <Text style={{ marginRight: 10 }}>{item.upvote}</Text>
            <Icon
              name="arrow-down"
              type="font-awesome"
              raised
              reverse
              size="15"
              color="#9d9fa3"
            />
            <Text style={{ marginRight: 80 }}>{item.downvote}</Text>
            <Icon
              name="comments"
              type="font-awesome"
              raised
              reverse
              size="15"
              color="#9d9fa3"
              onPress={() => navigate("Comments", { hotMemeId: item.id })}
            />
            <Icon
              name={"share"}
              type="font-awesome"
              color="#9d9fa3"
              raised
              size="15"
              reverse
            />
          </View>
        </Card>
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
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    marginTop: 6,
  },
  cardText: {
    fontSize: 24,
    fontFamily: "Futura",
  },
  imageStyle: {
    padding: 0,
    margin: 0,
    width: null,
    flex: 1,
    height: 365,
  },
});
export default connect(mapStateToProps)(PopularMemes);
