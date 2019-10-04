import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { DefaultListFilter } from "../constants/DefaultListFilter";

export default class FilterParentPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultListFilter: DefaultListFilter
    };
  }

  render() {
    return (
      <View style={styles.filterPanel}>
        <View style={styles.location}>
          <View style={[styles.filterSection, { margin: 0 }]}>
            <Text style={{ fontSize: 15, flex: 1, paddingLeft: 0 }}>
              {DefaultListFilter[0].title}
            </Text>
            <AntDesign name="caretdown" size={15} color="black" />
          </View>
        </View>
        <View style={styles.category}>
          <View style={[styles.filterSection, styles.specialFilter]}>
            <Text style={{ fontSize: 15, flex: 1, paddingLeft: 0 }}>
              {DefaultListFilter[1].title}
            </Text>
            <AntDesign
              name="caretdown"
              size={15}
              color="black"
              style={{ marginRight: 0 }}
            />
          </View>
        </View>
        <View style={styles.filter}>
          <View style={[styles.filterSection, { margin: 0 }]}>
            <Text style={{ fontSize: 15, flex: 1 }}>
              {DefaultListFilter[2].title}
            </Text>
            <AntDesign
              name="caretdown"
              size={15}
              color="black"
              style={{ paddingLeft: 0 }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterPanel: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginHorizontal: 5
  },
  location: {
    flex: 4
  },
  category: {
    flex: 4
  },
  filter: {
    flex: 2
  },
  filterSection: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  specialFilter: {
    margin: 10,
    borderLeftColor: "grey",
    borderLeftWidth: 1,
    borderRightColor: "grey",
    borderRightWidth: 1
  }
});
