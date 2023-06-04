import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LightTheme } from "../../utils/theme";
import HomeScreen from "../../pages/homeScreen";
import LoginScreen from "../../pages/loginScreen";
import HeaderLogo from "../../ui/headerLogo";

const Drawer = createDrawerNavigator();

export default function NavigationStack() {
  return (
    <NavigationContainer theme={LightTheme}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: (props) => <HeaderLogo {...props} />,
          }}
        />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
