import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';

import MediumRoastImage from '../assets/black-coffee-package.png';
import VanillaBlendImage from '../assets/pink-coffee-package.png';
import DecafRoastBlendImage from '../assets/blue-package.png';
import EspressoRoastBlendImage from '../assets/brown_tinted_coffee_package.png';

const products = [
  { id: 1, name: 'Medium Roast Blend', price: '19.95', image: MediumRoastImage },
  { id: 2, name: 'Vanilla Blend', price: '19.95', image: VanillaBlendImage },
  { id: 3, name: 'Decaf Roast Blend', price: '19.95', image: DecafRoastBlendImage },
  { id: 4, name: 'Espresso Roast Blend', price: '19.95', image: EspressoRoastBlendImage },
];

const HomeScreen = ({ navigation }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>BESTSELLERS</Text> 
    {products.map((product) => (
      <ProductCard
        key={product.id}
        title={product.name}
        description="A delicious coffee blend."
        price={`€${product.price}`}
        image={product.image}
        onPress={() => navigation.navigate('ProductDetails', { 
          title: product.name, 
          description: 'A delicious coffee blend.',
          price: product.price, 
          image: product.image 
        })}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#375c14',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
