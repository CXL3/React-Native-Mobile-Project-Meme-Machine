import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, CheckBox, Button, Divider } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      remember: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  static navigationOptions = {
    title: "Login",
  };

  handleLogin() {
    this.toggleModal();
    this.props.loginUser({
      username: this.username.value,
      password: this.password.value,
    });
    event.preventDefault();
  }

  handleLogout() {
    this.props.logoutUser();
  }

  componentDidMount() {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      const userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({ username: userinfo.username });
        this.setState({ password: userinfo.password });
        this.setState({ remember: true });
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Meme Machine</Text>
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
        <CheckBox
          title="Remember Me"
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={{ marginTop: 30 }}>
          <Button
            style={{ marginBottom: 20 }}
            color="#5637DD"
            title="Log In"
            onPress={() => {
              this.handleLogin;
            }}
          />

          <Button style={{ marginBottom: 40 }} type="outline" title="Cancel" />
        </View>
        <Divider width={0.2} />
        <View style={styles.formButton}>
          <Button
            type="outline"
            title="Sign up"
            onPress={() => navigate("SignUp")}
          />
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
    marginTop: 20,
    backgroundColor: "white",
    color: "white",
    borderRadius: 4,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    // fontFamily: "TrebuchetMS-Bold",
    fontWeight: "bold",
    margin: 40,
    marginBottom: 40,
  },
});

export default Login;
