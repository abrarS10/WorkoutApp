import { View, StyleSheet, Pressable } from 'react-native'
import React, {useState} from 'react'
import {Card, Avatar, Searchbar, Menu, Button, Checkbox} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import exercises from '../data/exercises';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkoutPlans } from '../store/reducers/workoutPlansReducer';
import { addSelectedExercisesToDay } from '../store/reducers/workoutPlansReducer';



const muscleGroups = ["All", "Chest", "Legs"];

function ExcerciseScreen({route}) {

    const showCheckboxes = route.params?.showCheckboxes;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    var planIndex = null
    var dayIndex = null

    const workoutPlans = useSelector(state => state.workoutPlans.plans)



    const planToBeEdited = useSelector(state => state.workoutPlans.planToBeEdited)
    const dayToBeEdited = useSelector(state => state.workoutPlans.dayToBeEdited)


    if (showCheckboxes){
        planIndex = workoutPlans.findIndex(plan => plan.id === planToBeEdited);
        dayIndex = workoutPlans[planIndex].workoutDays.findIndex(day => day.id === dayToBeEdited);

    }



    const handleExercisePress = (exercise) => {
        navigation.navigate('ExerciseDetail', {exercise});
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('All');
    const [selectedExerciseIds, setSelectedExerciseIds] = useState([]);



    const onChangeSearch = (query) => {
        setSearchQuery(query);

        const filtered = exercises.filter((exercise) => {
            const matchesSearchQuery = exercise.name.toLowerCase().includes(query.toLowerCase());

            // If "All" is selected or the exercise matches the selected muscle group, show it
            const matchesMuscleGroup = selectedMuscleGroup === 'All' || exercise.primaryMuscle === selectedMuscleGroup;

            return matchesSearchQuery && matchesMuscleGroup;
        });
        setFilteredExercises(filtered);
    };

    const filterExercisesByMuscleGroup = (muscleGroup) => {
        setSelectedMuscleGroup(muscleGroup);
        if (muscleGroup === 'All') {
          setFilteredExercises(exercises);
        } else {
          const filtered = exercises.filter(
            (exercise) => exercise.primaryMuscle === muscleGroup
          );
          setFilteredExercises(filtered);
        }
        setMenuVisible(false);
    };

    const toggleExerciseSelection = (exercise) => {
        if (selectedExerciseIds.includes(exercise)) {
            setSelectedExerciseIds(selectedExerciseIds.filter(item => item !== exercise));
        } else {
            setSelectedExerciseIds([...selectedExerciseIds, exercise]);
        }
    };

    const handleAddExercises = () => {
        // TODO: Pass selectedExercises back to WorkoutPlanDetailScreen

        dispatch(addSelectedExercisesToDay({planIndex, dayIndex, selectedExerciseIds}));
        navigation.goBack();

    };


    return (
        <View style={styles.container}>
            <Searchbar
                placeholder='Search for exercises '
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <View style={styles.filterContainer}>
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <Button testID='filterButton' mode='contained' onPress={() => setMenuVisible(true)}>{selectedMuscleGroup}</Button>
                    }
                >
                    {muscleGroups.map((muscleGroup) => (
                        <Menu.Item
                        key={muscleGroup}
                        testID={`menuOption_${muscleGroup}`}
                        onPress={() => filterExercisesByMuscleGroup(muscleGroup)}
                        title={muscleGroup}
                        />
                    ))}
                </Menu>
            </View>
            <View style={styles.exerciseListContainer}>
                {filteredExercises.map((exercise) => (
                    <Pressable key={exercise.id} onPress={() => handleExercisePress(exercise)}>
                        <Card mode='elevated' style={styles.exerciseCard}>
                            <Card.Title
                                title={exercise.name}
                                titleStyle={styles.exerciseName}
                                subtitle={exercise.primaryMuscle}
                                left={(props) => <Avatar.Image {...props} icon="folder" />}
                                right={() => showCheckboxes && (
                                    <Checkbox
                                        status={selectedExerciseIds.includes(exercise.id) ? 'checked' : 'unchecked'}
                                        onPress={() => toggleExerciseSelection(exercise.id)}
                                    />
                                )}
                            />

                        </Card>
                    </Pressable>
                ))}
            </View>
            {showCheckboxes && (
                <View style={styles.addButtonContainer}>
                    <Button
                        mode='contained'
                        onPress={handleAddExercises}
                        disabled={selectedExerciseIds.length === 0}
                    >
                        Add Selected Exercises
                    </Button>
                </View>
            )}
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 50,
    },
    exerciseListContainer: {
        paddingTop: 20
    },
    exerciseCard: {
        marginBottom: 3,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    filterContainer: {
        width: '30%',
        marginTop: 16,
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    },
});

export default ExcerciseScreen