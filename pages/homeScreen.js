import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const addFoodLog = (TAG) => {
    navigation.navigate("FoodSearch", {
      tag: TAG,
    });
  };

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
          onPress={() => addFoodLog("BREAKFAST")}
        >
          Breakfast - 100 Carbs
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.lunchButton]}
          onPress={() => handleButtonPress(150)}
        >
          Lunch - 150 Carbs
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.dinnerButton]}
          onPress={() => handleButtonPress(200)}
        >
          Dinner - 200 Carbs
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.snackButton]}
          onPress={() => handleButtonPress(50)}
        >
          Snack - 50 Carbs
        </Button>
      </View>
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
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginHorizontal: 8,
    justifyContent: "center",
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
