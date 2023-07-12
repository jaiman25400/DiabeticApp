import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Divider, Subheading, Text } from "react-native-paper";
import { firebase } from "../config";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [totalCarbs, setTotalCarbs] = useState([]);

  const addFoodLog = (tag) => {
    navigation.navigate("ViewFoodItem", {
      tag: tag,
    });
  };

  const getCarbsDetails = async (user) => {
    let params = {
      userId: user ? user : "GNpgaWPeOGZBsSDxf23lrDnCGUt2", // static for now , fiberbase error
    };
    await axios
      .get(
        `http://127.0.0.1:3000/api/homeScreenCarbDetails?userId=${params.userId}`
      )
      .then((res) => {
        console.log("Data:", res);
        setTotalCarbs(res.data?.length > 0 ? res?.data : []);
      })
      .catch((e) => {
        console.log("Error : ", e);
      });
  };

  const userStateInfo = useSelector((state) => state);
  useEffect(() => {
    const user = firebase.auth().currentUser;
    const fetchUserData = async () => {
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
    getCarbsDetails(user?.uid);
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

  const getTotalCarbs = (tag) => {
    let carbs = totalCarbs?.find((x) => x.mealType == tag)?.totalCarbs;
    return carbs ? `  (Carbs - ${carbs}g)` : null;
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
          {getTotalCarbs("Breakfast")}
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
          {getTotalCarbs("Lunch")}
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
          {getTotalCarbs("Dinner")}
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
    justifyContent: "flex-start",
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
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
  },
});

export default HomeScreen;
