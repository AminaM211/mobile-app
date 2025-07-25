import React, { use } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen.js";
import ProductDetails from "./screens/ProductDetails.js";
import BlogPosts from "./screens/BlogPosts.js";
import BlogPostDetails from "./screens/BlogPostDetails.js";
import Wishlist from "./screens/Wishlist.js";
import Finder from "./screens/Finder.js";
import Cart from "./screens/Cart.js";


const Stack = createStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen name="Home" component={Finder} />
        <Stack.Screen name="Products" component={HomeScreen} />
        <Stack.Screen name="Product Details" component={ProductDetails} />
        <Stack.Screen name="Onze Blog" component={BlogPosts} />
        <Stack.Screen name="Artikel" component={BlogPostDetails} />
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
      }