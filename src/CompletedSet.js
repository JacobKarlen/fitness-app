import React, { Component } from "react";
import { Row, Col } from "antd";

class CompletedSet extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <h3>Set {this.props.set}:</h3>
                    </Col>
                    <Col span={6}>
                        {this.props.weight} {this.props.unit}
                    </Col>
                    <Col span={6}>
                        {this.props.reps} reps
                    </Col>
                    <Col span={6}>
                        {this.props.rest} s rest
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CompletedSet;