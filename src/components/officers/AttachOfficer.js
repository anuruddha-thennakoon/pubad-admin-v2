import React, { Component } from 'react';
import {
    Form, Select, Radio, Button, Input, Result, Row, Col, Modal, notification, DatePicker,
    Card, Breadcrumb, Typography, InputNumber, Table
} from 'antd';
import { inject, observer } from 'mobx-react';

import moment from 'moment';

const { Title, Text } = Typography;
const { Search } = Input;
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
class AttachOfficerForm extends Component {

    constructor(props) {
        super(props);

        this.state = { confirmLoading: false };

        this.props.appStore.getInstitutes();
        this.props.appStore.getGrades();
        this.props.appStore.resetOfficer();
        this.props.appStore.getAllOfficers();
    }

    columns = [
        {
            title: 'Institute',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            width: '15%'
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
            width: '15%'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%'
        }
    ];

    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            const { officerSearchData } = this.props.appStore;
            this.setState({ confirmLoading: true });

            var data = {
                officers_id: officerSearchData.id,
                institutes_id: values.new_institute,
                start_date: values.start_date ? moment(values.start_date).format('MM-DD-YYYY') : null,
                cadre_positions_id: values.cadre_positions_id,
                nature_of_attachment: values.nature_of_attachment
            }

            this.props.appStore.attachOfficer(data)
                .then(sucess => {

                    this.setState({ confirmLoading: false });
                    this.props.form.resetFields();
                    openNotificationWithIcon('success', 'Success', 'Officer attached successfully!');
                })
                .catch(err => {
                    this.setState({ confirmLoading: false });
                    openNotificationWithIcon('error', 'Oops', err.message);
                });

        });
    };

    searchByNic = (value) => {
        this.props.appStore.searchOfficer({ nic: value })
            .then(sucess => {
                this.setState({ confirmLoading: false });
            })
            .catch(err => {
                this.setState({ confirmLoading: false });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
    }

    searchByName = (value) => {
        this.props.appStore.searchOfficerById({ id: value })
            .then(sucess => {
                this.setState({ confirmLoading: false });
            })
            .catch(err => {
                this.setState({ confirmLoading: false });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading } = this.state;
        const { institutes, officerSearchData, designationsIId, officers } = this.props.appStore;

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

        let instituteValues = [];
        let desigValues = [];
        let officerValues = [];

        if (institutes) {
            institutes.forEach((element, index) => {
                instituteValues.push(<Option key={index} value={element.id}>{element.name}</Option>);
            });
        }

        if (designationsIId) {
            designationsIId.forEach((element, index) => {
                desigValues.push(<Option key={index} value={element.id}>{element.designation}</Option>);
            });
        }

        if (officers) {
            officers.forEach((element, index) => {
                officerValues.push(<Option key={index} value={element.id}>{element.name}</Option>);
            });
        }

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Officers
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Transfer / Attach Officer
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Transfer / Attach Officer</Title>
                </Card>

                <Card style={{ margin: 25 }}>
                    <Form>
                        <FormItem
                            label="Officer NIC"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <Search
                                style={{ width: 400 }}
                                placeholder="562984322V"
                                enterButton="Search"
                                onSearch={value => this.searchByNic(value)}
                            />
                        </FormItem>

                        <FormItem
                            label="Officer Name"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            <Select
                                showSearch
                                style={{ width: 400 }}
                                placeholder="Officer Name"
                                optionFilterProp="children"
                                onChange={this.searchByName}
                            >
                                {officerValues}
                            </Select>
                        </FormItem>

                        {officerSearchData && <div>
                            <FormItem
                                label="Officer Name"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Text strong>{officerSearchData.name}</Text>
                            </FormItem>

                            {/* <FormItem
                                label="Present Designation"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Text strong>{officerSearchData.service_history.length != 0 ? officerSearchData.service_history[officerSearchData.service_history.length - 1].name : 'No data found'}</Text>
                            </FormItem>

                            <FormItem
                                label="Current Institute"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Text strong>{officerSearchData.service_history.length != 0 ? officerSearchData.service_history[officerSearchData.service_history.length - 1].name : 'No data found'}</Text>
                            </FormItem> */}

                            <FormItem
                                label="Service History"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 14 }}
                            >
                                <Table
                                    size={"small"}
                                    rowKey={record => record.uid}
                                    columns={this.columns}
                                    pagination={false}
                                    dataSource={officerSearchData.service_history} />
                            </FormItem>

                            <FormItem
                                label="New Institute"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('new_institute', {
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
                                label="New Designation"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('cadre_positions_id', {
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
                                label="Nature of Attachment"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('nature_of_attachment', {
                                    rules: [{ required: true, message: 'Please input nature of attachment' }]
                                })(
                                    <Select
                                        showSearch
                                        style={{ width: 250 }}
                                        placeholder="Select nature of attachment"
                                        optionFilterProp="children"
                                        onChange={this.paymentChange}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="General Officer Attachment">General Officer Attachment</Option>
                                        <Option value="Cabinet - Acting in Post">Cabinet - Acting in Post</Option>
                                        <Option value="Cabinet - Attending to Duties in Post">Cabinet - Attending to Duties in Post</Option>
                                        <Option value="PSC - Acting in Post – Full Time">PSC - Acting in Post – Full Time</Option>
                                        <Option value="PSC - Acting in Post – Part Time">PSC - Acting in Post – Part Time</Option>
                                        <Option value="Below Post Staying">Below Post Staying</Option>
                                        <Option value="PubAd Pool Attachment">PubAd Pool Attachment</Option>
                                        <Option value="No Pay Leave">No Pay Leave</Option>
                                        <Option value="Study Leave">Study Leave</Option>
                                        <Option value="Secondment/Other Posts Attachment">Secondment/Other Posts Attachment</Option>
                                        <Option value="Contract Basis Appointment">Contract Basis Appointment</Option>
                                        <Option value="Other Officer Appointment">Other Officer Appointment</Option>
                                        <Option value="Secretary Appointment">Secretary Appointment</Option>
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem
                                label="Start Date"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('start_date', {
                                    rules: [{ required: !true, message: 'Please input start date' }]
                                })(
                                    <DatePicker style={{ width: 250 }} />
                                )}
                            </FormItem>

                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" loading={confirmLoading} onClick={this.handleOk}>Submit</Button>
                            </FormItem>
                        </div>}

                    </Form>

                </Card>

            </div>
        )
    }

}
const AttachOfficer = Form.create()(AttachOfficerForm);

export default AttachOfficer;