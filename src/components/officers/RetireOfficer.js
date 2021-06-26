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
class RetireOfficerForm extends Component {

    constructor(props) {
        super(props);

        this.state = { confirmLoading: false };

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
                retired_date: values.retired_date ? moment(values.retired_date).format('MM-DD-YYYY') : null
            }

            this.props.appStore.retireOfficer(data)
                .then(sucess => {
                    this.setState({ confirmLoading: false });
                    this.props.form.resetFields();
                    openNotificationWithIcon('success', 'Success', 'Officer updated successfully!');
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
        const { officerSearchData, officers } = this.props.appStore;

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

        let officerValues = [];

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
                            Retire Officer
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Retire Officer</Title>
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
                                label="Retired Date"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                            >
                                {getFieldDecorator('retired_date', {
                                    rules: [{ required: !true, message: 'Please input retired date' }]
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
const RetireOfficer = Form.create()(RetireOfficerForm);

export default RetireOfficer;