import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItem,
} from "@react-navigation/drawer";
import { LightTheme } from "../../utils/theme";
import HomeScreen from "../../pages/homeScreen";
import LoginScreen from "../../pages/loginScreen";
import HeaderLogo from "../../ui/headerLogo";
import { firebase } from "../../config";
import React, { useEffect, useState } from "react";
import signupScreen from "../../pages/signupScreen";
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();

export default function NavigationStack() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const userState = useSelector((state) => state.user.user);

  function onAuthStateChanged(user) {
    setUser(user);
    if (isLoading) setIsLoading(false);
  }

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    console.log("UserEff Navi");
    const unsubscribe = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    return unsubscribe;
  }, [userState]);

  if (isLoading) {
    // Show a loading spinner or splash screen while checking the user's authentication status
    return null;
  }

  return (
    <NavigationContainer theme={LightTheme}>
      {user && user?.emailVerified ? (
        <>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitle: (props) => <HeaderLogo {...props} />,
              }}
            />

            <Drawer.Screen name="Logout" options={{ drawerLabel: () => null }}>
              {() => (
                <View>
                  {" "}
                  Hello
                  <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Drawer.Screen>
          </Drawer.Navigator>{" "}
        </>
      ) : (
        <Drawer.Navigator>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Signup" component={signupScreen} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
