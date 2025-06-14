// BlogDetails.js
import React, { useEffect, useState } from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import BlogCard from '../components/BlogCard';


const BlogDetailsScreen = ({ route }) => {
  const { id, title, date, image, fullText } = route.params;  
  const [loading, setLoading] = useState(true);

const cleanBody = fullText
        .replace(/<\/p>/g, '\n\n')
        .replace(/<[^>]+>/g, '')

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      {image?.uri ? (
        <Image source={image} style={styles.image} />
      ) : null}

      <Text style={styles.date}>{date}</Text>
      <Text style={styles.summary}>{cleanBody}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
},
  content:{ 
    padding: 24, 
    paddingBottom: 40 
},
  image:     
  {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  date:      { fontSize: 14, color: '#666', marginBottom: 20 },
  title:     { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  summary:   { fontSize: 16, marginBottom: 0, lineHeight: 22 },
  body:      { fontSize: 16, lineHeight: 24 },
});

export default BlogDetailsScreen;
