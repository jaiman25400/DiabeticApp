import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, List, Text } from "react-native-paper";
import axios from "axios";
import { useSelector } from "react-redux";

const HistoryScreen = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const user = useSelector((state) => state.user);
  const [userDates, setUserDates] = useState([]);
  const [userMealData, setUserMealData] = useState();
  useEffect(() => {
    console.log("User Id ::", user);
    const fetchUserDates = async () => {
      axios
        .get("http://127.0.0.1:3000/api/userDates", {
          params: {
            userId: user?.user?.uid,
          },
        })
        .then((res) => {
          console.log("Dates :", res);
          setUserDates(res.data);
        })
        .catch((err) => {
          console.log("Err", err);
        });
    };
    fetchUserDates();
  }, []);

  // Dummy data for demonstration
  const historyData = [
    { day: "2023-07-06", carbs: { breakfast: 25, lunch: 45, dinner: 30 } },
    { day: "2023-07-07", carbs: { breakfast: 35, lunch: 55, dinner: 40 } },
    { day: "2023-07-08", carbs: { breakfast: 40, lunch: 50, dinner: 35 } },
  ];

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    console.log("Day ::", day);
    axios
      .get("http://127.0.0.1:3000/api/getDataByDate", {
        params: {
          userId: user?.user?.uid,
          mealDate: day,
        },
      })
      .then((res) => {
        console.log("Data :", res);
        setUserMealData(res.data);
      })
      .catch((err) => {
        console.log("err :", err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carbs Consumption History</Text>
      <List.Section>
        <List.Subheader>Select a day to view carbs consumption:</List.Subheader>
        {userDates.map((data) => (
          <List.Item
            key={data.mealDate}
            title={data.mealDate}
            onPress={() => handleDaySelect(data.mealDate)}
            style={selectedDay === data.mealDate && styles.selectedItem}
          />
        ))}
      </List.Section>
      {selectedDay && (
        <View style={styles.selectedDayContainer}>
          <Text style={styles.selectedDayText}>
            Selected day: {selectedDay}
          </Text>
          <Text>
            Breakfast:{" "}
            {userMealData.mealType == "Breakfast"
              ? userMealData.totalCarbs
              : "0"}
            g
          </Text>
          <Text>
            Lunch:{" "}
            {userMealData.mealType == "Lunch" ? userMealData.totalCarbs : "0"}{" "}
          </Text>
          <Text>
            Dinner:{" "}
            {userMealData.mealType == "Dinner" ? userMealData.totalCarbs : "0"}{" "}
          </Text>
        </View>
      )}
      <Button
        mode="contained"
        onPress={() => setSelectedDay(null)}
        style={styles.clearButton}
      >
        Clear Selection
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  selectedItem: {
    backgroundColor: "#F2F2F2",
  },
  selectedDayContainer: {
    marginTop: 16,
  },
  selectedDayText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  clearButton: {
    marginTop: 16,
  },
});

export default HistoryScreen;
