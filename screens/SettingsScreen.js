import React from "react";
import { View, Text } from "react-native";
import CompareTool from "../components/CompareTool";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <CompareTool />
      </View>
    );
  }
}
