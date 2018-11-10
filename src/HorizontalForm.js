import React, { Component } from "react";
import {Form, Icon, Row, Col, Input, Button, Select} from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {  unit: "kg"};
    }

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }


    handleUnitChange = (value) => {
        this.setState({ unit: value});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            var currentSet = {};

            if (!err) {
                currentSet.set = this.props.set;
                currentSet.unit = this.state.unit;
                currentSet.weight = values.weight;
                currentSet.reps = values.reps;
                currentSet.rest = values.rest;

                this.props.addCompletedSet(currentSet);
            }
        });
    }


    convertToNumber = (e) => {
        const value = e.currentTarget.value;
        if (isNaN(value)) {
            return null;
        } else {
            return value;
        }
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const Option = Select.Option;
        const selectAfter = (
            <Select defaultValue="kg" style={{ width: 60}} onChange={this.handleUnitChange}>
                <Option value="kg">kg</Option>
                <Option value="lb">lb</Option>
            </Select>
        );

        // Only show error after a field is touched.
        const weightError = isFieldTouched('weight') && getFieldError('weight');
        const repsError = isFieldTouched('reps') && getFieldError('reps');
        const restError = isFieldTouched("rest") && getFieldError("rest");

        return (
            <Row style={{ display: "inline"}}>
                <Form layout="inline" onSubmit={this.handleSubmit} >
                    <Col xs={4} md={3}>
                        <h3 style={{ display: "inline", paddingRight: 20} }>Set {this.props.set}: </h3>
                    </Col>
                    <Col xs={24} md={6}>
                        <FormItem
                            validateStatus={weightError ? 'error' : ''}
                            help={weightError || ''}
                        >
                            {getFieldDecorator('weight', {
                                getValueFromEvent: (e) => this.convertToNumber(e), rules: [{ required: true, message: 'weight *' }],
                            })(
                                <Input
                                    maxLength="3"
                                    addonAfter={selectAfter}

                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} md={6}>
                        <FormItem
                            validateStatus={repsError ? 'error' : ''}
                            help={repsError || ''}
                        >
                            {getFieldDecorator('reps', {
                                getValueFromEvent: (e) => this.convertToNumber(e), rules: [{ required: true, message: "reps *"}],
                            })(
                                <Input
                                       maxLength="3"
                                       addonAfter={"reps"}

                                />
                            )}
                        </FormItem>
                    </Col>

                    <Col xs={24} md={6}>
                        <FormItem
                            validateStatus={restError ? 'error' : ''}
                            help={restError || ''}
                        >
                            {getFieldDecorator('rest', {
                                getValueFromEvent: (e) => this.convertToNumber(e), rules: [{ required: true, message: "rest *"}],
                            })(
                                <Input
                                    maxLength="3"
                                    addonAfter={"s rest"}

                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col xs={24} md={3} >
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                            >
                                Add
                            </Button>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);

export default WrappedHorizontalLoginForm;