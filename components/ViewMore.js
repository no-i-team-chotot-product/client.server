import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ViewMoreText from "react-native-view-more-text";

export default class ViewMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLess: true
    };
  }

  renderViewMore(onPress) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.viewMoreButton}>
          <Text style={styles.viewMore}>View more </Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderViewLess(onPress) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.viewMoreButton}>
          <Text style={styles.viewMore}>View less</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { showLess } = this.state;
    return (
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={this.renderViewMore}
        renderViewLess={this.renderViewLess}
        textStyle={{ textAlign: "center" }}
      >
        <Text
          style={{
            textAlign: "justify",
            lineHeight: 22
          }}
        >
          {this.props.content}
        </Text>
      </ViewMoreText>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  viewMore: {
    color: "blue"
  },
  viewMoreButton: {
    height: 30,
    width: 100,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  }
});
