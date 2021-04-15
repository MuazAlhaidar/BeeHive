import {StyleSheet} from 'react-native';

const ViewStyles = StyleSheet.create({
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
    height: 100,
  },
  textView: {
    flex: 1,
    fontSize: 20,
    padding: 20,

    textAlignVertical: 'top',
  },
  inputViewMembers: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#ff8000',
    height: 150,
  },
  groupButton: {
    height: 30,
    width: 100,
    backgroundColor: '#ff8000',
    alignSelf: 'flex-end',
    margin: 20,
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
  },

  inputViewDescription: {
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#ff8000',
    height: 200,
  },
});
export default ViewStyles;
