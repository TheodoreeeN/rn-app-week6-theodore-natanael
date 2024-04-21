import React, {useEffect} from 'react';
import {Text, TextInput, View, Button, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
const Login = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  // const users = [
  //   { username: 'Theodore', password: 'password1' },
  //   { username: 'Theo', password: 'password2' },
  // ];

  // useEffect(() => {
    // const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    // return () => backHandler.remove()
  // }, [])

  async function handleLogin(){
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });
  
    const data = await response.json();
      if (response.ok) {
        const token = data.token;
        console.log(response);
        console.log(JSON.stringify(data));
        await AsyncStorage.setItem('userToken', token);
        navigation.dispatch(StackActions.replace('Tabs', { screen: 'Home' }));
      } else {
        setErrorMessage('Invalid credentials. Please enter a valid username and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  

  // const handleLogin = () => {
    
  //   const user = users.find(u => u.username === username && u.password === password);
  //   // Check if the entered username and password match the valid credentials
  //   if (user) {
  //     // Navigate to the dashboard or any other screen on successful login
  //     navigation.navigate('Tabs', { screen: 'Home' });
  //   } else {
  //     // Display an error message if the credentials are incorrect
  //     setErrorMessage('Invalid credentials. Please enter a valid username and password.');
  //   }
  // };
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 24, textAlign: 'center'}}>Login to My App</Text>
      <View style={{marginLeft: 10}}>
        <Text style={{fontSize: 16, marginBottom: 10}}>Username</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={username => setUsername(username)}
          style={{ height: 40, width: "95%", borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        />
        <Text style={{fontSize: 16, marginBottom: 10}}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}
          style={{ height: 40, width: "95%", borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        />
      </View>
      {errorMessage ? <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text> : null}
      <Button
        onPress={() => handleLogin()}
        title="Login"
        color="blue"
      />
      <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
        Don't have an account yet? <Text onPress={() => navigation.navigate('Register')} style={{color: '#0000EE'}}>Register here.</Text>
      </Text>
    </View>
  );
};
export default Login;
