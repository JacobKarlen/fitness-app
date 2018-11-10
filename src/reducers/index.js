import { combineReducers } from "redux";

import ExerciseList from "./ExerciseListReducer";
import SelectedExercise from "./SelectedExerciseReducer";
import WorkoutBlueprint from "./WorkoutBlueprintReducer";
import Workout from "./WorkoutReducer";

const rootReducer = combineReducers({
    exerciseList: ExerciseList,
    selectedExercise: SelectedExercise,
    workoutBlueprint: WorkoutBlueprint,
    workout: Workout
});

export default rootReducer;