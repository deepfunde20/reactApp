import { Button, StyleSheet, Text, View } from "react-native"

const OnboardingScreen = ({navigation}) => {

    return (

        <View style={styles.container}>
            <Text>Onboarding Screen</Text>
            <Button
            title="Click here"
            onPress={()=> navigation.navigate("Login")}
            
            />
        
        </View>
    )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});