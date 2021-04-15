import {StyleSheet} from 'react-native';

const Group = StyleSheet.create({
  Name: {
    fontSize: 40,
    maxHeight: 50,
    alignSelf: 'center',
  },
  name2: {
    fontSize: 40,
    maxHeight: 50,
    alignSelf: 'center',
    marginBottom: 15,
    marginLeft: 50,
  },
  nameContainer: {
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
  addGroup: {
    borderWidth: 2,
    borderColor: 'purple',
  },
  groupList: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 40,
    borderBottomWidth: 2,
    borderColor: '#FF8000',
    marginBottom: 5,
    alignItems: 'flex-end',
  },
  viewGroup: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 30,
    maxWidth: 30,
    marginBottom: 3,
  },
  deleteGroup: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 30,
    maxWidth: 30,
    marginRight: 5,
    marginBottom: 3,
  },
  editGroup: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 30,
    maxWidth: 30,
    marginBottom: 3,
  },
  groupText: {
    fontSize: 30,
    color: 'black',
  },
  image: {
    height: 25,
    width: 25,
  },
});
export default Group;
