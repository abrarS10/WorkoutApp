import React from 'react';
import WorkoutPlanScreenStack from './WorkoutPlanScreenStack';
import ExerciseScreenStack from './ExerciseScreenStack';
import HomeScreen from '../screens/HomeScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createMaterialBottomTabNavigator();

function AppTabNavigator(){
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name='Workouts'
                component={WorkoutPlanScreenStack}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="store-search" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name='Exercises'
                component={ExerciseScreenStack}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="weight" color={color} size={26}/>
                    ),
                }}
                initialParams={{showCheckboxes: false}}
            />
            <Tab.Screen
                name='Me'
                component={MyProfileScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="face-man-profile" color={color} size={26}/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default AppTabNavigator;