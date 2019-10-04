import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Feather,
  AntDesign,
  MaterialIcons
} from "@expo/vector-icons";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Feather
            name="phone-call"
            size={28}
            color="#1fd002"
            style={styles.backIcon}
          />
          <Text style={styles.text}>Gọi Điện</Text>
        </View>
        <View style={styles.button}>
          <AntDesign
            name="message1"
            size={30}
            color="#1fd002"
            style={styles.backIcon}
          />
          <Text style={styles.text}>Nhắn tin</Text>
        </View>
        <View style={styles.button}>
          <MaterialIcons
            name="sms"
            size={30}
            color="#1fd002"
            style={styles.backIcon}
          />
          <Text style={styles.text}>Trò Chuyện</Text>
        </View>
        <View style={[styles.button, styles.compareButton]}>
          <MaterialIcons
            name="compare"
            size={30}
            color="white"
            style={styles.backIcon}
          />
          <Text style={[styles.text, { color: "white" }]}>So Sánh</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  compareButton: {
    backgroundColor: "#1fd002"
  },
  button: {
    flex: 2.5,
    alignItems: "center",
    marginVertical: -5,
  },
  text: {
    color: "#1fd002",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(229, 229, 229, 0.32)"
  }
});
