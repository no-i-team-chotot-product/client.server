import React from "react";
import { View, Text } from "react-native";
import ChooseCateForNewUser from "../components/ChooseCateForNewUser";
import Constants from 'expo-constants';

export default class ChooseCateNewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(Constants.deviceId);
    console.log(Constants.deviceName)
  }

  render() {
    return (
      <View>
        <ChooseCateForNewUser
          handleSubmittedSuccess={() => {
            this.props.navigation.navigate("Home");
          }}
        />
      </View>
    );
  }
}
