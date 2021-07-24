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
class ConfirmationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false, approved: true,
            viewType: this.props.viewType,
            officer: {},
            c1: false, c2: false, c3: false, c4: false, c5: false,
            confirmLoading: false,
            fileList1: [], fileList2: [], fileList3: [], fileList4: [], fileList5: [], fileList6: [], fileList7: [], fileList8: []
        };

        this.props.appStore.getInstitutes();
    }

    componentDidMount() {
        this.getApplicationConditions();
        // this.loadFiles();
    }

    setReject = (value) => {
        this.setState({ approved: value });
    }

    changeCondition = (c, value) => {
        if (value == 'Yes') {
            this.setState({ [c]: true });
        } else {
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
            this.setState({
                disabled: true,
                c1: application.c1,
                c2: application.c2,
                c3: application.c3,
                c4: application.c4,
                c5: application.c5
            });
        }
    }

    loadFiles = () => {
        // let application = JSON.parse(this.props.application.application);
        // let documents = JSON.parse(application.documents);

        // documents.forEach(element => {
        //     let img = {
        //         uid: '-1',
        //         name: 'image.png',
        //         status: 'done',
        //         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //     }

        //     this.setState({ fileList1: [img] });
        // });
    }

    enableEdit = () => {
        this.setState({
            viewType: 'edit',
            disabled: false
        });
    }

    disableEdit = () => {
        this.setState({
            viewType: 'view',
            disabled: true
        });
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
            const {
                c1, c2, c3, c4, c5,
                officer, fileList1, fileList2, fileList3, fileList4, fileList5, fileList6, fileList7, fileList8
            } = this.state;
            let userData = this.props.appState.getUserData();

            if (fileList1[0].length != 0 && fileList2[0].length && fileList3[0].length && fileList4[0].length &&
                fileList5[0].length != 0 && fileList6[0].length && fileList7[0].length && fileList8[0].length) {
                openNotificationWithIcon('error', 'Oops', 'One or more files required to submit the application!');
            }

            this.setState({ confirmLoading: true });

            var files = [
                { name: "recommendation_letter_issued_by_department_of_head", file: fileList1[0] },
                { name: "certified_copy_of_duty_assume_letter", file: fileList2[0] },
                { name: "certified_copy_of_induction_training_completion_letter", file: fileList3[0] },
                { name: "certified_copy_of_annual_review_report_for_1st_Year_(APPENDIX_05,_PSC_Rules)", file: fileList4[0] },
                { name: "certified_copy_of_annual_review_report_for_2nd_Year_(APPENDIX_05,_PSC_Rules)", file: fileList5[0] },
                { name: "certified_copy_of_annual_review_report_for_3rd_Year_(APPENDIX_05,_PSC_Rules)", file: fileList6[0] },
                { name: "certified_copy_of_efficiency_bar_result_sheet", file: fileList7[0] },
                { name: "certified_copy_of_medical_certificate", file: fileList8[0] }
            ]

            this.props.appStore.uploadFiles(files)
                .then(docs => {

                    //consditions
                    values.c1 = c1;
                    values.c2 = c2;
                    values.c3 = c3;
                    values.c4 = c4;
                    values.c5 = c5;

                    //documents
                    values.documents = docs;

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
                        application_type: 3,
                        reject_reason: null,
                        status: 100
                    }

                    this.props.appStore.addApplication(applicationData)
                        .then(sucess => {
                            this.setState({
                                officer: {},
                                c1: false, c2: false, c3: false, c4: false, c5: false,
                                confirmLoading: false,
                                fileList1: [], fileList2: [], fileList3: [], fileList4: [], fileList5: [], fileList6: [], fileList7: [], fileList8: []
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
        })
    };

    approveApplication = () => {
        const { approved } = this.state;
        let application = JSON.parse(this.props.application.application);
        let role = this.props.appState.getUserRole();

        this.props.form.validateFields((err, values) => {
            this.setState({ confirmLoading: true });

            let approveData = {
                application_id: application.id,
                is_approved: approved,
                role: role,
                reject_reason: values.reject_reason ? values.reject_reason : null
            }

            this.props.appStore.approveApplication(approveData)
                .then(response => {
                    this.setState({ confirmLoading: false });
                })
                .catch(err => {
                    this.setState({ confirmLoading: false });
                    openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
                });
        });
    }

    editApproveApplication = () => {
        console.log('file --> ', this.state.fileList1);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { institutes } = this.props.appStore;
        const { confirmLoading, officer, viewType, disabled, approved,
            fileList1, fileList2, fileList3, fileList4, fileList5, fileList6, fileList7, fileList8 } = this.state;

        const props1 = {
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
        }

        const props2 = {
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
        }

        const props3 = {
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
        }

        const props4 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList4.indexOf(file);
                    const newFileList = state.fileList4.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList4: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList4: [...state.fileList4, file],
                }));
                return false;
            },
            fileList4,
        }

        const props5 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList5.indexOf(file);
                    const newFileList = state.fileList5.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList5: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList5: [...state.fileList5, file],
                }));
                return false;
            },
            fileList5,
        }

        const props6 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList6.indexOf(file);
                    const newFileList = state.fileList6.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList6: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList6: [...state.fileList6, file],
                }));
                return false;
            },
            fileList6,
        }

        const props7 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList7.indexOf(file);
                    const newFileList = state.fileList7.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList7: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList7: [...state.fileList7, file],
                }));
                return false;
            },
            fileList7,
        }

        const props8 = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList8.indexOf(file);
                    const newFileList = state.fileList8.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList8: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList8: [...state.fileList8, file],
                }));
                return false;
            },
            fileList8,
        }

        let instituteValues = [];

        if (institutes) {
            institutes.forEach((element, index) => {
                instituteValues.push(<Option key={index} value={element.name}>{element.name}</Option>);
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
                            label="Officer Name"
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
                            label="Designation"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('designation', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: viewType == 'add' ?
                                    (officer.service_history ? this.getActive(officer.service_history).designation : null) :
                                    this.getApplicationItem('designation')
                            })(
                                <Input disabled={disabled} style={{ width: '100%' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Place of work"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('place_of_work', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: viewType == 'add' ?
                                    (officer.service_history ? this.getActive(officer.service_history).place_of_work : []) :
                                    this.getApplicationItem('place_of_work')
                            })(
                                <Select
                                    disabled={disabled}
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select institute"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteValues}
                                </Select>
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
                            label="Date of appointment to SLAS"
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
                            label="Duty assumption date"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('duty_assumption_date', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: moment(this.getApplicationItem('duty_assumption_date'))
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Recruitment stream"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('recruitment_stream', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('recruitment_stream')
                            })(
                                <Select
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Open">Open</Option>
                                    <Option value="Limited">Limited</Option>
                                    <Option value="Merit">Merit</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Date of completing probation or acting time period"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_of_completing_probation_or_acting_time_period', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: moment(this.getApplicationItem('date_of_completing_probation_or_acting_time_period'))
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the officer completed the induction training program in SLIDA"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_officer_completed_the_induction_training_program_in_SLIDA', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('has_the_officer_completed_the_induction_training_program_in_SLIDA')
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
                            label="Has the officer completed the 1st Efficiency Bar (EB)"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_officer_completed_the_1st_Efficiency_Bar_(EB)', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('has_the_officer_completed_the_1st_Efficiency_Bar_(EB)')
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
                                    <Option value="Released">Released</Option>
                                    <Option value="Not Relevant">Not Relevant</Option>
                                </Select>
                            )}
                        </FormItem>

                        {this.state.c1 && <FormItem
                            label="Date of completing 1st Efficiency Bar (EB)"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_of_completing_1st_Efficiency_Bar_(EB)', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: moment(this.getApplicationItem('date_of_completing_1st_Efficiency_Bar_(EB)'))
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>}

                        <FormItem
                            label="Has the officer failed in passing 1st EB on Date"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_officer_failed_in_passing_1st_EB_on_date', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('has_the_officer_failed_in_passing_1st_EB_on_date')
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
                            label="Period to be extended on delay in passing 1st EB"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            extra="Under the PSC Rules No.110/Under the PSC Rules No.111"
                        >
                            {getFieldDecorator('period_to_be_extended_on_delay_in_passing_1st_EB', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('period_to_be_extended_on_delay_in_passing_1st_EB')
                            })(
                                <Input disabled={disabled} style={{ width: '250px' }} />
                            )}
                        </FormItem>}

                        <FormItem
                            label="Has the officer completed the second language proficiency requirement"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_officer_completed_the_second_language_proficiency_requirement', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('has_the_officer_completed_the_second_language_proficiency_requirement')
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

                        {this.state.c3 && <FormItem
                            label="Date of completing the second language proficiency requirement"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_of_completing_the_second_language_proficiency_requirement', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: moment(this.getApplicationItem('date_of_completing_the_second_language_proficiency_requirement'))
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>}

                        {!this.state.c3 && <FormItem
                            label="Has concessionary been given for the second language proficiency requirement"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_concessionary_been_given_for_the_second_language_proficiency_requirement', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('has_concessionary_been_given_for_the_second_language_proficiency_requirement')
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
                        </FormItem>}

                        {!this.state.c4 && <FormItem
                            label="Period to be extended by failing to complete the second language proficiency requirement"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            extra="Under the PSC Rules No.110/Under the PSC Rules No.111"
                        >
                            {getFieldDecorator('period_to_be_extended_by_failing_to_complete_the_second_language_proficiency_requirement', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('period_to_be_extended_by_failing_to_complete_the_second_language_proficiency_requirement')
                            })(
                                <Input disabled={disabled} style={{ width: '250px' }} />
                            )}
                        </FormItem>}

                        <FormItem
                            label="Has the officer obtained no pay or half pay leave"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_officer_obtained_no_pay_or_half_pay_leave', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('has_the_officer_obtained_no_pay_or_half_pay_leave')
                            })(
                                <Select
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    onChange={(e) => this.changeCondition('c5', e)}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            )}
                        </FormItem>

                        {this.state.c5 && <FormItem
                            label="Time period of leaves"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('time_period_of_leaves', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('time_period_of_leaves')
                            })(
                                <Input disabled={disabled} style={{ width: '250px' }} />
                            )}
                        </FormItem>}

                        <FormItem
                            label="Is the officer physically and mentally fit to serve according to the medical examination report"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('is_the_officer_physically_and_mentally_fit_to_serve_according_to_the_medical_examination_report', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('is_the_officer_physically_and_mentally_fit_to_serve_according_to_the_medical_examination_report')
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
                                    <Option value="Not Relevant">Not Relevant</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Has the recommendation of Secretary received as to whether the work, attendance and conduct of the officer are satisfactory"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('has_the_recommendation_of_Secretary_received_as_to_whether_the_work,_attendance,_and_conduct_of_the_officer_are_satisfactory', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('has_the_recommendation_of_Secretary_received_as_to_whether_the_work,_attendance,_and_conduct_of_the_officer_are_satisfactory')
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
                            label="Recommendation letter issued by department of head"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('recommendation_letter_issued_by_department_of_head', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {viewType == 'add' || viewType == 'edit' && <Upload {...props1} disabled={disabled} >
                                {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('recommendation_letter_issued_by_department_of_head')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Certified copy of duty assume letter"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_duty_assume_letter', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {viewType == 'add' || viewType == 'edit' && <Upload {...props2} disabled={disabled}>
                                {fileList2.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('certified_copy_of_duty_assume_letter')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Certified copy of induction training completion letter"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_induction_training_completion_letter', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {viewType == 'add' || viewType == 'edit' && <Upload {...props3} disabled={disabled}>
                                {fileList3.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('certified_copy_of_induction_training_completion_letter')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Certified copy of annual review report for 1st Year (APPENDIX 05, PSC Rules)"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_annual_review_report_for_1st_Year_(APPENDIX_05,_PSC_Rules)', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {viewType == 'add' || viewType == 'edit' && <Upload {...props4} disabled={disabled}>
                                {fileList4.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('certified_copy_of_annual_review_report_for_1st_Year_(APPENDIX_05,_PSC_Rules)')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Certified copy of annual review report for 2nd Year (APPENDIX 05, PSC Rules)"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_annual_review_report_for_2nd_Year_(APPENDIX_05,_PSC_Rules)', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {viewType == 'add' || viewType == 'edit' && <Upload {...props5} disabled={disabled}>
                                {fileList5.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('certified_copy_of_annual_review_report_for_2nd_Year_(APPENDIX_05,_PSC_Rules)')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Certified copy of annual review report for 3rd Year (APPENDIX 05, PSC Rules)"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_annual_review_report_for_3rd_Year_(APPENDIX_05,_PSC_Rules)', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {viewType == 'add' || viewType == 'edit' && <Upload {...props6} disabled={disabled}>
                                {fileList6.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('certified_copy_of_annual_review_report_for_3rd_Year_(APPENDIX_05,_PSC_Rules)')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Certified copy of efficiency bar result sheet"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_efficiency_bar_result_sheet', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {viewType == 'add' || viewType == 'edit' && <Upload {...props7} disabled={disabled}>
                                {fileList7.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('certified_copy_of_efficiency_bar_result_sheet')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Certified copy of medical certificate"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_medical_certificate', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {viewType == 'add' || viewType == 'edit' && <Upload {...props8} disabled={disabled}>
                                {fileList8.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('certified_copy_of_medical_certificate')}>Attachment</Button>}
                        </FormItem>

                        {viewType == 'view' && <FormItem
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
                                    <Option value={true}>Approve</Option>
                                    <Option value={false}>Reject</Option>
                                </Select>
                            )}
                        </FormItem>}

                        {viewType == 'view' && !approved && <FormItem
                            label="Reject reason"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('reject_reason', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                            })(
                                <TextArea rows={4} style={{ width: '100%' }} />
                            )}
                        </FormItem>}

                        <ButtonContainer>
                            <LeftButtons>
                                {viewType == 'view' && <Button type="default" loading={confirmLoading} onClick={this.enableEdit}>Enable Edit</Button>}
                                {viewType == 'edit' && <Button type="default" loading={confirmLoading} onClick={this.disableEdit}>Disable Edit</Button>}
                            </LeftButtons>
                            <RightButtons>
                                {viewType == 'add' && <Button type="primary" loading={confirmLoading} onClick={this.submitApplication}>Submit</Button>}
                                {viewType == 'view' && <Button type="primary" loading={confirmLoading} onClick={this.approveApplication}>Submit</Button>}
                                {viewType == 'edit' && <Button type="primary" loading={confirmLoading} onClick={this.editApproveApplication}>Update</Button>}
                            </RightButtons>
                        </ButtonContainer>
                    </Form>

                </Card>
            </ApplicationContainer>
        );
    }
}

const Confirmation = Form.create()(ConfirmationForm);

export default Confirmation
