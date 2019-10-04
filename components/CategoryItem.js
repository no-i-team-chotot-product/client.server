import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const url = "https://static.chotot.com.vn/storage/marketplace/home/category/";

const ImageBg = props => {
  return (
    <ImageBackground
      source={{ uri: `${url}${props.imageName}` }}
      style={props.styleImageBackGround}
    ></ImageBackground>
  );
};

export default class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item, handleOnClickCate } = this.props;
    let width = Dimensions.get("window").width - 20;
    if (item.type !== "fullPanel") {
      width = width / 2 - 5;
    }
    let styleImageBackGround = {
      alignSelf: "stretch",
      width: width,
      resizeMode: "contain",
      height: 100
    };
    return (
      <TouchableOpacity style={styles.container} onPress={handleOnClickCate}>
        <ImageBg
          styleImageBackGround={styleImageBackGround}
          imageName={item.imageName}
          title={item.title}
        ></ImageBg>
        <View style={styles.overlay}>
          <Text style={styles.cateTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.27)"
  },
  container: {
    marginTop: 10
  },
  cateTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    paddingTop: 7,
    paddingLeft: 10
  }
});
