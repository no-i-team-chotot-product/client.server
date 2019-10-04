import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerComponent}>
          <View style={styles.leftContent}>
            <TouchableOpacity onPress={this.props.handleGoBack}>
              <Ionicons
                name="ios-arrow-back"
                size={30}
                color="white"
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>{this.props.headerText}</Text>
          </View>
          <View style={styles.rightContent}>
            <TouchableOpacity>
              <Ionicons
                name="md-heart-empty"
                size={30}
                color="white"
                style={styles.backIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons
                name="md-share"
                size={30}
                color="white"
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="md-more"
                size={30}
                color="white"
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 20 : Constants.statusBarHeight,
    backgroundColor: "#F6BA33"
  },
  containerComponent: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  headerText: {
    color: "white",
    fontSize: 20
  },
  leftContent: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  rightContent: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  backIcon: {
    marginHorizontal: 19
  }
});
