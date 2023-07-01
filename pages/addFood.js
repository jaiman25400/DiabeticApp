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
import AddCarbsModal from "../ui/addCarbsModel";

const AddFood = ({ navigation }) => {
  const dispatch = useDispatch();
  const foodItem = useSelector((state) => state.api);
  const user = useSelector((state) => state.user);
  const addFoodItem = useSelector((state) => state.addFood);
  const [modalVisible, setModalVisible] = useState(false);
  const [foodDetails, setFoodDetails] = useState(null);
  const [servingCount, setServingCount] = useState(1);
  const [carbs, setCarbs] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [carbUnit, setCarbUnit] = useState("");

  useEffect(() => {
    if (foodItem) {
      setFoodDetails(foodItem.foodItem);
      dispatch(clearFoodItemResults());
      let carbs = foodItem.foodItem?.foodNutrients?.find(
        (x) => x.number == 205
      );
      setCarbs(carbs.amount.toFixed(2));
      setTotalCarbs(carbs.amount.toFixed(2));
      setCarbUnit(carbs.unitName);
    }
  }, []);

  // Function to handle incrementing the serving count
  const incrementServingCount = () => {
    setTotalCarbs(carbs * (servingCount + 1).toFixed(2));
    setServingCount(servingCount + 1);
  };

  // Function to handle decrementing the serving count
  const decrementServingCount = () => {
    if (servingCount > 1) {
      setTotalCarbs((carbs * (servingCount - 1)).toFixed(2));
      setServingCount(servingCount - 1);
    }
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

  const handleSaveCarbs = (carbs) => {
    setModalVisible(false);
    let currentData = foodDetails?.foodNutrients?.find((x) => {
      return x.number == 205;
    });
    let newData = { ...currentData, amount: Number(carbs) };
    let newArray = [];
    newArray = foodDetails?.foodNutrients.map((item) => {
      if (item.number == 205) {
        return newData;
      } else {
        return item;
      }
    });
    let newFoodDetails = { ...foodDetails, foodNutrients: newArray };
    addFood(newFoodDetails, 1);
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
                  <Paragraph>
                    {item.name} : {item.amount}
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
            <View style={styles.servingContainer}>
              <Text variant="titleMedium">Total Carbs: </Text>
              <Text style={styles.servingText}>
                {totalCarbs} {carbUnit}
              </Text>
            </View>
            <Button onPress={() => setModalVisible(true)}>
              Add Carbs Manually?
            </Button>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => addFood(foodDetails, servingCount)}
            >
              Add To Cart
            </Button>
          </Card.Actions>
        </Card>
      ) : null}
      <AddCarbsModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onSave={handleSaveCarbs}
      />
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
    alignItems: "center",
  },
});
