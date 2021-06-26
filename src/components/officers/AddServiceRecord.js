import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Button, notification, Input, Form, InputNumber, Select, DatePicker } from 'antd';

import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
}

@inject('appStore')
@observer
class AddServiceRecordForm extends Component {

    constructor(props) {
        super(props);

        this.state = { visible: false, confirmLoading: false };
        this.props.appStore.getInstitutes();
        this.props.appStore.getGrades();
    }

    showModal = () => { this.setState({ visible: true }); }

    handleCancel = () => { this.setState({ visible: false }); }

    searchDesigByInstitute = (value) => {
        this.props.appStore.designationByIId({ id: value })
            .then(sucess => {
                this.setState({ confirmLoading: false });
            })
            .catch(err => {
                this.setState({ confirmLoading: false });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
    }

    handleOk = () => {
        this.props.form.validateFields((err, values) => {

            if (!err) {
                this.setState({ confirmLoading: true });

                var temp = {
                    institute: values.institute.split('|')[0],
                    institute_name: values.institute.split('|')[1],
                    cadre_positions_id: values.designation.split('|')[0],
                    designation: values.designation.split('|')[1],
                    start_date: moment(values.start_date).format('MM-DD-YYYY'),
                    end_date: values.end_date ? moment(values.end_date).format('MM-DD-YYYY') : null,
                    status: values.status
                }

                this.props.appStore.officerData.service_history.push(temp);

                this.setState({ confirmLoading: false });
                this.handleCancel();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading } = this.state;
        const { institutes, designationsIId } = this.props.appStore;

        let instituteValues = [];
        let desigValues = [];

        if (institutes) {
            institutes.forEach((element, index) => {
                instituteValues.push(<Option key={index} value={element.id + '|' + element.name}>{element.name}</Option>);
            });
        }

        if (designationsIId) {
            designationsIId.forEach((element, index) => {
                desigValues.push(<Option key={index} value={element.id + '|' + element.designation}>{element.designation}</Option>);
            });
        }

        return (
            <div>
                <Button type="primary" icon="plus" onClick={this.showModal}>Add Service</Button>

                <Modal
                    title="Add Service"
                    okText="Submit"
                    width={800}
                    confirmLoading={confirmLoading}
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
                            {getFieldDecorator('institute', {
                                rules: [{ required: true, message: 'Please input institute' }]
                            })(
                                <Select
                                    showSearch
                                    placeholder="Select institute"
                                    optionFilterProp="children"
                                    style={{ width: 450 }}
                                    onChange={this.searchDesigByInstitute}
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
                            {getFieldDecorator('designation', {
                                rules: [{ required: true, message: 'Please input designation' }]
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 250 }}
                                    placeholder="Select designation"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {desigValues}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Start Date"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('start_date', {
                                rules: [{ required: true, message: 'Please input start date' }]
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="End Date"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('end_date', {
                                rules: [{ required: true, message: 'Please input end date' }]
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Status"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: 'Please input status' }]
                            })(
                                <Select
                                    style={{ width: 150 }}
                                    placeholder="Select status"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={1}>Current</Option>
                                    <Option value={0}>Past</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const AddServiceRecord = Form.create()(AddServiceRecordForm);

export default AddServiceRecord;