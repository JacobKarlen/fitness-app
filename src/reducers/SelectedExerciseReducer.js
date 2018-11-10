import { SELECT_EXERCISE } from "../actions";

export default function (currentState = "bench press", action) {
    switch (action.type) {
        case SELECT_EXERCISE:
            return action.selectedExercise;

         default:
             return currentState;
    }
}