import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, List } from "react-native-paper";

const ViewFoodItem = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const [foodItems, setFoodItems] = useState([]);

  const getFoodItems = async () => {
    let params = {
      userId: user?.user?.uid
        ? user?.user?.uid
        : "GNpgaWPeOGZBsSDxf23lrDnCGUt2", // static for now , fiberbase error
      mealType: "Breakfast",
    };
    await axios
      .get(
        `http://127.0.0.1:3000/api/getDataByMealType/Date?userId=${params.userId}&mealType=${params.mealType}`
      )
      .then((res) => {
        setFoodItems(res?.data ? res?.data?.mealItems : []);
        console.log("Data:", res, res?.data ? res?.data?.mealItems : []);
      })
      .catch((e) => {
        console.log("Error : ", e);
      });
  };

  useEffect(() => {
    getFoodItems();
  }, []);

  const getCarbs = (item) => {
    let carbs = 0;
    carbs = item.foodNutrients.find((y) => {
      return y.number == 205;
    });
    return carbs ? carbs.amount : 0;
  };

  const onAddFood = (TAG) => {
    navigation.navigate("FoodSearch", {
      tag: TAG,
    });
  };

  const RightListView = ({ item }) => {
    return (
      <View>
        <Text>Quantity: {item?.count}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <List.Section style={styles.listSection}>
        <List.Subheader>
          {" "}
          <Text style={styles.message}>My Food Items</Text>
        </List.Subheader>
        {foodItems?.map((item, index) => (
          <List.Item
            key={index}
            title={item.description}
            description={`Carbs: ${getCarbs(item)}`}
            right={() => <RightListView item={item} />}
          />
        ))}
      </List.Section>
      <Button style={styles.buttonStyle} onPress={onAddFood}>
        Add Food
      </Button>
    </View>
  );
};

export default ViewFoodItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  message: {
    fontSize: 24,
    marginBottom: 16,
  },
  listSection: {
    marginBottom: 16,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
