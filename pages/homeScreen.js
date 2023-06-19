import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);

  const addFoodLog = (TAG) => {
    navigation.navigate("FoodSearch", {
      tag: TAG,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button mode="contained" onPress={() => addFoodLog("BREAKFAST")}>
        BREAKFAST
      </Button>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: 300,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
