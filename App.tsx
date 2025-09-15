import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import Login from './src/screens/Login/Login';
import TabNavigator from './src/navigation/TabNavigator';
import colors from './src/assets/colors/colors';
import { Text } from "react-native";

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="main" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
     </SafeAreaView>
  );
}

export default App;
