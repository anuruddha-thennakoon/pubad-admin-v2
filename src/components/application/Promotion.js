import React from 'react';
import {
    Form, Select, Radio, Button, Upload, Input, Result, Row, Col, Modal, notification, DatePicker,
    Card, Breadcrumb, Icon, Typography, InputNumber, Divider
} from 'antd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components'
import moment from 'moment';
import _get from "lodash/get";

const ApplicationContainer = styled.div`
    .ant-form-item-label{
        margin-right:16px !important;
    }
`
const ButtonContainer = styled.div`
    margin-top:20px;
`
const LeftButtons = styled.div`
    width: 50%; 
    float: left;
`
const RightButtons = styled.div`
    width: 50%; 
    float: right;
    text-align:right;
`

const { Title, Text } = Typography;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const { Search, TextArea } = Input;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('appStore', 'appState')
@observer
class ApplicationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false, approved: 1,
            viewType: this.props.viewType,
            rejectReason: null,
            officer: {},
            c1: false, c2: false, c3: false, c4: false,
            confirmLoading: false,
            applicationStatus: 0,
            fileList1: [], fileList2: [], fileList3: [],
            table1: [{ year: null, answer: null }, { year: null, answer: null }, { year: null, answer: null }, { year: null, answer: null }, { year: null, answer: null }, { year: null, answer: null }],
            table2: [{ year: null, answer: null }, { year: null, answer: null }, { year: null, answer: null }, { year: null, answer: null }, { year: null, answer: null }, { year: null, answer: null }]
        };

        this.props.appStore.getInstitutes();
        this.props.appStore.getDesignations();
    }

    componentDidMount() {
        this.getApplicationConditions();
        this.loadFiles();
        this.setEditable();
    }

    setReject = (value) => {
        this.setState({ approved: value });
    }

    changeCondition = (c, value) => {
        if (value == 'Yes') {
            this.setState({ [c]: true });
        } else if (value == 'No') {
            this.setState({ [c]: false });
        }
    }

    searchByNic = (value) => {
        this.props.appStore.searchOfficer({ nic: value })
            .then(response => {
                if (response != null) {
                    this.setState({ officer: response });
                } else {
                    this.setState({ officer: {} });
                    openNotificationWithIcon('error', 'No details found', 'No details found for the relevant officer, please fill manually');
                }
            })
            .catch(err => {
                this.props.form.resetFields();
                this.setState({ officer: {} });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
    }

    getActive = (data) => {
        var temp = {};
        data.forEach(element => {
            if (element.status == 1) {
                temp = { place_of_work: element.name, designation: element.designation }
            }
        });
        return temp;
    }

    getApplicationConditions = () => {
        const { viewType } = this.state;
        if (viewType != 'add') {
            let application = JSON.parse(this.props.application.application);
            console.log('application', application);
            this.setState({
                disabled: true,
                applicationStatus: this.props.application.status,
                c1: application.c1,
                c2: application.c2,
                c3: application.c3,
                c4: application.c4,
                table1: application.table1,
                table2: application.table2,
                rejectReason: this.props.application.reject_reason
            });
        }
    }

    loadFiles = () => {
        const { viewType } = this.state;
        if (viewType != 'add') {
            let application = JSON.parse(this.props.application.application);
            let documents = JSON.parse(application.documents);

            documents.forEach((element, index) => {
                let img = {
                    uid: index,
                    uploaded: true,
                    name: element.name,
                    url: element.url
                }
                this.setState({ [`fileList${index + 1}`]: [img] });
            });
        }
    }

    setEditable = () => {
        const { viewType } = this.state;
        if (viewType != 'add') {
            const status = _get(this.props.application, "status", null);
            const role = this.props.appState.getUserRole();

            switch (role) {
                case '2'://pubad
                    if (status == 100 || status == 201) {
                        this.setState({ viewType: 'edit', disabled: false });
                    }
                    break;
                case '3'://psc
                    break;
                case '4'://institute
                    if (status == 101) {
                        this.setState({ viewType: 'edit', disabled: false });
                    }
                    break;
            }
        }
    }

    getApplicationItem = (key) => {
        const { viewType } = this.state;
        if (viewType != 'add') {
            let application = JSON.parse(this.props.application.application);
            return _get(application, key, null);
        }
    }

    openAttachment = (key) => {
        const { viewType } = this.state;
        if (viewType != 'add') {
            let application = JSON.parse(this.props.application.application);
            let documents = JSON.parse(application.documents);
            let link = null;

            documents.forEach(element => {
                if (element.name === key) {
                    link = element.url;
                }
            });

            window.open(link, '_blank');
        }
    }

    submitApplication = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {
                    c1, c2, c3, c4, table1, table2,
                    officer, fileList1, fileList2, fileList3
                } = this.state;
                let userData = this.props.appState.getUserData();

                if (fileList1[0].length == 0 || fileList2[0].length == 0 || fileList3[0].length == 0) {
                    openNotificationWithIcon('error', 'Oops', 'One or more files required to submit the application!');
                }

                this.setState({ confirmLoading: true });

                var files = [
                    { name: "class_2_application", file: fileList1[0] },
                    { name: "last_salary_increment", file: fileList2[0] },
                    { name: "last_performance_report", file: fileList3[0] }
                ]

                this.props.appStore.uploadFiles(files)
                    .then(docs => {
                        //consditions
                        values.c1 = c1;
                        values.c2 = c2;
                        values.c3 = c3;
                        values.c4 = c4;

                        //documents
                        values.documents = docs;

                        //tables
                        values.table1 = table1;
                        values.table2 = table2;

                        //application
                        let applicationData = {
                            institutes_id: userData.institutes_id,
                            officers_id: officer ? officer.id : null,
                            nic: values.nic,
                            officer_name: values.officer_name,
                            designation: values.designation,
                            place_of_work: values.place_of_work,
                            mobile_number: values.mobile_number,
                            application: JSON.stringify(values),
                            application_type: 2,
                            reject_reason: null,
                            status: 100
                        }

                        this.props.appStore.addApplication(applicationData)
                            .then(sucess => {
                                this.setState({
                                    officer: {},
                                    c1: false, c2: false, c3: false, c4: false,
                                    confirmLoading: false,
                                    fileList1: [], fileList2: [], fileList3: []
                                });
                                this.props.form.resetFields();
                                openNotificationWithIcon('success', 'Success', 'Application submit successfully!');
                            })
                            .catch(err => {
                                this.setState({ confirmLoading: false });
                                openNotificationWithIcon('error', 'Oops', 'Something went wrong in application submission!');
                            });

                    })
                    .catch(err => {
                        this.setState({ confirmLoading: false });
                        openNotificationWithIcon('error', 'Oops', 'Something went wrong in application submission!');
                    });
            }
        })
    };

    approveApplication = () => {
        const { approved } = this.state;
        let role = this.props.appState.getUserRole();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true });

                let approveData = {
                    application_id: this.props.application.id,
                    application_type: this.props.application.application_type,
                    approved: approved,
                    user_role: role,
                    status: this.props.application.status,
                    reject_reason: values.reject_reason ? values.reject_reason : null
                }

                this.props.appStore.approveApplication(approveData)
                    .then(response => {
                        openNotificationWithIcon('success', 'Success', 'Application updated successfully!');
                        this.setState({ confirmLoading: false });
                        this.props.closeApplication();
                    })
                    .catch(err => {
                        this.setState({ confirmLoading: false });
                        openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
                    });
            }
        });
    }

    editApproveApplication = () => {
        console.log('file --> ', this.state.fileList1);
    }

    showAction = () => {
        const status = _get(this.props.application, "status", null);
        const role = this.props.appState.getUserRole();
        let enable = false;

        switch (role) {
            case '2'://pubad
                if (status == 100 || status == 201) {
                    enable = true;
                }
                break;
            case '3'://psc
                if (status == 200 || status == 300) {
                    enable = true;
                }
                break;
            case '4':
                break;
            default:
                break;
        }
        return enable;
    }

    renderRightButtons = () => {
        const { viewType, confirmLoading } = this.state;
        const status = _get(this.props.application, "status", null);
        const role = this.props.appState.getUserRole();
        let buttons = [];

        if (viewType == 'add') {
            buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.submitApplication}>Submit</Button>);
        } else if (viewType == 'view') {
            switch (role) {
                case '2'://pubad
                    if (status == 100) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.approveApplication}>Submit</Button>);
                    } else if (status == 201) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.editApproveApplication}>Re Submit</Button>);
                    }
                    break;
                case '3'://psc
                    if (status == 200 || status == 300) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.approveApplication}>Submit</Button>);
                    }
                    break;
                case '4'://institute
                    break;
                default:
                    break;
            }
        } else if (viewType == 'edit') {
            switch (role) {
                case '2'://pubad
                    if (status == 100) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.approveApplication}>Submit</Button>);
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.editApproveApplication}>Update and Submit</Button>);
                    } else if (status == 201) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.editApproveApplication}>Re Submit</Button>);
                    }
                    break;
                case '3'://psc
                    break;
                case '4'://institute
                    if (status == 101) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.editApproveApplication}>Re Submit</Button>);
                    }
                    break;
                default:
                    break;
            }
        }
        return buttons;
    }

    removeFile = (fileList) => {
        this.setState({ [fileList]: [] });
    }

    setTableValue = (table, index, key, e) => {
        let data = table;
        data[index][key] = e;
        this.setState({ [table]: data });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { institutes, designations } = this.props.appStore;
        const { officer, viewType, disabled, approved, applicationStatus, rejectReason,
            fileList1, fileList2, fileList3, table1, table2 } = this.state;

        let years = [];
        if (years.length == 0) {
            for (let i = new Date().getFullYear(); i >= 1900; i--) {
                years.push(<Option key={i} value={i}>{i}</Option>);
            }
        }

        const props1 = {
            showUploadList: false,
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList1.indexOf(file);
                    const newFileList = state.fileList1.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList1: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList1: [...state.fileList1, file],
                }));
                return false;
            },
            fileList1,
            defaultFileList: [...fileList1]
        }

        const props2 = {
            showUploadList: false,
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList2.indexOf(file);
                    const newFileList = state.fileList2.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList2: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList2: [...state.fileList2, file],
                }));
                return false;
            },
            fileList2,
            defaultFileList: [...fileList2],
        }

        const props3 = {
            showUploadList: false,
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList3.indexOf(file);
                    const newFileList = state.fileList3.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList3: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList3: [...state.fileList3, file],
                }));
                return false;
            },
            fileList3,
            defaultFileList: [...fileList3],
        }

        let instituteValues = [];
        let desigValues = [];

        if (institutes) {
            institutes.forEach((element, index) => {
                instituteValues.push(<Option key={index} value={element.name}>{element.name}</Option>);
            });
        }

        if (designations) {
            designations.forEach((element, index) => {
                desigValues.push(<Option key={index} value={element.designation}>{element.designation}</Option>);
            });
        }

        return (
            <ApplicationContainer>
                <Card style={{ margin: '0px 25px 25px 25px' }}>
                    <Form
                        style={{ margin: '0px 25px 25px 25px' }}
                        layout={"vertical"}
                    >
                        {viewType == 'add' && <FormItem
                            label="NIC"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('nic', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <Search
                                    style={{ width: '80%' }}
                                    placeholder="NIC"
                                    enterButton="Search"
                                    onSearch={value => this.searchByNic(value)} />
                            )}
                        </FormItem>}

                        {viewType == 'view' || viewType == 'edit' && <FormItem
                            label="NIC"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('nic', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('nic')
                            })(
                                <Input disabled={true} style={{ width: '80%' }} />
                            )}
                        </FormItem>}

                        <FormItem
                            label="Name of the officer"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('officer_name', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: viewType == 'add' ?
                                    (officer.profile ? officer.profile.name : null) :
                                    this.getApplicationItem('officer_name')
                            })(
                                <Input disabled={disabled} style={{ width: '100%' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Mobile number"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('mobile_number', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: viewType == 'add' ?
                                    (officer.profile ? officer.profile.mobile : null) :
                                    this.getApplicationItem('mobile_number')
                            })(
                                <Input disabled={disabled} style={{ width: '250px' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Date of appointment to Grade III"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_of_appointment_to_SLAS', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: viewType == 'add' ?
                                    (officer.profile ? moment(officer.profile.special_grade_promoted) : null) :
                                    moment(this.getApplicationItem('date_of_appointment_to_SLAS'))
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Date of assuming duties"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_of_assuming_duties', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('date_of_assuming_duties'))
                                    ? moment(this.getApplicationItem('date_of_assuming_duties')) : null
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Date of confirmed in the service"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_of_confirmed_in_the_service', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('date_of_confirmed_in_the_service'))
                                    ? moment(this.getApplicationItem('date_of_confirmed_in_the_service')) : null
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the probation / acting time period been extended"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_probation_acting_time_period_been_extended', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('has_the_probation_acting_time_period_been_extended')
                            })(
                                <Select
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    onChange={(e) => this.changeCondition('c1', e)}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        {this.state.c1 && <FormItem
                            label="Extended period with PSC Rules 110"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('extended_period_with_psc_rules_110', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('extended_period_with_psc_rules_110'))
                                    ? [moment(this.getApplicationItem('extended_period_with_psc_rules_110')[0]), moment(this.getApplicationItem('extended_period_with_psc_rules_110')[1])] : null
                            })(
                                <RangePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>}

                        {this.state.c1 && <FormItem
                            label="Extended period with PSC Rules 111"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('extended_period_with_psc_rules_111', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('extended_period_with_psc_rules_111'))
                                    ? [moment(this.getApplicationItem('extended_period_with_psc_rules_111')[0]), moment(this.getApplicationItem('extended_period_with_psc_rules_111')[1])] : null
                            })(
                                <RangePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>}

                        <FormItem
                            label="Has the officer obtained no pay"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_officer_obtained_no_pay', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('has_the_officer_obtained_no_pay')
                            })(
                                <Select
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    onChange={(e) => this.changeCondition('c2', e)}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        {this.state.c2 && <FormItem
                            label="Period of leave"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('period_of_leave', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('period_of_leave'))
                                    ? [moment(this.getApplicationItem('period_of_leave')[0]), moment(this.getApplicationItem('period_of_leave')[1])] : null
                            })(
                                <RangePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>}

                        <FormItem
                            label="The due date of passing 1st efficiency bar(EB)"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('the_due_date_of_passing_1st_efficiency_bar', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('the_due_date_of_passing_1st_efficiency_bar'))
                                    ? moment(this.getApplicationItem('the_due_date_of_passing_1st_efficiency_bar')) : null
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Date of passing 1st efficiency bar (EB)"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_of_passing_1st_efficiency_bar', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('date_of_passing_1st_efficiency_bar'))
                                    ? moment(this.getApplicationItem('date_of_passing_1st_efficiency_bar')) : null
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Due date of passing other official language"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('due_date_of_passing_other_official_language', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('due_date_of_passing_other_official_language'))
                                    ? moment(this.getApplicationItem('due_date_of_passing_other_official_language')) : null
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Date of passing other official language"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_of_passing_other_official_language', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('date_of_passing_other_official_language'))
                                    ? moment(this.getApplicationItem('date_of_passing_other_official_language')) : null
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Whether the officer has 06 years active & satisfactory service period in grade III & earned 06 salary increments"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('whether_the_officer_has_06_years_active_satisfactory_service_period_in_grade_iii_&_earned_06_salary_increments', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('whether_the_officer_has_06_years_active_satisfactory_service_period_in_grade_iii_&_earned_06_salary_increments')
                            })(
                                <Select
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    onChange={(e) => this.changeCondition('c3', e)}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        {this.state.c3 &&
                            <FormItem
                                label=" "
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <table>
                                    <tr>
                                        <th>Year</th>
                                        <th style={{ width: 400, textAlign: 'right' }}>Whether the officer has earned all salary increments for 6 years immediately preceding</th>
                                    </tr>
                                    {table1.map((element, key) => {
                                        return (<tr key={key}>
                                            <td>
                                                <Select
                                                    disabled={disabled}
                                                    style={{ width: 120 }}
                                                    placeholder="Select"
                                                    optionFilterProp="children"
                                                    onChange={(e) => this.setTableValue(table1, key, 'year', e)}
                                                    defaultValue={element.year ? element.year : []}
                                                >
                                                    {years}
                                                </Select>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <Select
                                                    disabled={disabled}
                                                    style={{ width: 250 }}
                                                    placeholder="Select"
                                                    optionFilterProp="children"
                                                    onChange={(e) => this.setTableValue(table1, key, 'answer', e)}
                                                    defaultValue={element.answer ? element.answer : []}
                                                >
                                                    <Option value="Yes">Yes</Option>
                                                    <Option value="No">No</Option>
                                                </Select>
                                            </td>
                                        </tr>)
                                    })}
                                </table>
                            </FormItem>}

                        <FormItem
                            label="Have the salary increments and performance appraisal reports been presented for 06 years immediately preceding the date of promoting to Grade II"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('have_the_salary_increments_and_performance_appraisal_reports_been_presented_for_06_years_immediately_preceding_the_date_of_promoting_to_grade_ii', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('have_the_salary_increments_and_performance_appraisal_reports_been_presented_for_06_years_immediately_preceding_the_date_of_promoting_to_grade_ii')
                            })(
                                <Select
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    onChange={(e) => this.changeCondition('c4', e)}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        {this.state.c4 &&
                            <FormItem
                                label=" "
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <table>
                                    <tr>
                                        <th>Year</th>
                                        <th style={{ width: 400, textAlign: 'right' }}>Whether the officer has satisfactory service for 6 years immediately preceding</th>
                                    </tr>
                                    {table2.map((element, key) => {
                                        return (<tr key={key}>
                                            <td>
                                                <Select
                                                    disabled={disabled}
                                                    style={{ width: 120 }}
                                                    placeholder="Select"
                                                    optionFilterProp="children"
                                                    onChange={(e) => this.setTableValue(table2, key, 'year', e)}
                                                    defaultValue={element.year ? element.year : []}
                                                >
                                                    {years}
                                                </Select>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <Select
                                                    disabled={disabled}
                                                    style={{ width: 250 }}
                                                    placeholder="Select"
                                                    optionFilterProp="children"
                                                    onChange={(e) => this.setTableValue(table2, key, 'answer', e)}
                                                    defaultValue={element.answer ? element.answer : []}
                                                >
                                                    <Option value="Satisfactory">Satisfactory</Option>
                                                    <Option value="Above Average">Above Average</Option>
                                                    <Option value="Excellent">Excellent</Option>
                                                </Select>
                                            </td>
                                        </tr>)
                                    })}
                                </table>
                            </FormItem>}

                        <FormItem
                            label="Whether the officer has pending disciplinary actions"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('whether_the_officer_has_pending_disciplinary_actions', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('whether_the_officer_has_pending_disciplinary_actions')
                            })(
                                <Select
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Date which the officer qualified for the promotion"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_which_the_officer_qualified_for_the_promotion', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('date_which_the_officer_qualified_for_the_promotion'))
                                    ? moment(this.getApplicationItem('date_which_the_officer_qualified_for_the_promotion')) : null
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Class 2 application"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('class_2_application', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props1} disabled={disabled} >
                                {fileList1.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('class_2_application')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList1')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('class_2_application')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Last salary increment"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('last_salary_increment', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props2} disabled={disabled}>
                                {fileList2.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('last_salary_increment')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList2')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('last_salary_increment')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Last performance report"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('last_performance_report', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props3} disabled={disabled}>
                                {fileList3.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('last_performance_report')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList3')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('last_performance_report')}>Attachment</Button>}
                        </FormItem>


                        {(this.showAction()) && <FormItem
                            label="Action"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('action', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: approved
                            })(
                                <Select
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    onChange={(e) => this.setReject(e)}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={1}>{applicationStatus == 200 ? 'Submit to Commission' : 'Approve'}</Option>
                                    <Option value={0}>Reject</Option>
                                </Select>
                            )}
                        </FormItem>}

                        {(approved == 0 && this.showAction()) && <FormItem
                            label="Reject reason"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('reject_reason', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })(
                                <TextArea rows={4} style={{ width: '100%' }} />
                            )}
                        </FormItem>}

                        {rejectReason && <FormItem
                            label="Reject reason"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('reject_reason', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: rejectReason
                            })(
                                <TextArea disabled={true} rows={4} style={{ width: '100%' }} />
                            )}
                        </FormItem>}

                        <ButtonContainer>
                            <RightButtons>
                                {this.renderRightButtons().map((element, index) => {
                                    return <span key={index} style={{ marginLeft: '12px' }}>{element}</span>;
                                })}
                            </RightButtons>
                        </ButtonContainer>
                    </Form>

                </Card>
            </ApplicationContainer>
        );
    }
}

const Promotion = Form.create()(ApplicationForm);

export default Promotion
