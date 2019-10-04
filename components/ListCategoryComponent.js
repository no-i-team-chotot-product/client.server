import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { listCate, listFullPanel } from "../constants/ListCategory";

const ListCategoryChildComponent = props => {
  return (
    <FlatList
      data={props.data}
      horizontal={props.showHorizon}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={props.columnCount}
      key={props.columnCount}
      columnWrapperStyle={
        props.showHorizon ? null : { justifyContent: "space-between" }
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            {
              backgroundColor: "#4CD964",
              borderRadius: 15,
              justifyContent: "space-between",
              width: props.showHorizon ? 150 : "47%",
              height: 100
            },
            {
              backgroundColor: item.backgroundColor
            },
            props.showHorizon ? { marginRight: 15 } : { margin: 5 }
          ]}
          onPress={() => {props.onClickCategory(item)}}
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
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default class ListCategoryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHorizon: true
    };
  }

  render() {
    const data = [...listFullPanel, ...listCate];
    const { showHorizon } = this.state;
    const { handleOnClickCate } = this.props;
    return (
      <View style={{ marginHorizontal: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 15 }}>Categories</Text>
          <TouchableOpacity
            style={{
              width: 100,
              height: 30,
              justifyContent: "center",
              alignItems: "flex-end"
            }}
            onPress={() => {
              this.setState({
                showHorizon: !showHorizon
              });
            }}
          >
            <Text>{showHorizon ? "See all" : "Collapse"}</Text>
          </TouchableOpacity>
        </View>
        <ListCategoryChildComponent
          data={data}
          showHorizon={showHorizon}
          columnCount={showHorizon ? 1 : 2}
          showHorizon={showHorizon}
          onClickCategory={(item) => {
            handleOnClickCate(item)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cateHeader: {
    paddingTop: 7,
    paddingLeft: 10,
    fontSize: 16,
    maxWidth: 100,
    fontWeight: "600",
    color: "#FFFFFF"
  },
  cateImage: {
    width: "60%",
    height: "55%",
    alignSelf: "flex-end"
  }
});
