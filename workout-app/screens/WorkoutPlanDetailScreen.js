import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import Swiper from 'react-native-swiper';

const WorkoutPlanDetailScreen = ({route}) => {

    const { workoutPlan } = route.params;

    const workoutDays = workoutPlan.workoutDays;

    const DayCard = ({day}) => {
        return (
            <View style={styles.dayCard}>
                <Card style={styles.cardContent}>
                    <Card.Title title={day.name} />
                    {day.exercises.length === 0 ? (
                        <Text>No exercises for this day.</Text>
                    ) : (
                        day.exercises.map((exercise, index) => (
                        <ExerciseCard key={index} exercise={exercise} />
                        ))
                    )}
                </Card>
            </View>
        );
    };

    const ExerciseCard = ({ exercise }) => (
        <Card style={styles.exerciseCard}>
            <Card.Title title={exercise.name} />
        </Card>
      );

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>{workoutPlan.name}</Text>
            <Swiper
                showButtons={false}
                loop={false}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
            >
                {workoutDays.length === 0 ? (
                    <Text>No workout plans created.</Text>
                ) : (
                    workoutDays.map((day, index) => (
                        <DayCard key={index} day={day} />
                    ))
                )}
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenTitle: {
        paddingTop: 50,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    dayCard: {
        padding: 16,
        marginRight: 10,
    },
    exerciseCard: {
        padding: 16,
        marginBottom: 8,
    },
    cardContent: {
        width: '100%',
        height: '100%',
        padding: 16,
    },
    dot: {
        backgroundColor: '#BDBDBD',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
      },
    activeDot: {
        backgroundColor: '#FF9800',
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 5,
    },
})

export default WorkoutPlanDetailScreen