import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from '../Styles/drawerbutton';
import Event from '../Styles/Events/EventsStyles';
import AddEvent from '../components/AddEvent';
import AddStyles from '../Styles/Events/AddEventStyles';
import ViewStyles from '../Styles/Events/ViewEvents';
import ViewEvent from '../components/ViewEvent';
import {FlatList} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
function EventPage({navigation}) {
  const [modalVisibleView, setModalVisibleView] = useState(false);
  const [eventId, setEventId] = useState(0);
  const [events, setNewEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  var eventObject = events.filter((obj) => {
    return obj.title === eventId;
  });

  function ViewButton({item}) {
    setEventId(item.id);
    setModalVisibleView(true);
  }
  function RSVPbutton(event) {
    const user = firebase.auth().currentUser.uid;

    firestore()
      .collection('Events-WEB')
      .doc(event)
      .update({
        rsvp: firestore.FieldValue.arrayUnion(user),
      })
      .then(function () {
        alert('You have been RSVPd for this event');
      });
  }
  const ListEvents = ({item}) => (
    <View style={Event.eventList}>
      <Text style={Event.eventText}>{item.title}</Text>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => ViewButton({item})}
          style={Event.viewEvent}>
          <Image style={Event.image} source={require('../eye.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => RSVPbutton(item.id)}
          style={Event.viewEvent}>
          <Icon name="calendar-check" color="#ff8000" size={35} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({item}) => <ListEvents item={item} />;
  useEffect(() => {
    const user = firebase.auth().currentUser;
    const currUser = user.id;
    setCurrentUser(currUser);
    const event = firestore()
      .collection('Events-WEB')
      .orderBy('title', 'desc')
      .onSnapshot((querySnapshot) => {
        const events = [];

        querySnapshot.forEach((documentSnapshot) => {
          events.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setNewEvents(events);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => event();
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
      <Text style={Event.Title}>Events</Text>
      <Modal
        isVisible={modalVisibleView}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <ScrollView>
          <ViewEvent events={eventObject} />
          <TouchableOpacity
            onPress={() => setModalVisibleView(false)}
            style={ViewStyles.eventButton}>
            <Text style={ViewStyles.buttonText}>Go back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={events.title}
        style={{flexGrow: 0}}
      />
    </View>
  );
}
export default EventPage;
