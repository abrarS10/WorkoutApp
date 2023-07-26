import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, {useState} from 'react'
import {Card, Avatar, Searchbar} from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import ExerciseDetailScreen from './ExerciseDetailScreen'

const Stack = createNativeStackNavigator();

//NOTE: temporary placeholder excercises
const exercises = [
    {
        id: '1',
        name: 'Bench Press',
        primaryMuscle: 'Chest',
        additionalMuscles: ['Shoulders', 'Triceps'],
        description: 'Lie flat on a bench and push the bar up',
        equipment: ['Flat bench', 'Barbell', 'Weight plates'],
        gifUrl: 'www.abc.com'
    },
    {
        id: '2',
        name: 'Squat',
        primaryMuscle: 'Legs',
        additionalMuscles: ['Glutes'],
        description: 'Hold barbell on traps and squat down and lift back up',
        equipment: ['Squat rack, Barbell, Weight plates'],
        gifUrl: 'www.abc.com'
    }
]

function ExcerciseScreen() {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    const navigation = useNavigation();

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        const filtered = exercises.filter(
            (exercise) =>
            exercise.name.toLowerCase().includes(query.toLowerCase()) ||
            exercise.primaryMuscle.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredExercises(filtered);
    };

    const handleExercisePress = (exercise) => {
        navigation.navigate('ExerciseDetail', {exercise});
    };

    return(
        <Stack.Navigator>
            <Stack.Screen name="ExcerciseScreen" component={ExcerciseListContent} options={{ headerShown: false }} />
            <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{ title: 'Exercise Detail' }} />
        </Stack.Navigator>
    )

    function ExcerciseListContent() {

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