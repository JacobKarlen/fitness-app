export const SELECT_EXERCISE = "SELECT_EXERCISE";
export const START_SESSION = "START_SESSION";
export const END_SESSION = "END_SESSION";
export const LOAD_EXERCISES = "LOAD_EXERCISES";
export const ADD_EXERCISE = "ADD_EXERCISE";

export function selectExercise(exercise) {
    console.log("Selected Exercise is: ", exercise);
    return {
      type: SELECT_EXERCISE,
      selectedExercise: exercise
    };
}

export function startSession() {
    return {
        type: START_SESSION
    };
}

export function endSession() {
    return {
        type: END_SESSION
    };
}

export function loadExercises(exercises) {
    return {
        type: LOAD_EXERCISES,
        exercises: exercises
    };
}

export function addExercise(exercise) {
    return {
        type: ADD_EXERCISE,
        exercise: exercise
    }
}