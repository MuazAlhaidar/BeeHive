import {StyleSheet} from 'react-native';

const SignUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    marginTop: 5,
    height: 200,
    width: 150,
    resizeMode: 'contain',
  },
  inputView: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 40,
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderColor: '#FC9003',
    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  signUpBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    color: '#ffffff',
    backgroundColor: '#FF8000',
  },
  signUpText: {
    color: '#ffffff',
  },
});
export default SignUpStyles;
