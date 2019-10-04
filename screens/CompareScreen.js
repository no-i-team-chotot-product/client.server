import React from "react";
import { View, Text } from "react-native";
import CompareTool from "../components/CompareTool";
import HeaderComponent from "../components/HeaderComponent";
import { NavigationActions } from "react-navigation";

export default class CompareScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item1: this.props.navigation.state.params.value1,
      item2: this.props.navigation.state.params.value2
    };
  }

  goBackAction = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    const { item1, item2 } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <HeaderComponent handleGoBack={this.goBackAction} headerText="So Sánh" />
        </View>
        <View style={{ flex: 9}}>
          <CompareTool idItem1={item1} idItem2={item2} />
        </View>
      </View>
    );
  }
}
