import { View, StyleSheet, Pressable, Text } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import workoutPlans from '../data/workoutPlans';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import WorkoutPlanDetailScreen from './WorkoutPlanDetailScreen';
import { Card } from 'react-native-paper'


const Stack = createNativeStackNavigator();

const WorkoutPlansScreen = () => {

  const navigation = useNavigation();

  const handlePlanPress = (workoutPlan) => {
    navigation.navigate('WorkoutPlanDetail', {workoutPlan});
};

  return(
    <Stack.Navigator>
        <Stack.Screen name="WorkoutPlansScreen" component={WorkoutPlanContent} options={{ headerShown: true }} />
        <Stack.Screen name="WorkoutPlanDetail" component={WorkoutPlanDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )

  function WorkoutPlanContent(){

      const selectedWorkoutPlanId = useSelector(state => state.user.selectedWorkoutPlan);
      const isPremiumMember = useSelector(state => state.user.premiumMember);
      // used to update state
      const dispatch = useDispatch();

      const selectedWorkoutPlan = workoutPlans.find((workout) => workout.id === selectedWorkoutPlanId);
      const otherWorkoutPlans = workoutPlans.filter((workout) => workout.id !== selectedWorkoutPlanId);

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

      // const renderWorkoutPlan = ({ item }) => {
      //   const isSelected = item.id === selectedWorkoutPlan;

      //   return (
      //     <TouchableOpacity
      //       style={[styles.planCard, isSelected && styles.selectedPlanCard]}
      //       onPress={() => navigation.navigate('PlanDetails', { planId: item.id })}
      //     >
      //       <Text style={styles.planName}>{item.name}</Text>
      //       <Text style={styles.planDescription}>{item.description}</Text>
      //     </TouchableOpacity>
      //   );
      // };

      // if (workoutPlans.length === 0) {
      //   return (
      //     <View style={styles.container}>
      //       <Text>No workout plans created yet.</Text>
      //       <TouchableOpacity
      //         style={styles.createButton}
      //         onPress={() => navigation.navigate('CreatePlan')}
      //       >
      //         <Text style={styles.createButtonText}>Create New Plan</Text>
      //       </TouchableOpacity>
      //     </View>
      //   );
      // }

      // return (
      //   <View style={styles.container}>
      //     <FlatList
      //       data={workoutPlans}
      //       keyExtractor={item => item.id}
      //       renderItem={renderWorkoutPlan}
      //     />
      //     <TouchableOpacity
      //       style={styles.createButton}
      //       onPress={() => navigation.navigate('CreatePlan')}
      //     >
      //       <MaterialCommunityIcons name="plus" size={24} color="white" />
      //     </TouchableOpacity>
      //   </View>
      // );
  };
}


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