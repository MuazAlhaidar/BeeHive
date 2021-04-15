import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import EditGroupStyles from '../Styles/Groups/EditGroupStyles';

function EditGroup({groups, modal}) {
  const [name, setName] = useState('');
  const [members, setMembers] = useState('');
  const [description, setDescription] = useState('');
  const Edit = async () => {
    modal(false);
    groups(name, members, description);
  };
  return (
    <View style={EditGroupStyles.container}>
      <Text style={EditGroupStyles.label}>Name</Text>
      <View style={EditGroupStyles.inputViewName}>
        <TextInput
          style={EditGroupStyles.textView}
          onChangeText={(name) => setName(name)}
        />
      </View>

      <Text style={EditGroupStyles.label}>Members</Text>
      <View style={EditGroupStyles.inputViewMembers}>
        <TextInput
          style={EditGroupStyles.textView}
          onChangeText={(members) => setMembers(members)}></TextInput>
      </View>
      <Text style={EditGroupStyles.label}>Description</Text>
      <View style={EditGroupStyles.inputViewDescription}>
        <TextInput
          style={EditGroupStyles.textView}
          onChangeText={(description) =>
            setDescription(description)
          }></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => Edit()}
        style={EditGroupStyles.groupButton}>
        <Text style={EditGroupStyles.buttonText}>Edit Group</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditGroup;
