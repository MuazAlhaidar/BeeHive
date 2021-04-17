import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from '../Styles/drawerbutton';
import Leaderboard from '../Styles/Leaderboard/LeaderboardStyles';
import EditPoint from '../../AndroidBeehive/components/EditPoints';
import firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
function LeaderboardPage({navigation}) {
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [leaderboardId, setLeaderboardId] = useState(0);
  const [leaderboards, setNewLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);

  var leaderboardObject = leaderboards.filter((obj) => {
    return obj.id === leaderboardId;
  });

  const ListLeaderboards = ({item}) => (
    <View style={Leaderboard.leaderboardList}>
      <Text style={Leaderboard.leaderboardText}>
        {item.firstname} {item.lastname}
      </Text>
      <TouchableOpacity
        onPress={() => editButton(item.id)}
        style={Leaderboard.viewLeaderboard}>
        <Text style={Leaderboard.leaderboardText}>{item.points}</Text>
      </TouchableOpacity>
    </View>
  );
  const EditPoints = async (userPoints) => {
    firestore()
      .collection('Users-WEB')
      .doc(leaderboardId)
      .update({
        points: userPoints,
      })
      .then(() => {
        console.log('User updated!');
      });
  };
  function editButton(Id) {
    setLeaderboardId(Id);
    setModalVisibleEdit(true);
  }
  const renderItem = ({item}) => <ListLeaderboards item={item} />;

  useEffect(() => {
    const leaderboardList = firestore()
      .collection('Users-WEB')
      .orderBy('points', 'desc')
      .onSnapshot((querySnapshot) => {
        const leaderboard = [];

        querySnapshot.forEach((documentSnapshot) => {
          leaderboard.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setNewLeaderboards(leaderboard);
        setLoading(false);
      });

    // Unsubscribe from leaderboards when no longer in use
    return () => leaderboardList();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.button}>
        <Image style={styles.image} source={require('../navButotn.png')} />
      </TouchableOpacity>
      <Text style={Leaderboard.Title}>Leaderboard</Text>

      <View style={Leaderboard.containerProducts}>
        <Text style={Leaderboard.containerProducts}>Name</Text>
        <Text style={Leaderboard.containerProducts}>Points</Text>
      </View>

      <Modal
        isVisible={modalVisibleEdit}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <ScrollView>
          <EditPoint points={EditPoints} modal={setModalVisibleEdit} />
        </ScrollView>
      </Modal>
      <FlatList
        data={leaderboards}
        renderItem={renderItem}
        keyExtractor={leaderboards.id}
      />
    </View>
  );
}
export default LeaderboardPage;
