import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
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
  return (
    <View style={styles.container}>
        <Searchbar placeholder='Search for exercise'/>
        <View style={styles.exerciseListContainer}>
            {exercises.map((exercise) => (
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