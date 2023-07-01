import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearFoodItemResults } from "../redux/actions/actions";
import * as actionTypes from "../redux/actions/actionTypes";
import axios from "axios";

const AddFood = ({ navigation }) => {
  const dispatch = useDispatch();
  const foodItem = useSelector((state) => state.api);
  const user = useSelector((state) => state.user);
  const addFoodItem = useSelector((state) => state.addFood);
  const [foodDetails, setFoodDetails] = useState(null);
  const [servingCount, setServingCount] = useState(1);
  const [totalCarbs, setTotalCarbs] = useState(null);

  console.log("addFoodItem", addFoodItem);

  useEffect(() => {
    if (foodItem) {
      setFoodDetails(foodItem.foodItem);
      dispatch(clearFoodItemResults());
    }
  }, []);

  // Function to handle incrementing the serving count
  const incrementServingCount = () => {
    setServingCount(servingCount + 1);
  };

  // Function to handle decrementing the serving count
  const decrementServingCount = () => {
    if (servingCount > 1) {
      setServingCount(servingCount - 1);
    }
  };

  const calculateCarbs = (items) => {
    let totalCarbs = 0;
    if (items.length > 0) {
      items.map((x) => {
        let carbs = x.foodNutrients.find((y) => {
          return y.number == 205;
        });
        let itemCarbs = carbs.amount * x.count;
        totalCarbs = totalCarbs + itemCarbs;
      });
    }
    return totalCarbs;
  };

  const addFood = (item, count) => {
    let allItems = addFoodItem.foodItems ? addFoodItem.foodItems : [];
    let check = allItems?.find((x) => x.fdcId == item.fdcId);
    if (!check) {
      let params = [
        ...allItems,
        {
          ...item,
          count: count,
        },
      ];
      dispatch(actionTypes.AddFoodItem(params));
      navigation.goBack();
    }
  };

  const saveFood = async () => {
    let totalCarbs = calculateCarbs(addFoodItem.foodItems);
    let params = {
      userId: user?.user?.uid,
      mealItems: addFoodItem.foodItems,
      totalCarbs: totalCarbs,
      mealType: "Breakfast",
    };
    console.log("params :: ", params);
    await axios
      .post("http://127.0.0.1:3000/api/submitData", params)
      .then(() => {
        console.log("Data submitted successfully.");
      })
      .catch((e) => {
        console.log("Error : ", e);
      });
  };

  return (
    <View style={styles.container}>
      {foodDetails?.fdcId ? (
        <Card style={styles.card}>
          <Card.Content>
            <Title>{foodDetails.description}</Title>
            {foodDetails?.foodNutrients?.map((item) => {
              return (
                <View key={item?.number}>
                  <Paragraph>Nutrient: {item.name}</Paragraph>
                  <Paragraph>
                    Amount: {item.amount}
                    {item.unitName}
                  </Paragraph>
                </View>
              );
            })}
            <View style={styles.servingContainer}>
              <Text variant="titleMedium">Number of Servings: </Text>
              <IconButton
                icon="minus-circle-outline"
                size={30}
                onPress={decrementServingCount}
              />
              <Text style={styles.servingText}>{servingCount}</Text>
              <IconButton
                icon="plus-circle-outline"
                size={30}
                onPress={incrementServingCount}
              />
            </View>
            {/* Display other required information here */}
          </Card.Content>
          <Card.Actions>
            {totalCarbs > 0 ? <Text>Total Carbs : {totalCarbs}</Text> : null}
            <Button
              mode="contained"
              onPress={() => addFood(foodDetails, servingCount)}
            >
              Add Food
            </Button>
          </Card.Actions>
        </Card>
      ) : null}
      <Button mode="contained" onPress={() => saveFood()}>
        Save Food
      </Button>
    </View>
  );
};

export default AddFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  actions: {
    marginTop: 8,
    justifyContent: "space-between",
  },
  servingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  servingContainer: {
    paddingTop: 20,
    flexDirection: "row",
  },
});
