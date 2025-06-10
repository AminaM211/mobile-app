// screens/ProductDetails.js
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from '../components/WishlistItems';


const ProductDetails = ({ route }) => {
  const navigation = useNavigation();
  const { id, title, description, smallDescription, price, image } = route.params;
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : q));
  const total    = parseFloat(price) * quantity;

  const [liked, setLiked] = useState(
    !!getWishlist().find(i => i.id === id)
  );
  
  /* toggle-handler */
  const toggleWishlist = () => {
    if (liked) {
      removeFromWishlist(id);      // haal eruit
    } else {
      addToWishlist({
        id,
        title,
        price: parseFloat(price),
        image: { uri: image.url },
      });
    }
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.wishBtn} onPress={toggleWishlist}>
        <MaterialCommunityIcons
          name={liked ? 'heart' : 'heart-outline'}
          size={35}
          color={liked ? 'red' : 'black'}
        />
      </Pressable>


      <Image source={{ uri: image.url }} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.smallDescription}>{smallDescription}</Text>
      <Text style={styles.price}>€{price}</Text>

      <View style={styles.qtyRow}>
        <TouchableOpacity onPress={decrease} style={styles.qtyBtn}>
          <Text style={styles.qtyTxt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{quantity}</Text>
        <TouchableOpacity onPress={increase} style={styles.qtyBtn}>
          <Text style={styles.qtyTxt}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sum}>
      <Text style={styles.total}>Total: €{total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.cartBtn}>
        <Image style={styles.btnImgCart} source={require('../assets/cart.png')}/>
        <Text style={styles.btnTxt}>Add to Cart</Text>
      </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container:   { 
    flex: 1, 
    padding: 20, 
    alignItems: 'center'
   },
  image:       { 
    width: 300, 
    height: 300, 
    marginTop: 20
  },
  title:       { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  description: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginVertical: 5 
  },
  smallDescription: { 
    fontSize: 14, 
    textAlign: 'center', 
    margin: 20,
    fontVariant: ['small-caps'],
  },
  price:       { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#3e2d22', 
    textAlign: 'center', 
    marginBottom: 20
  },
  qtyRow:      { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10 
  },
  qtyBtn:      { 
    backgroundColor: '#375c14', 
    paddingHorizontal: 15, 
    paddingVertical: 5, 
    borderRadius: 5 
  },
  qtyTxt:      { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: 'bold'
   },
  qty:         { 
    fontSize: 22,
    marginHorizontal: 20
   },
  total:       { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginTop: 15 
  },
  cartBtn:     { 
    backgroundColor: '#375c14', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 10,
     marginTop: 20, 
     flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  btnTxt:      { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600'
  },
  pressable:      { 
    width: 40, 
    height: 33, 
    position: 'absolute',
    top: 30,
    right: 30,
  },
  highlight: {
    image: require('../assets/cart.png'),
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnImgCart:      { 
    width: 24, 
    height: 24, 
    marginLeft: 10 
  },
  wishBtn: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 1,
  },
  sum: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default ProductDetails;
