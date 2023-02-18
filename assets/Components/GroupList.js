import React, {useEffect, useState} from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity
} from "react-native";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import DetailsScreen from "./Screens/DetailsScreen";

export default function GroupList() {

  const navigation = useNavigation()
 
  itemSeparator = () => {
    return <View style={styles.separator}></View>;
  };


const [myUserData, setMyUserData] = useState();

const [isLoaded, setIsLoaded] = useState(true);


const getUserDate = async () =>{
  try {
  // const response = await fetch("http://192.168.1.106:9191/group/member/1");
  // const myData = await response.json();

  const myData = [
    {
      id: 1,
      groupName: "Dee",
    },
    {
      id: 2,
      groupName: "Appdirect",
    },
    {
      id: 3,
      groupName: "College",
    }
  ];

  setMyUserData(myData);

  setIsLoaded(false);

  } catch (error) {
    console.log(error)
  }
}

//useFocusEffect(()=>{getUserDate();});


useFocusEffect(
  React.useCallback(() => {
    getUserDate();
  }, [])
);

  headerComponent =()=>{
    return <Text style={styles.listHeadline}>Groups</Text>
  };
 
  return (  
    <View >
      {isLoaded ? (<View style={styles.loader}><ActivityIndicator size="large" color="#0000ff" /></View>):
      (<View>

   
      <FlatList  
        keyExtractor={(key) => {
          return key.id;
        }}
        ItemSeparatorComponent={itemSeparator}
        data={myUserData}
     
        renderItem={({ item,index }) =>          
          (
            <View style={styles.item}>
              <View style={styles.avatarContainer}>
             
               <Image source= {require("../avatar/man.png")} style={styles.avatar}></Image>
              </View>         
              <Text style={styles.name}>{item.groupName}</Text>
              <View >
                <TouchableOpacity onPress={(()=> navigation.navigate(DetailsScreen))}>
                 <Text>Group Details</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          )          
        }
      ></FlatList>
         </View>)  }
      </View>
  );
}

const styles = StyleSheet.create({
  listHeader:{
    height:55,
    alignItems: 'center',
    justifyContent: 'center'
  },
listHeadline:{
  color:'#333',
  fontSize:21,
  fontWeight:'bold'
},
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
  },
  item:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:13,
  },
  avatarContainer:{
    backgroundColor:'#D9D9D9',
    borderRadius:100,
    height: 89,
    width:89,
    justifyContent:'center',
    alignItems:'center'
  },
  avatar:{
    height:55,
    width:55,
  },
  name:{
    fontWeight:'600',
    fontSize:16,
    marginLeft:13,
  },
  loader:{
    minHeight: "100%",
    display: "flex",
    justifyContent:"center",
    alignItems:"center"
  }
});
