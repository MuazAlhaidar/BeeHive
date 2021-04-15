import {StyleSheet} from 'react-native';

const FPStyles = new StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
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
  FPBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    color: '#ffffff',
    backgroundColor: '#FF8000',
  },
  FPBtnText: {
    color: '#ffffff',
  },

  image: {
    marginTop: 5,
    height: 180,
    width: 135,
    resizeMode: 'contain',
  },
});
export default FPStyles;
