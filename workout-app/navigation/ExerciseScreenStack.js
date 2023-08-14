import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import ExcerciseScreen from '../screens/ExcerciseScreen';

const ExerciseStack = createNativeStackNavigator();

function ExerciseScreenStack() {
    return (
        <ExerciseStack.Navigator>
            <ExerciseStack.Screen
                name="ExcerciseScreen"
                component={ExcerciseScreen}
                options={{ headerShown: false }}
                initialParams={{showCheckboxes: false}}
            />
            <ExerciseStack.Screen
                name="ExerciseDetail"
                component={ExerciseDetailScreen}
                options={{ headerShown: false }}
            />
        </ExerciseStack.Navigator>
    );
}

export default ExerciseScreenStack;