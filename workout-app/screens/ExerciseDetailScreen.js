import { View, Text } from 'react-native'
import React from 'react'

const ExerciseDetailScreen = ({route}) => {
    const { exercise } = route.params;
  return (
    <View>
      <Text>{exercise.name}</Text>
    </View>
  )
}

export default ExerciseDetailScreen