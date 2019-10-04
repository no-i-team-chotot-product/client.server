import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";
import { mobileDetailCates } from "../constants/ListCategory";

const url = "https://chotot.com/chotot-img/c2cCategoryIcon/";

export default class FilterChildPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileDetailCates
    };
  }

  render() {
    const { mobileDetailCates } = this.state;
    const { iconClicked } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {mobileDetailCates.map(item => (
            <View style={styles.filterItem} key={item.id}>
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={iconClicked(item.id)}
              >
                <View>
                  <SvgUri
                    width="50"
                    height="50"
                    uri={`${url}${item.imageLink}`}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  filterItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  touchableButton: {
    borderWidth: 1,
    borderColor: "#eaeaea",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "#eaeaea",
    borderRadius: 50
  },
  itemTitle: {
    paddingTop: 10,
    width: 70,
    height: 50,
    justifyContent: "center"
  },
  iconFilter: {
    width: 50,
    height: 50
  }
});
