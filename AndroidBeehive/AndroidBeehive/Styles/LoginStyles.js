import {StyleSheet} from 'react-native';

const Login = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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

  forgot_button: {
    height: 20,
    marginBottom: 10,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    color: '#ffffff',
    backgroundColor: '#FF8000',
  },
  loginText: {
    color: '#ffffff',
  },
});
export default Login;
