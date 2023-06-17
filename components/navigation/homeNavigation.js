import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../pages/homeScreen";
import FoodSearch from "../../pages/foodSearch";

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
    </Stack.Navigator>
  );
}
