import {StyleSheet} from 'react-native';

const leaderboard = StyleSheet.create({
  Title: {
    fontSize: 40,
    maxHeight: 50,
    alignSelf: 'center',
  },
  containerProducts: {
    fontSize: 25,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  addleaderboard: {
    borderWidth: 2,
    borderColor: 'purple',
  },
  leaderboardList: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 40,
    borderBottomWidth: 2,
    borderColor: '#FF8000',
    marginBottom: 5,
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
  },
  viewleaderboard: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 30,
    maxWidth: 30,
    marginBottom: 3,
  },
  deleteleaderboard: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 30,
    maxWidth: 30,
    marginRight: 5,
    marginBottom: 3,
  },
  editleaderboard: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 30,
    maxWidth: 30,
    marginBottom: 3,
  },
  leaderboardText: {
    fontSize: 30,
    color: 'black',
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
  },
  image: {
    height: 25,
    width: 25,
  },
});
export default leaderboard;
