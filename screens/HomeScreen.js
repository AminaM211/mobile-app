import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import ProductCard from '../components/ProductCard';
import DropDownPicker from 'react-native-dropdown-picker';

const categoryNames = {
  "": "Alle Categorieën",
  "68415e959e0f15c79d1b54d2": "Decaf",
  "68415e42bdf40cb91bb04a6d": "Caffeinated",
};

const HomeScreen = ({ navigation }) => { 
  const [products, setProducts] = useState([]); //Houdt  lijst van producten bij die op het homescreen komen
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); //Houdt bij wat de gebruiker intypt in de zoekbalk
  const [sortOption, setSortOption] = useState('price-asc'); // default sort by price ascending
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

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
            description: item.product.fieldData.description,
            smallDescription: item.product.fieldData['made-with'],
            price: (item.skus[0]?.fieldData?.price?.value || 0) / 100,
            image: { url: item.skus[0]?.fieldData?.['main-image']?.url || '' },
            category: categoryNames[item.product.fieldData.category[0]] || 'Onbekend',
          }))
        );
      })
      .catch(console.error);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'name-asc') return a.title.localeCompare(b.title);
    if (sortOption === 'name-desc') return b.title.localeCompare(a.title);
  });


  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Alle Producten</Text> */}
      <TextInput
        style={styles.search}
        placeholder="Zoek producten..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.pickerCard}>
        <DropDownPicker
          open={sortDropdownOpen}
          value={sortOption}
          listMode="MODAL"
          items={[
            { label: 'Ascending price', value: 'price-asc' },
            { label: 'Descending price', value: 'price-desc' },
            { label: 'Sort from A-Z', value: 'name-asc' },
            { label: 'Sort from Z-A', value: 'name-desc' },
          ]}
          setOpen={setSortDropdownOpen}
          setValue={setSortOption}
          style={styles.picker}
        />
        <DropDownPicker
          open={categoryDropdownOpen}
          value={selectedCategory}
          listMode="MODAL"
          items={[
            { label: 'All', value: '' },
            ...[...new Set(products.map((p) => p.category))].map((category) => ({
              label: category,
              value: category,
            })),
          ]}
          setOpen={setCategoryDropdownOpen}
          setValue={setSelectedCategory}
          style={styles.picker}
        />
      </View>
      <View contentContainerStyle={styles.scrollContainer}>
        <View style={styles.row}>
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id} // Add the unique key prop here
              id={product.id}
              title={product.title}
              smallDescription={product.smallDescription}
              price={`€${product.price}`}
              image={{ uri: product.image.url }}
              onPress={() => navigation.navigate('Product Details', product)}
            />
          ))}
        </View>
      </View>       
    </ScrollView>
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
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
    gap: 10,
    marginBottom: 100,
    marginLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: 10,
    flex: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  search: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  pickerCard: {
    flexDirection: 'row',
    gap: 35,
    width: '45%',
    marginBottom: 30,
  },

});

export default HomeScreen;
