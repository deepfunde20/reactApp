import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const members = {
    "myGroup": {
        "id": 1,
        "groupName": "Hashirama",
        "image": "../avatar/man.png"
    },
    "member": [
        {
            "id": 1,
            "name": "Akash",
            "mobile": "9878899898",
            "email": "akas@gmail.com"
        },
        {
            "id": 2,
            "name": "onkar",
            "mobile": "9878899898",
            "email": "onkar@gmail.com"
        }
    ]
}


const MemberScreen = ({navigation, route}) =>{
    const id = route.params.groupId
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [groupMember, setGroupMember] = useState([]);
    const [groupId, setGroupId] = useState([]);
    const getGroupMember = async () =>{      
      setGroupId(route.params.groupId)
      
   
        const response = await fetch("http://192.168.1.106:9191/group/"+id).then(
          res => {

            // if(!res.ok)
            // {
            //   throw Error ("catch it ")
            // }
            
          return res.json()
          }
        ).then(data => {
          if("error" in data){
           
            throw Error (data.error)
          }else if("errorMessage" in data){
            throw Error (data.errorMessage)
          }
          console.log(data);
          setGroupMember(data);
      
          setIsLoaded(false);
          return data
        })
        .catch(error => {
         console.log(error.message);
        })
        
     

        // const myData = await response.json();
        
        //  setGroupMember(myData);
      
        // setIsLoaded(false);
      
         
      
      }
      

      useFocusEffect(
        React.useCallback(() => {
            getGroupMember();
        }, [])
      );

    footerComponent =()=>{
        return    <Button
        title="Add Member"
        onPress={()=> navigation.navigate("Contacts",
                    {
                        groupId: groupId
                    })}
    />
      }
    return(
       
           
            
            <View >
                  {isLoaded ? (<View style={styles.loader}><ActivityIndicator size="large" color="#0000ff" /></View>):
                  (<View>
            
               
                  <FlatList  
                   ListFooterComponent={footerComponent}
                    keyExtractor={(key) => {
                      return key.id;
                    }}
                    ItemSeparatorComponent={itemSeparator}
                    data={groupMember.member}
                 
                    renderItem={({ item,index }) =>     
                       
                      (
                        
                        <View style={styles.item}>
                           
                          <View style={styles.avatarContainer}>
                         
                           <Image source= {item.image} style={styles.avatar}></Image>
                          </View>         
                          <Text style={styles.name}>{item.name}</Text>
                          <Text style={styles.name}>{item.email}</Text>
                          
                          
                          <View >
                          
                            <TouchableOpacity style={{marginLeft:10}} onPress={()=> navigation.navigate("Meetings",
                            {
                                groupId: item.member.id
                            })}>
                             <Text>Delete</Text>
                            </TouchableOpacity>
                          </View>
            
                        
                        </View>
                        
                      )          
                    }
                  ></FlatList>
                     </View>
                     )  }
                  </View>
             
         
    );
    
}

export default MemberScreen;

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
})