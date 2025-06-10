import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://api.webflow.com/v2/sites/67b321ba94be4bec1017dd3e/products', {
      headers: {
        Authorization: 'Bearer d5e27f5b9954bc3249d4377915a4fb6119b8701c0e22d43073be20b756fc4c79', // <-- persoonlijke token
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) {
          console.error("Geen 'items' gevonden in response:", data);
          return;
        }

        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            price: (item.skus[0]?.fieldData?.price?.value || 0) / 100,
            image: { url: item.skus[0]?.fieldData?.['main-image']?.url || '' },
          }))
        );
      })
      .catch((err) => console.error('API fout:', err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alle producten</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.row}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={`€${product.price}`}
              image={{ uri: product.image.url }}
              onPress={() => navigation.navigate('ProductDetails', product)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
