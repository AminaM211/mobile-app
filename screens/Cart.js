import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { getCart, incrQty, decrQty, removeFromCart} from '../components/WishlistItems';
import { useNavigation } from '@react-navigation/native';

export default function Cart() {
  const [items, setItems] = useState(getCart());
  const navigation = useNavigation();
  const refresh = () => setItems([...getCart()]); //refresht de cart door een nieuwe array te maken en de state te updaten
  
 
  // { TOTALE PRIJS BEREKENEN }
  const total = useMemo( // berekent de totale prijs van de items in de cart
    () => items.reduce((s, i) => s + i.price * i.qty, 0), // telt de prijs van elk item * de hoeveelheid allemaal samen op 
    [items] // enkel als items verandert
  );

  // { EMPTY STATE SCREEN ALS ER GEEN ITEMS IN CART ZIJN }
  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Image
          source={require('../assets/emptyState.png')}
          style={{ width: 70, height: 82, marginBottom: 20 }}
        />
        <Text style={styles.emptyTxt}>Your cart is empty</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Products')}>
          <Text style={styles.emptyBtn}>Bekijk producten</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // { RIJEN VAN DE ITEMS IN CART }
  const Row = ({ item }) => (
    <View style={styles.row}>
      <Image source={item.image} style={styles.img} />
      <View style={styles.rowContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.smallDescription}>{item.smallDescription}</Text>
        <Text style={styles.price}>€ {item.price.toFixed(2)}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => { decrQty(item.id); refresh(); }}>
            <Text style={styles.qtyBtn}>—</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.qty}</Text>
          <TouchableOpacity onPress={() => { incrQty(item.id); refresh(); }}>
            <Text style={styles.qtyBtn}>＋</Text>
          </TouchableOpacity>
        </View>
      
      <TouchableOpacity style={styles.removeBtn} onPress={() => { removeFromCart(item.id); refresh(); }}>
        <Image
          source={require('../assets/remove.png')}
          style={{ width: 22, height: 22}}></Image>
        <Text style={styles.remove}>remove item</Text>
      </TouchableOpacity>
      </View>
    </View>
  );

  return (  
    <View style={ styles.foot }>
      <FlatList data={items} keyExtractor={i => i.id} renderItem={Row} />
      <View style={styles.footer}>
        <Text style={styles.total}>Totaal: € {total.toFixed(2)}</Text>
        <TouchableOpacity>
          <Text style={styles.checkout}>Continue to check out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f7f7f7',
    },
    empty: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    emptyTxt: { 
        fontSize: 18, 
        color: '#555', 
        marginTop: 8 
    },
    emptyBtn: {
      marginTop: 18,
      backgroundColor: '#375c14',
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 8,
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
    foot: {
      flex: 1,
      backgroundColor: '#f7f7f7',
    },
  
    row: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginHorizontal: 16,
      paddingHorizontal: 20,
      marginVertical: 6,
      padding: 14,
      paddingTop: 30,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },

    rowContent: {
        flex: 1,
        gap: 4,
        marginLeft: 14,
        paddingTop: 0,
    },

    smallDescription: {
        fontSize: 14, 
        fontVariant: ['small-caps'],  
        paddingRight: 50,     
        
     },

    img:   { 
        width: 100, 
        height: 100, 
        borderRadius: 10, 
        marginRight: 14,
        
    },
    title: { 
        fontSize: 18, 
        marginBottom: 2, 
        color: '#333' 
    },
    price: { 
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
        },
  
  qtyRow:      { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 0,
    
  },
  qtyBtn:      { 
    backgroundColor: '#879D72', 
    width: 25,
    textAlign: 'center',
    height: 25,
    borderRadius: 5,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  qtyTxt: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold',
   },
  qty:         { 
    fontSize: 18,
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
   },
  
    remove: { 
        fontSize: 16, 
        color: '#000', 
        paddingLeft: 10,
        textDecorationLine: 'underline',
    },

    removeBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
    },
  
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 40,
      paddingTop: 25,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: -2 },
      elevation: 6,
    },
    total:    { 
        flex: 1, 
        fontSize: 18, 
        fontWeight: '700', 
        color: '#333' 
    },
    checkout: {
      backgroundColor: '#375c14',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      color: '#fff',
      fontSize: 15,
      fontWeight: '600',
    },
  });
  