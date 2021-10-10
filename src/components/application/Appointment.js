import React from 'react';
import {
    Form, Select, Radio, Button, Upload, Input, Result, Row, Col, Modal, notification, DatePicker,
    Card, Breadcrumb, Icon, Typography, InputNumber, Divider
} from 'antd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components'
import moment from 'moment';
import _get from "lodash/get";

import { ADD, EDIT, INSTITUTE, PSC, PUBAD, VIEW } from '../../utils/constants';

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
            confirmLoading: false,
            applicationStatus: 0,
            fileList1: [], fileList2: [], fileList3: [], fileList4: [], fileList5: [],
            workType: ''
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
                workType: application.workType,
                applicationStatus: this.props.application.status,
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
                    officer, fileList1, fileList2, fileList3, fileList4, fileList5, workType
                } = this.state;
                let userData = this.props.appState.getUserData();

                if (fileList1[0].length == 0 || fileList2[0].length == 0 || fileList3[0].length == 0
                    || fileList4[0].length == 0 || fileList5[0].length == 0) {
                    openNotificationWithIcon('error', 'Oops', 'One or more files required to submit the application!');
                }

                this.setState({ confirmLoading: true });

                var files = [
                    { name: "covering_letter_of_the_institute", file: fileList1[0] },
                    { name: "officer_duty_assume_letter", file: fileList2[0] },
                    { name: "cadre_approval_letter", file: fileList3[0] },
                    { name: "est_12", file: fileList4[0] },
                    { name: "nic", file: fileList5[0] },
                ]

                this.props.appStore.uploadFiles(files)
                    .then(docs => {
                        //documents
                        values.documents = docs;

                        //conditions
                        values.workType = workType;

                        //application
                        let applicationData = {
                            institutes_id: userData.institutes_id,
                            officers_id: officer ? officer.id : null,
                            nic: values.nic,
                            officer_name: values.officer_name,
                            designation: values.previous_designation,
                            place_of_work: values.previous_place_of_work,
                            mobile_number: values.mobile_number,
                            application: JSON.stringify(values),
                            application_type: 8,
                            reject_reason: null,
                            status: 100
                        }

                        this.props.appStore.addApplication(applicationData)
                            .then(sucess => {
                                this.setState({
                                    officer: {},
                                    confirmLoading: false,
                                    fileList1: [], fileList2: [], fileList3: [], fileList4: [], fileList5: []
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

    setEditable = () => {
        const { viewType } = this.state;
        if (viewType != ADD) {
            const status = _get(this.props.application, "status", null);
            const role = this.props.appState.getUserRole();

            switch (role) {
                case PUBAD:
                    if (status == 100 || status == 201) {
                        this.setState({ viewType: 'edit', disabled: false });
                    }
                    break;
                case PSC:
                    break;
                case INSTITUTE:
                    if (status == 101) {
                        this.setState({ viewType: 'edit', disabled: false });
                    }
                    break;
            }
        }
    }

    showAction = () => {
        const status = _get(this.props.application, "status", null);
        const role = this.props.appState.getUserRole();
        let enable = false;

        switch (role) {
            case PUBAD:
                if (status == 100 || status == 201) {
                    enable = true;
                }
                break;
            case PSC:
                if (status == 200 || status == 300) {
                    enable = true;
                }
                break;
            case INSTITUTE:
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

        if (viewType == ADD) {
            buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.submitApplication}>Submit</Button>);
        } else if (viewType == VIEW) {
            switch (role) {
                case PUBAD:
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
        } else if (viewType === EDIT) {
            switch (role) {
                case '2'://pubad
                    if (status == 100) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.approveApplication}>Approve</Button>);
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.editApproveApplication}>Update and Approve</Button>);
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

    getGradeName = (id) => {
        switch (id) {
            case 1:
                return 'Special Grade';
            case 2:
                return 'Grade I';
            case 3:
                return 'Grade II';
            case 4:
                return 'Grade III';
            default:
                return null;
        }
    }

    changeWorkType = (c) => {
        this.setState({ workType: c });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { institutes, designations } = this.props.appStore;
        const { officer, viewType, disabled, approved, applicationStatus, rejectReason,
            fileList1, fileList2, fileList3, fileList4, fileList5 } = this.state;

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
            defaultFileList: [...fileList1],
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

        const props4 = {
            showUploadList: false,
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
            defaultFileList: [...fileList4],
        }

        const props5 = {
            showUploadList: false,
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
            defaultFileList: [...fileList5],
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
                            label="Grade"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('grade', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: viewType == 'add' ?
                                    (officer.profile ? this.getGradeName(officer.profile.grades_id) : []) :
                                    this.getApplicationItem('grade')
                            })(
                                <Select
                                    showSearch
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Grade I">Grade I</Option>
                                    <Option value="Special Grade">Special Grade</Option>
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
                            label="Appointment to post due to"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('appointment_to_post_due_to', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('appointment_to_post_due_to')
                            })(
                                <Select
                                    showSearch
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Promotion">Promotion</Option>
                                    <Option value="Transfer">Transfer</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Previous place of work"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('previous_place_of_work', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: viewType == 'add' ?
                                    (officer.service_history ? this.getActive(officer.service_history).place_of_work : []) :
                                    this.getApplicationItem('previous_place_of_work')
                            })(
                                <Select
                                    disabled={disabled}
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteValues}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Previous designation"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('previous_designation', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: viewType == 'add' ?
                                    (officer.service_history ? this.getActive(officer.service_history).designation : []) :
                                    this.getApplicationItem('previous_designation')
                            })(
                                <Select
                                    showSearch
                                    disabled={disabled}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {desigValues}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Current designation"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('current_designation', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('current_designation')
                            })(
                                <Select
                                    showSearch
                                    disabled={disabled}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {desigValues}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="Current place of work type"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('current_place_of_work_type', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('current_place_of_work_type')
                            })(
                                <Select
                                    showSearch
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    onChange={(e) => this.changeWorkType(e)}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value="Cabinet Ministry">Cabinet Ministry</Option>
                                    <Option value="State Ministry">State Ministry</Option>
                                    <Option value="Department or Other Institute">Department or Other Institute</Option>
                                </Select>
                            )}
                        </FormItem>

                        {this.state.workType == 'Cabinet Ministry' && <FormItem
                            label="Place of work"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('place_of_work', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('place_of_work')
                            })(
                                <Select
                                    disabled={disabled}
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteValues}
                                </Select>
                            )}
                        </FormItem>}

                        {this.state.workType == 'State Ministry' && <FormItem
                            label="Place of work"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('place_of_work', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('place_of_work')
                            })(
                                <Select
                                    disabled={disabled}
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteValues}
                                </Select>
                            )}
                        </FormItem>}

                        {this.state.workType == 'Department or Other Institute' && <FormItem
                            label="Place of work"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('place_of_work', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('place_of_work')
                            })(
                                <Select
                                    disabled={disabled}
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteValues}
                                </Select>
                            )}
                        </FormItem>}

                        {this.state.workType == 'Department or Other Institute' && <FormItem
                            label="Name of the cabinet ministry/state ministry"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('name_of_the_cabinet_ministry_state_ministry', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('name_of_the_cabinet_ministry_state_ministry')
                            })(
                                <Select
                                    disabled={disabled}
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteValues}
                                </Select>
                            )}
                        </FormItem>}

                        <FormItem
                            label="Date of appointment to post/promotion"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('date_of_appointment_to_post_promotion', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: (this.getApplicationItem('date_of_appointment_to_post_promotion'))
                                    ? moment(this.getApplicationItem('date_of_appointment_to_post_promotion')) : null
                            })(
                                <DatePicker disabled={disabled} style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Covering letter of the institute"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('recommendation_letter_issued_by_department_of_head', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props1} disabled={disabled} >
                                {fileList1.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('covering_letter_of_the_institute')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList1')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('covering_letter_of_the_institute')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Officer’s Duty Assume letter"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_duty_assume_letter', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props2} disabled={disabled}>
                                {fileList2.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('officer_duty_assume_letter')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList2')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('officer_duty_assume_letter')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Cadre approval letter"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_induction_training_completion_letter', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props3} disabled={disabled}>
                                {fileList3.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('cadre_approval_letter')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList3')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('cadre_approval_letter')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="EST 12"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_annual_review_report_for_1st_Year_(APPENDIX_05,_PSC_Rules)', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props4} disabled={disabled}>
                                {fileList4.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('est_12')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList4')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('est_12')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="NIC"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_annual_review_report_for_2nd_Year_(APPENDIX_05,_PSC_Rules)', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props5} disabled={disabled}>
                                {fileList5.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('nic')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList5')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('nic')}>Attachment</Button>}
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
                                    return <span key={index}>{element}</span>;
                                })}
                            </RightButtons>
                        </ButtonContainer>
                    </Form>

                </Card>
            </ApplicationContainer>
        );
    }
}

const Appointment = Form.create()(ApplicationForm);

export default Appointment;
