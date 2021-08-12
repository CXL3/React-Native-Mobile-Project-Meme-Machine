import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { baseUrl } from "../shared/baseUrl";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTitle: "",
      imageUrl: baseUrl + "images/sample.jpg",
    };
  }
  static navigationOptions = {
    title: "Upload",
  };
  getImageFromCamera = async () => {
    const mediaPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      mediaPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      const importImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!importImage.cancelled) {
        console.log(importImage);
        this.setState({ imageUrl: importImage.uri });
      }
    }
  };
  resetForm() {
    this.setState({
      newTitle: "",
      imageUrl: baseUrl + "images/sample.jpg",
    });
  }
  handleAlert() {
    Alert.alert(
      "Alert",
      "discard the upload?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => this.resetForm(),
        },
      ],
      { cancelable: false }
    );
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.formButton}>
          <Button
            type="outline"
            color="grey"
            title="Choose a photo"
            onPress={this.getImageFromCamera}
          />
          <Input
            placeholder="Input Your title here."
            onChangeText={(newTitle) => this.setState({ newTitle })}
            value={this.state.newTitle}
            leftIconContainerStyle={styles.formIcon}
          />
        </View>

        <View>
          <Text style={styles.textTitle2}>{this.state.newTitle}</Text>
          <Image source={{ uri: this.state.imageUrl }} style={styles.image} />
        </View>
        <Button style={styles.formButton} title="Post" />
        <Button
          style={styles.formButton}
          type="outline"
          title="Cancel"
          onPress={() => this.handleAlert()}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 70,
  },
  text: {
    fontSize: 20,
    fontFamily: "Futura",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 80,
  },
  formIcon: {
    marginRight: 10,
  },
  formInput: {
    padding: 8,
  },

  formButton: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    backgroundColor: "white",
    color: "white",
    borderRadius: 4,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 10,
  },
  textTitle2: {
    fontSize: 20,
    fontFamily: "Futura",
    textAlign: "center",
    marginBottom: 20,
  },
  photoButton: {
    marginTop: 20,
    backgroundColor: "white",
    color: "white",
    borderRadius: 4,
  },
  image: {
    width: null,
    flex: 1,
    height: 345,
    resizeMode: "contain",
  },
});
export default Upload;
