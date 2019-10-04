import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainTabNavigator from "./navigation/MainTabNavigator";
import { StatusBar } from "react-native";

import { createAppContainer } from "react-navigation";

StatusBar.setBarStyle("dark-content", true);

export default App = createAppContainer(MainTabNavigator);
