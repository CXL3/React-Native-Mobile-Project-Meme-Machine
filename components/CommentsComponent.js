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
import { Card, Button, Input, Icon, Image} from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postComment, postUpvote } from "../redux/ActionCreators";



const mapStateToProps = (state) => {
  return {
    hotMemes: state.hotMemes,
    comments: state.comments,
    upvotes: state.upvotes,
  };
};

const mapDispatchToProps = {
  postComment: (hotMemeId, author, text) =>
    postComment(hotMemeId, author, text),
  postUpvote: (hotMemeId) => postUpvote(hotMemeId),
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
    <View>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      text: "",
      showModal: false,
      upvote:"",
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

  markUpvote(hotMemeId) {
    this.props.postUpvote(hotMemeId);
  }
  static navigationOptions = {
    title: "Comments",
  };
  render() {
    const RenderMeme = ({ hotMeme }) => {
      if (hotMeme) {
        return (
          <View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>
                {hotMeme.name}
              </Text>
            </View>

          <Image
            style={styles.imageStyle}
            source={{ uri: baseUrl + hotMeme.image }}
            resizeMode="stretch"
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
            <Text style={{ marginRight: 10 }}>{hotMeme.upvote}</Text>
            <Icon
              name="arrow-down"
              type="font-awesome"
              raised
              reverse
              size={15}
              color="#9d9fa3"
            />
            <Text style={{ marginRight: 80 }}>{hotMeme.downvote}</Text>
             <Icon
                name="pencil"
                type="font-awesome"
                raised
                reverse
                size={15}
                color="#9d9fa3"
                onPress={() => this.toggleModal()}
              />
            <Icon
              name={"share"}
              type="font-awesome"
              color="#9d9fa3"
              raised
              size={15}
              reverse
              onPress={() => shareMeme(hotMeme.name, baseUrl + hotMeme.image)}
            />
          </View>
           <View style={styles.dividerView} />
        </View>
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
        <RenderMeme
          hotMeme={hotMeme}
          upvote={this.props.upvotes.includes(hotMemeId)}
          markUpvote={() => this.markUpvote(hotMemeId)}
        />

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
  // CardText: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   margin: 19,
  // },
  button: {
    alignItems: "center",
    width: null,
    flex: 1,
    borderRadius: 4,
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
