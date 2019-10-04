import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

export default class ChangeSortButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChange: true
    };
  }

  render() {
    const { isChange } = this.state;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#FFB900",
          width: 60,
          height: 60,
          position: "absolute",
          bottom: 0,
          alignSelf: "flex-end",
          marginBottom: 10,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => {
          this.setState({
            isChange: !isChange,
          });
        }}
      >
        {isChange ? (
          <SimpleLineIcons name="list" size={33} color="white" />
        ) : (
          <AntDesign name="appstore-o" size={30} color="white" />
        )}
      </TouchableOpacity>
    );
  }
}
