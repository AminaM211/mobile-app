import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BlogCard from '../components/BlogCard';


const BlogScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]); // opgeladen posts opslagen in een array
  const [selectedCategory, setCategory] = useState(''); // bewaart welke categorie je kiest
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date-desc'); 
  const [catOpen, setCatOpen] = useState(false); // dropdown start op dicht
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
        // nadat de data is opgehaald, stop je de objecten in een array setPosts, 
        // zodat `posts` die array wordt en het scherm de blogCards kan laten zien
        setPosts(data.items.map(item => ({
          id         : item._id,
          title      : item.fieldData.name,
          description: item.fieldData['post-summary'],       
          date       : new Date(item.createdOn).toLocaleDateString('nl-BE', {
            day: '2-digit', month: 'short', year: 'numeric' // data in NL-BE formaat
          }),
          rawDate    : new Date(item.createdOn), // voor sortering
          image      : { uri: item.fieldData['main-image']?.url || '' }, 
          fullText   : item.fieldData['post-body'],
          category  : item.fieldData.category?.[0] || '',

        })));
      })
      .catch(console.error);
  }, []);

  const filtered = posts.filter(p => {
    const matchCat   = selectedCategory ? p.category === selectedCategory : true; // Als er een categorie gekozen is, houd alleen de posts met diezelfde categorie; anders toon alle posts.
    const matchSearch= p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // maakt eerst een kopie van filtered, en sorteert die op datum
  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === 'date-desc') return b.rawDate - a.rawDate;
    if (sortOption === 'date-asc')  return a.rawDate - b.rawDate;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>   
    {/*  SEARCH BAR  */}
      <TextInput
        style={styles.search}
        placeholder="Zoek artikels..."
        value={searchQuery}
        onChangeText={setSearchQuery} // elke keer je in het zoekveld typt,geeft die de nieuwe tekst door aan setSearchQuery, waardoor de zoek-state direct wordt bijgewerkt.

      />
    {/*  SORTEREN  */}
      <View style={styles.pickerRow}>
        <DropDownPicker
          open={sortOpen}
          value={sortOption}
          listMode="MODAL"
          items={[
            { label: 'Newest first', value: 'date-desc' },
            { label: 'Oldest first',   value: 'date-asc'  }
          ]}
          setOpen={setSortOpen} // open of dicht
          setValue={setSortOption} // zet de waarde van de dropdown
          style={styles.picker}
        />

    {/*  CATEGORIEEN  */}
        <DropDownPicker
          open={catOpen}
          value={selectedCategory}
          listMode="MODAL" 
          items={[
            { label: 'Alle categorieën', value: '' },
            ...[...new Set(posts.map(p => p.category))].map(c => ({ label: c, value: c })), // categorieën uit posts halen 
          // en een array van objecten maken in label en value formaat voor de dropdown
          ]} 
          setOpen={setCatOpen}
          setValue={setCategory}
          style={styles.picker}
        />
      </View>

      {/*  BLOG CARDS  */}
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
