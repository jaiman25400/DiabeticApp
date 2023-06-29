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

const AddFood = () => {
  const dispatch = useDispatch();
  const foodItem = useSelector((state) => state.api);
  const user = useSelector((state) => state.user);
  const [foodDetails, setFoodDetails] = useState(null);
  const [servingCount, setServingCount] = useState(1);
  const [totalCarbs, setTotalCarbs] = useState(null);

  useEffect(() => {
    console.log(foodItem);
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

  const addFood = (item, count) => {
    console.log("savedFood:", item, count);
    console.log("user", user);
  };

  const saveFood = () => {};

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
      <Button
        mode="contained"
        onPress={() => SaveFood(foodDetails, servingCount)}
      >
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
