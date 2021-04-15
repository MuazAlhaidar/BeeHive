import firebase from 'firebase';
//logs the user out
function Logout({navigation}) {
  const auth = firebase.auth();
  auth.signOut();
  navigation.navigate('Login');
  return null;
}
export default Logout;
