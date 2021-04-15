import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  DevSettings,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from '../../Styles/drawerbutton';
import Event from '../../Styles/Events/EventsStyles';
import AddEvent from '../../components/AddEvent';
import AddStyles from '../../Styles/Events/AddEventStyles';
import ViewStyles from '../../Styles/Events/ViewEvents';
import ViewEvent from '../../components/ViewEvent';
import firestore from '@react-native-firebase/firestore';
//For guests to see the events
function GuestEvents({navigation}) {
  const [modalVisibleView, setModalVisibleView] = useState(false);
  const [eventId, setEventId] = useState(0);
  const [events, setNewEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  var eventObject = events.filter((obj) => {
    return obj.title === eventId;
  });

  function ViewButton({item}) {
    setEventId(item.title);
    setModalVisibleView(true);
  }

  const ListEvents = ({item}) => (
    <View style={Event.eventList}>
      <Text style={Event.eventText}>{item.title}</Text>
      <TouchableOpacity
        onPress={() => ViewButton({item})}
        style={Event.viewEvent}>
        <Image style={Event.image} source={require('../../eye.png')} />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => <ListEvents item={item} />;

  useEffect(() => {
    const event = firestore()
      .collection('Events-WEB')
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
        onPress={() => navigation.navigate('Login')}
        style={ViewStyles.guestButton}>
        <Text style={ViewStyles.guestText}>Log Out</Text>
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
        keyExtractor={events.id}
        style={{flexGrow: 0}}
      />
    </View>
  );
}
export default GuestEvents;
