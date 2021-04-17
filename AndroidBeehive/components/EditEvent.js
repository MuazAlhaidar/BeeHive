import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import EditEventStyles from '../Styles/Events/EditEventStyles';
import DatePicker from 'react-native-date-picker';
//function for editing event
function EditEvent({events, modal}) {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const Edit = async () => {
    modal(false);
    events(title, address, date, description);
  };
  return (
    <View style={EditEventStyles.container}>
      <Text style={EditEventStyles.label}>Name</Text>
      <View style={EditEventStyles.inputViewName}>
        <TextInput
          style={EditEventStyles.textView}
          onChangeText={(title) => setTitle(title)}
        />
      </View>

      <Text style={EditEventStyles.label}>Address</Text>
      <View style={EditEventStyles.inputViewAddress}>
        <TextInput
          style={EditEventStyles.textView}
          onChangeText={(address) => setAddress(address)}></TextInput>
      </View>
      <Text style={EditEventStyles.label}>Date/Time</Text>
      <View style={EditEventStyles.inputViewDate}>
        <DatePicker
          mode="datetime"
          date={date}
          onDateChange={setDate}
          androidVariant="nativeAndroid"
        />
      </View>
      <Text style={EditEventStyles.label}>Description</Text>
      <View style={EditEventStyles.inputViewDescription}>
        <TextInput
          style={EditEventStyles.textView}
          onChangeText={(description) =>
            setDescription(description)
          }></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => Edit()}
        style={EditEventStyles.eventButton}>
        <Text style={EditEventStyles.buttonText}>Edit Event</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditEvent;
