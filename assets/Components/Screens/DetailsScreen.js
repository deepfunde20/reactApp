import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const meetingData =[
  {
      "id": 8,
      "groupId": 3,
      "meetingName": "Friends",
      "time": "02/02/2023 09:24:27",
      "scheduledTime": "12-2-2023 11:40:03 AM"
  },
  {
      "id": 9,
      "groupId": 3,
      "meetingName": "Society meet",
      "time": "02/02/2023 09:25:32",
      "scheduledTime": "6-2-2023 1:45:33 AM"
  },
  {
      "id": 10,
      "groupId": 3,
      "meetingName": "Emergency Meet",
      "time": "02/02/2023 09:27:17",
      "scheduledTime": "27-2-2023 7:50:44 AM"
  }
]

    
itemSeparator = () => {
    return <View style={styles.separator}></View>;
  };

  
  headerComponent =()=>{
    return <Text style={styles.listHeadline}>Groups</Text>
  };

 

  

const DetailsScreen = ({navigation, route}) =>{
    const id = route.params.groupId
    
const [myUserData, setMyUserData] = useState();

const getUserDate = async () =>{
    try {
     const response = await fetch("http://192.168.1.106:9191/meeting/group/"+id);
     const myData = await response.json();
    setMyUserData(myData);
    } catch (error) {
      console.log(error)
    }
  }

  footerComponent =()=>{
    return    <Button
    title="Add Meeting"
    onPress={()=> navigation.navigate("AddMeeting",
                {
                    groupId: id
                })}
/>
  }
   
  
useFocusEffect(
    React.useCallback(() => {
      getUserDate();
    }, [])
  );
    return(
<View style={styles.container}>
<FlatList  
        keyExtractor={(key) => {
          return key.id;
        }}
        ItemSeparatorComponent={itemSeparator}
        data={myUserData}
        headerComponent={headerComponent}
        ListFooterComponent={footerComponent}
        
        renderItem={({ item,index }) =>          
          (
            <View style={styles.item}>
              <View style={styles.avatarContainer}>
             
               <Image source= {require("../../avatar/woman.png")} style={styles.avatar}></Image>
              </View>         
              <Text style={styles.name}>{item.meetingName}</Text>
              <Text style={styles.name}>{item.scheduledTime}</Text>
            </View>           
          )          
        }
      ></FlatList>
     
</View>
    );
}

export default DetailsScreen;

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
    },
    footer: {
      backgroundColor: "blue",
      padding: 40
    }
  });