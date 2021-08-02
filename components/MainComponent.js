import React, { Component } from "react";
import PopularMemes from "./PopularMemesComponent";
import Contact from "./ContactComponent";
import Comments from "./CommentsComponent";
import Chat from "./ChatComponent"
// import Directory from "./Test";
import Constants from "expo-constants";
import { View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

const PopularMemeNavigator = createStackNavigator(
  {
    PopularMemes: { screen: PopularMemes },
    Comments: { screen: Comments },
  },
  {
    initialRouteName: "PopularMemes",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#ff0000",
      },
      headerTintColor: "#000000",
      headerTitleStyle: {
        color: "#000000",
      },
    },
  }
);
const chatNavigator = createStackNavigator(
  {
    Chat: { screen: Chat },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#ff0000",
      },
      headerTintColor: "#000000",
      headerTitleStyle: {
        color: "#000000",
      },
    },
  }
);
const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#ff0000",
      },
      headerTintColor: "#000000",
      headerTitleStyle: {
        color: "#000000",
      },
    },
  }
);
const MainNavigator = createDrawerNavigator(
  {
    PopularMemes: { screen: PopularMemeNavigator },
    Contact: { screen: ContactNavigator },
    Chat: { screen: chatNavigator },
  },
  {
    drawerBackgroundColor: "#800000",
  }
);
const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        }}
      >
        <AppNavigator />
      </View>
    );
  }
}

export default Main;
