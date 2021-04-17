import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from '../../Styles/drawerbutton';
import Event from '../../Styles/Events/EventsStyles';
import AddEvent from '../../components/AddEvent';
import AddStyles from '../../Styles/Events/AddEventStyles';
import ViewStyles from '../../Styles/Events/ViewEvents';
import ViewEvent from '../../components/ViewEvent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditEvent from '../../components/EditEvent';
import Share from 'react-native-share';
import firestore from '@react-native-firebase/firestore';
import firebase from 'firebase';
import SignModal from '../../components/SignInEvents';
import Transfer from '../../components/Transfer';
function MyEventPage({navigation}) {
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleView, setModalVisibleView] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [modalVisibleTransfer, setModalVisibleTransfer] = useState(false);
  const [eventId, setEventId] = useState(0);
  const [events, setNewEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisibleSignIn, setModalVisibleSignIn] = useState(false);
  const [transferUser, setTransferUser] = useState('');
  //button for canceling the event
  const confirmDelete = (event) =>
    Alert.alert(
      'Confirm deletion',
      'Are you sure you would like to delete this event?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteButton(event)},
      ],
      {cancelable: false},
    );
  //the function that signs in each member, takes in data from sign in modal
  function SignIn(member) {
    const test = member;
    firestore()
      .collection('Events-WEB')
      .doc(eventId)
      .update({
        signin: firestore.FieldValue.arrayUnion(test),
      })
      .then(function () {
        alert('Member has been signed in');
      });
  }
  //transfer manager, data from transfermodal
  function TransferManager(member) {
    firestore()
      .collection('Events-WEB')
      .doc(eventId)
      .update({
        manager: member,
      })
      .then(function () {
        alert('New manager has been assigned');
      });
  }
  //sets the specific event to do the actions with
  function SignInButton(eventId) {
    setEventId(eventId);
    setModalVisibleSignIn(true);
  }
  function ViewButton({item}) {
    setEventId(item.id);
    setModalVisibleView(true);
  }
  function TransferButton(eventId) {
    setEventId(eventId);
    setModalVisibleTransfer(true);
  }

  function deleteButton(eventId) {
    firestore().collection('Events-WEB').doc(eventId).delete();
  }
  function editButton(eventId) {
    setEventId(eventId);
    setModalVisibleEdit(true);
  }

  const myShare = async ({item}) => {
    const options = {
      message: `Check out my event ${item.title} at ${
        item.address
      } on ${item.date.toDate().toDateString()} on the Beehive App!`,
    };
    const newShare = Share.open(options);
  };
  //Add a new event, takes in data from AddEvent modal
  const AddEvents = (title, address, date, description) => {
    const user = firebase.auth().currentUser.uid;

    const newDoc = firestore().collection('Events-WEB').doc();
    newDoc.set({
      title: title,
      address: address,
      date: date,
      description: description,
      manager: user,
      id: newDoc.id,
    });
  };
  //Edit event, takes in data from EditEvent, simply deletes old event and makes a new one
  const EditEvents = async (title, address, date, description) => {
    const user = firebase.auth().currentUser.uid;
    firestore().collection('Events-WEB').doc(eventId).delete();
    const newDoc = firestore().collection('Events-WEB').doc();
    newDoc
      .set({
        title: title,
        address: address,
        date: date,
        description: description,
        manager: user,
        id: newDoc.id,
      })
      .then(() => {
        console.log('Event updated!');
      });
  };

  var eventObject = events.filter((obj) => {
    return obj.id === eventId;
  });
  //this is the funciton that determines how the events are listed on the screen
  const ListEvents = ({item}) => {
    return (
      <View style={Event.eventList}>
        <Text style={Event.eventText}>{item.title}</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => ViewButton({item})}
            style={Event.viewEvent}>
            <Image style={Event.image} source={require('../../eye.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => editButton(item.id)}
            style={Event.deleteEvent}>
            <Image
              style={Event.image}
              source={require('../../EditEvent.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => confirmDelete(item.id)}
            style={Event.deleteEvent}>
            <Image style={Event.image} source={require('../../Trashcan.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => myShare({item})}>
            <Icon name="share-outline" color="#ff8000" size={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => SignInButton(item.id)}>
            <Icon name="account-plus" color="#ff8000" size={35} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => TransferButton(item.id)}>
            <Icon name="account-switch" color="#ff8000" size={35} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderItem = ({item}) => <ListEvents item={item} />;
  //this takes in the data from the database of all the events
  useEffect(() => {
    const user = firebase.auth().currentUser;
    const currUser = user.uid;
    const currEmail = user.email;
    const event = firestore()
      .collection('Events-WEB')
      .where('manager', 'in', [currUser, currEmail])
      .onSnapshot((querySnapshot) => {
        const events = [];
        if (querySnapshot.empty) {
        }
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
        <Image style={styles.image} source={require('../../navButotn.png')} />
      </TouchableOpacity>

      <View style={Event.titleContainer}>
        <Text style={Event.title2}>My Events</Text>
        <TouchableOpacity onPress={() => setModalVisibleAdd(true)}>
          <Image
            style={Event.addButton}
            source={require('../../addeventbutton.png')}
          />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisibleSignIn}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <SignModal sign={SignIn} modal={setModalVisibleSignIn} />
      </Modal>

      <Modal
        isVisible={modalVisibleAdd}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <AddEvent events={AddEvents} modal={setModalVisibleAdd} />
      </Modal>

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

      <Modal
        isVisible={modalVisibleEdit}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <ScrollView>
          <EditEvent events={EditEvents} modal={setModalVisibleEdit} />
        </ScrollView>
      </Modal>

      <Modal
        isVisible={modalVisibleTransfer}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <ScrollView>
          <Transfer
            newManager={TransferManager}
            modal={setModalVisibleTransfer}
          />
        </ScrollView>
      </Modal>

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
export default MyEventPage;
