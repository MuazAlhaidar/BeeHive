import {StyleSheet} from 'react-native';

const WelcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: '#ff8000',
    fontSize: 40,
  },
  body: {
    color: '#ff8000',
    fontSize: 20,
  },
  textContainer: {
    maxWidth: 240,
  },
});
export default WelcomeStyles;
