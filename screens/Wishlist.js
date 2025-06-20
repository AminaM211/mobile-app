import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { getWishlist, removeFromWishlist } from '../components/WishlistItems';
import { useFocusEffect } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

const Wishlist = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState(getWishlist());

  useFocusEffect( // useFocusEffect zorgt ervoor dat de wishlist wordt bijgewerkt wanneer de gebruiker terugkeert naar deze pagina
    React.useCallback(() => {
      setItems([...getWishlist()]);
    }, [])
  );

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Image
          source={require('../assets/emptyState.png')}
          style={{ width: 70, height: 82, marginBottom: 20 }}
        />
        <Text style={styles.emptyTxt}>Je wishlist is leeg</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <Text style={styles.emptyBtn}>Bekijk producten</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      numColumns={2}
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {console.log('Wishlist image:', item.image)}
          <Image source={item.image} style={styles.img} />
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity
            onPress={() => {
              removeFromWishlist(item.id);
              setItems([...getWishlist()]);
            }}
          >
            <Text style={styles.remove}>×</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  empty:   { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  emptyTxt:{ 
    fontSize: 18, 
    // fontWeight: 'bold',
  },

  emptyBtn:{
    fontSize: 14, 
    color: 'white', 
    fontWeight: 'bold',
    marginTop: 15,
    backgroundColor: '#375c14', 
    paddingVertical: 12, 
    paddingHorizontal: 15, 
    borderRadius: 5,
  }, 

  container: { 
    padding: 20, 
  },
  card: {
    margin: 10,
    backgroundColor: '#fff',
    height: 240,
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    width: "45%",
  },

  img: { 
    width: 150, 
    height: 180, 
    borderRadius: 4, 
    marginBottom: -20,
    textAlign: 'center',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: '600', 
    flex: 1,
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
  },
  remove:{ 
    fontSize: 30, 
    color: '#c00', 
    paddingLeft: 8, 
    right: 0,
    top: -220,
    zIndex: 999,
    position: 'absolute',
  },
  
});

export default Wishlist;
