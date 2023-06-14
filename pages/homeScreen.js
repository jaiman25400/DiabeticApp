import React, { useState, useEffect } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { firebase } from "../config";
import styles from "./loginScreen";

export default function HomeScreen({ navigation }) {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
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
      <Text>Hello, {name.firstName}</Text>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => firebase.auth().signOut()}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
