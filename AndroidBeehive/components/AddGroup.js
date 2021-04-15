import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AddGroupsStyles from '../Styles/Groups/AddGroupStyles';
function AddGroup({groups, modal}) {
  const [name, setName] = useState('');
  const [members, setMembers] = useState('');
  const [description, setDescription] = useState('');
  const Add = async () => {
    modal(false);
    groups(name, members, description);
  };
  return (
    <ScrollView>
      <View style={AddGroupsStyles.container}>
        <Text style={AddGroupsStyles.label}>Name</Text>
        <View style={AddGroupsStyles.inputViewName}>
          <TextInput
            style={AddGroupsStyles.textView}
            onChangeText={(name) => setName(name)}
          />
        </View>

        <Text style={AddGroupsStyles.label}>Members</Text>
        <View style={AddGroupsStyles.inputViewMembers}>
          <TextInput
            style={AddGroupsStyles.textView}
            onChangeText={(members) => setMembers(members)}></TextInput>
        </View>

        <Text style={AddGroupsStyles.label}>Description</Text>
        <View style={AddGroupsStyles.inputViewDescription}>
          <TextInput
            style={AddGroupsStyles.textView}
            onChangeText={(description) =>
              setDescription(description)
            }></TextInput>
        </View>
        <TouchableOpacity
          onPress={() => Add()}
          style={AddGroupsStyles.groupButton}>
          <Text style={AddGroupsStyles.buttonText}>Add Group</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
export default AddGroup;
