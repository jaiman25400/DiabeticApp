import React from "react";
import { Button, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchFoodList } from "../redux/actions/actions";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const appState = useSelector((state) => state);
  const dispatch = useDispatch();

  const [list, setlist] = useState(null);

  useEffect(() => {
    appState?.api?.foodList ? setlist(appState?.api?.foodList) : null;
    console.log(appState);
  }, [appState]);

  const getList = () => {
    const params = {
      dataType: ["Foundation", "SR Legacy"],
      pageSize: 25,
      pageNumber: 2,
      sortBy: "dataType.keyword",
      sortOrder: "asc",
    };
    dispatch(fetchFoodList(params));
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Food List" onPress={getList} />
    </View>
  );
}
