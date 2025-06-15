// context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

 const login = async (email, password) => {
  try {
    const response = await fetch('http://192.168.29.112:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      setUserToken(data.token);
      await AsyncStorage.setItem('userToken', data.token);
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong during login.');
  }
};

  // ✅ Logout Function
  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  // ✅ Check Login Status (on app start)
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    setLoading(false);
  };

  // ✅ Register Function (NEW)
  const register = async (email, password, navigation) => {
    try {
      const response = await fetch('http://192.168.29.112:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
          navigation.navigate('Login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('Something went wrong during registration.');
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
