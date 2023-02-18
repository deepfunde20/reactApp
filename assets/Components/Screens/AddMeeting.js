import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, Platform } from "react-native";
// import { Calendar } from "react-native-calendars";
import { TextInput } from "react-native-gesture-handler";


const AddMeeting = ({navigation, route}) =>{

  let formattedDate;
    const id = route.params.groupId
    const [text, onChangeText] = useState();
    const [description, setDescription] = useState();
    

    const [datePicker, setDatePicker] = useState(false);

    const [selectedDate, setSelectedDate]= useState('Date');
    const [selectedTime, setSelectedTime]= useState('Time');

  
   



    const [date, setDate] = useState(new Date());
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));

    

    function showDatePicker(){
      setDatePicker(true);
    }

    function showTimePicker(){
      setTimePicker(true);
    }

    function onDateSelected(event, value){
      setDate(value);  
       formattedDate = value.getDate() + "-" + (value.getMonth() + 1)+ "-" + value.getFullYear()
     setSelectedDate(formattedDate);
      setDatePicker(false);
    }

    function onTimeSelected(event, value){
      setTime(value);
      setSelectedTime(value.toLocaleTimeString())
      setTimePicker(false);
     
    }
 

    const addMeetingApi = async () =>{
  
        try {
            fetch('http://192.168.1.106:9191/meeting/create', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    groupId: id,
                    meetingName: text,
                    scheduledTime: selectedDate+' '+selectedTime
                }),
                
              });
              navigation.navigate("Meetings", {
                groupId: id
            })
        } catch (error) {
          console.log(error)
        }
      }
    return(
      <View style={styles.mainContainer}>
<View style={styles.decription}>
  <Text>You can add meetings to this group by picking date and time</Text>
  <View style={styles.inputContainer}>
    <Text style={styles.labels}>Meeting Name</Text>
    
<TextInput
        style={styles.inputStyle}
        onChangeText={onChangeText}
        value={text}
        autoCapitalize="words"
        placeholder='Enter Name'
      />
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.labels}>Meeting Description</Text>
    
<TextInput
        style={styles.inputStyle}
        onChangeText={setDescription}
        value={description}
        autoCapitalize="sentences"
        placeholder='Enter Summary'
      />
  </View>



<View>
  

  {datePicker && (<DateTimePicker
    value={date}
    mode={'date'}
    display={Platform.OS === 'ios' ? 'spinner' :'default'}
    is24Hour={true}
    onChange={onDateSelected}

  />)}

{timePicker && (<DateTimePicker
    value={time}
    mode={'time'}
    display={Platform.OS === 'ios' ? 'spinner' :'default'}
    is24Hour={true}
    onChange={onTimeSelected}
    
    
  />)}
<View >

  {!datePicker &&(
    
    <TouchableOpacity style={styles.date} onPress={showDatePicker}>
    <Text>{selectedDate}</Text>
  </TouchableOpacity>
  )}

</View>

<View >

{!timePicker &&(
   
    <TouchableOpacity style={styles.date} onPress={showTimePicker}>
      <Text>{selectedTime}</Text>
    </TouchableOpacity>
  )}
  </View>
</View>

<TouchableOpacity onPress={addMeetingApi} style={styles.buttonContainer4}>
<Text style={styles.buttonText}>Set Meeting</Text>
</TouchableOpacity>
</View>
</View>
    );
}

export default AddMeeting;

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
        
      }
})