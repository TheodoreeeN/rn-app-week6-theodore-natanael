import React, {useEffect} from 'react';
import {Text, TextInput, View, Button, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  // const [data, setData] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [image, setImage] = React.useState('');

  useEffect(() => {
    getData()
    // const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    // return () => backHandler.remove()
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 42, textAlign: 'center'}}>Welcome Home</Text>
    </View>
  );
};
export default HomeScreen;
