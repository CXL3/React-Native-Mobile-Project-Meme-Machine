import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  Share,
} from "react-native";
import { Card, Button, Input, Icon } from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postComment } from "../redux/ActionCreators";
import { hotMemes } from "../redux/hotMemes";

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

function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text
          style={{ fontSize: 10, fontWeight: "bold" }}
        >{` ${item.author}, ${item.date}`}</Text>
        <Text style={{ fontSize: 18 }}>{item.text}</Text>

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
    const RenderMeme = ({ hotMeme }) => {
      if (hotMeme) {
        return (
          <Card>
            <Card.Title style={styles.CardText}>{hotMeme.name}</Card.Title>
            <Card.Divider />
            <Card.Image
              style={styles.imageStyle}
     
              source={{ uri: baseUrl + hotMeme.image }}
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
              <Text style={{ marginRight: 10 }}>{hotMeme.upvote}</Text>
              <Icon
                name="arrow-down"
                type="font-awesome"
                raised
                reverse
                size="15"
                color="#9d9fa3"
              />
              <Text style={{ marginRight: 70 }}>{hotMeme.downvote}</Text>
              <Icon
                name="pencil"
                type="font-awesome"
                raised
                reverse
                size="15"
                color="#9d9fa3"
                onPress={() => this.toggleModal()}
              />
              <Icon
                name={"share"}
                type="font-awesome"
                color="#9d9fa3"
                raised
                size="15"
                reverse
                onPress={() => shareMeme(hotMeme.name, baseUrl + hotMeme.image)}
              />
            </View>
          </Card>
        );
      }
      return <View />;
    };

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
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add a comment</Text>
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(author) => this.setState({ author: author })}
              value={this.state.author}
            />

            <Input
              placeholder="Comment"
              multiline={true}
              numberOfLines={4}
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(text) => this.setState({ text: text })}
              value={this.state.text}
            />

            <View style={{ margin: 10 }}>
              <Button
                style={{ margin: 10 }}
                onPress={() => {
                  this.handleComment(hotMemeId);
                  this.resetForm();
                }}
                color="#5637DD"
                title="Submit"
              />
              <Button
                style={{ margin: 10 }}
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
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    marginTop: 6,
  },
  CardText: {
    fontSize: 24,
    fontFamily: "Futura",
  },
  button: {
    alignItems: "center",
    width: null,
    flex: 1,
    borderRadius: 4,
  },
  imageStyle: {
    width: null,
    flex: 1,
    height: 345,
    resizeMode: "contain",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modal: {
    justifyContent: "center",
    marginTop: 100,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
