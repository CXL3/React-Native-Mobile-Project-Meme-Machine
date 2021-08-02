import React, { Component } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { HOTMEMES } from "../shared/hotMemes";
import { COMMENTS } from "../shared/comments";
import { Divider } from "react-native-elements/dist/divider/Divider";

function RenderMeme({ hotMeme }) {
  if (hotMeme) {
    return (
      <Card>
        <Card.Title>{hotMeme.name}</Card.Title>
        <Card.Divider />
        <Card.Image source={require("./images/soup.png")}></Card.Image>
        {/* <Image source={require("./images/soup.png")}></Image> */}
      </Card>
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
  constructor(props) {
    super(props);
    this.state = {
      hotMemes: HOTMEMES,
      comments: COMMENTS,
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
    const comments = this.state.comments.filter(
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

export default Comments;
