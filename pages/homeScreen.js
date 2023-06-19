import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, TouchableRipple } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { fetchFoodList } from "../redux/actions/actions";
import { firebase } from "../config";
import styles from "./loginScreen";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state);

  const [list, setList] = useState(null);

  const [name, setName] = useState("");

  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  useEffect(() => {
    appState?.api?.foodList ? setList(appState?.api?.foodList) : null;
    console.log("App state in Home scree", appState);
  }, [appState]);

  const getList = () => {
    const params = {
      dataType: ["Foundation", "SR Legacy"],
      pageSize: 25,
      pageNumber: 2,
      sortBy: "dataType.keyword",
      sortOrder: "asc",
    };
    dispatch(fetchFoodList(params));
  };

  useEffect(() => {
    // Used for printing User name on Home Screen
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("User Does not exist");
        }
      });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button mode="contained" onPress={getList}>
        Food List
      </Button>
    </View>
  );
}
