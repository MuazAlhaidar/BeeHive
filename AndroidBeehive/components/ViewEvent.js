import React from 'react';
import {Text, View} from 'react-native';
import ViewStyles from '../Styles/Events/ViewEvents';
import firestore from '@react-native-firebase/firestore';
//for viewing the events
function ViewEvent({events}) {
  return events.map((item) => (
    <View style={ViewStyles.container}>
      <Text style={ViewStyles.label}>Name</Text>
      <View style={ViewStyles.inputViewName}>
        <Text style={ViewStyles.textView}>{item.title}</Text>
      </View>
      <Text style={ViewStyles.label}>Address</Text>
      <View style={ViewStyles.inputViewAddress}>
        <Text style={ViewStyles.textView}>{item.address}</Text>
      </View>
      <Text style={ViewStyles.label}>Date/Time</Text>
      <View style={ViewStyles.inputViewDate}>
        <Text style={ViewStyles.textView}>
          {item.date.toDate().toDateString()}
        </Text>
      </View>
      <Text style={ViewStyles.label}>Time</Text>

      <Text style={ViewStyles.label}>Description</Text>
      <View style={ViewStyles.inputViewDescription}>
        <Text style={ViewStyles.textView}>{item.description}</Text>
      </View>
    </View>
  ));
}
export default ViewEvent;
