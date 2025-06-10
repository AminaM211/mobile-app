import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Finder = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Products')}
            >
                <Image
                    source={require('../assets/shop.png')}
                    style={{ width: 100, height: 100 }}
                />
                <Text style={styles.buttonText}>Shop Products</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Onze Blog')}
            >
                <Text style={styles.buttonText}>Our Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Wishlist')}
            >
                <Text style={styles.buttonText}>Wishlist</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button:{ 
        backgroundColor: '#375c14', 
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',  
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Finder;