import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  ActivityIndicator,
  Button,
  Divider,
  List,
  Text,
} from "react-native-paper";

const ViewFoodItem = ({ navigation, route }) => {
  const user = useSelector((state) => state.user);
  const { tag } = route?.params;
  const [foodItems, setFoodItems] = useState([]);
  const [totalCarbs, setTotalCarbs] = useState("");
  const [insulinDose, setInsulinDose] = useState(0);
  const [loading, setLoading] = useState(false);

  const getFoodItems = async () => {
    let params = {
      userId: user?.user?.uid,
      mealType: tag,
    };
    setLoading(true);
    await axios
      .get(
        `https://diabeticapp-backend.onrender.com/api/getDataByMealType/Date?userId=${params.userId}&mealType=${params.mealType}`
      )
      .then((res) => {
        setLoading(false);
        setFoodItems(res?.data ? res?.data?.mealItems : []);
        setTotalCarbs(res?.data ? res?.data?.totalCarbs : "");
        setInsulinDose(res?.data ? res?.data?.insulinDose : 0);
        console.log("Data:", res, res?.data ? res?.data?.mealItems : []);
      })
      .catch((e) => {
        setLoading(false);
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

  const onAddFood = () => {
    navigation.navigate("FoodSearch", {
      tag: tag,
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
      {foodItems?.length > 0 ? (
        <List.Section style={styles.listSection}>
          <List.Subheader>
            {" "}
            <Text style={styles.message}>Today's {tag}</Text>
          </List.Subheader>
          {foodItems?.map((item, index) => (
            <List.Item
              key={index}
              titleEllipsizeMode="tail"
              titleNumberOfLines={5}
              title={item.description}
              description={`Carbs: ${getCarbs(item)}`}
              right={() => <RightListView item={item} />}
            />
          ))}
        </List.Section>
      ) : (
        <View style={styles.emptyCartContainer}>
          {loading ? (
            <ActivityIndicator size="large" style={styles.activityIndicator} />
          ) : (
            <>
              <Text style={styles.message}>You have no Food Items!!</Text>
              <Button
                mode="contained"
                onPress={onAddFood}
                style={styles.button}
              >
                Add Food Here
              </Button>
            </>
          )}
        </View>
      )}
      <Divider />
      {foodItems?.length > 0 ? (
        <View style={styles.view}>
          <Text variant="titleMedium">
            Total Carbs Consumed - {totalCarbs} g
          </Text>
          {insulinDose > 0 ? (
            <Text variant="titleMedium">
              Total Insulin Dose - {insulinDose} g
            </Text>
          ) : null}
        </View>
      ) : null}
      <Button
        mode="contained"
        disabled
        style={styles.buttonStyle}
        onPress={onAddFood}
      >
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
  buttonStyle: {
    position: "absolute",
    bottom: 16,
    left: 8,
    right: 8,
    padding: 16,
  },
  view: {
    padding: 16,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
