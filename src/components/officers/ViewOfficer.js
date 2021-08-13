import React, { Component } from 'react';
import {
    Form, Select, Radio, Button, Input, Divider, Checkbox, Row, Col, Modal, notification, DatePicker, Breadcrumb,
    Typography, Card, Steps, Popover, Icon, Table
} from 'antd';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import AddServiceRecord from './AddServiceRecord';

const { Title } = Typography;
const { Step } = Steps;

const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

const customDot = (dot, { status, index }) => (
    <span>
        {dot}
    </span>
);

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('appStore')
@observer
class ViewOfficerForm extends Component {

    constructor(props) {
        super(props);

        this.state = { visible: false, confirmLoading: false, current: 0 };
        this.props.appStore.getGrades();

        if (!this.props.appStore.officerDetails) {
            this.props.history.push('/edit-officer');
        }
    }

    columns = [
        {
            title: 'Institute',
            dataIndex: 'institute_name',
            key: 'institute_name',
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
            width: '10%',
            render: (text, record) => (
                <span>{record.status == 1 ? 'Current' : 'Past'}</span>
            ),
        }
    ];

    handleCancel = () => {
        this.setState({ visible: false });
    }

    showModal = () => {
        this.setState({ visible: true });
    }

    updateOfficer = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true });
                const { officerDetails } = this.props.appStore;

                var body = {
                    id: officerDetails.id,
                    nic: values.nic ? values.nic : null,
                    seniority_no: values.seniority_no ? values.seniority_no : null,
                    gender: values.gender.length != 0 ? values.gender : null,
                    address: values.address ? values.address : null,
                    mobile: values.mobile ? values.mobile : null,
                    email: values.email ? values.email : null,
                    service_confirmed: values.service_confirmed ? values.service_confirmed.format('YYYY-MM-DD') : null,
                    grade_iii_entry: values.grade_iii_entry ? values.grade_iii_entry.format('YYYY-MM-DD') : null,
                    grade_ii_promoted: values.grade_ii_promoted ? values.grade_ii_promoted.format('YYYY-MM-DD') : null,
                    grade_i_promoted: values.grade_i_promoted ? values.grade_i_promoted.format('YYYY-MM-DD') : null,
                    special_grade_promoted: values.special_grade_promoted ? values.special_grade_promoted.format('YYYY-MM-DD') : null,
                    dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
                    grades_id: values.grades_id ? values.grades_id : null,
                    service_confirmed_status: values.service_confirmed_status.length != 0 ? values.service_confirmed_status : null,
                    grade_i_promoted_status: values.grade_i_promoted_status.length != 0 ? values.grade_i_promoted_status : null,
                    grade_ii_promoted_status: values.grade_ii_promoted_status.length != 0 ? values.grade_ii_promoted_status : null,
                    special_grade_promoted_status: values.special_grade_promoted_status.length != 0 ? values.special_grade_promoted_status : null,
                    slas_batch: values.slas_batch.length != 0 ? values.slas_batch : null
                }

                this.props.appStore.updateOfficer(body)
                    .then(sucess => {
                        this.props.form.resetFields();
                        this.props.appStore.resetOfficerData();
                        this.setState({ current: 0, confirmLoading: false });
                        openNotificationWithIcon('success', 'Success', 'Officer updated successfully!');
                        this.props.history.push('/edit-officer');
                    })
                    .catch(err => {
                        this.setState({ confirmLoading: false });
                        openNotificationWithIcon('error', 'Oops', 'Something went wrong in officer adding!');
                    });
            }

        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading, current } = this.state;
        const { grades, officerDetails, officerDetailsService } = this.props.appStore;

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

        let gradesValues = [];

        if (grades) {
            grades.forEach((element, index) => {
                gradesValues.push(<Option key={index} value={element.id}>{element.grade_name}</Option>);
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
                            View Officer
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>View Officer</Title>
                </Card>

                <Card style={{ margin: 25 }}>

                    <Form>

                        <FormItem
                            label="Name"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: !true, message: 'Please input name' }],
                                initialValue: officerDetails.name
                            })(
                                <Input style={{ width: '100% !important' }} readOnly />
                            )}
                        </FormItem>

                        <FormItem
                            label="NIC"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('nic', {
                                rules: [{ required: true, message: 'Please input nic' }],
                                initialValue: officerDetails.nic
                            })(
                                <Input style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Seniority No"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('seniority_no', {
                                rules: [{ required: !true, message: 'Please input naseniority no' }],
                                initialValue: officerDetails.seniority_no
                            })(
                                <Input style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Gender"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('gender', {
                                rules: [{ required: !true, message: 'Please input gender' }],
                                initialValue: officerDetails.gender != null ? officerDetails.gender : []
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select gender"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Date of Birth"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('dob', {
                                rules: [{ required: !true, message: 'Please input birth date' }],
                                initialValue: officerDetails.dob != null ? moment(officerDetails.dob) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Address"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('address', {
                                rules: [{ required: !true, message: 'Please input address' }],
                                initialValue: officerDetails.address
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Mobile"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('mobile', {
                                rules: [{ required: !true, message: 'Please input mobile' }],
                                initialValue: officerDetails.mobile
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
                                rules: [{ required: !true, message: 'Please input email' }],
                                initialValue: officerDetails.email
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="SLAS Batch"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('slas_batch', {
                                rules: [{ required: !true, message: 'Please input SLAS batch' }],
                                initialValue: officerDetails.slas_batch != null ? officerDetails.slas_batch : []
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select slas batch"
                                    optionFilterProp="children"
                                    onChange={this.paymentChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="2009">2009</Option>
                                    <Option value="2010">2010</Option>
                                    <Option value="2012">2012</Option>
                                    <Option value="2013">2013</Option>
                                    <Option value="2014">2014</Option>
                                    <Option value="2015">2015</Option>
                                    <Option value="2017">2017</Option>
                                    <Option value="2019">2019</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Appointment Date"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grade_iii_entry', {
                                rules: [{ required: !true, message: 'Please input appointment date' }],
                                initialValue: officerDetails.grade_iii_entry != null ? moment(officerDetails.grade_iii_entry) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Current Grade"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grades_id', {
                                rules: [{ required: !true, message: 'Please input grade' }],
                                initialValue: officerDetails.grades_id != null ? officerDetails.grades_id : []
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select grade"
                                    optionFilterProp="children"
                                    allowClear
                                    showSearch
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {gradesValues}
                                </Select>
                            )}
                        </FormItem>

                        {/* <FormItem
                            label="Appointment Date"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('appointment_date', {
                                rules: [{ required: !true, message: 'Please input appointment date' }],
                                // initialValue: officerDetails.appointment_date != null ? moment(officerDetails.appointment_date) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem> */}

                        {/* <FormItem
                            label="Service Confirmed"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('service_confirmed', {
                                rules: [{ required: !true, message: 'Please input service confirmed' }],
                                // initialValue: officerDetails.service_confirmed != null ? officerDetails.service_confirmed : []
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select service confirmed"
                                    optionFilterProp="children"
                                    onChange={this.paymentChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={1}>Yes</Option>
                                    <Option value={2}>No</Option>
                                </Select>
                            )}
                        </FormItem> */}

                        <FormItem
                            label="Service Confirmed Status"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('service_confirmed_status', {
                                rules: [{ required: !true, message: 'Please input service confirmed status' }],
                                initialValue: officerDetails.service_confirmed_status != null ? officerDetails.service_confirmed_status : []
                            })(
                                <Select
                                    style={{ width: 350 }}
                                    placeholder="Select service confirmed status"
                                    optionFilterProp="children"
                                    onChange={this.paymentChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={"Not Yet Eligible"}>Not Yet Eligible</Option>
                                    <Option value={"No Application Received"}>No Application Received</Option>
                                    <Option value={"Application Received to Public Administration"}>Application Received to Public Administration</Option>
                                    <Option value={"Application Send to PSC"}>Application Send to PSC</Option>
                                    <Option value={"PSC Decision Received"}>PSC Decision Received</Option>
                                    <Option value={"Confirmed / Promoted"}>Confirmed / Promoted</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Service Confirmed Date"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('service_confirmed', {
                                rules: [{ required: !true, message: 'Please input service confirmed date' }],
                                initialValue: officerDetails.service_confirmed != null ? moment(officerDetails.service_confirmed) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Grade II Promoted Status"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grade_ii_promoted_status', {
                                rules: [{ required: !true, message: 'Please input grade ii promoted status' }],
                                initialValue: officerDetails.grade_ii_promoted_status != null ? officerDetails.grade_ii_promoted_status : []
                            })(
                                <Select
                                    style={{ width: 350 }}
                                    placeholder="Grade II Promoted Status"
                                    optionFilterProp="children"
                                    onChange={this.paymentChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={"Not Yet Eligible"}>Not Yet Eligible</Option>
                                    <Option value={"No Application Received"}>No Application Received</Option>
                                    <Option value={"Application Received to Public Administration"}>Application Received to Public Administration</Option>
                                    <Option value={"Application Send to PSC"}>Application Send to PSC</Option>
                                    <Option value={"PSC Decision Received"}>PSC Decision Received</Option>
                                    <Option value={"Confirmed / Promoted"}>Confirmed / Promoted</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Grade II Promoted Date"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grade_ii_promoted', {
                                rules: [{ required: !true, message: 'Please input grade ii promoted date' }],
                                initialValue: officerDetails.grade_ii_promoted != null ? moment(officerDetails.grade_ii_promoted) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Grade I Promoted Status"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grade_i_promoted_status', {
                                rules: [{ required: !true, message: 'Please input grade i promoted status' }],
                                initialValue: officerDetails.grade_i_promoted_status != null ? officerDetails.grade_i_promoted_status : []
                            })(
                                <Select
                                    style={{ width: 350 }}
                                    placeholder="Grade I Promoted Status"
                                    optionFilterProp="children"
                                    onChange={this.paymentChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={"Not Yet Eligible"}>Not Yet Eligible</Option>
                                    <Option value={"No Application Received"}>No Application Received</Option>
                                    <Option value={"Application Received to Public Administration"}>Application Received to Public Administration</Option>
                                    <Option value={"Application Send to PSC"}>Application Send to PSC</Option>
                                    <Option value={"PSC Decision Received"}>PSC Decision Received</Option>
                                    <Option value={"Confirmed / Promoted"}>Confirmed / Promoted</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Grade I Promoted Date"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grade_i_promoted', {
                                rules: [{ required: !true, message: 'Please input grade i promoted date' }],
                                initialValue: officerDetails.grade_i_promoted != null ? moment(officerDetails.grade_i_promoted) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Special Grade Promoted Status"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('special_grade_promoted_status', {
                                rules: [{ required: !true, message: 'Please input special grade promoted status' }],
                                initialValue: officerDetails.special_grade_promoted_status != null ? officerDetails.special_grade_promoted_status : []
                            })(
                                <Select
                                    style={{ width: 350 }}
                                    placeholder="Special Grade Promoted Status"
                                    optionFilterProp="children"
                                    onChange={this.paymentChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={"Not Yet Eligible"}>Not Yet Eligible</Option>
                                    <Option value={"No Application Received"}>No Application Received</Option>
                                    <Option value={"Application Received to Public Administration"}>Application Received to Public Administration</Option>
                                    <Option value={"Application Send to PSC"}>Application Send to PSC</Option>
                                    <Option value={"PSC Decision Received"}>PSC Decision Received</Option>
                                    <Option value={"Confirmed / Promoted"}>Confirmed / Promoted</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Special Grade Promoted Date"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('special_grade_promoted', {
                                rules: [{ required: !true, message: 'Please input special grade promoted date' }],
                                initialValue: officerDetails.special_grade_promoted != null ? moment(officerDetails.special_grade_promoted) : null
                            })(
                                <DatePicker style={{ width: 250 }} />
                            )}
                        </FormItem>

                        {/* <FormItem
                            label="AL Stream"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('al_stream', {
                                rules: [{ required: !true, message: 'Please input AL stream' }],
                                initialValue: officerDetails.al_stream != null ? officerDetails.al_stream : []
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select gender"
                                    optionFilterProp="children"
                                    onChange={this.paymentChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="maths">Maths</Option>
                                    <Option value="bio">Biology</Option>
                                    <Option value="arts">Arts</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Basic Degree"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('basic_degree', {
                                rules: [{ required: !true, message: 'Please input basic degree' }],
                                initialValue: officerDetails.basic_degree
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Master Degree"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('master_degree', {
                                rules: [{ required: !true, message: 'Please input master degree' }],
                                initialValue: officerDetails.master_degree
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem> */}

                        <FormItem {...tailFormItemLayout} style={{ marginTop: 25 }}>
                            <div className="steps-action">
                                <Button type="primary" loading={confirmLoading} onClick={() => this.updateOfficer()}>
                                    Submit
                                    </Button>
                            </div>
                        </FormItem>

                    </Form>
                </Card>
            </div>
        )
    }

}
const ViewOfficer = Form.create()(ViewOfficerForm);

export default ViewOfficer;