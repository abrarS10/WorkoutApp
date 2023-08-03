import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Text, Button, Title } from 'react-native-paper';

const ExerciseHistoryModal = ({ visible, onClose, exerciseHistory }) => {
  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
      <ScrollView>
        <Title>History</Title>
        {exerciseHistory.map((historyEntry) => (
          <View key={historyEntry.historyId} style={styles.historyEntryContainer}>
            <Text style={styles.dateText}>{historyEntry.date}</Text>
            {historyEntry.setPlan.map((set) => (
              <View key={set._id}>
                <Text>Weight: {set.weight}</Text>
                <Text>Reps: {set.reps}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Button mode="contained" testID='closeButton' onPress={onClose} style={styles.closeButton}>
        Close
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    maxHeight: '80%', // Set the maximum height for the modal
    borderRadius: 8,
  },
  historyEntryContainer: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  closeButton: {
    width: '60%',
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default ExerciseHistoryModal;