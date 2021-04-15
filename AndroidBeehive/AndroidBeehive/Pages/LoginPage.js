import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import Login from '../Styles/LoginStyles';
import firebase from 'firebase';

function LoginPage({navigation}) {
  const [status, setStatus] = useState();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const CheckUser = async (email, password) => {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      alert('Username or password is invalid');
      setStatus(-1);
      return;
    });
    setStatus(0);
    if (status == 0) {
      navigation.navigate('Welcome');
    }
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Image style={Login.image} source={require('../loginLogo.png')} />
      <Text>Email</Text>
      <View style={Login.inputView}>
        <TextInput
          style={Login.TextInput}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <Text>Password</Text>
      <View style={Login.inputView}>
        <TextInput
          style={Login.TextInput}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={Login.loginBtn}
        onPress={() => CheckUser(email, password)}>
        <Text style={Login.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={Login.forgot_button}>Don't have an account? Sign Up!</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={Login.forgot_button}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text
          style={Login.forgot_button}
          onPress={() => navigation.navigate('ViewGuest')}>
          Login as guest
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginPage;
