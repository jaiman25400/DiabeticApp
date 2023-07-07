import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewFoodItem = () => {
  const user = useSelector((state) => state.user);

  const getFoodItems = async () => {
    let params = {
      userId: user?.user?.uid,
      mealType: "Breakfast",
    };
    await axios
      .get("http://127.0.0.1:3000/api/getDataByMealType/Date", params)
      .then((res) => {
        console.log("Data:", res);
      })
      .catch((e) => {
        console.log("Error : ", e);
      });
  };

  useEffect(() => {
    getFoodItems();
  }, []);

  return (
    <View>
      <Text>ViewFoodItem</Text>
    </View>
  );
};

export default ViewFoodItem;

const styles = StyleSheet.create({});
