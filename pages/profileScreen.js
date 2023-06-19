import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button, Title, Subheading } from "react-native-paper";
import axios from "axios";
import { firebase } from "../config";

const ProfileScreen = () => {
  const [userStateData, setUserStateData] = useState({});
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [icr, setIcr] = useState("");
  const [correctionRatio, setCorrectionRatio] = useState("");
  const [userProfStateData, setUserProfStateData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;

      if (user) {
        const userId = user.uid;
        const userDocRef = firebase.firestore().collection("users").doc(userId);
        const userProfRef = firebase
          .firestore()
          .collection("userProfile")
          .doc(userId);

        const userDoc = await userDocRef.get();
        const userProf = await userProfRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserStateData(userData);
          console.log("User data:", userData);
        } else {
          console.log("User data not found.");
        }

        if (userProf.exists) {
          const userProfData = userProf.data();
          setUserProfStateData(userProfData);
          console.log("User Prof data:", userProfData);
        } else {
          console.log("User Prof data data not found.");
        }
      } else {
        console.log("No user is currently logged in.");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    try {
      // Send the user input data to Firestore
      const user = firebase.auth().currentUser;

      if (user) {
        const userId = user.uid;
        const userDocRef = firebase
          .firestore()
          .collection("userProfile")
          .doc(userId);

        const data = {
          weight,
          height,
          age,
          icr,
          correctionRatio,
        };

        await userDocRef.set(data, { merge: true });

        console.log("Data saved successfully.");
        alert("Updated successfully");
      } else {
        console.log("No user is currently logged in.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Title
            style={styles.title}
          >{`${userStateData?.firstName} ${userStateData?.lastName}`}</Title>
          <Subheading style={styles.subheading}>
            {userStateData?.email}
          </Subheading>
          <TextInput
            label="Enter Weight"
            style={styles.input}
            value={weight}
            placeholder={userProfStateData?.weight}
            onChangeText={(text) => setWeight(text)}
            keyboardType="numeric"
          />
          <TextInput
            label="Enter Height"
            style={styles.input}
            placeholder={userProfStateData?.height}
            value={height}
            onChangeText={(text) => setHeight(text)}
            keyboardType="numeric"
          />
          <TextInput
            label="Enter Age"
            placeholder={userProfStateData?.age}
            style={styles.input}
            value={age}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
          <TextInput
            label="Enter ICR"
            placeholder={userProfStateData?.icr}
            style={styles.input}
            value={icr}
            onChangeText={(text) => setIcr(text)}
            keyboardType="numeric"
          />
          <TextInput
            label="Enter Correction Ratio"
            placeholder={userProfStateData?.correctionRatio}
            style={styles.input}
            value={correctionRatio}
            onChangeText={(text) => setCorrectionRatio(text)}
            keyboardType="numeric"
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleSubmit}
            disabled={!weight || !height || !age || !icr || !correctionRatio}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
  },
  subheading: {
    fontSize: 15,
    marginBottom: 32,
  },
});

export default ProfileScreen;
