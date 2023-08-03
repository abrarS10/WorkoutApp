import React from 'react'
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import {Card, Title, Subheading, Paragraph} from 'react-native-paper'
import exerciseHistory from '../data/exerciseHistory';


const ExerciseDetailScreen = ({route}) => {
    const { exercise } = route.params;

    const exerciseId = exercise.id;
    const exerciseHistoryForCurrentExercise = exerciseHistory.filter(
      (history) => history.exerciseId === exerciseId
    );

    return (
        <ScrollView style={styles.container}>
          <ImageBackground source={{ uri: exercise.imageUrl }} style={styles.imageBackground}>
            <View style={styles.imageOverlay}>
              <Title style={styles.exerciseName}>{exercise.name}</Title>
            </View>
          </ImageBackground>
          <Card style={styles.exerciseCard}>
            <Card.Content>
              <Subheading style={styles.primaryMuscles}>Primary Muscles: {exercise.additonalMuscles}</Subheading>
              <Paragraph style={styles.description}>{exercise.description}</Paragraph>
              <Paragraph style={styles.equipment}>Necessary Equipment: {exercise.equipment.join(', ')}</Paragraph>
              {exercise.notes && <Paragraph style={styles.notes}>Notes: {exercise.notes}</Paragraph>}
            </Card.Content>
          </Card>
          <Card style={styles.exerciseCard}>
              <Card.Content>
                <Title>Exercise History</Title>
                  {exerciseHistoryForCurrentExercise.map((history) => (
                    <View key={history.historyId} style={styles.historyItem}>
                      <Subheading>Date: {history.date}</Subheading>
                      {/* Render the setPlan data */}
                      {history.setPlan.map((set, index) => (
                        <Paragraph key={index}>
                          Set {index + 1}: Weight: {set.weight}, Reps: {set.reps}
                        </Paragraph>
                      ))}
                    </View>
                  ))}
              </Card.Content>
          </Card>
        </ScrollView>
      );
    };

const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    },
    imageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    },
    exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    },
    exerciseCard: {
    margin: 16,
    elevation: 4,
    },
    primaryMuscles: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
    },
    description: {
    marginBottom: 16,
    },
    equipment: {
    marginBottom: 16,
    },
    notes: {
    marginBottom: 16,
    },
});
export default ExerciseDetailScreen