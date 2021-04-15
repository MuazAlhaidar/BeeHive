import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AddStyles from '../Styles/Events/AddEventStyles';
//modal for transfering the manager of an event
function Transfer({newManager, modal}) {
  const [manager, setManager] = useState('');
  const Sign = async () => {
    modal(false);
    newManager(manager);
  };
  return (
    <View style={AddStyles.container}>
      <Text style={AddStyles.label}>Name</Text>
      <View style={AddStyles.inputViewName}>
        <TextInput
          style={AddStyles.textView}
          onChangeText={(manager) => setManager(manager)}
        />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => modal(false)}
          style={AddStyles.eventButton2}>
          <Text style={AddStyles.buttonText}>Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Sign()} style={AddStyles.eventButton3}>
          <Text style={AddStyles.buttonText}>Set manager</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Transfer;
