import React from "react";
import { Button, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
export default function HomeScreen({ navigation }) {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("Login")}
      />
      <View>
        <Text>Count: {count}</Text>
        <Button title="Increment" onPress={increment} />
        <Button title="Decrement" onPress={decrement} />
      </View>
    </View>
  );
}
