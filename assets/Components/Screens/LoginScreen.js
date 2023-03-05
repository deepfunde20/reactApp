import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity  } from "react-native"

import LoginSVG from '../../misc/login.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";





  


const LoginScreen = ({navigation}) => {

    const [password, setPassword] = useState();

const [email, setEmail] = useState();

const [user, setUser] = useState();

const [error, setError] = useState({field:'', message:''});

const onSubmit = ()=>{
  let loginError = {field:'', message:''};
  if(email === undefined || email === ''  ){
    loginError.field = 'email';
    loginError.message = 'Email is Required!';
    setError(loginError);
    
  }else  if(password === undefined  || password === '' ){
    loginError.field = 'password';
    loginError.message = 'Password is Required!';
    setError(loginError);
    
  }else{
    setError({field:'', message:''});
    authenticateUser()
  }
 
}

const resetValues= ()=>{

setEmail('')
setPassword('')
setError('')

}



    const authenticateUser = async () => {
      fetch("http://192.168.1.106:9191/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
       
          if (response.status ==403) {
            throw Error("Invalid Credentials or User is not registerd !!");
          }
          return response.json();
        })
        .then((res) => {
          if ("error" in res) {
            throw Error(res.error);
          } else if ("errorMessage" in res) {
            throw Error(res.errorMessage);
          }
          console.log(res.token);
          if (res.token != null) {
            getUser(res.token);
          }
        })
        .catch((error) => {
          setError({field:'errorResponse', message:error.message});
      
        });
    };

  
  const getUser = async (token) =>{      
    
   
       
     const response = await fetch("http://192.168.1.106:9191/user/getUser/"+email,{
        headers: { 'Authorization': 'Bearer ' + token }
     })
     const myUser = await response.json();
    console.log(myUser);
     setUser(myUser);
  
     await AsyncStorage.setItem('userId', (user.id).toString())
    
     navigation.navigate("AppStack", {
        userId: myUser.id
    })
     resetValues()  
  }


    return(
       
        <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal:25}}>
            <View style={{ alignItems: 'center'}}>
            <LoginSVG height={300} width={300} style={{transform:[{rotate:'-5deg'}]}}/>
            </View>
            
            <Text style={{fontSize:28, fontWeight:'500', color:'#333', marginBottom:30}}>Login Screen</Text>
            <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:8, marginBottom:25, }}>
                <MaterialIcons name="alternate-email" size={20} color="#666" style={{marginRight:5}} />
                <TextInput onChangeText={setEmail} value={email} placeholder="Email ID" style={{flex:1, paddingVertical:0}} keyboardType="email-address"/>
       
               {error.field === 'email' &&(
               
                <Text style={styles.error}>{error.message}</Text>
               )}
            </View>

            <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:8, marginBottom:25, }}>
            <Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{marginRight:5}} />
                <TextInput onChangeText={setPassword}   value={password} placeholder="Password" style={{flex:1, paddingVertical:0}} secureTextEntry={true}/>
            
            
            {/* <TouchableOpacity onPress={()=>{}}>
                <Text style={{color:"#AD40AF", fontWeight:'700'}}>Forgot?</Text>
            </TouchableOpacity> */}

          
               {error.field === 'password' &&(
               
                <Text style={styles.error}>{error.message}</Text>
               )}
            </View>
            <View>
            {error.field === 'errorResponse' &&(
               
               <Text style={styles.error}>{error.message}</Text>
              )}
            </View>

            <TouchableOpacity onPress={onSubmit}
                style={{backgroundColor:"#AD40AF", padding:20, borderRadius:10, marginBottom:20}}>
                <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>Login</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
            <Text>New to the app?</Text>
            <TouchableOpacity onPress={()=>{
              resetValues()
              navigation.navigate("Register")
              }}>
                <Text style={{color:'#AD40AF', fontWeight:'700'}}>Register</Text>
            </TouchableOpacity>
            </View>
            </View>
         </SafeAreaView>
         
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        justifyContent: 'center'
    },
    error: {
			color: '#D8000C',
    
      textAlign:'center',
      marginBottom:5
		
		}
});