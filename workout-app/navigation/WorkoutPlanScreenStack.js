import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import ExcerciseScreen from '../screens/ExcerciseScreen';
import WorkoutPlansScreen from '../screens/WorkoutPlansScreen';
import WorkoutPlanDetailScreen from '../screens/WorkoutPlanDetailScreen';

const WorkoutPlanStack = createNativeStackNavigator();

function WorkoutPlanScreenStack() {
    return (
        <WorkoutPlanStack.Navigator>
            <WorkoutPlanStack.Screen
                name="WorkoutPlansScreen"
                component={WorkoutPlansScreen}
                options={{ headerShown: false }}
            />
            <WorkoutPlanStack.Screen
                name="WorkoutPlanDetailScreen"
                component={WorkoutPlanDetailScreen}
                options={{ headerShown: false }}
            />
            <WorkoutPlanStack.Screen
                name="ExcerciseScreen"
                component={ExcerciseScreen}
                options={{ headerShown: false }}
                initialParams={{showCheckboxes: true}}
            />
            <WorkoutPlanStack.Screen
                name="ExerciseDetail"
                component={ExerciseDetailScreen}
                options={{ headerShown: false }}
            />
        </WorkoutPlanStack.Navigator>
    );
}

export default WorkoutPlanScreenStack;