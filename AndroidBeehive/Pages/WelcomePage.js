import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import styles from '../Styles/drawerbutton';
import WelcomeStyles from '../Styles/WelcomeStyles';
function Welcome({navigation}) {
  return (
    <View style={WelcomeStyles.container}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.button}>
        <Image style={styles.image} source={require('../navButotn.png')} />
      </TouchableOpacity>

      <Text style={WelcomeStyles.title}>Welcome to BeeHive!</Text>
      <View style={WelcomeStyles.textContainer}>
        <Text style={WelcomeStyles.body}>
          Beehive is a member engagement applicate design to make it easier to
          connect with others and create better relations with other employees
        </Text>
      </View>
    </View>
  );
}
export default Welcome;
