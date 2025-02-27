import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';

import MediumRoastImage from '../assets/black-coffee-package.png';
import VanillaBlendImage from '../assets/pink-coffee-package.png';
import DecafRoastBlendImage from '../assets/blue-package.png';
import EspressoRoastBlendImage from '../assets/brown_tinted_coffee_package.png';

const products = [
  { id: 1, name: 'Medium Roast Blend', price: '€19.95', image: MediumRoastImage },
  { id: 2, name: 'Vanilla Blend', price: '€19.95', image: VanillaBlendImage },
  { id: 3, name: 'Decaf Roast Blend', price: '€19.95', image: DecafRoastBlendImage },
  { id: 4, name: 'Espresso Roast Blend', price: '€19.95', image: EspressoRoastBlendImage },
];

const HomeScreen = ( { navigation } ) => {
    return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>details</Text>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProductDetails')}>
        <Text style={styles.buttonText}>View All Products</Text>
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
        padding: 20,
        backgroundColor: 'rgba(138, 184, 134, 0.32)',
      },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
});


export default ProductDetails;