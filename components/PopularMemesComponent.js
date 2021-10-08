import React, { Component } from "react";
import { FlatList,ScrollView, StyleSheet, View, Text, Share, } from "react-native";
import { Icon, Image } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    memes: state.memes,
  };
};
const shareMeme = (title, url) => {
  Share.share(
    {
      title: title,
      message: `Check out this meme----"${title}": ${url}`,
    },
    {
      dialogTitle: "Share " + title,
    }
  );
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
    const rendermemesItem = ({ item }) => {
      return (
        <View>
          <View style={styles.titleView}>
            <Text
              style={styles.titleText}
              onPress={() => navigate("Comments", { memeId: item.id })}
            >
              {item.name}
            </Text>
          </View>

          <Image
            style={styles.imageStyle}ç
            // source={baseUrl + item.image} alt={item.image}
            source={{ uri: baseUrl + item.image }}
            resizeMode="stretch"
            onPress={() => navigate("Comments", { memeId: item.id })}
          />
          <View style={styles.cardRow}>
            <Icon
              name="arrow-up"
              type="font-awesome"
              raised
              reverse
              size={15}
              color="#9d9fa3"
            />
            <Text style={{ marginRight: 10 }}>{item.upvotes}</Text>
            <Icon
              name="arrow-down"
              type="font-awesome"
              raised
              reverse
              size={15}
              color="#9d9fa3"
            />
            <Text style={{ marginRight: 80 }}>{item.downvotes}</Text>
            <Icon
              name="comments"
              type="font-awesome"
              raised
              reverse
              size={15}
              color="#9d9fa3"
              onPress={() => navigate("Comments", { memeId: item.id })}
            />
            <Icon
              name={"share"}
              type="font-awesome"
              color="#9d9fa3"
              raised
              size={15}
              reverse
              onPress={() => shareMeme(item.name, baseUrl + item.image)}
            />
          </View>
          <View style={styles.dividerView} />
        </View>
      );
    };

    return (
      <FlatList
        data={this.props.memes.memes}
        renderItem={rendermemesItem}
        // keyExtractor={(item) => item.id.toString()}
        keyExtractor={item => item.id}
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
    marginBottom: 6,
  },
  titleView: {
    alignItems: "center",
    justifyContent: "center",
    margin: 19,
  },
  titleText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    // fontFamily: "Futura",
    fontWeight: "bold",
  },
  imageStyle: {
    padding: 0,
    margin: 0,
    width: null,
    flex: 1,
    height: 365,
  },

  dividerView: {
    height: 10,
    backgroundColor: "#e6e6e6",
  },
});
export default connect(mapStateToProps)(PopularMemes);