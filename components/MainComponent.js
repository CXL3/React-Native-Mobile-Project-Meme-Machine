import "react-native-gesture-handler";
import React, { Component } from "react";
import PopularMemes from "./PopularMemesComponent";
import Comments from "./CommentsComponent";
import Chat from "./ChatComponent";
import Upload from "./UploadMemeComponent";
import LogIn from "./LoginComponent";
import SignUp from "./SignUpComponent";
import Constants from "expo-constants";
import { View, Platform, StyleSheet, Text, ScrollView } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import { fetchHotMemes, fetchComments } from "../redux/ActionCreators";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const mapDispatchToProps = {
  fetchHotMemes,
  fetchComments,
};

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

    SignUp: {
      screen: SignUp,
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

// const CustomDrawerContentComponent = (props) => (
//   <ScrollView>
//     <SafeAreaView
//       style={styles.container}
//       forceInset={{ top: "always", horizontal: "never" }}
//     >
//       <View style={styles.drawerHeader}>
//         <View style={{ flex: 2 }}>
//           <Text style={styles.drawerHeaderText}>
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Meme Machine
//           </Text>
//         </View>
//       </View>
//       <DrawerItems {...props} />
//     </SafeAreaView>
//   </ScrollView>
// );
// const MainTabNavigator = createBottomTabNavigator(
//   {
//     Memes: { screen: PopularMemeNavigator },
//     Chat: { screen: chatNavigator },
//     Upload: { screen: UploadNavigator },
//     LogIn: { screen: LogInNavigator },
//   },
//   {
//     tabBarOptions: {
//       activeBackgroundColor: "#faf8f5",
//       inactiveBackgroundColor: "#fffefc",
//       activeTintColor: "#050302",
//       inactiveTintColor: "#808080",
//       labelStyle: { fontSize: 18 },
//     },
//   }
// );
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Memes" component={PopularMemeNavigator} />
      <Tab.Screen name="Chat" component={chatNavigator} />
      <Tab.Screen name="Upload" component={UploadNavigator} />
      <Tab.Screen name="LogIn" component={LogInNavigator} />
    </Tab.Navigator>
  );
}

// const MainNavigator = createDrawerNavigator(
//   {
//     PopularMemes: { screen: PopularMemeNavigator },
//     Chat: { screen: chatNavigator },
//     Upload: { screen: UploadNavigator },
//     LogIn: { screen: LogInNavigator },

//   },
//   {
//     drawerBackgroundColor: "#ffffff",
//     contentComponent: CustomDrawerContentComponent,
//   }
// );

const Drawer = createDrawerNavigator();

function SideDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="PopularMemes" component={PopularMemeNavigator} />
      <Drawer.Screen name="Chat" component={chatNavigator} />
      <Drawer.Screen name="Upload" component={UploadNavigator} />
      <Drawer.Screen name="LogIn" component={LogInNavigator} />
    </Drawer.Navigator>
  );
}

// const AppNavigator = createAppContainer(MainTabNavigator);

class Main extends Component {
  componentDidMount() {
    this.props.fetchHotMemes();
    this.props.fetchComments();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
          paddingBottom: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        }}
      >
        <NavigationContainer>
          <BottomTab />
        </NavigationContainer>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff0000",
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#ff0000",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    fontSize: 24,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: "HelveticaNeue-ThinItalic",
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
  },
});

export default connect(null, mapDispatchToProps)(Main);
