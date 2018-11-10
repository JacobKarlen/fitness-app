import {START_SESSION, END_SESSION, LOAD_EXERCISES, ADD_EXERCISE} from "../actions";

export default function(currentState = { exercises: {} }, action) {
    switch (action.type) {
        case START_SESSION:
            return {
                ...currentState,
                sessionStart: new Date()
            };
        case END_SESSION:
            return {
                ...currentState,
                sessionEnd: new Date()
            };
        case LOAD_EXERCISES:
            return {
                ...currentState,
                exercises: action.exercises
            };
        case ADD_EXERCISE:
            return {
                ...currentState,
                exercises: {
                    ...currentState.exercises,
                    [action.exercise.name]: {
                        currentSet: action.exercise.currentSet,
                        completedSets: action.exercise.completedSets
                    }
                }
            }
        default:
            return currentState;
    }
}