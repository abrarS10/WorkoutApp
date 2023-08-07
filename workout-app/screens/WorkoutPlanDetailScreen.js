import { View, Text } from 'react-native'
import React from 'react'

const WorkoutPlanDetailScreen = ({route}) => {

    const { workoutPlan } = route.params;

    return (
        <View className='flex-1 justify-center items-center'>
        <Text>{workoutPlan.name}</Text>
        </View>
    )
}

export default WorkoutPlanDetailScreen