import React from "react";
import { Button, View, Text } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to Homr" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
