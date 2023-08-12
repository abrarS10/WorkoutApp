import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import React from 'react'
import { Button, Card, FAB } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import exercises from '../data/exercises';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector, connect } from 'react-redux';
import { setDayToBeEdited, addDayToWorkoutPlan } from '../store/reducers/workoutPlansReducer';

const WorkoutPlanDetailScreen = ({route}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const swiperRef = React.createRef();


    const workoutPlan = route.params?.workoutPlan;

    const plans = useSelector(state => state.workoutPlans.plans)

    const planToBeEdited = useSelector(state => state.workoutPlans.planToBeEdited)
    planIndex = plans.findIndex(plan => plan.id === planToBeEdited);

    const workoutDays = plans[planIndex]?.workoutDays;

    const mapDayToWeekday = (dayNumber) => {
        const dayToWeekdayMap = {
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
            7: 'Sunday'
        }

        return dayToWeekdayMap[dayNumber];
    };


    const handleNewExercisePress = (day) => {
        dispatch(setDayToBeEdited(day))
        navigation.navigate('ExcerciseScreen', {showCheckboxes: true});
    };

    const handleAddDayPress = () => {
        if (workoutDays.length >= 7) {
            Alert.alert('Error', "Can't create more than 7 days!");
            return
        }

        const newWorkoutNumber = workoutDays.length + 1

        const newDay = {
            id: Date.now(),
            name: `Workout Day ${newWorkoutNumber}`,
            weekDay: newWorkoutNumber,
            exercises: []
        }

        dispatch(addDayToWorkoutPlan({planIndex, newDay}))
        swiperRef.current.scrollBy(workoutDays.length);
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

    const DayCard = ({day}) => {
        return (
            <View style={styles.dayCard}>
                <Text>{mapDayToWeekday(day.weekDay)}</Text>
                <ScrollView>
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
                </ScrollView>
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


    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>{workoutPlan.name}</Text>
            <Swiper
                showButtons={false}
                loop={false}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                ref={swiperRef}
            >
                {workoutDays.length === 0 ? (
                    <Text>No workout days created.</Text>
                ) : (
                    workoutDays.map((day, index) => (
                        <DayCard key={index} day={day} />
                    ))
                )}
            </Swiper>
            <View style={styles.fabContainer}>
                <FAB
                style={styles.fab}
                icon="plus"
                onPress={handleAddDayPress}
                label='Add day'
                />
            </View>
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
    fabContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
        fab: {
        backgroundColor: '#93ff78', // Customize the color of the button
    },
})

export default WorkoutPlanDetailScreen