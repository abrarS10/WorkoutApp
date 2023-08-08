const workoutPlans = [
    {
        id: 1,
        name: 'Push Pull Legs',
        description: '3 day plan targeting a group of muscles on each day',
        workoutDays: [
            {
                id: 1,
                name: 'Push day',
                day: 'Monday',
                exercises: [
                    {
                        id: 1,
                        setPlan: [
                            {
                                reps: 5,
                                weight: 30,
                                rest: 120
                            },
                            {
                                reps: null,
                                weight: 30,
                                rest: 120
                            },
                            {
                                reps: 10,
                                weight: 30,
                                rest: 120
                            },
                        ]
                    },
                    {
                        id: 3,
                    }
                ]

            },
            {
                id: 2,
                name: 'Pull day',
                day: 'Tuesday',
                exercises: [],
            }
        ]
    },
    {
        id: 2,
        name: 'Bro Split',
        description: '3 day plan targeting a group of muscles on each day',
        workoutDays: []
    },

]

export default workoutPlans;