// screens/ProductDetails.js
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addToWishlist } from '../components/WishlistItems';

const ProductDetails = ({ route }) => {
  const navigation = useNavigation();
  const { title, description, smallDescription, price, image } = route.params;
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : q));
  const total    = parseFloat(price) * quantity;

  const handleWishlist = () => {
    addToWishlist({
      key: title,
      title,
      price: parseFloat(price),
      image: { uri: image.url },
    });
    navigation.navigate('Wishlist');
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.total}>Totaal: €{total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.cartBtn}>
        <Text style={styles.btnTxt}>In winkelwagen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.wishBtn} onPress={handleWishlist}>
        <Text style={styles.btnTxt}>❤️ Wishlist</Text>
      </TouchableOpacity>

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
    width: 250, 
    height: 250, 
    margin: 40
  },
  title:       { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 10 
  },
  description: { 
    fontSize: 16, 
    color: '#666', 
    textAlign: 'center', 
    marginVertical: 5 
  },
  smallDescription: { 
    fontSize: 14, 
    textAlign: 'center', 
    marginBottom: 6 
  },
  price:       { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#3e2d22', 
    textAlign: 'center' 
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
    fontSize: 20, 
    fontWeight: 'bold'
   },
  qty:         { 
    fontSize: 20,
    marginHorizontal: 20
   },
  total:       { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginTop: 10 
  },
  cartBtn:     { 
    backgroundColor: '#375c14', 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 10,
     marginTop: 20 
    },
  wishBtn:     { 
    backgroundColor: '#8e3b78', 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 10, 
    marginTop: 12 
  },
  btnTxt:      { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600'
   },
});

export default ProductDetails;
