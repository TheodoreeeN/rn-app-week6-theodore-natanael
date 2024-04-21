import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    getData()
    // setTimeout(() => {
    //   navigation.navigate('Login');
    // }, 3000);
  }, []);

  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      console.log("Doing checking for value: " + value);
      if (value == null) {
        console.log("No token found, redirecting...")
        setTimeout(() => {
          // navigation.navigate('Login');
          navigation.dispatch(StackActions.replace('Login'));
        }, 1000);
      }
      else {navigation.dispatch(StackActions.replace('Tabs', { screen: 'Home' }));}
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 46}}>Welcome</Text>
    </View>
  );
};
export default SplashScreen;
