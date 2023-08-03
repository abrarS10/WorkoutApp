import React, {useState} from 'react'
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import {Card, Title, Subheading, Paragraph, Button, Portal} from 'react-native-paper'
import exerciseHistory from '../data/exerciseHistory';
import ExerciseHistoryModal from './ExerciseHistoryModal';

const ExerciseDetailScreen = ({route}) => {
    const { exercise } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);

    const exerciseId = exercise.id;

    const exerciseHistoryForCurrentExercise = exerciseHistory
      .filter((historyEntry) => historyEntry.exerciseId === exercise.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

      //Get the most recent date for the current exercise
    const mostRecentEntry = exerciseHistoryForCurrentExercise.length
      ? exerciseHistoryForCurrentExercise[0]
      : null;

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    return (
        <ScrollView style={styles.container}>
          <ImageBackground source={{ uri: exercise.imageUrl }} style={styles.imageBackground}>
            <View style={styles.imageOverlay}>

            </View>
          </ImageBackground>
          <Card style={styles.exerciseCard}>
            <Card.Content>
              <Subheading style={styles.exerciseName}>{exercise.name}</Subheading>
              <Subheading style={styles.primaryMuscles}>Primary Muscles: {exercise.primaryMuscle}</Subheading>
              <Subheading style={styles.equipment}>Secondary Muscles: {exercise.additionalMuscles.join(', ')}</Subheading>
              <Paragraph style={styles.description}>Instructions: {exercise.description}</Paragraph>
              <Paragraph style={styles.equipment}>Necessary Equipment: {exercise.equipment.join(', ')}</Paragraph>
              {exercise.notes && <Paragraph style={styles.notes}>Notes: {exercise.notes}</Paragraph>}
            </Card.Content>
          </Card>

          <Card style={styles.exerciseCard}>
              { mostRecentEntry ? (
                <Card.Content>
                  <Subheading>Most Recent Exercise Date:</Subheading>
                  <Paragraph>{mostRecentEntry.date}</Paragraph>
                  {/* Display set plan for the most recent entry */}
                  <Subheading>Set Plan:</Subheading>
                  {mostRecentEntry.setPlan.map((set) => (
                    <View key={set._id}>
                      <Paragraph>Weight: {set.weight}</Paragraph>
                      <Paragraph>Reps: {set.reps}</Paragraph>
                    </View>
                  ))}
                  <Button style={styles.button} icon="history" mode='contained-tonal' onPress={toggleModal}>
                    Show entire history
                  </Button>
                </Card.Content>
              ) : (
                <Card.Content>
                  <Subheading>There is no history for this exercise.</Subheading>
                </Card.Content>
              )}
          </Card>
          <Portal>
            <ExerciseHistoryModal
              visible={isModalVisible}
              onClose={toggleModal}
              exerciseHistory={exerciseHistoryForCurrentExercise}
            />
          </Portal>
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
    button: {
      marginTop: 16,
      width: '100%',
      alignItems: 'center'
    }
});
export default ExerciseDetailScreen