import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import firebase from 'firebase';
import FPStyles from '../Styles/FPStyles';
import styles from '../components/navigationButton';
import firestore from '@react-native-firebase/firestore';

function ChangeEmail({navigation}) {
  //gets current user and updates their email
  const [email, setEmail] = useState('');
  const newEmail = (email) => {
    var user = firebase.auth().currentUser;
    user
      .updateEmail(email)
      .then(function () {
        alert('Email updated');
      })
      .catch(function (error) {
        var message = error.message;
        alert(message);
      });
    firestore().collection('Users-WEB').doc(user.uid).update({email: email});
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.button}>
        <Image style={styles.image} source={require('../navButotn.png')} />
      </TouchableOpacity>
      <View style={FPStyles.container}>
        <Image style={FPStyles.image} source={require('../loginLogo.png')} />
        <Text style={FPStyles.Text}>Please enter your new email</Text>
        <View style={FPStyles.inputView}>
          <TextInput
            style={FPStyles.TextInput}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <TouchableOpacity
          style={FPStyles.FPBtn}
          onPress={() => newEmail(email)}>
          <Text style={FPStyles.FPBtnText}>Change email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ChangeEmail;
