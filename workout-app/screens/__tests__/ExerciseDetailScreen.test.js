import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ExerciseDetailScreen from '../ExerciseDetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

jest.mock("expo-font");
jest.mock("expo-asset");

describe('ExerciseDetailScreen', () => {
    const mockExercises =
        [
            {
                id: '1',
                name: 'Bench Press',
                primaryMuscle: 'Chest',
                additionalMuscles: ['Triceps', 'Shoulders'],
                description: 'Lie on a flat bench and push the barbell upward.',
                equipment: ['Barbell', 'Bench'],
                notes: 'Keep your back flat on the bench.',
            },
            {
                id: '2',
                name: 'Squat',
                primaryMuscle: 'Legs',
                additionalMuscles: ['Glutes'],
                description: 'Hold barbell on traps and squat down and lift back up',
                equipment: ['Squat rack, Barbell, Weight plates'],
                gifUrl: 'www.abc.com'
            }
        ];

    test('should render exercise details correctly', () => {
        const { getByText } = render(
            <PaperProvider>
            <NavigationContainer>
                <ExerciseDetailScreen route={{ params: { exercise: mockExercises[0] } }} />
            </NavigationContainer>
            </PaperProvider>
        );

        expect(getByText('Bench Press')).toBeTruthy();
        expect(getByText('Primary Muscles: Chest')).toBeTruthy();
        expect(getByText('Secondary Muscles: Triceps, Shoulders')).toBeTruthy();
        expect(getByText('Instructions: Lie on a flat bench and push the barbell upward.')).toBeTruthy();
        expect(getByText('Necessary Equipment: Barbell, Bench')).toBeTruthy();
        expect(getByText('Notes: Keep your back flat on the bench.')).toBeTruthy();
    });

    test('should render "Show entire history" button when exercise has history', () => {
        // Create a sample exercise history for the current exercise (non-empty history)
        const exerciseHistoryForCurrentExercise = [
            {
            historyId: '1',
            exerciseId: mockExercises[0].id,
            date: '2023-07-25',
            setPlan: [
                { _id: "2345", weight: '60', reps: '5' },
                { _id: '2346', weight: '70', reps: '5' },
            ],
            },
        ];

        const { queryByText } = render(
            <PaperProvider>
                <NavigationContainer>
                    <ExerciseDetailScreen
                    route={{ params: { exercise: mockExercises[0] } }}
                    exerciseHistory={exerciseHistoryForCurrentExercise}
                    />
                </NavigationContainer>
            </PaperProvider>
        );

        expect(queryByText('Show entire history')).toBeTruthy();
        expect(queryByText('There is no history for this exercise.')).toBeNull();
        });

    test('should not render "Show entire history" button when exercise has no history', () => {
        // Create an empty exercise history for the current exercise
        const exerciseHistoryForCurrentExercise = [];

        const { queryByText } = render(
            <PaperProvider>
                <NavigationContainer>
                    <ExerciseDetailScreen
                        route={{ params: { exercise: mockExercises[1] } }}
                        exerciseHistory={exerciseHistoryForCurrentExercise}
                    />
                </NavigationContainer>
            </PaperProvider>
        );

        expect(queryByText('Show entire history')).toBeNull();
        expect(queryByText('There is no history for this exercise.')).toBeTruthy();

    });

    test('should open the modal and display set plan details on button click', async () => {
        const exerciseHistoryForCurrentExercise = [
            {
            historyId: '1',
            exerciseId: mockExercises[0].id,
            date: '2023-07-25',
            setPlan: [
                { _id: "2345", weight: '60', reps: '5' },
                { _id: '2346', weight: '70', reps: '5' },
            ],
            },
        ];

        const { getByText, queryByText, getByTestId, findByTestId } = render(
            <PaperProvider>
                <NavigationContainer>
                    <ExerciseDetailScreen
                        route={{ params: { exercise: mockExercises[0] } }}
                        exerciseHistory={exerciseHistoryForCurrentExercise}
                    />
                </NavigationContainer>
            </PaperProvider>
        );

        // Ensure the modal is initially not visible
        expect(queryByText('History')).toBeNull();

        // Click on the "Show entire history" button
        fireEvent.press(getByText('Show entire history'));

        // Wait for the modal content to appear
        await findByTestId('closeButton');
        expect(queryByText('History')).toBeTruthy();


        // TODO: Close the modal (optional, if you have a close button or any other way to close the modal)
        // fireEvent.press(getByTestId('closeButton'));
        // expect(queryByText('History')).toBeNull();
    });
});
