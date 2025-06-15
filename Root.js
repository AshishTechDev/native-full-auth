import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';

import { AuthProvider, AuthContext } from './context/AuthContext';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import VerifyOtpScreen from './screens/VerifyOtpScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const RootStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

function AppNavigator() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <>
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <>
          <AppStack.Screen name="Login" component={LoginScreen} />
          <AppStack.Screen name="Register" component={RegisterScreen} />
          <AppStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <AppStack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        </>
      )}
    </AppStack.Navigator>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="AppNav" component={AppNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
