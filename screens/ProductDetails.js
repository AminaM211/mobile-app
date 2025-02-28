import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const ProductDetails = ({ route }) => {
  const { title, description, price, image} = route.params;
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
  const totalPrice = parseFloat(price) * quantity;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>€{price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalPrice}>Total: €{totalPrice.toFixed(2)}</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3e2d22",
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: "#bea395",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 20,
    margin: 20,
  },
  totalPrice: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 0,
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#375c14",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetails;
