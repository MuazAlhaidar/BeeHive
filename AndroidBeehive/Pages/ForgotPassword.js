import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import firebase from 'firebase';
import FPStyles from '../Styles/FPStyles';
//forgot passoword functions
function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const sendEmail = (email) => {
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email);
    navigation.navigate('Login');
  };
  return (
    <View style={FPStyles.container}>
      <Image style={FPStyles.image} source={require('../loginLogo.png')} />
      <Text style={FPStyles.Text}>Please enter your email</Text>
      <View style={FPStyles.inputView}>
        <TextInput
          style={FPStyles.TextInput}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <TouchableOpacity style={FPStyles.FPBtn} onPress={() => sendEmail(email)}>
        <Text style={FPStyles.FPBtnText}>Reset password</Text>
      </TouchableOpacity>
    </View>
  );
}
export default ForgotPassword;
