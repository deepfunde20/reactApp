import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {UserId} from "../AppStack"


const ChatScreen = ({navigation}) =>{

 
    const [groupName, onChangeText] = useState();
    const [image, setImage] = useState();

    const [isLoaded, setIsLoaded] = useState(false);

    

    const allImages = [
      {
        id: 1,
        image: require("../../Group_Icons/business.png")
      
      },
      {
        id: 2,
        image: require("../../Group_Icons/family1.png")
      },
      {
        id: 3,
        image: require("../../Group_Icons/family2.png")
      },
      {
        id: 4,
        image: require("../../Group_Icons/family3.png")
      },
      {
        id: 5,
        image: require("../../Group_Icons/family4.png")
      },
      {
        id: 6,
        image: require("../../Group_Icons/family5.png")
      },
      {
        id: 7,
        image: require("../../Group_Icons/family6.png")
      },
      {
        id: 8,
        image: require("../../Group_Icons/family7.png")
      },
      {
        id: 9,
        image: require("../../Group_Icons/feast.png")
      },
      {
        id: 10,
        image: require("../../Group_Icons/friends.png")
      },
      {
        id: 11,
        image: require("../../Group_Icons/friends2.png")
      },
      {
        id: 12,
        image: require("../../Group_Icons/friends3.png")
      },
      {
        id: 13,
        image: require("../../Group_Icons/friends4.png")
      },
      {
        id: 14,
        image: require("../../Group_Icons/home1.png")
      },
      {
        id: 15,
        image: require("../../Group_Icons/home2.png")
      },
      {
        id: 16,
        image: require("../../Group_Icons/home3.png")
      },
      {
        id: 17,
        image: require("../../Group_Icons/home4.png")
      },
      {
        id: 18,
        image: require("../../Group_Icons/office.png")
      },{
        id: 19,
        image: require("../../Group_Icons/office2.png")
      },
      {
        id: 20,
        image: require("../../Group_Icons/office3.png")
      },
      {
        id: 21,
        image: require("../../Group_Icons/office4.png")
      },
      {
        id: 22,
        image: require("../../Group_Icons/work.png")
      },
      {
        id: 23,
        image: require("../../Group_Icons/work2.png")
      },
      {
        id: 24,
        image: require("../../Group_Icons/work3.png")
      },
      {
        id: 25,
        image: require("../../Group_Icons/work4.png")
      },
    ];

 
    const [memberId, setUserId] = useState();

    const uuuid = useContext(UserId)
   // const uuuid= userId;
    // AsyncStorage.getItem('userId').then(val => setUserId(val))

    const [groupMember, setGroupMember] = useState([]);
    const getGroupMember = async () =>{      
      try {
       const response = await fetch("http://192.168.1.106:9191/member/allMember/"+uuuid);
       const myData = await response.json();
      
       setGroupMember(myData);
  
      } catch (error) {
        console.log(error)
      }
    }

    useFocusEffect(
      React.useCallback(() => {
          getGroupMember();
      }, [])
    );



    const addConatactApi = async () =>{

        
        try {
            fetch('http://192.168.1.106:9191/group/createGroup', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  groupName: groupName,
                  image: image
                  
                }),
              }).then((res)=>res.json()).
              then(data => {
               let newGroupId = data.id
                console.log("This is group id "+ newGroupId);

               
                console.log("Adding this memebter to group "+ uuuid);
                fetch('http://192.168.1.106:9191/group/'+newGroupId+'/addMember', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        memberId: memberId,
                        userId:uuuid
                      
                      
                    }),
                  })
               

                  navigation.navigate("Groups")
              });             
              
        } catch (error) {
          console.log(error)
        }    
      }
    return(
      <View style={styles.mainContainer}>
<View style={styles.decription}>
  <Text>You can add contacts here which further can be added in groups</Text>
  <View style={styles.inputContainer}>
    <Text style={styles.labels}>Group Name</Text>
    
<TextInput
        style={styles.inputStyle}
        onChangeText={onChangeText}
        value={groupName}
        autoCapitalize="words"
        placeholder='Enter Group Name'
      />
  </View>
  <Text style={styles.labels}>Select Group Icon</Text>
          <FlatList

            data={allImages}
            keyExtractor={(key) => {
              return key.id;
            }}
            horizontal
            renderItem={({ item }) =>

            (

              <View style={styles.item}>
                <TouchableOpacity onPress={() => { setImage(item.image); }}>
                  <View style={styles.avatarContainer}>

                    <Image source={item.image} style={styles.avatar}></Image>
                  </View>

                </TouchableOpacity>

              </View>

            )
            }
          ></FlatList>

<Text style={styles.labels}>Select first Member</Text>
          <FlatList

            data={groupMember}
            keyExtractor={(key) => {
              return key.id;
            }}
            horizontal
            renderItem={({ item }) =>

            (

              <View style={styles.item}>
                <TouchableOpacity onPress={() => {setUserId(item.id) }}>
                  <View style={styles.avatarContainer}>

                    <Image source={item.image} style={styles.avatar}></Image>
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>

              </View>

            )
            }
          ></FlatList>




 

<TouchableOpacity onPress={addConatactApi} style={styles.buttonContainer4}>

<Text style={styles.buttonText}>Add Group</Text>
</TouchableOpacity>
</View>
</View>
    );
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      mainContainer:{
        height: "100%",
        paddingHorizontal: 30,
        paddingTop: 30,
        backgroundColor: "$fff",
      },
      mainHeader:{
        fonstSize: 25,
        color: "#344055",
        fontWeight: "500",
        paddingTop: 10,
        paddingBottom: 10,
        textTransform: "capitalize",
        fontFamily: 'bold',
      },
      decription:{
        fontSize: 20,
        color: "#7d7d7d",
        paddingBottom: 10,
        lineHeight: 15,
        

      },
      inputContainer:{
        marginTop: 5,
      },
      labels:{
        fontSize: 18,
        color: "black",
        marginTop: 5,
        marginBottom: 5,
        lineHeight: 20,
       
      
      },
      inputStyle:{
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.3)",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 1,
      
        fontSize:18,
      },
      buttonContainer4:{
        marginVertical: 5,
        height: 50,
        merginHorizotal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#5d57ff',
      },
      buttonText:{
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
      },
      date:{
        width:'50%',
        height:50,
        borderWidth: 1,
        borderRadius:20,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        
      },
      avatar:{
        height:55,
        width:55,
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
        alignItems:'center',
        marginRight:10
      },
})