import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    hotMemes: state.hotMemes,
    comments: state.comments,
  };
};

const mapDispatchToProps = {
  postComment: (hotMemeId, author, text) =>
    postComment(hotMemeId, author, text),
};

function RenderMeme({ hotMeme }) {
  // const { hotMeme } = props;
  if (hotMeme) {
    return (
      <Card>
        <Card.Title style={(fontSize = 24)}>{hotMeme.name}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={styles.imageStyle}
          source={{ uri: baseUrl + hotMeme.image }}
        ></Card.Image>

        {/* <AutoHeightImage width={100} source={{ uri: baseUrl + hotMeme.image }} ></AutoHeightImage> */}
        {/* <Image source={require("./images/soup.png")}></Image> */}
        <View>
          <Button
            title="Add a comment"
            type="outline"
            width="10"
            onPress={() => props.onShowModal()}
          />
        </View>
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
      author: "",
      text: "",
      showModal: false,
    };
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  handleComment(hotMemeId) {
    this.props.postComment(hotMemeId, this.state.author, this.state.text);
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      author: "",
      text: "",
    });
  }
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
        <RenderMeme hotMeme={hotMeme} onShowModal={() => this.toggleModal()} />
        <RenderComments comments={comments} />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(author) => this.setState({ author: author })}
              value={this.state.author}
            />

            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(text) => this.setState({ text: text })}
              value={this.state.text}
            />

            <View>
              <Button
                onPress={() => {
                  this.handleComment(hotMemeId);
                  this.resetForm();
                }}
                color="#5637DD"
                title="Submit"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                color="#808080"
                title="Cancel"
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  imageStyle: {
    width: null,
    flex: 1,
    height: 345,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
