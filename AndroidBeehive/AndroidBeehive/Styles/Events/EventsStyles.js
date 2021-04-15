import {StyleSheet} from 'react-native';

const Event = StyleSheet.create({
  Title: {
    fontSize: 40,
    maxHeight: 50,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title2: {
    fontSize: 40,
    maxHeight: 50,
    alignSelf: 'center',
    marginBottom: 30,
    marginLeft: 50,
  },
  titleContainer: {
    flex: 1,
    maxHeight: 90,

    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButton: {
    height: 45,
    width: 45,
    margin: 15,
  },
  addEvent: {
    borderWidth: 2,
    borderColor: 'purple',
  },
  eventList: {
    flex: 1,

    flexShrink: 1,
    borderBottomWidth: 2,
    borderColor: '#FF8000',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  viewEvent: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 30,
    maxWidth: 30,
    marginBottom: 3,
  },
  deleteEvent: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 30,
    maxWidth: 30,
    marginRight: 5,
    marginBottom: 3,
  },
  editEvent: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 30,
    maxWidth: 30,
    marginBottom: 3,
  },
  eventText: {
    fontSize: 30,
    color: 'black',
  },
  image: {
    height: 30,
    width: 30,
  },
});
export default Event;
