import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import SlidePanel from "../components/SlidePanel";
import SearchPanel from "../components/SearchPanel";
import CategoryItem from "../components/CategoryItem";
import { fetchDataAPI } from "../utils/GetAPIFunction";
import { listCate, listFullPanel } from "../constants/ListCategory.js";
import { getPanelHomeScreen } from "../constants/UrlGetData";
import Constants from "expo-constants";
import ListCategoryComponent from "../components/ListCategoryComponent";
import SuggestProductPanel from "../components/SuggestProductPanel";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: listCate,
      listFullPanel
    };
  }

  async componentDidMount() {
    const listSlidePanel = await fetchDataAPI(getPanelHomeScreen);
    this.setState({
      ...this.state,
      listSlidePanel: listSlidePanel.banners
    });
  }

  handleOnClick = item => {
    this.props.navigation.navigate("CategoryDetail", {
      categoryChose: item
    });
  };

  render() {
    const { listSlidePanel } = this.state;
    const showOldVersion = false;
    return (
      <View style={styles.container}>
        <SearchPanel style={styles.searchPanel} type="HomeScreen" />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <SlidePanel style={styles.slidePanel} data={listSlidePanel} />
          <View>
            {showOldVersion ? (
              <View>
                <View style={styles.categoryPanel}>
                  {listFullPanel.map(item => (
                    <CategoryItem
                      handleOnClickCate={this.handleOnClick(item)}
                      key={item.id}
                      item={item}
                    />
                  ))}
                  <FlatList
                    data={this.state.categoryList}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={({ item }) => (
                      <CategoryItem
                        handleOnClickCate={this.handleOnClickCate(item)}
                        key={item.id}
                        item={item}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
            ) : (
              <View>
                <ListCategoryComponent
                  handleOnClickCate={(item) => {
                    this.handleOnClick(item);
                  }}
                />
              </View>
            )}
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
              <SuggestProductPanel
                isCompareIcon={false}
                header="Các sản phẩm bạn đã xem"
                type="home"
                headerFontSize={15}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Text>Dành cho bạn</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6BA33",
    marginTop: Platform.OS === "ios" ? 20 : Constants.statusBarHeight
  },
  searchPanel: {
    flex: 1
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  scrollView: {
    flex: 9,
    backgroundColor: "white"
  },
  categoryPanel: {
    marginHorizontal: 10,
    backgroundColor: "white"
  },
  panelTwoCate: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
