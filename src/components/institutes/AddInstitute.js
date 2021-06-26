import React, { Component } from 'react';
import {
    Form, Select, Radio, Button, Input, Result, Row, Col, Modal, notification, DatePicker,
    Card, Breadcrumb, Typography, InputNumber
} from 'antd';
import { inject, observer } from 'mobx-react';

const { Title } = Typography;

const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('appStore')
@observer
class AddInstituteForm extends Component {

    constructor(props) {
        super(props);

        this.state = { confirmLoading: false };

        this.props.appStore.getInstituteTypes();
        // this.props.appStore.getCabinetMinistries();
    }

    handleOk = e => {
        this.props.form.validateFields((err, values) => {

            this.setState({ confirmLoading: true });

            this.props.appStore.addInstitute(values)
                .then(sucess => {

                    this.setState({ confirmLoading: false });
                    this.props.form.resetFields();
                    openNotificationWithIcon('success', 'Success', 'Institute created successfully!');
                })
                .catch(err => {
                    this.setState({ confirmLoading: false });
                    openNotificationWithIcon('error', 'Oops', 'Something went wrong in intitute creation!');
                });

        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading } = this.state;
        const { instituteTypes, cabinetMinistries } = this.props.appStore;

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        let instituteTypeValues = [];
        // let cabinetMinistriesValues = [];

        if (instituteTypes) {
            instituteTypes.forEach((element, index) => {
                instituteTypeValues.push(<Option key={index} value={element.id}>{element.institute_name}</Option>);
            });
        }

        // if (cabinetMinistries) {
        //     cabinetMinistries.forEach((element, index) => {
        //         cabinetMinistriesValues.push(<Option key={index} value={element.id}>{element.ministry_name}</Option>);
        //     });
        // }

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Institutes
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Add Institute
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Add Institute</Title>
                </Card>

                <Card style={{ margin: 25 }}>
                    <Form>
                        <FormItem
                            label="Institute Name"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input institute name' }]
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Institute Type"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('institute_types_id', {
                                rules: [{ required: true, message: 'Please input institute type' }]
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 250 }}
                                    placeholder="Select institute type"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteTypeValues}
                                </Select>
                            )}
                        </FormItem>

                        {/* <FormItem
                            label="Parent Institute"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('ministries_id', {
                                rules: [{ required: true, message: 'Please input parent institute' }]
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 250 }}
                                    placeholder="Select parent institute"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {cabinetMinistriesValues}
                                </Select>
                            )}
                        </FormItem> */}

                        <FormItem
                            label="Address"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('address', {
                                rules: [{ required: !true, message: 'Please input address' }]
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Telephone No"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('telephone', {
                                rules: [{ required: !true, message: 'Please input telephone' }]
                            })(
                                <Input style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Fax No"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('fax_no', {
                                rules: [{ required: !true, message: 'Please input fax' }]
                            })(
                                <Input style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Email"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('email', {
                                rules: [{ required: !true, message: 'Please input email' }]
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Contact Person Name"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('contact_person_name', {
                                rules: [{ required: !true, message: 'Please input contact person name' }]
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Contact Person Telephone"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('contact_person_telphone', {
                                rules: [{ required: !true, message: 'Please input telephone' }]
                            })(
                                <Input style={{ width: '100% !important', width: 250 }} />
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
                                    <Option value={1}>Active</Option>
                                    <Option value={0}>Inactive</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" loading={confirmLoading} onClick={this.handleOk}>Submit</Button>
                        </FormItem>
                    </Form>

                </Card>

            </div>
        )
    }

}
const AddInstitute = Form.create()(AddInstituteForm);

export default AddInstitute;