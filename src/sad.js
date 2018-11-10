import {Button, Card, Col, Input, Row} from "antd";
import React from "react";


handleWeightChange = (event) => {
    if (!isNaN(event.target.value)) {
        this.setState({ currentSet: {...this.state.currentSet, weight: event.target.value }});
    }
}

handleRepsChange = (event) => {
    if (!isNaN(event.target.value)) {
        this.setState({ currentSet: {...this.state.currentSet, reps: event.target.value }});
    }
}

handleRestChange = (event) => {
    if (!isNaN(event.target.value)) {
        this.setState({ currentSet: {...this.state.currentSet, rest: event.target.value }});
    }
}

handleUnitChange = (value) => {
    this.setState({ currentSet: {...this.state.currentSet, unit: value } });
    console.log(value);
}

<Row>
    <Col span={3}>
        <h3>Set {this.state.currentSet.set}:</h3>
    </Col>
    <Col span={6}>
        <Input
            maxLength="3"
            value={this.state.currentSet.weight}
            onChange={this.handleWeightChange}
            addonAfter={selectAfter}
        />
    </Col>
    <Col span={6}>
        <Input
            maxLength="3"
            value={this.state.currentSet.reps}
            onChange={this.handleRepsChange}
            addonAfter="reps"
        />
    </Col>
    <Col span={6}>
        <Input
            maxLength="3"
            value={this.state.currentSet.rest}
            onChange={this.handleRestChange}
            addonAfter="s rest"
        />
    </Col>
    <Col span={3}>
        <Button type="primary" onClick={() => this.addCompletedSet()}>
            Add
        </Button>
    </Col>
</Row>