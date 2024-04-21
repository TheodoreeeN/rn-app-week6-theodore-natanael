import React, {useEffect} from 'react';
import {Text, TextInput, View, Button} from 'react-native';
const Register = ({navigation}) => {
  const [text, setText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 24, textAlign: 'center'}}>Registration</Text>
      <View style={{marginLeft: 10}}>
        <Text style={{fontSize: 16}}>Username</Text>
        <TextInput
          placeholder="Username"
          value={text}
          onChangeText={text => setText(text)}
        />
        <Text style={{fontSize: 16}}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}
        />
        <Text style={{fontSize: 16}}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          secureTextEntry={true}
        />
      </View>
      <Button
        onPress={() => console.log('pressed')}
        title="Login"
        color="blue"
      />
      <Text style={{fontSize: 18, textAlign: 'center', marginTop: 10}}>
       Have an account? <Text onPress={() => navigation.navigate('Login')} style={{color: '#0000EE'}}>Login here.</Text>
      </Text>
    </View>
  );
};
export default Register;
