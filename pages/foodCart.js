import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, List, Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { calculateCarbs } from "../utils/nutritionCalculation";
import axios from "axios";

const FoodCart = ({ navigation, route }) => {
  const { tag } = route?.params;
  const user = useSelector((state) => state.user);
  const foodItems = useSelector((state) => state.addFood);
  const totalCarbs = calculateCarbs(foodItems?.foodItems);

  const onSave = async () => {
    let params = {
      userId: user?.user?.uid
        ? user?.user?.uid
        : "GNpgaWPeOGZBsSDxf23lrDnCGUt2", // static for now , fiberbase error
      mealItems: foodItems.foodItems,
      totalCarbs: totalCarbs,
      mealType: tag,
    };
    await axios
      .post("http://127.0.0.1:3000/api/submitData", params)
      .then(() => {
        console.log("Data submitted successfully.");
        navigation.navigate("HomeScreen");
      })
      .catch((e) => {
        console.log("Error : ", e);
      });
  };

  const getCarbs = (item) => {
    let carbs = 0;
    carbs = item.foodNutrients.find((y) => {
      return y.number == 205;
    });
    return carbs ? carbs.amount : 0;
  };

  const EmptyCart = () => {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.message}>Your cart is empty!</Text>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Go Back
        </Button>
      </View>
    );
  };

  const RightListView = ({ item }) => {
    return (
      <View>
        <Text>Quantity: {item?.count}</Text>
      </View>
    );
  };

  const Content = () => {
    return (
      <>
        <List.Section style={styles.listSection}>
          <List.Subheader>
            {" "}
            <Text style={styles.message}>My Food</Text>
          </List.Subheader>
          {foodItems?.foodItems?.map((item, index) => (
            <List.Item
              key={index}
              title={item.description}
              description={`Carbs: ${getCarbs(item)}`}
              right={() => <RightListView item={item} />}
            />
          ))}
        </List.Section>

        <Divider />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total Carbs: {totalCarbs ? totalCarbs?.toFixed(2) : 0} g
          </Text>
          <Button onPress={onSave} mode="contained" style={styles.saveButton}>
            Save
          </Button>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {foodItems?.foodItems?.length > 0 ? <Content /> : <EmptyCart />}
    </View>
  );
};

export default FoodCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyCartContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  message: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: "50%",
  },
  listSection: {
    marginBottom: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  totalText: {
    fontSize: 18,
  },
  saveButton: {
    marginLeft: 16,
  },
});
