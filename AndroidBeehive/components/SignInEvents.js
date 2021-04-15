import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AddStyles from '../Styles/Events/AddEventStyles';
//sign in function for each member that attends an event
function SignModal({sign, modal}) {
  const [member, setNewMember] = useState('');
  const Sign = async () => {
    modal(false);
    sign(member);
  };
  return (
    <View style={AddStyles.container}>
      <Text style={AddStyles.label}>Name</Text>
      <View style={AddStyles.inputViewName}>
        <TextInput
          style={AddStyles.textView}
          onChangeText={(member) => setNewMember(member)}
        />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => modal(false)}
          style={AddStyles.eventButton2}>
          <Text style={AddStyles.buttonText}>Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Sign()} style={AddStyles.eventButton3}>
          <Text style={AddStyles.buttonText}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default SignModal;
