import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  DevSettings,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from '../../Styles/drawerbutton';
import Group from '../../Styles/Groups/GroupsStyles';
import AddGroup from '../../components/AddGroup';
import AddGroupsStyles from '../../Styles/Groups/AddGroupStyles';
import ViewStyles from '../../Styles/Groups/ViewGroups';
import ViewGroup from '../../components/ViewGroup';
function SampleFunction(item) {
  var SampleNameArray = [
    'Pankaj',
    'Rita',
    'Mohan',
    'Amit',
    'Babulal',
    'Sakshi',
  ];
  Alert.alert('hello');
  return (
    <View>
      {SampleNameArray.map((item, key) => (
        <Text
          key={key}
          style={styles.TextStyle}
          onPress={this.SampleFunction.bind(this, item)}>
          {' '}
          {item}{' '}
        </Text>
      ))}
    </View>
  );
}

function GuestGroups({navigation}) {
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleView, setModalVisibleView] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    address: '',
    time: '',
    date: '',
    description: '',
  });
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
        style={styles.button}>
        <Text>Go back</Text>
      </TouchableOpacity>

      <Text style={Group.Title}>Groups</Text>

      <Modal
        isVisible={modalVisibleAdd}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <ScrollView>
          <AddGroup name />
          <TouchableOpacity
            onPress={() => setModalVisibleAdd(false)}
            style={AddGroupsStyles.groupButton}>
            <Text style={AddGroupsStyles.buttonText}>Add Group</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <Modal
        isVisible={modalVisibleView}
        backdropColor={'#fff'}
        avoidKeyboard={true}>
        <ScrollView>
          <ViewGroup />
          <TouchableOpacity
            onPress={() => setModalVisibleView(false)}
            style={ViewStyles.groupButton}>
            <Text style={ViewStyles.buttonText}>Go back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
      <View style={Group.groupList}>
        <SampleFunction />
        <TouchableOpacity
          onPress={() => setModalVisibleView(true)}
          style={Group.viewGroup}>
          <Image style={Group.image} source={require('../../eye.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default GuestGroups;
