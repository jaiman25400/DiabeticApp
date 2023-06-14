import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { firebase } from "../config";
import { useDispatch } from "react-redux";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  let loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("user Cre:", userCredential);
        const { uid, email } = userCredential.user;
        const user = { uid, email };
        dispatch({ type: "Login", payload: user }); // Dispatch Login event after successful sign-in
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("User not found. Please check your email and password.");
        } else if (error.code === "auth/wrong-password") {
          alert("Invalid password. Please try again.");
        } else if (error.code === "auth/user-disabled") {
          alert("Your account has been disabled. Please contact support.");
        } else if (error.code === "auth/user-mismatch") {
          alert(
            "There is a mismatch between the current user and the provided credentials."
          );
        } else {
          // Handle generic error case
          alert("An error occurred during login. Please try again later.");
        }
      });
  };

  const forgetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Image source={require("../assets/icon.png")} style={styles.image} />

        <TextInput
          style={styles.input}
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => loginUser(email, password)}
        >
          Login
        </Button>

        <Button
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Signup")}
        >
          Don't have an account? Register Now
        </Button>

        <Button style={{ marginTop: 20 }} onPress={forgetPassword}>
          Forget Password?
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: -30,
  },
});
