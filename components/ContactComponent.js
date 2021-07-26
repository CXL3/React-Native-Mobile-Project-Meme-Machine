import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";

class Contact extends Component {
  static navigationOptions = {
    title: "Contact Us",
  };
  render() {
    return (
      <ScrollView>
        <Card wrapperStyle={{ margin: 20 }} title={"Contact Information"}>
          <Text>548 Central Way </Text>
          <Text>Seattle, WA 98001 </Text>
          <Text style={{ marginBottom: 10 }}>U.S.A.</Text>
          <Text>Phone: 1-206-777-7777</Text>
        </Card>
      </ScrollView>
    );
  }
}

export default Contact;
