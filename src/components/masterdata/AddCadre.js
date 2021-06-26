import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
    Form, Select, Radio, Button, Input, Result, Row, Col, Modal, notification, DatePicker,
    Card, Breadcrumb, Typography, InputNumber
} from 'antd';

import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
}

@inject('appStore')
@observer
class AddCadreForm extends Component {

    constructor(props) {
        super(props);

        this.state = { visible: false, confirmLoading: false }

        this.props.appStore.getInstitutes();
        this.props.appStore.getDesignations();
        this.props.appStore.getGrades();
    }

    showModal = () => { this.setState({ visible: true }); }

    handleCancel = () => { this.setState({ visible: false, }); }

    handleOk = e => {
        this.props.form.validateFields((err, values) => {

            this.setState({ confirmLoading: true });

            this.props.appStore.addCadrePosition(values)
                .then(sucess => {
                    this.setState({ confirmLoading: false });
                    this.props.form.resetFields();
                    openNotificationWithIcon('success', 'Success', 'Cadre position added successfully!');
                    this.handleCancel();
                })
                .catch(err => {
                    this.setState({ confirmLoading: false });
                    openNotificationWithIcon('error', 'Oops', 'Something went wrong in cadre position adding!');
                });

        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading } = this.state;
        const { institutes, designations, grades } = this.props.appStore;

        let instituteValues = [];
        let designationValues = [];
        let gradesValues = [];

        if (institutes) {
            institutes.forEach((element, index) => {
                instituteValues.push(<Option key={index} value={element.id}>{element.name}</Option>);
            });
        }

        if (designations) {
            designations.forEach((element, index) => {
                designationValues.push(<Option key={index} value={element.id}>{element.designation}</Option>);
            });
        }

        if (grades) {
            grades.forEach((element, index) => {
                gradesValues.push(<Option key={index} value={element.id}>{element.grade_name}</Option>);
            });
        }

        return (
            <div style={{ display: 'inline' }}>
                <Button type="primary" icon="plus" onClick={this.showModal}>Add New Cadre</Button>
                <Modal
                    title="Add New Cadre"
                    okText="Add"
                    confirmLoading={confirmLoading}
                    width={800}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem
                            label="Institute"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('institutes_id', {
                                rules: [{ required: true, message: 'Please input institute' }]
                            })(
                                <Select
                                    style={{ width: 450 }}
                                    placeholder="Select institute"
                                    optionFilterProp="children"
                                    showSearch
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteValues}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Designation"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('designations_id', {
                                rules: [{ required: true, message: 'Please input designation' }]
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select designation"
                                    optionFilterProp="children"
                                    showSearch
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {designationValues}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Service"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('service', {
                                rules: [{ required: true, message: 'Please input service' }]
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select service"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="SLAS">SLAS</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Grade"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grades_id', {
                                rules: [{ required: true, message: 'Please input grade' }]
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select grade"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {gradesValues}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Salary Code"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('salary_code', {
                                rules: [{ required: true, message: 'Please input salary code' }]
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select salary code"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="SL 1">SL 1</Option>
                                    <Option value="SL 3">SL 3</Option>
                                    <Option value="SL 4">SL 4</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="No of Cadre"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('no_of_cadre', {
                                rules: [{ required: true, message: 'Please input no of cadre' }]
                            })(
                                <InputNumber style={{ width: 150 }} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div >
        );
    }
}

const AddCadre = Form.create()(AddCadreForm);

export default AddCadre;