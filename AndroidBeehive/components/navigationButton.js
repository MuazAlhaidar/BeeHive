import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styles from '../Styles/drawerbutton';
//this is displaying the button that opens the drawer
function NavButton({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={styles.button}>
      <Image style={styles.image} source={require('../navButotn.png')} />
    </TouchableOpacity>
  );
}
export default NavButton;
