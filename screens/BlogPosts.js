import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BlogCard from '../components/BlogCard';


const BlogScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date-desc'); 
  const [catOpen, setCatOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  
  useEffect(() => {
    fetch('https://api.webflow.com/v2/sites/67b321ba94be4bec1017dd3e/collections/67bc7fca8b71ae1251ff919d/items', {
      headers: {
        Authorization : 'Bearer d5e27f5b9954bc3249d4377915a4fb6119b8701c0e22d43073be20b756fc4c79',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data.items) return console.error("Geen 'items' in response:", data);

        setPosts(data.items.map(item => ({
          id         : item._id,
          title      : item.fieldData.name,
          description: item.fieldData['post-summary'],       
          date       : new Date(item.createdOn).toLocaleDateString('nl-BE', {
            day: '2-digit', month: 'short', year: 'numeric'
          }),
          rawDate    : new Date(item.createdOn),
          image      : { uri: item.fieldData['main-image']?.url || '' },
          fullText   : item.fieldData['post-body'],
    
        })));
      })
      .catch(console.error);
  }, []);

  const filtered = posts.filter(p => {
    const matchCat   = selectedCategory ? p.category === selectedCategory : true;
    const matchSearch= p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === 'date-desc') return b.rawDate - a.rawDate;
    if (sortOption === 'date-asc')  return a.rawDate - b.rawDate;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>    
      <TextInput
        style={styles.search}
        placeholder="Zoek artikels..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.pickerRow}>
        <DropDownPicker
          open={sortOpen}
          value={sortOption}
          listMode="MODAL"
          items={[
            { label: 'Newest first', value: 'date-desc' },
            { label: 'Oldest first',   value: 'date-asc'  }
          ]}
          setOpen={setSortOpen}
          setValue={setSortOption}
          style={styles.picker}
        />

        <DropDownPicker
          open={catOpen}
          value={selectedCategory}
          listMode="MODAL"
          items={[
            { label: 'Alle categorieën', value: '' },
            ...[...new Set(posts.map(p => p.category))].map(c => ({ label: c, value: c })),
          ]}
          setOpen={setCatOpen}
          setValue={setCategory}
          style={styles.picker}
        />
      </View>

      <View style={styles.row}>
        {sorted.map((post, index) => (
          <BlogCard
            key={post.id || index}
            title={post.title}
            description={post.description}
            date={post.date}
            image={post.image}
            onPress={() => navigation.navigate('Artikel', post)}
          />
        ))}
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
    paddingBottom: 100,
  },
  scrollContainer: { paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  search: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 25,
    width: '100%',
  },
  picker: {
    backgroundColor: '#fff',
    flex: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20, // RN ≥ 0.74, anders margin op card
  },
});

export default BlogScreen;
