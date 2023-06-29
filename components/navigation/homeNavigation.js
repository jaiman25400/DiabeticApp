import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../pages/homeScreen";
import FoodSearch from "../../pages/foodSearch";
import AddFood from "../../pages/addFood";

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FoodSearch" component={FoodSearch} />
      <Stack.Screen name="AddFood" component={AddFood} />
    </Stack.Navigator>
  );
}
