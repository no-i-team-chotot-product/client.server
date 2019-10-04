import React, { Component } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchBar = props => {
  return (
    <View style={[props.searchSection, props.customSearchSection]}>
      <Ionicons
        name="ios-search"
        size={25}
        color="white"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm trên Chợ Tốt"
        placeholderTextColor="white"
        onChangeText={searchString => {
          props.handleTextChange(searchString);
        }}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type } = this.props;
    return (
      <View style={styles.container}>
        {type === "HomeScreen" ? (
          <SearchBar searchSection={styles.searchSection} />
        ) : (
          <View style={styles.detailContainer}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => {
                this.props.goBack();
              }}
            >
              <Ionicons
                name="ios-arrow-round-back"
                size={35}
                color="white"
              />
            </TouchableOpacity>
            <SearchBar
              searchSection={[styles.searchSection, styles.customSearchSection]}
            />
            <Feather
              name="bookmark"
              size={25}
              color="white"
              style={styles.markerIcon}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6BA33",
    paddingBottom: 4
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    borderBottomColor: "white",
    borderBottomWidth: 1
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  backIcon: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    width: 40
  },
  markerIcon: {
    flex: 0.75,
    justifyContent: "center",
    alignItems: "center"
  },
  customSearchSection: {
    flex: 7,
    marginHorizontal: 0,
    marginRight: 10
  },
  searchIcon: {
    padding: 10
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#F6BA33",
    color: "#424242",
    fontSize: 20
  }
});
