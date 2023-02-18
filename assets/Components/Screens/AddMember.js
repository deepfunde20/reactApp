import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, Platform, FlatList, Image } from "react-native";
// import { Calendar } from "react-native-calendars";
import { TextInput } from "react-native-gesture-handler";


const AddMember = ({navigation}) =>{

    const [name, onChangeText] = useState();
    const [mobile, setMobile] = useState();
    const [email, setEmail] = useState();

    const [image, setImage] = useState();

    

    const allImages = [
      {
        id: 1,
        image: require("../../avatar/avatar.png")
      
      },
      {
        id: 2,
        image: require("../../avatar/bussiness-man.png")
      },
      {
        id: 3,
        image: require("../../avatar/girl.png")
      },
      {
        id: 4,
        image: require("../../avatar/hipster.png")
      },
      {
        id: 5,
        image:   require("../../avatar/man.png")
      },
      {
        id: 6,
        image: require("../../avatar/user.png")
      },
      {
        id: 7,
        image: require("../../avatar/woman_1.png")
      },
      {
        id: 8,
        image:   require("../../avatar/woman_2.png")
      },
      {
        id: 9,
        image:   require("../../avatar/woman.png"),
      },
    ];

  

    const addConatactApi = async () =>{
  
        try {
            fetch('http://192.168.1.106:9191/member/signup', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: name,
                  mobile: mobile,
                  email: email,
                  image: image
                }),
              });
              navigation.navigate("Contacts")
        } catch (error) {
          console.log(error)
        }
      }
    return(
      <View style={styles.mainContainer}>
<View style={styles.decription}>
  <Text>You can add contacts here which further can be added in groups</Text>
  <View style={styles.inputContainer}>
    <Text style={styles.labels}>Contact Name</Text>
    
<TextInput
        style={styles.inputStyle}
        onChangeText={onChangeText}
        value={name}
        autoCapitalize="words"
        placeholder='Enter Name'
      />
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.labels}>Mobile No.</Text>
    
<TextInput
        style={styles.inputStyle}
        onChangeText={setMobile}
        value={mobile}
        autoCapitalize="sentences"
        placeholder='Mobile No...'
      />


  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.labels}>Email</Text>
    
<TextInput
        style={styles.inputStyle}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="sentences"
        placeholder='abc@gmail.com'
      />


  </View>


<Text style={styles.labels}>Select Member Icon</Text>
<FlatList  
                                  
                    data={allImages}
                    keyExtractor={(key) => {
                      return key.id;
                    }}
                    horizontal
                    renderItem={({ item }) =>     
                       
                      (
                        
                        <View style={styles.item}>
                           <TouchableOpacity onPress={()=> {setImage(item.image);}}>
                          <View style={styles.avatarContainer}>
                          
                           <Image source= {item.image} style={styles.avatar}></Image>
                          </View>         
                         
                    </TouchableOpacity>
                        
                        </View>
                       
                      )          
                    }
                  ></FlatList>
                  <TouchableOpacity onPress={addConatactApi} style={styles.buttonContainer4}>

<Text style={styles.buttonText}>Add Contact</Text>
</TouchableOpacity>
</View>
</View>
    );
}

export default AddMember;

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
        paddingTop: 20,
        paddingBottom: 15,
        textTransform: "capitalize",
        fontFamily: 'bold',
      },
      decription:{
        fontSize: 20,
        color: "#7d7d7d",
        paddingBottom: 20,
        lineHeight: 25,
        

      },
      inputContainer:{
        marginTop: 20,
      },
      labels:{
        fontSize: 18,
        color: "black",
        marginTop: 10,
        marginBottom: 5,
        lineHeight: 25,
       
      
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
        marginVertical: 20,
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