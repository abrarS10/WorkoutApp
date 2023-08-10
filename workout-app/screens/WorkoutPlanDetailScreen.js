import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Button, Card } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import exercises from '../data/exercises';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { setDayToBeEdited } from '../store/reducers/workoutPlansReducer';

const WorkoutPlanDetailScreen = ({route}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    //const workoutPlan = useSelector(state => state.workoutPlans.workoutPlans)

    const workoutPlan = route.params?.workoutPlan;
    const workoutDays = workoutPlan?.workoutDays;



    const handleNewExercisePress = (day) => {
        dispatch(setDayToBeEdited(day))
        navigation.navigate('ExcerciseScreen', {showCheckboxes: true});
    };

    const DayCard = ({day}) => {
        return (
            <View style={styles.dayCard}>
                <Card style={styles.cardContent}>
                    <Card.Title title={day.name} />
                    {day.exercises.length === 0 ? (
                        <Text>No exercises for this day.</Text>
                    ) : (
                        day.exercises.map((exerciseData, index) => (
                        <ExerciseCard key={index} exerciseData={exerciseData} />
                        ))
                    )}
                    <Button icon="plus"  onPress={() => handleNewExercisePress(day.id)}>
                        Add new exercise
                    </Button>
                </Card>
            </View>
        );
    };

    const ExerciseCard = ({ exerciseData }) => {

        const exerciseId = exerciseData.id
        // find relevant exercise in exercises object using exercise id
        const exercise = exercises.find((exercise) => exercise.id === exerciseId);

        return (
            <Card style={styles.exerciseCard}>
                <Card.Title title={exercise.name} />
                <Card.Content>
                    {exerciseData.setPlan && exerciseData.setPlan.length > 0 ? (
                        <Text>
                            {getSetsText(exerciseData.setPlan)} {getRepsText(exerciseData.setPlan)}
                        </Text>
                    ) : (
                        <Text>No set plan created</Text>
                    )}
                </Card.Content>
            </Card>
        );
    }

    function getSetsText(setPlan) {
        const numSets = setPlan.length;
        return numSets === 1 ? `${numSets} set` : `${numSets} sets`;
    }

    const getRepsText = (setPlan) => {
        const repsArray = setPlan.map((set) => set.reps).filter(rep => rep !== null);

        if ( repsArray.length <= 0 ) { return ``}

        const minReps = Math.min(...repsArray);
        const maxReps = Math.max(...repsArray);

        if (minReps == maxReps || minReps == 0) {return `x ${maxReps} reps`}
        return `x ${minReps}-${maxReps} reps`;
    };

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
        backgroundColor: '#00C68D',
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 5,
    },
})

export default WorkoutPlanDetailScreen