import React, { Component } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default class MessageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [
        { id: 1, user: "A", text: "D" },
        { id: 2, user: "B", text: "E" },
        { id: 3, user: "C", text: "F" },
        { id: 4, user: "D", text: "G" },
        { id: 5, user: "Z", text: "H" }
      ]
    };
  }

  render() {
    const { messageList } = this.state;
    return (
      <View style={{paddingVertical:70}}>
        <ScrollView>
        </ScrollView>
      </View>
    );
  }
}
