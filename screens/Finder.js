import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

const Finder = ({ navigation }) => {
    {/* navigatie naar de productenpagina, blog, wishlist en cart */}
    return (
        <ImageBackground
            source={require('../assets/bg.png')}
            style={styles.background}
        >
        <Text style={styles.h1}>Welcome</Text>
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Image
                        source={require('../assets/cart.png')}
                        style={{ width: 40, height: 40 }}
                    />
                    <Text style={styles.buttonText}>Cart</Text>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        gap: 20,
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
        shadowColor: '#fff',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.95,
        
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        position: 'absolute',
        top: 130,
        //cute font
        fontFamily: 'roboto',
        letterSpacing: 2,
    },
});

export default Finder;