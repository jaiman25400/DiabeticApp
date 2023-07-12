import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { firebase } from "../config";
import { useSelector, useDispatch } from "react-redux";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const addFoodLog = (tag) => {
    navigation.navigate("ViewFoodItem", {
      tag: tag,
    });
  };

  const userStateInfo = useSelector((state) => state);
  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const uid = user.uid;
        console.log("UIDD :", uid);
        const userDocRef = firebase.firestore().collection("users").doc(uid);
        const userProfRef = firebase
          .firestore()
          .collection("userProfile")
          .doc(uid);

        const userDoc = await userDocRef.get();
        const userProf = await userProfRef.get();

        if (userDoc.exists) {
          const user = { uid };
          dispatch({ type: "Login", payload: user });
          const userData = userDoc.data();
          dispatch({
            type: "userData",
            payload: { userData },
          });
        } else {
        }

        if (userProf.exists) {
          const userProfData = userProf.data();
          dispatch({
            type: "userProfileData",
            payload: { userProfData },
          });
        } else {
          console.log("User Prof data data not found.");
        }
      }
    };

    fetchUserData();
  }, []);

  console.log("HomeScreen :", userStateInfo);
  const [carbsConsumed, setCarbsConsumed] = useState(0);
  const totalCarbsGoal = 500;

  const handleButtonPress = (carbs) => {
    setCarbsConsumed(carbsConsumed + carbs);
  };

  const calculateCycleProgress = () => {
    return (carbsConsumed / totalCarbsGoal) * 30;
  };

  return (
    <View style={styles.container}>
      <View style={styles.cycleContainer}>
        <View style={styles.cycle}>
          <View
            style={[
              styles.cycleProgress,
              { transform: [{ rotate: `${calculateCycleProgress()}deg` }] },
            ]}
          />
          <Text
            style={styles.cycleText}
          >{`${carbsConsumed} / ${totalCarbsGoal} Carbs`}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.breakfastButton]}
          onPress={() => addFoodLog("Breakfast")}
          contentStyle={styles.buttonContent}
        >
          Breakfast
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.lunchButton]}
          onPress={() => addFoodLog("Lunch")}
          contentStyle={styles.buttonContent}
        >
          Lunch
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.dinnerButton]}
          onPress={() => addFoodLog("Dinner")}
          contentStyle={styles.buttonContent}
        >
          Dinner
        </Button>
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.snackButton]}
          onPress={() => handleButtonPress(50)}
          contentStyle={styles.buttonContent}
        >
          Snack
        </Button>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "10%",
    padding: 16,
  },
  cycleContainer: {
    marginBottom: "10%",
  },
  cycle: {
    width: 200,
    height: 200,
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cycleProgress: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 100,
    backgroundColor: "#1e90ff",
    opacity: 0.7,
    transformOrigin: "center center",
  },
  cycleText: {
    fontSize: 18,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -9 }],
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    justifyContent: "center",
  },
  buttonContent: {
    height: 65,
    width: 340,
  },
  breakfastButton: {
    backgroundColor: "#008b8b",
  },
  lunchButton: {
    backgroundColor: "#4CAF50",
  },
  dinnerButton: {
    backgroundColor: "#2f4f4f",
  },
  snackButton: {
    backgroundColor: "#6a5acd",
  },
});

export default HomeScreen;
