import { View, StyleSheet, Pressable } from 'react-native'
import React, {useState} from 'react'
import {Card, Avatar, Searchbar, Menu, Button, Checkbox} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import exercises from '../data/exercises';

const muscleGroups = ["All", "Chest", "Legs"];

function ExcerciseScreen({route}) {

    const { showCheckboxes } = route.params;
    const navigation = useNavigation();

    const handleExercisePress = (exercise) => {
        navigation.navigate('ExerciseDetail', {exercise});
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('All');


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
                            />
                            {showCheckboxes && (
                                <Checkbox/>
                            )}
                        </Card>
                    </Pressable>
                ))}
            </View>
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
    }
});

export default ExcerciseScreen