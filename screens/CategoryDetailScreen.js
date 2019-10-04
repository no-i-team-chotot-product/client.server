import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  FlatList
} from "react-native";
import SearchPanel from "../components/SearchPanel";
import FilterParentPanel from "../components/FilterParentPanel";
import FilterChildPanel from "../components/FilterChildPanel";
import ItemDetails from "../components/ItemDetails";
import Constants from "expo-constants";
import { getListProductUrl } from "../utils/FullApi";
import ChangeSortButton from "../components/ChangeSortButton";

export default class CategoryDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      itemDefault: this.props.navigation.state.params.categoryChose,
      loading: "true",
      itemCg: "",
      data: []
    };
  }

  fetchData(id) {
    return fetch(getListProductUrl.replace("categoryId", id))
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }

  _keyExtractor = item => item.id;

  handleItemClicked = id => () => {
    this.props.navigation.navigate("DetailsProduct", {
      itemId: id
    });
  };

  componentDidMount() {
    this.fetchData(this.state.itemDefault.id).then(data => {
      this.setState({ data: data }, () => {
        console.log(data.ads.length)
        this.setState({ loading: false });
      });
    });
  }

  handleChoseDetailCategory = cgId => () => {
    this.setState(
      {
        loading: "true",
        itemCg: cgId,
        data: []
      },
      () => {
        this.fetchData(cgId).then(data => {
          this.setState({ data: data }, () => {
            this.setState({ loading: false });
          });
        });
      }
    );
  };

  render() {
    const { data, loading } = this.state;
    return (
      <View style={styles.container}>
        <SearchPanel
          type="cateDetail"
          goBack={() => this.props.navigation.goBack(null)}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <FilterParentPanel style={{ flex: 0.5 }} />
          <FilterChildPanel iconClicked={this.handleChoseDetailCategory} />
          {!loading && (
            <FlatList
              style={{ flex: 9.5 }}
              data={data.ads}
              keyExtractor={item => item.ad_id.toString()}
              renderItem={({ item }) => (
                <ItemDetails
                  data={item}
                  handleViewProductDetails={this.handleItemClicked(
                    item.list_id
                  )}
                />
              )}
            />
          )}
        </ScrollView>
        <ChangeSortButton />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "ios" ? 20 : Constants.statusBarHeight
  },
  scrollView: {
    flex: 9,
    backgroundColor: "white"
  }
});
