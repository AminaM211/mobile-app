import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BlogCard = ({ title, description, date, image, onPress = true }) => {
  const navigation = useNavigation();
  return (  
  <View style={styles.card}>
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image source={image} style={styles.image} />
    <View style={styles.div}>
    <Text style={styles.date}>{date}</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.button}>
      <Text style={styles.buttonText}>Read more →</Text>
    </View>
    </View>
  </TouchableOpacity>
  </View>

  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f4f4f4",
        borderRadius: 10,
        width: "80%",
        marginBottom: 10,
    },
    smallDescription: {
        fontSize: 14,
    },

    div: {
        padding: 25,
    },

    image: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        marginBottom: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    description: {
        fontSize: 15,
        color: "#666",
        marginVertical: 5,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2a4b10",
        textAlign: 'center',
    },
});

export default BlogCard;
