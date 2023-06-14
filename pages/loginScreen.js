import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
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
        dispatch({ type: "Login", payload: user }); // Dispatch Login event after succesfull sign IN
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
        alert("Password reset email sent ");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/icon.png")} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => loginUser(email, password)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Don't have account? Register Now{" "}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          forgetPassword();
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Forget Password?{" "}
        </Text>
      </TouchableOpacity>
    </View>
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 40,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: -30,
  },
});
