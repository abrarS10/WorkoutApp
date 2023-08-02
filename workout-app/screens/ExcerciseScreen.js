import { View, StyleSheet, Pressable } from 'react-native'
import React, {useState} from 'react'
import {Card, Avatar, Searchbar} from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import ExerciseDetailScreen from './ExerciseDetailScreen'
import exercises  from '../data/exercises';

const Stack = createNativeStackNavigator();


function ExcerciseScreen() {


    const navigation = useNavigation();

    const handleExercisePress = (exercise) => {
        navigation.navigate('ExerciseDetail', {exercise});
    };

    return(
        <Stack.Navigator>
            <Stack.Screen name="ExcerciseScreen" component={ExcerciseListContent} options={{ headerShown: false }} />
            <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )

    function ExcerciseListContent() {
        const [searchQuery, setSearchQuery] = useState('');
        const [filteredExercises, setFilteredExercises] = useState(exercises);

        const onChangeSearch = (query) => {
            setSearchQuery(query);
            const filtered = exercises.filter(
                (exercise) =>
                exercise.name.toLowerCase().includes(query.toLowerCase()) ||
                exercise.primaryMuscle.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredExercises(filtered);
        };


        return (
            <View style={styles.container}>
                <Searchbar
                    placeholder='Search for exercises '
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
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
                            </Card>
                        </Pressable>
                    ))}
                </View>
            </View>
        )
    }
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
    }
});

export default ExcerciseScreen