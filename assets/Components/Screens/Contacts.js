import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {UserId} from "../AppStack"

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
let id = null;

const Contacts = ({navigation, route}) =>{

  const [fromTabs, setFromTabs] = useState(true);
  
  
    const [isLoaded, setIsLoaded] = useState(false);
    const [groupMember, setGroupMember] = useState([]);
    

    const uuuid = useContext(UserId)

    const getGroupMember = async () =>{      
        try {
         const response = await fetch("http://192.168.1.106:9191/member/allMember/"+uuuid);
         const myData = await response.json();
        
         setGroupMember(myData);

        setIsLoaded(false);
        if(route.params === undefined){
          setFromTabs(false)
          id=0
        }else{
          id = route.params.groupId
        }    
        } catch (error) {
          console.log(error)
        }
      }

      useFocusEffect(
        React.useCallback(() => {
            getGroupMember();
        }, [])
      );

    footerComponent =()=>{
        return    <Button
        title="Add Contact"
        onPress={()=> navigation.navigate("AddMember")}
    />
      }

      
    const addMemberApi = async (mId) =>{
    
      console.log('This is member id '+ mId);
      console.log('This is group id '+ id);
  
      try {
          fetch('http://192.168.1.106:9191/group/'+id+'/addMember', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                memberId: mId
               
              }),
            });
      } catch (error) {
        console.log(error)
      }
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
                    data={groupMember}
                 
                    renderItem={({ item,index }) =>     
                       
                      (
                        
                        <View style={styles.item}>
                           
                          <View style={styles.avatarContainer}>
                         
                           <Image source= {item.image} style={styles.avatar}></Image>
                          </View>         
                          <Text style={styles.name}>{item.name}</Text>
                          <Text style={styles.name}>{item.email}</Text>
                          
                         
                          <View >
                        
                           { fromTabs ?<Button style={{marginLeft:20}} title="Add"  onPress={()=> addMemberApi(item.id)}></Button> :<View></View>}
                            
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

export default Contacts;

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