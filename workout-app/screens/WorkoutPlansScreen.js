import { View, StyleSheet, Pressable, Text } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { Card } from 'react-native-paper'
import { setPlanToBeEdited } from '../store/reducers/workoutPlansReducer';
import { setDayToBeEdited } from '../store/reducers/workoutPlansReducer';
import workoutPlans from '../data/workoutPlans';
import { setWorkoutPlans } from '../store/reducers/workoutPlansReducer';

const WorkoutPlansScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // TODO: initialize workoutPlans in redux on app start, not here
  dispatch(setWorkoutPlans(workoutPlans))

  // used to update state
  const savedWorkoutPlans = useSelector(state => state.workoutPlans.plans);
  const selectedWorkoutPlanId = useSelector(state => state.user.selectedWorkoutPlan);
  const isPremiumMember = useSelector(state => state.user.premiumMember);

  const selectedWorkoutPlan = savedWorkoutPlans.find((workout) => workout.id === selectedWorkoutPlanId);
  const otherWorkoutPlans = savedWorkoutPlans.filter((workout) => workout.id !== selectedWorkoutPlanId);

  const handlePlanPress = (workoutPlan) => {
    dispatch(setDayToBeEdited(workoutPlan.id))
    navigation.navigate('WorkoutPlanDetailScreen', {workoutPlan});
  };

  return (
    <View style={styles.workoutPlanListContainer}>
      {workoutPlans.length === 0 ? (
        <Text>No workout plans created</Text>
      ) : (
        <>
          {selectedWorkoutPlan && (
            <View>
              <Text style={styles.selectedWorkoutTitle}>Selected Plan:</Text>
              <Pressable key={selectedWorkoutPlan.id} onPress={() => handlePlanPress(selectedWorkoutPlan)}>
                <Card mode="outlined" style={styles.selectedPlanCard}>
                  <Card.Title title={selectedWorkoutPlan.name} subtitle={selectedWorkoutPlan.description} />
                </Card>
              </Pressable>
            </View>
          )}
          {otherWorkoutPlans.map((workout) => (
            <Pressable key={workout.id} onPress={() => handlePlanPress(workout)}>
              <Card mode="elevated" style={styles.planCard}>
                <Card.Title title={workout.name} subtitle={workout.description} />
              </Card>
            </Pressable>
          ))}
        </>
      )}
    </View>
  );

};



const styles = StyleSheet.create({
  workoutPlanListContainer: {
    paddingTop: 25,
    paddingHorizontal: 16,
  },
  selectedWorkoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedPlanCard: {
    marginBottom: 16,
    borderRadius: 8,
  },
  allWorkoutsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  planCard: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 8,
  },
});



export default WorkoutPlansScreen;