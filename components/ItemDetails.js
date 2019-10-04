import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { SvgUri } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { loadingIcon, adProIcon } from "../constants/UrlGetData";
import { EvilIcons } from "@expo/vector-icons";

export default class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedImage: false
    };
  }

  render() {
    const { data, handleViewProductDetails } = this.props;
    const { loadedImage } = this.state;
    if (data) {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleViewProductDetails}
            style={{
              padding: 10,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View style={styles.imageBox}>
              <Image
                onLoadEnd={() => {
                  this.setState({
                    loadedImage: true
                  });
                }}
                style={styles.loadingImage}
                source={{
                  uri: data.image
                }}
              />
              {!loadedImage && (
                <View style={styles.loading}>
                  <ActivityIndicator size="small" color="#FFD700" />
                </View>
              )}
            </View>
            <View style={styles.content}>
              <Text numberOfLines={2} style={styles.title}>
                {data.subject}
              </Text>
              <View style={styles.moreDetails}>
                <View style={styles.timeComponent}>
                  <Text style={styles.time}>{data.date}</Text>
                </View>
                <Text style={styles.location}>{data.region_name}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}> {data.price_string} </Text>
                <EvilIcons name="heart" size={25} color="#FF0000" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return <View>Please wait</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: "grey",
    borderTopWidth: 0.5
  },
  priceContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  imageBox: {
    flex: 1.5
  },
  loadingImage: {
    height: 100
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flex: 2.5,
    marginHorizontal: 5
  },
  moreDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    paddingLeft: 5
  },
  price: {
    flex: 1,
    color: "#d0021b",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10
  },
  timeComponent: {
    //marginHorizontal: 5,
    //borderLeftColor: "grey",
    //borderLeftWidth: 0.5,
    borderRightColor: "grey",
    marginRight: 5,
    borderRightWidth: 0.5,
    height: 20
  },
  time: {
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#8A8A8F"
  },
  location: {
    color: "#8A8A8F",
    fontSize: 12,
    paddingVertical: 0
  }
});
