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
class AddDetailsForm extends Component {

    constructor(props) {
        super(props);

        this.state = { visible: false, confirmLoading: false };
    }

    showModal = () => {
        this.props.form.resetFields();
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.props.form.resetFields();
        this.setState({ visible: false });
    }

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

                if (this.props.keyData == "member") {
                    values.dob = moment(values.dob).format('DD-MM-YYYY');
                    this.props.appStore.familyMembers.push(values);

                } else if (this.props.keyData == "service") {
                    values.duration = moment(values.form).format('DD-MM-YYYY') + '-' + moment(values.to).format('DD-MM-YYYY');
                    this.props.appStore.serviceHistory.push(values);

                } else if (this.props.keyData == "educational_qualification") {
                    this.props.appStore.educationalQualification.push(values);

                } else if (this.props.keyData == "professional_qualification") {
                    this.props.appStore.professionalQualification.push(values);

                } else if (this.props.keyData == "publications") {
                    this.props.appStore.publications.push(values);

                } else if (this.props.keyData == "expertise") {
                    this.props.appStore.subjectExpertise.push(values);

                } else if (this.props.keyData == "lessons") {
                    this.props.appStore.lessons.push(values);

                } else if (this.props.keyData == "awards") {
                    this.props.appStore.awards.push(values);

                } else if (this.props.keyData == "achievements") {
                    this.props.appStore.achievements.push(values);

                }

                this.setState({ confirmLoading: false });
                this.handleCancel();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading } = this.state;

        return (
            <div>
                <Button type="primary" icon="plus" onClick={this.showModal}>{this.props.label}</Button>

                <Modal
                    title={this.props.label}
                    okText="Add"
                    width={600}
                    confirmLoading={confirmLoading}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form
                        layout="vertical"
                    >
                        {this.props.keyData == "member" && <span>
                            <FormItem
                                label="Name"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please input name' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="DOB"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('dob', {
                                    rules: [{ required: true, message: 'Please input dob' }]
                                })(
                                    <DatePicker style={{ width: 260 }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="Profession"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('profession', {
                                    rules: [{ required: true, message: 'Please input profession' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="Relationship"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('relationship', {
                                    rules: [{ required: true, message: 'Please input relationship' }]
                                })(
                                    <Select
                                        style={{ width: 160 }}
                                        placeholder="Select relationship"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="Spouse">Spouse</Option>
                                        <Option value="Son">Son</Option>
                                        <Option value="Daughter">Daughter</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </span>}

                        {this.props.keyData == "service" && <span>
                            <FormItem
                                label="Designation"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('designation', {
                                    rules: [{ required: true, message: 'Please input designation' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="Work Place"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('work_place', {
                                    rules: [{ required: true, message: 'Please input work place' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="From"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('from', {
                                    rules: [{ required: true, message: 'Please input from' }]
                                })(
                                    <DatePicker style={{ width: 260 }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="To"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('to', {
                                    rules: [{ required: true, message: 'Please input to' }]
                                })(
                                    <DatePicker style={{ width: 260 }} />
                                )}
                            </FormItem>
                        </span>}

                        {this.props.keyData == "educational_qualification" && <span>
                            <FormItem
                                label="Degree"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('degree', {
                                    rules: [{ required: true, message: 'Please input degree' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="University"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('university', {
                                    rules: [{ required: true, message: 'Please input university' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="Major Subjects"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('major_subjects', {
                                    rules: [{ required: true, message: 'Please input major subjects' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="Year"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('year', {
                                    rules: [{ required: true, message: 'Please input year' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>
                        </span>}

                        {this.props.keyData == "professional_qualification" && <span>
                            <FormItem
                                label="Degree"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('degree', {
                                    rules: [{ required: true, message: 'Please input degree' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="University"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('university', {
                                    rules: [{ required: true, message: 'Please input university' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="Major Subjects"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('major_subjects', {
                                    rules: [{ required: true, message: 'Please input major subjects' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="Year"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('year', {
                                    rules: [{ required: true, message: 'Please input year' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>
                        </span>}

                        {this.props.keyData == "publications" && <span>
                            <FormItem
                                label="Publication"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('publication', {
                                    rules: [{ required: true, message: 'Please input publications' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>
                        </span>}

                        {this.props.keyData == "expertise" && <span>
                            <FormItem
                                label="Subject Expertise"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('subject', {
                                    rules: [{ required: true, message: 'Please input subject' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="How Obtained/ Description"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('description', {
                                    rules: [{ required: true, message: 'Please input description' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>
                        </span>}

                        {this.props.keyData == "lessons" && <span>
                            <FormItem
                                label="Details"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('lesson', {
                                    rules: [{ required: true, message: 'Please input data' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>
                        </span>}

                        {this.props.keyData == "awards" && <span>
                            <FormItem
                                label="Details"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('award', {
                                    rules: [{ required: true, message: 'Please input data' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>
                        </span>}

                        {this.props.keyData == "achievements" && <span>
                            <FormItem
                                label="Description"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('description', {
                                    rules: [{ required: true, message: 'Please input description' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="Target group"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('target_group', {
                                    rules: [{ required: true, message: 'Please input target group' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>

                            <FormItem
                                label="Social/Economic impact"
                            // labelCol={{ span: 6 }}
                            // wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('impact', {
                                    rules: [{ required: true, message: 'Please input major impact' }],
                                })(
                                    <Input style={{ width: '100% !important' }} />
                                )}
                            </FormItem>
                        </span>}

                    </Form>
                </Modal>
            </div>
        );
    }
}

const AddDetails = Form.create()(AddDetailsForm);

export default AddDetails;