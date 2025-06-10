import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

const Finder = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/bg.png')} // Replace with your background image path
            style={styles.background}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Products')}
                >
                    <Image
                        source={require('../assets/shop.png')}
                        style={{ width: 50, height: 50 }}
                    />
                    <Text style={styles.buttonText}>Shop Products</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Onze Blog')}
                >
                    <Image
                        source={require('../assets/blog.png')}
                        style={{ width: 50, height: 50 }}
                    />
                    <Text style={styles.buttonText}>Our Blog</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Wishlist')}
                >
                    <Image
                        source={require('../assets/wishlist.png')}
                        style={{ width: 35, height: 40 }}
                    />
                    <Text style={styles.buttonText}>Wishlist</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'left',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#000',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#375c14',
        width: 150,
        height: 150,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        shadowColor: '#375c14',
        shadowOffset: {
            width: 7,
            height: 7,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
    },
});

export default Finder;