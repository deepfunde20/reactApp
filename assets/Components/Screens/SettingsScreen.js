import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";


const SettingsScreen = ({navigation}) =>{
    return(
<View style={styles.container}>
    <Text> Settings Screen </Text>
    <Button
        title="Logout"
        onPress={()=> navigation.navigate("Login")}
    />
</View>
    );
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    }
})