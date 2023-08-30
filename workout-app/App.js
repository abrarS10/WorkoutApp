import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from './store';
import AppTabNavigator from './navigation/AppTabNavigator';
import { useEffect } from 'react';
import { fetchExercises } from './store/reducers/exerciseReducer';
import { loadExercisesFromStorage } from './store/reducers/exerciseReducer';
import { setExercises } from './store/reducers/exerciseReducer';

export default function AppWrapper() {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadExercises = async () => {
      const exercisesFromStorage = await loadExercisesFromStorage();

      if(exercisesFromStorage) {
        dispatch(setExercises(exercisesFromStorage));
      } else {
        dispatch(fetchExercises());
      }
    }
    loadExercises();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <AppTabNavigator />
      </NavigationContainer>
    </PaperProvider>
  );

}



