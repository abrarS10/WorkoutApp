import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import ExcerciseScreen from './screens/ExcerciseScreen';
import FoodScreen from './screens/FoodScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import SearchScreen from './screens/SearchScreen';
import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();


export default function App() {
  return (
    <PaperProvider>

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
            name='Search'
            component={SearchScreen}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="store-search" color={color} size={26}/>
              ),
            }}
          />
          <Tab.Screen
            name='Workouts'
            component={ExcerciseScreen}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="hammer" color={color} size={26}/>
              ),
            }}
          />
          <Tab.Screen
            name='Food'
            component={FoodScreen}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="food" color={color} size={26}/>
              ),
            }}
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
      </NavigationContainer>

    </PaperProvider>
  );
}



