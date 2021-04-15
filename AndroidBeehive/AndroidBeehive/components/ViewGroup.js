import React from 'react';
import {Text, View} from 'react-native';
import ViewStyles from '../Styles/Groups/ViewGroups';

function ViewGroup({groups}) {
  return groups.map((item) => (
    <View style={ViewStyles.container}>
      <Text style={ViewStyles.label}>Name</Text>
      <View style={ViewStyles.inputViewName}>
        <Text style={ViewStyles.textView}>{item.name}</Text>
      </View>
      <Text style={ViewStyles.label}>Members</Text>
      <View style={ViewStyles.inputViewMembers}>
        <Text style={ViewStyles.textView}>{item.members}</Text>
      </View>
      <Text style={ViewStyles.label}>Description</Text>
      <View style={ViewStyles.inputViewDescription}>
        <Text style={ViewStyles.textView}>{item.description}</Text>
      </View>
    </View>
  ));
}
export default ViewGroup;
