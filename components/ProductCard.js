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
        backgroundColor: "rgba(240, 221, 197, 0.60)",
        borderRadius: 10,
        width: 170,
        height: 270,
        padding: 5,
        alignItems: "center",
        marginBottom: 15,
        textAlign: 'center',
        justifyContent: 'center',
    },
    smallDescription : {
        fontSize: 14,
        marginVertical: 7,
        marginHorizontal: 10,
        textAlign: 'center',
    },

    image: {
        width: 120,
        height: 130,
        borderRadius: 8,
        marginLeft:25,
        marginTop: 0,
        paddingHorizontal: 10,
        // paddingVertical: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginVertical: 5,
        textAlign: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2a4b10",
        textAlign: 'center',
    },
});

export default ProductCard;
