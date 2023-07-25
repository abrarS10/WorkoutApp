import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import Excercises from './screens/Excercises';
import Workouts from './screens/Workouts';
import Progress from './screens/Progress';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="calendar-today" color={color} size={26}/>
            ),
          }}
        />
        <Tab.Screen
          name='Excercises'
          component={Excercises}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="hammer" color={color} size={26}/>
            ),
          }}
        />
        <Tab.Screen
          name='Workouts'
          component={Workouts}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="bridge" color={color} size={26}/>
            ),
          }}
        />
        <Tab.Screen
          name='Progress'
          component={Progress}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="boombox" color={color} size={26}/>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>

  );
}



