import React, { Component } from "react";
import { FlatList, StyleSheet, View, Text, Share, } from "react-native";
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

function RenderMemeItem({meme}) {
    return (
        <View>
          <View style={styles.titleView}>
            <Text
              style={styles.titleText}
              onPress={() => navigate("Comments", { memeId: meme.id })}
            >
              {meme.name}
            </Text>
          </View>

          <Image
            style={styles.imageStyle}ç
            src={baseUrl + meme.image} alt={meme.image}
            // source={{ uri: baseUrl + item.image }}
            resizeMode="stretch"
            onPress={() => navigate("Comments", { memeId: meme.id })}
          />
        </View>
        // <Card>
        //     <Link to={`/directory/${campsite._id}`}>
        //         <CardImg width='100%' src={baseUrl + campsite.image} alt={campsite.name} />
        //         <CardImgOverlay>
        //             <CardTitle>{campsite.name}</CardTitle>
        //         </CardImgOverlay>
        //     </Link>
        // </Card>
    );
}


class PopularMemes extends Component {
  static navigationOptions = {
    title: "Popular Memes",
  };
  render() {
    const { navigate } = this.props.navigation;
    // const dimensions = Dimensions.get("window");
    // const imageHeight = dimensions.width / 680;
    // const imageWidth = dimensions.width;
    // const rendermemesItem = ({ item }) => {
    //   return (
    //     <View>
    //       <View style={styles.titleView}>
    //         <Text
    //           style={styles.titleText}
    //           onPress={() => navigate("Comments", { memeId: item.id })}
    //         >
    //           {item.name}
    //         </Text>
    //       </View>

    //       <Image
    //         style={styles.imageStyle}ç
    //         src={baseUrl + item.image} alt={item.image}
    //         source={{ uri: baseUrl + item.image }}
    //         resizeMode="stretch"
    //         onPress={() => navigate("Comments", { memeId: item.id })}
    //       />
    //       <View style={styles.cardRow}>
    //         <Icon
    //           name="arrow-up"
    //           type="font-awesome"
    //           raised
    //           reverse
    //           size={15}
    //           color="#9d9fa3"
    //         />
    //         <Text style={{ marginRight: 10 }}>{item.upvote}</Text>
    //         <Icon
    //           name="arrow-down"
    //           type="font-awesome"
    //           raised
    //           reverse
    //           size={15}
    //           color="#9d9fa3"
    //         />
    //         <Text style={{ marginRight: 80 }}>{item.downvote}</Text>
    //         <Icon
    //           name="comments"
    //           type="font-awesome"
    //           raised
    //           reverse
    //           size={15}
    //           color="#9d9fa3"
    //           onPress={() => navigate("Comments", { memeId: item.id })}
    //         />
    //         <Icon
    //           name={"share"}
    //           type="font-awesome"
    //           color="#9d9fa3"
    //           raised
    //           size={15}
    //           reverse
    //           onPress={() => shareMeme(item.name, baseUrl + item.image)}
    //         />
    //       </View>
    //       <View style={styles.dividerView} />
    //     </View>
    //   );
    // };

    return (
        <ScrollView>

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


function RenderDirectoryItem({campsite}) {
    return (
        <Card>
            <Link to={`/directory/${campsite._id}`}>
                <CardImg width='100%' src={baseUrl + campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function Directory(props) {

    const directory = props.campsites.campsites.map(campsite => {
        return (
            <div key={campsite._id} className='col-md-5 m-1'>
                <RenderDirectoryItem campsite={campsite} />
            </div>
        );
    });

    if (props.campsites.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.campsites.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
            <div className='row'>
                {directory}
            </div>
        </div>
    );
}

export default Directory;


import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Share,
  ScrollView,
} from "react-native";
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

function RenderMemeItem({meme}) {
  
  return (
    <View>
      {/* <View style={styles.titleView}>
        <Text
          style={styles.titleText}
          onPress={() => navigate("Comments", { memeId: meme.id })}
        >
          { baseUrl + meme.name }
        </Text>
      </View> */}

      <Image
        style={styles.imageStyle}
        src={baseUrl + meme.image}
        alt={meme.image}
        // source={{ uri: baseUrl + item.image }}
        resizeMode="stretch"
        onPress={() => navigate("Comments", { memeId: meme.id })}
      />
    </View>
    // <Card>
    //     <Link to={`/directory/${meme._id}`}>
    //         <CardImg width='100%' src={baseUrl + campsite.image} alt={campsite.name} />
    //         <CardImgOverlay>
    //             <CardTitle>{campsite.name}</CardTitle>
    //         </CardImgOverlay>
    //     </Link>
    // </Card>
  );
}
class PopularMemes extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: "Popular Memes",
  };

  render() {
    const { navigate } = this.props.navigation;
    // const campsiteId = this.props.navigation.getParam("campsiteId");
    // const campsite = this.props.campsites.campsites.filter(
    //   (campsite) => campsite.id === campsiteId
    // )[0];
    const memeId = this.props.navigation.getParam("memeId");
    const meme = this.props.memes.memes.filter(
      (meme) => meme.id === memeId
    )[0];

    // const rendermemeItem = ({ item }) => {
    //   return (
    //     <View>
    //       <View style={styles.titleView}>
    //         <Text
    //           style={styles.titleText}
    //           onPress={() => navigate("Comments", { memeId: item.id })}
    //         >
    //           {item.name}
    //         </Text>
    //       </View>

    //       <Image
    //         style={styles.imageStyle}
    //         ç
    //         src={baseUrl + item.image}
    //         alt={item.image}
    //         source={{ uri: baseUrl + item.image }}
    //         resizeMode="stretch"
    //         onPress={() => navigate("Comments", { memeId: item.id })}
    //       />
    //       <View style={styles.cardRow}>
    //         <Icon
    //           name="arrow-up"
    //           type="font-awesome"
    //           raised
    //           reverse
    //           size={15}
    //           color="#9d9fa3"
    //         />
    //         <Text style={{ marginRight: 10 }}>{item.upvote}</Text>
    //         <Icon
    //           name="arrow-down"
    //           type="font-awesome"
    //           raised
    //           reverse
    //           size={15}
    //           color="#9d9fa3"
    //         />
    //         <Text style={{ marginRight: 80 }}>{item.downvote}</Text>
    //         <Icon
    //           name="comments"
    //           type="font-awesome"
    //           raised
    //           reverse
    //           size={15}
    //           color="#9d9fa3"
    //           onPress={() => navigate("Comments", { memeId: item.id })}
    //         />
    //         <Icon
    //           name={"share"}
    //           type="font-awesome"
    //           color="#9d9fa3"
    //           raised
    //           size={15}
    //           reverse
    //           onPress={() => shareMeme(item.name, baseUrl + item.image)}
    //         />
    //       </View>
    //       <View style={styles.dividerView} />
    //     </View>
    //   );
    // };

    return (
      <ScrollView>
        <RenderMemeItem meme = {meme} />
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
