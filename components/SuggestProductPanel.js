import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default class SuggestProductPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { isCompareIcon, header, type, headerFontSize, listSuggestProduct } = this.props;
    const data = listSuggestProduct ? listSuggestProduct.data : null;
    return data && data.length > 0 ? (
      <View>
        <Text
          style={{
            fontWeight: "600",
            fontSize: headerFontSize ? headerFontSize : 20,
            fontWeight: headerFontSize ? "500" : "300"
          }}
        >
          {header ? header : "Có thể bạn sẽ thích"}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {data && data.map(item => (
                <View style={{ marginVertical: 5 }} key={item.list_id}>
                  <View
                    style={[
                      styles.contentProduct,
                      type !== "home"
                        ? {
                            marginTop: 20,
                            marginLeft: 20
                          }
                        : {
                            marginRight: 10,
                            marginTop: 10
                          }
                    ]}
                  >
                    <Image
                      source={{
                        url: item.images[0]
                      }}
                      style={styles.image}
                    ></Image>
                    <View style={styles.details}>
                      <Text numberOfLines={2} style={styles.productName}>
                        {item.subject}
                      </Text>
                      <Text style={styles.time}>{item.date}</Text>
                      <Text style={styles.price}>{item.price_string}</Text>
                    </View>
                  </View>
                  {isCompareIcon ? (
                    <TouchableOpacity
                      style={styles.compareButton}
                      onPress={this.props.suggestProductClick(item.list_id)}
                    >
                      <MaterialIcons
                        name="compare-arrows"
                        size={25}
                        color="white"
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              ))}
        </ScrollView>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  compareButton: {
    backgroundColor: "#FFB900",
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 20
  },
  contentProduct: {
    width: 130,
    borderWidth: 0.3,
    borderColor: "#E5E5E5",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  details: {
    marginHorizontal: 15,
    marginVertical: 10
  },
  productName: {
    fontSize: 14,
    fontWeight: "300"
  },
  time: {
    marginTop: 5,
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.7)"
  },
  price: {
    marginTop: 18,
    color: "rgba(0, 0, 0, 0.7)",
    fontWeight: "600",
    fontSize: 15
  }
});
