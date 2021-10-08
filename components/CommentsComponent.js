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
    memes: state.memes,
    comments: state.comments,
    upvotes: state.upvotes,
  };
};

const mapDispatchToProps = {
  postComment: (memeId, author, text) =>
    postComment(memeId, author, text),
  
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

        <Divider style={{ height: 20}}/>
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
  handleComment(memeId) {
    this.props.postComment(memeId, this.state.author, this.state.text);
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      author: "",
      text: "",
      
    });
  }

  markUpvote(memeId) {
    this.props.postUpvote(memeId);
  }
  static navigationOptions = {
    title: "Comments",
  };
  render() {
    const RenderMeme = ({ meme }) => {
      if (meme) {
        return (
          <View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>
                {meme.name}
              </Text>
            </View>

          <Image
            style={styles.imageStyle}
            source={{ uri: baseUrl + meme.image }}
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
            <Text style={{ marginRight: 10 }}>{meme.upvotes}</Text>
            <Icon
              name="arrow-down"
              type="font-awesome"
              raised
              reverse
              size={15}
              color="#9d9fa3"
            />
            <Text style={{ marginRight: 80 }}>{meme.downvotes}</Text>
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
              onPress={() => shareMeme(meme.name, baseUrl + meme.image)}
            />
          </View>
           <View style={styles.dividerView} />
        </View>
        );
      }
      return <View />;
    };

    const memeId = this.props.navigation.getParam("memeId");
    const meme = this.props.memes.memes.filter(
      (meme) => meme.id === memeId
    )[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.memeId === memeId
    );

    
    return (
      <ScrollView>
        <RenderMeme
          meme={meme}
          upvote={this.props.upvotes.includes(memeId)}
          markUpvote={() => this.markUpvote(memeId)}
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
                  this.handleComment(memeId);
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
