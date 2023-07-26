import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import {Card, Title, Subheading, Paragraph} from 'react-native-paper'

const ExerciseDetailScreen = ({route}) => {
    const { exercise } = route.params;
  return (
    <View style={styles.container}>
        <ScrollView style={styles.container}>
            <Card style={styles.exerciseCard}>
                <Card.Content>
                <Title>{exercise.name}</Title>
                <Subheading>Primary Muscles: {exercise.primaryMuscles}</Subheading>
                <Paragraph>{exercise.description}</Paragraph>
                <Paragraph>Necessary Equipment: {exercise.equipment.join(', ')}</Paragraph>
                {exercise.notes && <Paragraph>Notes: {exercise.notes}</Paragraph>}
                </Card.Content>
            </Card>
        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 50,
    },
});
export default ExerciseDetailScreen