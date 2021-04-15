import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import EditPointsStyles from '../Styles/Leaderboard/EditPointsStyles';

function EditPoint({points, modal}) {
  const [userPoints, setPoints] = useState('');
  const Edit = async () => {
    modal(false);
    points(userPoints);
  };
  return (
    <View style={EditPointsStyles.container}>
      <Text style={EditPointsStyles.label}>Points</Text>
      <View style={EditPointsStyles.inputViewPoints}>
        <TextInput
          style={EditPointsStyles.textView}
          onChangeText={(userPoints) => setPoints(userPoints)}
        />
      </View>

      <TouchableOpacity
        onPress={() => Edit()}
        style={EditPointsStyles.pointsButton}>
        <Text style={EditPointsStyles.buttonText}>Edit Points</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EditPoint;
