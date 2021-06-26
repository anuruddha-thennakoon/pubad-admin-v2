import React, { Component } from 'react';
import {
    Form, Select, Radio, Button, Input, Result, Row, Col, Modal, notification, DatePicker,
    Card, Breadcrumb, Typography, InputNumber, Table, Statistic, Icon
} from 'antd';
import { inject, observer } from 'mobx-react';

const { Title } = Typography;

import moment from 'moment'

import ReactToPrint from 'react-to-print';

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
class RetirementReportForm extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, officers: [] };

        this.props.appStore.getAllOfficers();
        this.setOfficers();
    }

    columns = [
        {
            title: 'Serial No',
            dataIndex: '',
            key: '',
            render: (text, record, index) => (
                <span>{index + 1}</span>
            ),
        },
        {
            title: ' Seniority Number',
            dataIndex: 'seniority_no',
            key: 'seniority_no',
        },
        {
            title: 'File Number',
            dataIndex: 'file_no',
            key: 'file_no',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Present Post',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Present Work Place',
            dataIndex: 'institute_name',
            key: 'institute_name',
            width: '20%'
        },
        {
            title: 'Contact Number',
            dataIndex: 'mobile',
            key: 'mobile',
            align: 'center'
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            key: 'dob',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Entry to</span><br />
                <span>Grade III</span>
            </span>,
            dataIndex: 'grade_iii_entry',
            key: 'grade_iii_entry',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Promotion to</span><br />
                <span>Grade II</span>
            </span>,
            dataIndex: 'grade_ii_promoted',
            key: 'grade_ii_promoted',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Promotion to</span><br />
                <span>Grade I</span>
            </span>,
            dataIndex: 'grade_i_promoted',
            key: 'grade_i_promoted',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Promotion to</span><br />
                <span>Special Grade</span>
            </span>,
            dataIndex: 'special_grade_promoted',
            key: 'special_grade_promoted',
            align: 'center',
            width: '10%'
        },
        {
            title: 'NIC',
            dataIndex: 'nic',
            key: 'nic',
            align: 'center'
        },
    ];

    setOfficers = () => {
        this.setState({ officers: this.props.appStore.officers })
    }

    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true });

                if (values.start_date != undefined && values.end_date != undefined) {
                    const { officers } = this.props.appStore;

                    var temp = [];

                    var dateFrom = values.start_date.format('L');
                    var dateTo = values.end_date.format('L');

                    // var d1 = dateFrom.split("/");
                    // var d2 = dateTo.split("/");

                    // var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
                    // var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);

                    var from = new Date(dateFrom);
                    var to = new Date(dateTo);

                    officers.forEach(element => {
                        var dateCheck = moment(element.dob).add(60, 'years').calendar();

                        // var c = dateCheck.split("/");
                        // var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

                        var check = new Date(dateCheck);

                        if (check > from && check < to) {
                            temp.push(element);
                        }
                    });

                    setTimeout(() => {
                        this.setState({ officers: temp, confirmLoading: false });
                    }, 2000);

                } else {
                    const { officers } = this.props.appStore;

                    setTimeout(() => {
                        this.setState({ officers: officers, confirmLoading: false });
                    }, 2000);
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading, officers } = this.state;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Reports
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Retire List
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Retire List</Title>

                    <div style={{ textAlign: 'right' }}>
                        <ReactToPrint
                            trigger={() => {
                                return <Icon style={{ fontSize: '32px', color: '#08c' }} type="printer" />;
                            }}
                            content={() => this.componentRef}
                        />
                    </div>
                </Card>

                <Card style={{ margin: 25 }}>
                    <Form layout='inline'>

                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="Start Date"
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 18 }}
                                >
                                    {getFieldDecorator('start_date', {
                                        rules: [{ required: !true, message: 'Please input start date' }]
                                    })(
                                        <DatePicker style={{ width: 260 }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="End Date"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('end_date', {
                                        rules: [{ required: !true, message: 'Please input end date' }]
                                    })(
                                        <DatePicker style={{ width: 260 }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} style={{ textAlign: 'right' }}>
                                <FormItem>
                                    <Button type="primary" loading={confirmLoading} onClick={this.handleOk}>View</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>


                    <div style={{ marginTop: 15 }} ref={el => (this.componentRef = el)}>
                        {officers && <Table
                            size={"small"}
                            rowKey={record => record.id}
                            columns={this.columns}
                            dataSource={officers} z
                            pagination={false}
                            scroll={{ x: 1400 }}
                            dataSource={officers} />}

                        {!officers && <Table
                            size={"small"}
                            rowKey={record => record.id}
                            columns={this.columns}
                            loading={true}
                            dataSource={null}
                            pagination={false} />}
                    </div>

                </Card>

            </div>
        )
    }

}
const RetirementReport = Form.create()(RetirementReportForm);

export default RetirementReport;