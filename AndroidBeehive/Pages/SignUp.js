import React from 'react';
import {useState} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import SignUpStyles from '../Styles/SignUpStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';
function SignUp({navigation}) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  //the functions for adding user
  const AddUser = async () => {
    while (password == '' || email == '' || fName == '' || lName == '') {
      alert('One or more fields are empty');
      return;
    }
    //calls firebase authentication
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const newDoc = firestore()
          .collection('Users-WEB')
          .doc(userCredentials.user.uid);
        newDoc.set({
          firstname: fName,
          lastname: lName,
          email: email,
          points: 0,
          isowner: false,
          id: newDoc.id,
        });
        return navigation.navigate('Login');
      })
      .catch((error) => {
        {
          alert(error.message);
          return;
        }
      });

    return navigation.navigate('Login');
  };

  return (
    <View style={SignUpStyles.container}>
      <Image style={SignUpStyles.image} source={require('../loginLogo.png')} />
      <Text>Enter your First Name</Text>
      <View style={SignUpStyles.inputView}>
        <TextInput
          style={SignUpStyles.TextInput}
          onChangeText={(firstName) => setFName(firstName)}
        />
      </View>
      <Text>Enter your Last Name</Text>
      <View style={SignUpStyles.inputView}>
        <TextInput
          style={SignUpStyles.TextInput}
          onChangeText={(lastName) => setLName(lastName)}
        />
      </View>
      <Text>Enter your Email</Text>
      <View style={SignUpStyles.inputView}>
        <TextInput
          style={SignUpStyles.TextInput}
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <Text>Enter your Password</Text>
      <View style={SignUpStyles.inputView}>
        <TextInput
          style={SignUpStyles.TextInput}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={SignUpStyles.signUpBtn}
        onPress={() => AddUser(email, password)}>
        <Text style={SignUpStyles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
export default SignUp;
