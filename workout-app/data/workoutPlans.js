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
                        name: 'Bench Press'
                    },
                    {
                        id: 3,
                        name: 'DB Bench Press'
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