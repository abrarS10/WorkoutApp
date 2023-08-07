import { View, Text } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

const WorkoutPlansScreen = () => {

  const selectedWorkoutPlan = useSelector(state => state.user.selectedWorkoutPlan);
  const isPremiumMember = useSelector(state => state.user.premiumMember);
  // used to update state
  const dispatch = useDispatch();



  return (
    <View className="flex-1 justify-center items-center">
      <Text>My Workout Plans</Text>
      <Text>Selected Workout Plan: {selectedWorkoutPlan}</Text>
    </View>
  );
};



export default WorkoutPlansScreen;