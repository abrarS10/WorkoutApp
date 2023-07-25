import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {Card, Avatar, Searchbar} from 'react-native-paper'

//NOTE: temporary placeholder excercises
const exercises = [
    {
        id: '1',
        name: 'Bench Press',
        muscleGroup: 'Chest',
        description: 'Lie flat on a bench and push the bar up',
        equipment: 'bench, barbell, weight plates',
        gifUrl: 'www.abc.com'
    },
    {
        id: '2',
        name: 'Squat',
        muscleGroup: 'Legs',
        description: 'Hold barbell on traps and squat down and lift back up',
        equipment: 'squat rack, barbell, weight plates',
        gifUrl: 'www.abc.com'
    }
]

function Excercises() {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExercises, setFilteredExercises] = useState(exercises);

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        const filtered = exercises.filter(
            (exercise) =>
            exercise.name.toLowerCase().includes(query.toLowerCase()) ||
            exercise.muscleGroup.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredExercises(filtered);
    };

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder='Search for exercise'
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <View style={styles.exerciseListContainer}>
                {filteredExercises.map((exercise) => (
                    <Card mode='elevated' style={styles.exerciseCard}>
                        <Card.Title
                            key={exercise.id}
                            title={exercise.name}
                            titleStyle={styles.exerciseName}
                            subtitle={exercise.muscleGroup}
                            left={(props) => <Avatar.Image {...props} icon="folder" />}
                        />
                    </Card>
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
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default Excercises