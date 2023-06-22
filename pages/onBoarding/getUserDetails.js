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
import { useSelector, useDispatch } from "react-redux";
import { firebase } from "../../config";

const GetUserDetails = ({ navigation }) => {
  const userState = useSelector((state) => state.user);

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

  useEffect(() => {}, []);

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
        dispatch({
          type: "UpdateUserFlag",
          payload: { ...userState, isFirstTimeLogin: false },
        });
        console.log("Data saved successfully.", data);
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
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleSubmit}
              disabled={!bfICR || !lhICR || !dnICR || !crr}
            >
              Submit
            </Button>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Title style={styles.title}>
              Please Fill Out Below Information First
            </Title>
            <TextInput
              placeholder="Enter Weight"
              value={weight}
              style={styles.input}
              onChangeText={(e) => setWeight(e)}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Enter Height"
              value={height}
              style={styles.input}
              onChangeText={(e) => setHeight(e)}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Enter Age"
              value={age}
              style={styles.input}
              onChangeText={(e) => setAge(e)}
              keyboardType="numeric"
            />
            <View style={styles.hoursContainer}>
              <View style={styles.hoursRow}>
                <TextInput
                  placeholder="Breakfast Start Hour"
                  value={breakfastStartHour}
                  style={[styles.halfWidthInput]}
                  onChangeText={(e) => setBreakfastStartHour(e)}
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="Breakfast End Hour"
                  value={breakfastEndHour}
                  style={[styles.halfWidthInput]}
                  onChangeText={(e) => setBreakfastEndHour(e)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.hoursRow}>
                <TextInput
                  placeholder="Lunch Start Hour"
                  value={lunchStartHour}
                  style={[styles.input, styles.halfWidthInput]}
                  onChangeText={(e) => setLunchStartHour(e)}
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="Lunch End Hour"
                  value={lunchEndHour}
                  style={[styles.input, styles.halfWidthInput]}
                  onChangeText={(e) => setLunchEndHour(e)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.hoursRow}>
                <TextInput
                  placeholder="Dinner Start Hour"
                  value={dinnerStartHour}
                  style={[styles.input, styles.halfWidthInput]}
                  onChangeText={(e) => setDinnerStartHour(e)}
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="Dinner End Hour"
                  value={dinnerEndHour}
                  style={[styles.input, styles.halfWidthInput]}
                  onChangeText={(e) => setDinnerEndHour(e)}
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

export default GetUserDetails;
