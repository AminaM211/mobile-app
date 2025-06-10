import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen.js";
import ProductDetails from "./screens/ProductDetails.js";
import BlogPosts from "./screens/BlogPosts.js";
import BlogPostDetails from "./screens/BlogPostDetails.js";
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const Stack = createStackNavigator();

 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductDetails} />
        <Stack.Screen name="Onze Blog" component={BlogPosts} />
        <Stack.Screen name="Artikel" component={BlogPostDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}