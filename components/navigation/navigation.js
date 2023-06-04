import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LightTheme } from "../../utils/theme";
import HomeScreen from "../../pages/homeScreen";
import LoginScreen from "../../pages/loginScreen";
import HeaderLogo from "../../ui/headerLogo";
import DrawerIcon from "../drawer/drawerIcon";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: (props) => <HeaderLogo {...props} />,
            headerLeft: (props) => <DrawerIcon {...props} />,
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
