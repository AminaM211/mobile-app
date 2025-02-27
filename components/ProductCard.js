import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react"; // âœ… Correcte import
import ProductCard from "../components/ProductCard"; 

const ProductDetails = ({ route }) => {
  const { title, description, price, image } = route.params; // Ontvang de productgegevens
  const [quantity, setQuantity] = useState(1); // âœ… Correcte useState declaratie

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const totalPrice = price * quantity;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Details</Text>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>â‚¬{price}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{quantity}</Text>

        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>

        <Text style={styles.totalPrice}>Total: ${price * quantity}</Text>

      </View>

      

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eae3c8",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3e2d22",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3e2d22",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3e2d22",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  quantityButton: {
    backgroundColor: "#3e2d22",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3e2d22",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3e2d22",
  },
});

export default ProductDetails;