import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductCard = ({ title, description, price, image, onPress, showButton = true }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <Text style={styles.price}>{price}</Text>
    {showButton && (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Add To Cart</Text>
      </TouchableOpacity>
    )}
  </View>
);

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
    button: {
        backgroundColor: "#375c14",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginTop: 15,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default ProductCard;
