import React, { Component } from "react";
import { Progress, Button } from "antd";

class TimerProgressBar extends Component {

    render() {

        return (
            <div>
            <Progress percent={this.props.percent}
                      format={percent => `${Math.round(this.props.restDuration - (percent / (100 / this.props.restDuration) )) } s`}
            />
            </div>
        );
    }
}


export default TimerProgressBar;

