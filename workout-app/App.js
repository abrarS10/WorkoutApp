import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import ExcerciseScreen from './screens/ExcerciseScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import WorkoutPlansScreen from './screens/WorkoutPlansScreen';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './store';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
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
              component={WorkoutPlansScreen}
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="store-search" color={color} size={26}/>
                ),
              }}
            />
            <Tab.Screen
              name='Exercises'
              component={ExcerciseScreen}
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons name="weight" color={color} size={26}/>
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
    </Provider>
  );
}



