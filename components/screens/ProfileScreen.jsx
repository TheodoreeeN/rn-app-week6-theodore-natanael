import React, {useEffect} from 'react';
import {Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [image, setImage] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  useEffect(() => {
    getData()
  }, []);

  async function getData (){
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token == null) {
        //If no token, then go to login page
        navigation.dispatch(StackActions.replace('Login'));
      }else {
        //If token is found, check if expired yet or not
        const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token, 
        },
        });

        const data = await response.json();
        if(response.ok){
          //Token is not expired
          console.log("Authentication successful")
          console.log("Data is: " + data.firstName)
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setGender(data.gender);
          setImage(data.image);
          setUsername(data.username);
          setPhoneNumber(data.phone);
        }
        else {
          //Token is expired
          await AsyncStorage.removeItem('userToken');
          console.log('Logging out: Token expired');
          navigation.dispatch(StackActions.replace('Login'));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleLogout(){
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('Logging out: Token removed');
      navigation.dispatch(StackActions.replace('Login'));
    }
    catch(exception) {
        console.log(exception)
    }
  }
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Image
      style={{
        width: 150,
        height: 150,
        borderRadius: 75,
        alignContent: 'center',
      }}
      source={{uri: image}}
      resizeMode={"cover"}
      />
      <Text style={{fontSize: 24, textAlign: 'center'}}>{firstName + " " + lastName}</Text>
      <Text style={{fontSize: 24, textAlign: 'center'}}>Username: {username}</Text>
      <Text style={{fontSize: 24, textAlign: 'center'}}>Email: {email}</Text>
      <Text style={{fontSize: 24, textAlign: 'center'}}>Gender: {gender}</Text>
      <Text style={{fontSize: 24, textAlign: 'center'}}>Phone number: {phoneNumber}</Text>
      <TouchableOpacity
        onPress={() => handleLogout()}
        title="Logout"
        color="blue"
        style={{
          backgroundColor: '#007AFF',
          width: 100,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30
        }}
      >
      <Text style={{color: 'white'}}>
        Logout
      </Text>
      </TouchableOpacity>
    </View>
  );

};
export default ProfileScreen;
