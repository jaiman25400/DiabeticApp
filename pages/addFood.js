import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearFoodItemResults } from "../redux/actions/actions";

const AddFood = () => {
  const dispatch = useDispatch();
  const foodItem = useSelector((state) => state.api);
  const user = useSelector((state) => state.user);
  const [foodDetails, setFoodDetails] = useState(null);
  const [servingCount, setServingCount] = useState(1);
  const [insulRatio, setInsulinRatio] = useState(null);

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

  const calculateInsulinRatio = (item, count) => {
    const insulinToCarb = 10;
    let carbs = 0;
    item?.foodNutrients?.map((item) => {
      if (item?.number == 205) {
        carbs = item?.amount;
      }
    });
    const totalCarbs = carbs * count;
    return totalCarbs / insulinToCarb;
  };

  const handleSaveFood = (item, count) => {
    console.log("savedFood:", item, count);
    console.log("user", user);
    const insulinIntake = calculateInsulinRatio(item, count);
    setInsulinRatio(insulinIntake ? insulinIntake : null);
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
                  <Paragraph>Type: {item.name}</Paragraph>
                  <Paragraph>
                    Nutrient: {item.amount}
                    {item.unitName}
                  </Paragraph>
                </View>
              );
            })}

            {/* Display other required information here */}
          </Card.Content>
          <Card.Actions>
            <IconButton
              icon="minus"
              size={20}
              onPress={decrementServingCount}
            />
            <Text style={styles.servingText}>{servingCount}</Text>
            <IconButton icon="plus" size={20} onPress={incrementServingCount} />
            <Button
              mode="contained"
              onPress={() => handleSaveFood(foodDetails, servingCount)}
            >
              Add Food
            </Button>
          </Card.Actions>
          {insulRatio ? (
            <Card.Content style={styles.totalCarbsContainer}>
              <Text style={styles.totalCarbsText}>
                Estimated Insulin Units : {insulRatio?.toFixed(2)} units
              </Text>
            </Card.Content>
          ) : null}
        </Card>
      ) : null}
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
  totalCarbsContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 8,
    alignItems: "center",
  },
  totalCarbsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
