import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native"

import LoginSVG from '../../misc/registration.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useState } from "react";


const RegisterScreen = ({navigation}) => {

    

const [firstName, setfirstName] = useState();
const [lastName, setlastName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [error, setError] = useState({field:'', message:''});


const onSubmit = ()=>{
  let loginError = {field:'', message:''};
  if(email === undefined || email === ''  ){
    loginError.field = 'email';
    loginError.message = 'Email is Required!';
    setError(loginError);
    
  }else  if(firstName === undefined  || password === '' ){
    loginError.field = 'firstName';
    loginError.message = 'First Name is Required!';
    setError(loginError);
    
  }else  if(lastName === undefined  || lastName === '' ){
    loginError.field = 'lastName';
    loginError.message = 'Last Name is Required!';
    setError(loginError);
    
  }else  if(password === undefined  || password === '' ){
    loginError.field = 'password';
    loginError.message = 'Password is Required!';
    setError(loginError);
    
  }
  else{
    setError({field:'', message:''});
    registerUser()
  }
 
}


const registerUser = async () => {
  fetch("http://192.168.1.106:9191/api/v1/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    }),
  })
    .then(function (response) {
      if (!response.ok) {
        if (response.status == 403) {
          throw Error("Forbidden 403");
        } else if (response.status == 404) {
          throw Error("Not Found 404");
        }
      } else if (response.ok) {
        navigation.navigate("Login");
      }

      return response.json();
    })
    .then((data) => {
      if ("error" in data) {
        throw Error(data.error);
      } else if ("errorMessage" in data) {
        throw Error(data.errorMessage);
      }

      return data;
    })
    .catch((error) => {
      setError({field:'responseError', message:error.message});
      console.log(error.message);
    });
};






    return(
        <SafeAreaView style={styles.container}>
            <View style={{paddingHorizontal:25}}>
            <View style={{ alignItems: 'center'}}>
            <LoginSVG height={300} width={300} style={{transform:[{rotate:'-5deg'}]}}/>
            </View>
            
            <Text style={{fontSize:28, fontWeight:'500', color:'#333', marginBottom:20}}>Register</Text>

            <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:8, marginBottom:25, }}>
                <Ionicons name="person-outline" size={20} color="#666" style={{marginRight:5}} />
                <TextInput onChangeText={setfirstName} value={firstName} placeholder="First Name" style={{flex:1, paddingVertical:0}}/>
                {error.field === 'firstName' &&(
               
               <Text style={styles.error}>{error.message}</Text>
              )}
            </View>

            <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:8, marginBottom:25, }}>
                <Ionicons name="person-outline" size={20} color="#666" style={{marginRight:5}} />
                <TextInput onChangeText={setlastName} value={lastName} placeholder="Last Name" style={{flex:1, paddingVertical:0}}/>
                {error.field === 'lastName' &&(
               
               <Text style={styles.error}>{error.message}</Text>
              )}
               
            </View>

            <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:8, marginBottom:25, }}>
                <MaterialIcons name="alternate-email" size={20} color="#666" style={{marginRight:5}} />
                <TextInput onChangeText={setEmail} value={email} placeholder="Email ID" style={{flex:1, paddingVertical:0}} keyboardType="email-address"/>

                {error.field === 'email' &&(
               
               <Text style={styles.error}>{error.message}</Text>
              )}
               
            </View>

            <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:8, marginBottom:25, }}>
            <Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{marginRight:5}} />
                <TextInput placeholder="Password" style={{flex:1, paddingVertical:0}} secureTextEntry={true}/>
                {error.field === 'password' &&(
               
               <Text style={styles.error}>{error.message}</Text>
              )}
           
            </View>

            <View style={{flexDirection:'row', borderBottomColor:'#ccc', borderBottomWidth:1, paddingBottom:8, marginBottom:25, }}>
            <Ionicons name="ios-lock-closed-outline" size={20} color="#666" style={{marginRight:5}} />
                <TextInput onChangeText={setPassword} value={password} placeholder="Confirm Password" style={{flex:1, paddingVertical:0}} secureTextEntry={true}/>
            
           
            </View>
            <View>
            {error.field === 'responseError' &&(
               
               <Text style={styles.error}>{error.message}</Text>
              )}
            </View>

            <TouchableOpacity onPress={onSubmit}
                style={{backgroundColor:"#AD40AF", padding:20, borderRadius:10, marginBottom:20}}>
                <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>Register</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:70}}>
            <Text>Already a User</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
                <Text style={{color:'#AD40AF', fontWeight:'700', marginBottom:40}}>Login</Text>
            </TouchableOpacity>
            </View>

           
            </View>
         </SafeAreaView>
    )
}

export default RegisterScreen;

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