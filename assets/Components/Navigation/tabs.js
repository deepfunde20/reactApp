import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from "react-native";
import HomeScreen from '../Screens/HomeScreen';
import FindScreen from '../Screens/FindScreen'
import PostScreen from '../Screens/PostScreen'
import SettingsScreen from '../Screens/SettingsScreen'
import ChatScreen from '../Screens/ChatScreen'
import DetailsScreen from "../Screens/DetailsScreen";
import Contacts from "../Screens/Contacts";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) =>(
    <TouchableOpacity
    style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ... styles.shadow
    }}
    onPress={onPress}
    
    >
    <View style={{
        width:70,
        height: 70,
        borderRadius: 35,
         backgroundColor:'#e32f45'   }}>
        {children}
    </View>

    </TouchableOpacity>
)



const Tabs =()=>{

    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: 
            { position: 'absolute',
            bottom: 25,
            left:20,
            right: 20,
            elevation: 0,
            backgroundColor: '#ffffff', 
            borderRadius: 15,
            height: 90,
            ... styles.shadow

         },
            tabBarShowLabel: false
          }}
        >
            <Tab.Screen name ="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent:'center', top:10}}>
                        <Image
                        source={require('../../icons/Home2.png')}
                        resizeMode= 'contain'
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45': '#748c94'
                        }}

                        />

                        <Text 
                        style={{color: focused ? '#e32f45': '#748c94' , fontSize:12}}
                        >Home</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name ="Contacts" component={Contacts}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent:'center', top:10}}>
                        <Image
                        source={require('../../icons/Search.png')}
                        resizeMode= 'contain'
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45': '#748c94'
                        }}

                        />

                        <Text 
                        style={{color: focused ? '#e32f45': '#748c94' , fontSize:12}}
                        >Contacts</Text>
                    </View>
                )
            }}/>



            <Tab.Screen name ="Groups" component={PostScreen}
            
            options={({ navigation })=>({
                headerTitleAlign:"center",
                tabBarIcon: ({focused}) => (
                   
                    <View>
                    <Image
                    source={require('../../icons/Groups.png')}
                    resizeMode= 'contain'
                    style={{
                        width:30,
                        height:30,
                        tintColor: '#fff'
                    }}  />
                    
                    </View>
           
                ),
                tabBarButton: (props) =>(
                    <CustomTabBarButton {...props} />
                )
            })}
            />
            <Tab.Screen name ="Settings" component={SettingsScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent:'center', top:10}}>
                        <Image
                        source={require('../../icons/Settings.png')}
                        resizeMode= 'contain'
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45': '#748c94'
                        }}

                        />

                        <Text 
                        style={{color: focused ? '#e32f45': '#748c94' , fontSize:12}}
                        >Settings</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name ="Chat" component={ChatScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent:'center', top:10}}>
                        <Image
                        source={require('../../icons/Chat.png')}
                        resizeMode= 'contain'
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45': '#748c94'
                        }}

                        />

                        <Text 
                        style={{color: focused ? '#e32f45': '#748c94' , fontSize:12}}
                        >Chat</Text>
                    </View>
                )
            }}
            />


        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default Tabs;