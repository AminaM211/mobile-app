import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ title, smallDescription, price, image, onPress, showButton = true }) => {
  const navigation = useNavigation();
  return (  
  <View style={styles.card}>
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.smallDescription}>{smallDescription}</Text>
    <Text style={styles.price}>{price}</Text>
  </TouchableOpacity>
  </View>

  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f4f4f4",
        borderRadius: 10,
        width: "70%",
        padding: 20,
        alignItems: "center",
        marginBottom: 15,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 15,
        color: "#666",
        marginVertical: 5,
        textAlign: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3e2d22",
        textAlign: 'center',
    },
});

export default ProductCard;
