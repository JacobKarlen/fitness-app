import React, { Component } from 'react';
import { Row, Col, Button} from 'antd';
import ExerciseMenu from "./containers/ExerciseMenu";
import ExerciseCard from "./containers/ExerciseCard";
import './App.css';

const workoutProgram = {
    id1: {
        exerciseName: "Bench Press",
        defaultWeight: 70,
        defaultSets: 5,
        defaultReps: 5
    },
    id2: {
    exerciseName: "Bench Press",
        defaultWeight: 85,
        defaultSets: 5,
        defaultReps: 5
    }
}

class App extends Component {
  render() {
    return (
      <div>
          <Row>
              <Col xs={24} lg={8}>
                  <ExerciseMenu />
              </Col>
              <Col xs={24} lg={16}>
                  <ExerciseCard exerciseName={"Bench press"}/>
              </Col>
          </Row>


      </div>
    );
  }
}

export default App;
