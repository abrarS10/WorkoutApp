import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';

const WorkoutPlanDetailScreen = ({route}) => {

    const { workoutPlan } = route.params;

    const workoutDays = workoutPlan.workoutDays;

    //console.log(workoutDays)

    const DayCard = ({day}) => {
        console.log(day)
        return (
            <ScrollView>
                <Text>{day.name}</Text>
                {day.exercises.length === 0 ? (
                    <Text>No exercises for this day.</Text>
                ) : (
                    day.exercises.map((exercise, index) => (
                        <ExerciseCard key={index} exercise={exercise} />
                    ))
                )}
            </ScrollView>
    )};

    const ExerciseCard = ({ exercise }) => (
        <View>
          <Text>{exercise.name}</Text>
        </View>
      );

    return (
        <View>
            <Text style={styles.screenTitle}>{workoutPlan.name}</Text>
            <ScrollView horizontal>
                {workoutDays.length === 0 ? (
                    <Text>No workout plans created.</Text>
                ) : (
                    workoutDays.map((day, index) => (
                        <DayCard key={index} day={day} />
                    ))
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screenTitle: {
        paddingTop: 50,
        padding: 10
    }
})

export default WorkoutPlanDetailScreen