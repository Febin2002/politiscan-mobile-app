import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, SplashScreen,WelcomeScreen } from "../screens";
const stack=createStackNavigator()

const Navigators=()=>{
    return(
        <NavigationContainer>
            <stack.Navigator screenOptions={{headerShown:false}}>
                <stack.Screen name="splash" component={SplashScreen} />
                <stack.Screen name="welcome" component={WelcomeScreen}/>
                <stack.Screen name="login" component={LoginScreen}/>
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigators