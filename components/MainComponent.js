import React, { Component } from "react";
import PopularMemes from "./PopularMemesComponent";
import Comments from "./CommentsComponent";
import Chat from "./ChatComponent";
import Upload from "./UploadMemeComponent";
import LogIn from "./LoginComponent";
// import Directory from "./Test";
import Constants from "expo-constants";
import {
  View,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";

const PopularMemeNavigator = createStackNavigator(
  {
    PopularMemes: {
      screen: PopularMemes,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="list"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
    Comments: {
      screen: Comments,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="list"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
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
    Chat: {
      screen: Chat,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="list"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
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
const UploadNavigator = createStackNavigator(
  {
    Upload: {
      screen: Upload,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="list"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
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
const LogInNavigator = createStackNavigator(
  {
    LogIn: {
      screen: LogIn,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="list"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
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
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Meme Machine</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
const MainNavigator = createDrawerNavigator(
  {
    PopularMemes: { screen: PopularMemeNavigator },
    Chat: { screen: chatNavigator },
    Upload: { screen: UploadNavigator },
    LogIn: { screen: LogInNavigator },
  },
  {
    drawerBackgroundColor: "#ffffff",
    contentComponent: CustomDrawerContentComponent,
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#ff0000",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default Main;
