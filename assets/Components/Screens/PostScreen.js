import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from "react-native";
import GroupList from "../GroupList";
import {UserId} from "../AppStack"

const PostScreen = ({navigation}) =>{

    
  itemSeparator = () => {
    return <View style={styles.separator}></View>;
  };


const [myUserData, setMyUserData] = useState();

const [isLoaded, setIsLoaded] = useState(true);

const [userId, setUserId] = useState();

const uuuid = useContext(UserId)
const getUserDate = async () =>{
  
  
  try {

   

  const response = await fetch("http://192.168.1.106:9191/group/member/"+uuuid);
  const myData = await response.json();
  console.log(myData);
  console.log(uuuid);
  
    
  // const myData = [
  //   {
  //     id: 1,
  //     groupName: "Dee",
  //   },
  //   {
  //     id: 4,
  //     groupName: "Appdirect",
  //   },
  //   {
  //     id: 8,
  //     groupName: "College",
  //   }
  // ];

  setMyUserData(myData);

  setIsLoaded(false);

  } catch (error) {
    console.log(error)
  }
}

useFocusEffect(
  React.useCallback(() => {
    AsyncStorage.getItem('userId').then(val => setUserId(val))
    getUserDate();
  }, [])
);

  headerComponent =()=>{
    return(
      <View> 
    <Text style={styles.listHeadline}>Groups</Text>
    <Button title="Create Group">Create Group</Button>
    </View>
    )
  };
  
    return(
<View >

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
             
               <Image source= {item.image} style={styles.avatar}></Image>
              </View>         
              <Text style={styles.name}>{item.groupName}</Text>
              <View >
                <TouchableOpacity style={{marginLeft:10}} onPress={()=> navigation.navigate("Meetings",
                {
                    groupId: item.id
                })}>
                 <Text>Group Details</Text>
                </TouchableOpacity>
              </View>

              <View >
                <TouchableOpacity style={{marginLeft:10}}  onPress={()=> navigation.navigate("MemberScreen",
                {
                    groupId: item.id
                })}>
                 <Text>Members</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          )          
        }
      ></FlatList>
         </View>)  }
      </View>
 
</View>
    );
}

export default PostScreen;

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