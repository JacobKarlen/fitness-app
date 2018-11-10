import React, { Component } from "react";
import { Card, Input, Select, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {addExercise, selectExercise} from "../actions";

import { titleCase } from "../UtilityFunctions";
import CompletedSetsList from "../CompletedSetsList";
import HorizontalForm from "../HorizontalForm";
import TimerProgressBar from "../TimerProgressBar";

class ExerciseCard extends Component {
    constructor(props) {
        super(props);

        this.state = { percent: 0, timeStarted: null, restDuration: 0, currentSet: 1,  completedSets: [] };

        this.addCompletedSet = this.addCompletedSet.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedExercise !== this.props.selectedExercise) { // changed exercise
            if (this.state.lastSet) {
                prevState.completedSets.push(this.state.lastSet);
            }
            this.setState({ lastSet: null });
            this.props.addExercise({ name: prevProps.selectedExercise, currentSet: prevState.currentSet, completedSets: prevState.completedSets });

            this.setState({ percent: 110 }); // complete the timer if exercise is switched

            const exercise = this.props.workout.exercises[this.props.selectedExercise];
            console.log("ex update", exercise);
            if (exercise && exercise.completedSets) {
                this.setState({ currentSet: exercise.currentSet, completedSets: exercise.completedSets });
            } else {
                this.setState({ currentSet: 1, completedSets: []});
            }

        }

    }

    increase = () => {
        var percent = this.state.percent + (100 / this.state.restDuration);

        if (this.state.lastSet) { // update accumulated rest for last set
            this.setState({ lastSet: { ...this.state.lastSet, rest: (this.state.lastSet.rest + 1) }});
        }

        if (percent > 100) {
            percent = 100;
            return true;
        }
        this.setState({ percent: percent });
        return false;
    }

    progress = (timeleft, timetotal, timeStarted) => {
        if (timeStarted !== this.state.timeStarted) {
            return;
        }

        const self = this;
        if (this.increase()) {
            return;
        }
        if(timeleft > 0) {
            setTimeout(function() {
                self.progress(timeleft - 1, timetotal, timeStarted);
            }, 1000);
        }
    };

    addCompletedSet = (completedSet) => {
        if (this.state.lastSet) {
            this.setState({ completedSets: [...this.state.completedSets, this.state.lastSet ] });
        }

        this.setState({ currentSet: (this.state.currentSet + 1) });

        this.setState({ percent: 0 });
        this.setState({ restDuration: completedSet.rest, timeStarted: new Date() }, function() {
            this.progress(this.state.restDuration, this.state.restDuration, this.state.timeStarted);
        }.bind(this));

        completedSet.rest = 0;
        this.setState({ lastSet: completedSet });

    }

    changeToPrevExercise = (e) => {
        var currentIndex = this.props.workoutBlueprint.indexOf(this.props.selectedExercise);
        if (currentIndex !== -1 && currentIndex !== 0) {
            this.props.selectExercise(this.props.workoutBlueprint[currentIndex - 1]);
        }
    }

    changeToNextExercise = (e) => {
        var currentIndex = this.props.workoutBlueprint.indexOf(this.props.selectedExercise);
        if (currentIndex !== -1 && currentIndex !== this.props.workoutBlueprint.length - 1) {
            this.props.selectExercise(this.props.workoutBlueprint[currentIndex + 1]);
        }
    }


    render(){
        const Option = Select.Option;
        const selectAfter = (
            <Select defaultValue="kg" style={{ width: 60}} onChange={this.handleUnitChange}>
                <Option value="kg">kg</Option>
                <Option value="lb">lb</Option>
            </Select>
        );

        return (
            <div>
                <Card
                    title={titleCase(this.props.selectedExercise)}
                    style={{  }}
                    className="container">


                    <CompletedSetsList completedSets={this.state.completedSets} lastSet={this.state.lastSet}/>
                    <HorizontalForm selectedExercise={this.props.selectedExercise} set={this.state.currentSet} addCompletedSet={this.addCompletedSet} />

                    <TimerProgressBar percent={this.state.percent} restDuration={this.state.restDuration} />

                    <Row>
                        <Col xs={12} style={{ textAlign: "center"}}>
                            <Button onClick={this.changeToPrevExercise}>Prev. Exercise</Button>
                        </Col>
                        <Col xs={12} style={{ textAlign: "center"}}>
                            <Button onClick={this.changeToNextExercise} >Next Exercise</Button>
                        </Col>
                    </Row>



                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // whatever is returned will show up as props for the component
    return {
        selectedExercise: state.selectedExercise,
        workoutBlueprint: state.workoutBlueprint,
        workout: state.workout
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addExercise: addExercise, selectExercise: selectExercise }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCard);