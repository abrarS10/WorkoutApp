// ExerciseScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import '@testing-library/jest-dom/extend-expect';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExcerciseScreen from '../ExcerciseScreen';
import { PaperProvider } from 'react-native-paper';

// Mock the 'useNavigation' hook
const mockNavigation = {navigate:jest.fn()};

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => {
      return mockNavigation;
    },
}));

jest.mock("expo-font");
jest.mock("expo-asset");

test('renders correctly', () => {
  const { getByPlaceholderText, getByText } = render(
    <NavigationContainer>
      <ExcerciseScreen />
    </NavigationContainer>
  );

  // Check if the Searchbar is rendered
  const searchbar = getByPlaceholderText('Search for exercises ');
  expect(searchbar).toBeDefined();

  // Check if the Exercise Cards are rendered
  const exercise1Card = getByText('Bench Press');
  const exercise2Card = getByText('Squat');
  expect(exercise1Card).toBeDefined();
  expect(exercise2Card).toBeDefined();
});

test('filters exercises based on search', () => {
  const { getByPlaceholderText, queryByText } = render(
    <NavigationContainer>
      <ExcerciseScreen />
    </NavigationContainer>
  );

  // Type 'Chest' in the Searchbar
  const searchbar = getByPlaceholderText('Search for exercises ');
  fireEvent.changeText(searchbar, 'Le');

  // Check if Exercise Card with 'Bench Press' is visible
  const exercise1Card = queryByText('Squat');
  expect(exercise1Card).toBeDefined();

  // Check if Exercise Card with 'Squat' is hidden
  const exercise2Card = queryByText('Bench Press');
  expect(exercise2Card).toBeNull();
});

test('navigates to ExerciseDetailScreen when exercise is pressed', () => {
  const { getByText } = render(
    <NavigationContainer>
      <ExcerciseScreen />
    </NavigationContainer>
  );

  // Simulate pressing the 'Bench Press' exercise
  const exercise1Card = getByText('Bench Press');
  fireEvent.press(exercise1Card);

  // Check if the 'ExerciseDetail' screen was navigated to with the correct params
  expect(mockNavigation.navigate).toHaveBeenCalledWith('ExerciseDetail', {
    exercise: {
      id: '1',
      name: 'Bench Press',
      primaryMuscle: 'Chest',
      additionalMuscles: ['Shoulders', 'Triceps'],
      description: 'Lie flat on a bench and push the bar up',
      equipment: ['Flat bench', 'Barbell', 'Weight plates'],
      gifUrl: 'www.abc.com',
    },
  });
});

test('should filter exercises by muscle group', () => {
  const { getByText, getByTestId, queryByText } = render(
    <PaperProvider>
      <NavigationContainer>
        <ExcerciseScreen />
      </NavigationContainer>
    </PaperProvider>
  );
  // Open the filter menu
  const filterButton = getByTestId('filterButton')
  fireEvent.press(filterButton);

  // Select a muscle group from the menu
  fireEvent.press(getByTestId('menuOption_Chest'));

  // TODO: Check if the selected muscle group is displayed on the filter button
  //expect(filterButton).toHaveTextContent('Chest');

  // Check if exercises are correctly filtered by the selected muscle group
  expect(getByText('Bench Press')).toBeTruthy();
  expect(queryByText('Squat')).toBeNull();
});