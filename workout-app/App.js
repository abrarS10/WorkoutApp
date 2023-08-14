import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './store';
import AppTabNavigator from './navigation/AppTabNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <AppTabNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}



