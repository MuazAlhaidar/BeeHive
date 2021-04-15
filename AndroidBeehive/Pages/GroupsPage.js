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
import Group from '../Styles/Groups/GroupsStyles';
import AddGroup from '../components/AddGroup';
import AddGroupsStyles from '../Styles/Groups/AddGroupStyles';
import ViewStyles from '../Styles/Groups/ViewGroups';
import ViewGroup from '../components/ViewGroup';
import {FlatList} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
function GroupPage({navigation}) {
  const [modalVisibleView, setModalVisibleView] = useState(false);
  const [groupId, setGroupId] = useState(0);
  const [groups, setNewGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  var groupObject = groups.filter((obj) => {
    return obj.name === groupId;
  });

  function ViewButton({item}) {
    setGroupId(item.name);
    setModalVisibleView(true);
  }

  const ListGroups = ({item}) => (
    <View style={Group.groupList}>
      <Text style={Group.groupText}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => ViewButton({item})}
        style={Group.viewGroup}>
        <Image style={Group.image} source={require('../eye.png')} />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => <ListGroups item={item} />;
  useEffect(() => {
    const event = firestore()
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

    // Unsubscribe from events when no longer in use
    return () => event();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',

        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.button}>
        <Image style={styles.image} source={require('../navButotn.png')} />
      </TouchableOpacity>
      <Text style={Group.Name}>Groups</Text>
      <Modal
        isVisible={modalVisibleView}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <ScrollView>
          <ViewGroup groups={groupObject} />
          <TouchableOpacity
            onPress={() => setModalVisibleView(false)}
            style={ViewStyles.groupButton}>
            <Text style={ViewStyles.buttonText}>Go back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={groups.name}
      />
    </View>
  );
}
export default GroupPage;
