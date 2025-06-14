import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, Platform, ToastAndroid, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  addToCart,
} from '../components/WishlistItems';

const toast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

const ProductCard = ({ id, title, smallDescription, price, image, onPress, showButton = true }) => {
  const navigation = useNavigation();

  const [liked, setLiked] = useState(
    !!getWishlist().find(i => i.id === id)
  );

  const onAddCart = () => {
      addToCart({ id, title, price: +price, image: { uri: image.url }, smallDescription });
      navigation.navigate('Cart');
    };
    
    const toggleWishlist = () => {
      if (liked) {
        removeFromWishlist(id); 
        toast('Removed from wishlist');
      } else {
        addToWishlist({
          id,
          title,
          price: parseFloat(price),
          image: image?.url ? { uri: image.url } : image,
        });
        toast('Added to wishlist');
      }
      setLiked(!liked);
    };
  return (  
  <View style={styles.card}>
    <Pressable style={styles.wishBtn} onPress={toggleWishlist}>
        <MaterialCommunityIcons
          name={liked ? 'heart' : 'heart-outline'}
          size={25}
          color={liked ? 'red' : 'black'}
        />
      </Pressable>
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
    wishBtn: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },
});

export default ProductCard;
