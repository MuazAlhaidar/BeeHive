import {StyleSheet} from 'react-native';

const EditEventStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 30,
  },
  inputViewName: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#ff8000',
    height: 70,
  },
  textView: {
    flex: 1,
    fontSize: 20,
    padding: 20,

    textAlignVertical: 'top',
  },
  inputViewAddress: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#ff8000',
    height: 70,
  },
  eventButton: {
    height: 35,
    width: 130,
    backgroundColor: '#ff8000',
    alignSelf: 'flex-end',
    margin: 20,
    borderRadius: 25,
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center',
  },
  inputViewTime: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#ff8000',
    height: 60,
    width: 200,
  },
  inputViewDate: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#ff8000',
    height: 200,
    width: 330,
  },
  inputViewDescription: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#ff8000',
    height: 200,
  },
});
export default EditEventStyles;
