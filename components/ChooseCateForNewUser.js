import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import { listCate, listFullPanel } from "../constants/ListCategory";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default class ChooseCateForNewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cate: "",
      isSubmitted: false
    };
  }

  render() {
    const { isSubmitted } = this.state;
    const data = [...listFullPanel, ...listCate];
    return (
      <View style={styles.container}>
        <View style={styles.panel}>
          <Image
            source={require("../assets/chotot.png")}
            style={styles.headerImage}
          />

          <View
            style={{
              flexDirection: "row",
              width: 300,
              height: 40,
              borderRadius: 30,
              backgroundColor: "white"
            }}
          >
            <Ionicons
              style={styles.searchIcon}
              name="ios-search"
              size={30}
              color="#FFB900"
            />
            <TextInput
              value={this.state.cate}
              onChange={text => {
                this.setState(
                  {
                    cate: text
                  },
                );
              }}
              multiline={false}
              maxLength={40}
              style={styles.input}
              width={250}
              height={40}
              fontSize={20}
              placeholder="Danh mục bạn quan tâm"
              placeholderTextColor="#FFB900"
              onFocus={() => {
                console.log("aaa");
              }}
            />
          </View>
        </View>
        <View style={styles.containerScroll}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.cateButton,
                    {
                      backgroundColor: item.backgroundColor
                    }
                  ]}
                >
                  <Text numberOfLines={2} style={styles.cateHeader}>
                    {item.title}
                  </Text>
                  <Image
                    source={{
                      uri: item.newImageLink
                    }}
                    style={styles.cateImage}
                    resizeMode="contain"
                  ></Image>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20
              }}
            >
              {isSubmitted ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#4CD964",
                    width: 80,
                    height: 80,
                    borderRadius: 40
                  }}
                >
                  <MaterialIcons name="done" size={35} color="white" />
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "blue",
                    width: 130,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: "#4CD964",
                    borderRadius: 20
                  }}
                  disabled={isSubmitted}
                  onPress={() => {
                    setTimeout(() => {
                      this.setState(
                        {
                          isSubmitted: true
                        },
                        () => {
                          this.props.handleSubmittedSuccess();
                        }
                      );
                    }, 500);
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>Hoàn Tất</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    height: 230,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: "#FFB900",
    alignItems: "center"
  },
  searchIcon: {
    marginHorizontal: 10,
    marginTop: 5
  },
  containerScroll: {
    marginHorizontal: 20,
    position: "absolute",
    paddingTop: 170,
    top: 0,
    bottom: 0
  },
  input: {},
  container: {
    height: "100%"
  },
  headerImage: {
    width: 183,
    height: 68,
    marginVertical: 20
  },
  cateButton: {
    backgroundColor: "#4CD964",
    borderRadius: 15,
    margin: 5,
    justifyContent: "space-between",
    width: "47%",
    height: 100
  },
  cateHeader: {
    paddingTop: 7,
    paddingLeft: 10,
    fontSize: 13,
    color: "#FFFFFF"
  },
  cateImage: {
    width: 90,
    height: 70,
    marginBottom: 0,
    alignSelf: "flex-end"
  }
});
