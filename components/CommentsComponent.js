import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import AutoHeightImage from "react-native-auto-height-image";

const mapStateToProps = (state) => {
  return {
    hotMemes: state.hotMemes,
    comments: state.comments,
  };
};

function RenderMeme({ hotMeme }) {
  if (hotMeme) {
    return (
      <View>
        <Card.Title>{hotMeme.name}</Card.Title>
        <Card.Divider />
        <AutoHeightImage width={100} source={{ uri: baseUrl + hotMeme.image }} ></AutoHeightImage>
        {/* <Image source={require("./images/soup.png")}></Image> */}
      </View>
    );
  }
  return <View />;
}
function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>

        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
        <Divider />
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

class Comments extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     hotMemes: HOTMEMES,
  //     comments: COMMENTS,
  //   };
  // }
  static navigationOptions = {
    title: "Comments",
  };
  render() {
    const hotMemeId = this.props.navigation.getParam("hotMemeId");
    const hotMeme = this.props.hotMemes.hotMemes.filter(
      (hotMeme) => hotMeme.id === hotMemeId
    )[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.hotMemeId === hotMemeId
    );
    return (
      <ScrollView>
        <RenderMeme hotMeme={hotMeme} />
        <RenderComments comments={comments} />
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Comments);
