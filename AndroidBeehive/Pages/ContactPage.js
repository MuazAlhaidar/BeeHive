import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import contact from '../Styles/ContactUsStyles';
import styles from '../Styles/drawerbutton';
//Just a page displaying contact information
function ContactUsPage({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.button}>
        <Image style={styles.image} source={require('../navButotn.png')} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Text style={contact.header}> Contact Us </Text>
        <Text style={contact.text}>Phone Number: 734-748-8749</Text>
        <Text style={contact.text}>Email: beehive@gmail.com</Text>
      </View>
    </View>
  );
}
export default ContactUsPage;
