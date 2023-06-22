import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { TextInput, Button, Title, Subheading } from "react-native-paper";
import { useDispatch } from "react-redux";
import { firebase } from "../config";

const ProfileScreen = ({ navigation }) => {
  const [userStateData, setUserStateData] = useState({});
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [breakfastStartHour, setBreakfastStartHour] = useState("");
  const [breakfastEndHour, setBreakfastEndHour] = useState("");
  const [lunchStartHour, setLunchStartHour] = useState("");
  const [lunchEndHour, setLunchEndHour] = useState("");
  const [dinnerStartHour, setDinnerStartHour] = useState("");
  const [dinnerEndHour, setDinnerEndHour] = useState("");
  const [bfICR, setBfICR] = useState("");
  const [lhICR, setLhICR] = useState("");
  const [dnICR, setDnICR] = useState("");
  const [crr, setCRR] = useState("");

  const dispatch = useDispatch();

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
          dispatch({
            type: "userData",
            payload: { userData },
          });
        } else {
          console.log("User data not found.");
        }

        if (userProf.exists) {
          const userProfData = userProf.data();
          setWeight(userProfData.weight);
          setHeight(userProfData.height);
          setAge(userProfData.age);
          setBreakfastStartHour(userProfData.breakfastStartHour);
          setBreakfastEndHour(userProfData.breakfastEndHour);
          setLunchStartHour(userProfData.lunchStartHour);
          setLunchEndHour(userProfData.lunchEndHour);
          setDinnerStartHour(userProfData.dinnerStartHour);
          setDinnerEndHour(userProfData.dinnerEndHour);
          setBfICR(userProfData.bfICR);
          setLhICR(userProfData.lhICR);
          setDnICR(userProfData.dnICR);
          setCRR(userProfData.crr);
        } else {
          console.log("User profile data not found.");
        }
      } else {
        console.log("No user is currently logged in.");
      }
    };
    fetchUserData();
  }, []);

  const [next, setNext] = useState(false);
  const handleNext = () => {
    console.log("Next");
    setNext(!next);
  };

  const handleSubmit = async () => {
    try {
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
          breakfastStartHour,
          breakfastEndHour,
          lunchStartHour,
          lunchEndHour,
          dinnerStartHour,
          dinnerEndHour,
          bfICR,
          lhICR,
          dnICR,
          crr,
        };

        await userDocRef.set(data, { merge: true });

        console.log("Data saved successfully.");
        alert("Updated successfully");
        navigation.navigate("Home");
      } else {
        console.log("No user is currently logged in.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
        {next ? (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Enter Breakfast ICR"
              value={bfICR}
              style={styles.input}
              onChangeText={(e) => setBfICR(e)}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Enter Lunch ICR"
              value={lhICR}
              style={styles.input}
              onChangeText={(e) => setLhICR(e)}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Enter Dinner ICR"
              value={dnICR}
              style={styles.input}
              onChangeText={(e) => setDnICR(e)}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Enter Correction Ratio"
              value={crr}
              style={styles.input}
              onChangeText={(e) => setCRR(e)}
              keyboardType="numeric"
            />
            <Button mode="contained" style={styles.button} onPress={handleNext}>
              Back
            </Button>
            <View style={styles.buttonContaier}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={handleSubmit}
                disabled={!bfICR || !lhICR || !dnICR || !crr}
              >
                Submit
              </Button>
            </View>
          </View>
        ) : (
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
              onChangeText={setWeight}
              keyboardType="numeric"
            />
            <TextInput
              label="Enter Height"
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
            <TextInput
              label="Enter Age"
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
            <View style={styles.hoursContainer}>
              <View style={styles.hoursRow}>
                <TextInput
                  label="Breakfast Start Hour"
                  style={[styles.halfWidthInput]}
                  value={breakfastStartHour}
                  onChangeText={setBreakfastStartHour}
                  keyboardType="numeric"
                />
                <TextInput
                  label="Breakfast End Hour"
                  style={[styles.halfWidthInput]}
                  value={breakfastEndHour}
                  onChangeText={setBreakfastEndHour}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.hoursRow}>
                <TextInput
                  label="Lunch Start Hour"
                  style={[styles.input, styles.halfWidthInput]}
                  value={lunchStartHour}
                  onChangeText={setLunchStartHour}
                  keyboardType="numeric"
                />
                <TextInput
                  label="Lunch End Hour"
                  style={[styles.input, styles.halfWidthInput]}
                  value={lunchEndHour}
                  onChangeText={setLunchEndHour}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.hoursRow}>
                <TextInput
                  label="Dinner Start Hour"
                  style={[styles.input, styles.halfWidthInput]}
                  value={dinnerStartHour}
                  onChangeText={setDinnerStartHour}
                  keyboardType="numeric"
                />
                <TextInput
                  label="Dinner End Hour"
                  style={[styles.input, styles.halfWidthInput]}
                  value={dinnerEndHour}
                  onChangeText={setDinnerEndHour}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleNext}
              disabled={
                !weight ||
                !height ||
                !age ||
                !breakfastStartHour ||
                !breakfastEndHour ||
                !lunchStartHour ||
                !lunchEndHour ||
                !dinnerStartHour ||
                !dinnerEndHour
              }
            >
              Next
            </Button>
          </View>
        )}
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
    color: "#a6e4d0",
  },
  buttonContaier: {
    paddingTop: 10,
    width: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
  },
  subheading: {
    fontSize: 15,
    marginBottom: 32,
  },
  hoursContainer: {
    width: "100%",
  },
  hoursRow: {
    flexDirection: "row",
  },
  halfWidthInput: {
    width: "49%",
    marginBottom: 10,
    marginEnd: 10,
  },
});

export default ProfileScreen;
