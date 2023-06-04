import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../pages/homeScreen";
import LoginScreen from "../../pages/loginScreen";
import { LightTheme } from "../../utils/theme";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
