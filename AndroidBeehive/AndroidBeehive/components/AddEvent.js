import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AddStyles from '../Styles/Events/AddEventStyles';
import DatePicker from 'react-native-date-picker';
//The Add event modal
function AddEvent({events, modal}) {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const Add = async () => {
    modal(false);
    events(title, address, date, time, description);
  };
  return (
    <ScrollView>
      <View style={AddStyles.container}>
        <Text style={AddStyles.label}>Name</Text>
        <View style={AddStyles.inputViewName}>
          <TextInput
            style={AddStyles.textView}
            onChangeText={(title) => setTitle(title)}
          />
        </View>
        <Text style={AddStyles.label}>Address</Text>
        <View style={AddStyles.inputViewAddress}>
          <TextInput
            style={AddStyles.textView}
            onChangeText={(address) => setAddress(address)}></TextInput>
        </View>
        <Text style={AddStyles.label}>Date/Time</Text>
        <View style={AddStyles.inputViewDate}>
          <DatePicker
            mode="datetime"
            date={date}
            onDateChange={setDate}
            androidVariant="nativeAndroid"
          />
        </View>

        <Text style={AddStyles.label}>Description</Text>
        <View style={AddStyles.inputViewDescription}>
          <TextInput
            style={AddStyles.textView}
            onChangeText={(description) =>
              setDescription(description)
            }></TextInput>
        </View>
        <TouchableOpacity onPress={() => Add()} style={AddStyles.eventButton}>
          <Text style={AddStyles.buttonText}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
export default AddEvent;
