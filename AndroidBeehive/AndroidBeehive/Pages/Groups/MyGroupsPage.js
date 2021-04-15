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
import Group from '../../Styles/Groups/GroupsStyles';
import AddGroup from '../../components/AddGroup';
import AddGroupsStyles from '../../Styles/Groups/AddGroupStyles';
import ViewGroupStyles from '../../Styles/Groups/ViewGroups';
import ViewGroup from '../../components/ViewGroup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditGroup from '../../components/EditGroup';
import Share from 'react-native-share';
import firestore from '@react-native-firebase/firestore';
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function MyGroupPage({navigation}) {
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleView, setModalVisibleView] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);

  const [index, setIndex] = useState(0);
  const [groupId, setGroupId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [groups, setNewGroups] = useState([]);

  const [newId, setNewId] = useState(groups.length);

  const confirmDelete = () =>
    Alert.alert(
      'Confirm deletion',
      'Are you sure you would like to delete this group?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setNewGroups(groupList);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function ViewButton({item}) {
    setGroupId(item.name);
    setModalVisibleView(true);
  }

  function deleteButton(groupId) {
    firestore().collection('Groups-WEB').doc(groupId).delete();
  }
  function editButton(groupId) {
    setGroupId(groupId);
    setModalVisibleEdit(true);
  }
  const myShare = async () => {
    const options = {
      message: 'Check out my group!',
    };
    const newShare = Share.open(options);
  };
  const AddGroups = async (name, members, description) => {
    const newDoc = firestore().collection('Groups-WEB').doc();
    newDoc.set({
      name: name,
      members: members,
      description: description,
      id: newDoc.id,
    });
  };

  const EditGroups = async (name, members, description) => {
    firestore().collection('Groups-WEB').doc(groupId).delete();

    const newDoc = firestore().collection('Groups-WEB').doc();
    newDoc
      .set({
        name: name,
        members: members,
        description,
        id: newDoc.id,
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  var groupObject = groups.filter((obj) => {
    return obj.name === groupId;
  });

  const ListGroups = ({item}) => {
    return (
      <View style={Group.groupList}>
        <Text style={Group.groupText}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => ViewButton({item})}
          style={Group.viewGroup}>
          <Image style={Group.image} source={require('../../eye.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => editButton(item.id)}
          style={Group.deleteGroup}>
          <Image style={Group.image} source={require('../../EditEvent.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteButton(item.id)}
          style={Group.deleteGroup}>
          <Image style={Group.image} source={require('../../Trashcan.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => myShare()}>
          <Icon name="share-outline" color="#ff8000" size={35} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem = ({item}) => <ListGroups item={item} />;

  useEffect(() => {
    const group = firestore()
      .collection('Groups-WEB')
      .onSnapshot((querySnapshot) => {
        const groups = [];

        querySnapshot.forEach((documentSnapshot) => {
          groups.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setNewGroups(groups);
        setLoading(false);
      });

    // Unsubscribe from groups when no longer in use
    return () => group();
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

      <View style={Group.nameContainer}>
        <Text style={Group.name2}>My Groups</Text>
        <TouchableOpacity onPress={() => setModalVisibleAdd(true)}>
          <Image
            style={Group.addButton}
            source={require('../../addeventbutton.png')}
          />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisibleAdd}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <AddGroup groups={AddGroups} modal={setModalVisibleAdd} />
      </Modal>
      <Modal
        isVisible={modalVisibleView}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <ScrollView>
          <ViewGroup groups={groupObject} />
          <TouchableOpacity
            onPress={() => setModalVisibleView(false)}
            style={ViewGroupStyles.groupButton}>
            <Text style={ViewGroupStyles.buttonText}>Go back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
      <Modal
        isVisible={modalVisibleEdit}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <ScrollView>
          <EditGroup groups={EditGroups} modal={setModalVisibleEdit} />
        </ScrollView>
      </Modal>

      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        style={{flexGrow: 0}}
      />
    </View>
  );
}
export default MyGroupPage;
