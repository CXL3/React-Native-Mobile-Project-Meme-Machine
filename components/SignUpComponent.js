import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, CheckBox, Button } from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }
  static navigationOptions = {
    title: "SignUp",
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Meme Machine</Text>
        <Input
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />
        <Input
          placeholder="Verify Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
          leftIconContainerStyle={styles.formIcon}
        />

        <View style={styles.formButton}>
          <Button type="outline" title="Submit" />
        </View>
        <View style={styles.formButton}>
          <Button type="outline" title="Cancel" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formIcon: {
    marginRight: 10,
  },
  formInput: {
    padding: 10,
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null,
  },
  formButton: {
    margin: 20,
    backgroundColor: "white",
    color: "white",
    borderRadius: 4,
  },
  text: {
    textAlign: "center",
    fontSize: 40,
    fontFamily: "TrebuchetMS-Bold",
    fontWeight: "bold",
    margin: 40,
    marginBottom: 70,
  },
});
export default SignUp;
