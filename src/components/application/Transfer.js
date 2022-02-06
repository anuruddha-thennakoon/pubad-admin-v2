import React from 'react';
import {
    Form, Select, Button, Upload, Input, notification, DatePicker, Card, Icon, Typography
} from 'antd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import _get from "lodash/get";
import { PUBAD } from '../../utils/constants';

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

const generatePrintDoc = (props) => {
    return `
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Transfer Confirmation</title>
        <style>
            body {
                font-size: 14px;
                font-family: "Segoe UI";
            }
            .title {
                text-align: center;
            }
            table {
                border-collapse: collapse;
                table-layout: fixed;
            }
            table th{
                text-align: center;
                padding: 3px;
                border: 1px solid #cfcfcf;
            }
            table td {
                text-align: left;
                padding: 3px;
                border: 1px solid #cfcfcf;
            }
            .margin {
                margin-top: 2rem;
            }
        </style>
    </head>
    
    <body onload="window.print()">
        <div style="width: 1000px; margin: 0 auto">
            <div class="officer margin">
                <div></div>
                <div>through</div>
                <div>Secretary to the President, President’s Secretariat</div>
            </div>
    
            <div class="title margin"><u>Transfers of Sri Lanka Administrative Service</u></div>
    
            <div class="description margin">
                You are transferred to the Service Station mentioned below until further notice
                and I should be informed through the relevant Head of the Department on Assumption
                of Duties.
            </div>
    
            <table width="100%" class="margin">
                <tbody>
                    <tr>
                        <th width="20%">Name of the Officer</th>
                        <th width="20%">Service Station and the Post held at Present</th>
                        <th width="20%">Service Station to which the Officer is Transferred and the Post</th>
                        <th width="20%">Date of Transfer</th>
                        <th width="20%">Subsistence Allowance</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
    
            <div class="signature margin">
                <div>G.I. Lakmali Fernando - For Information</div>
                <div>Assistant Director (S.L.A.S)</div>
                <div>For Secretary Ministry of Public Services</div>
                <div>Provincial Councils and Local Government</div>
            </div>
        </div>
    </body>
    
    </html>
    `
}

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
            fileList1: [], fileList2: [], fileList3: [], fileList4: []
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

            if (key === 'approval_document') {
                link = JSON.parse(this.props.application.approval_document)[0].url;
            } else {
                documents.forEach(element => {
                    if (element.name === key) {
                        link = element.url;
                    }
                });
            }

            window.open(link, '_blank');
        }
    }

    submitApplication = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { officer, fileList1, fileList2, fileList3 } = this.state;
                let userData = this.props.appState.getUserData();

                if (fileList1.length == 0 || fileList2.length == 0 || fileList3.length == 0) {
                    openNotificationWithIcon('error', 'Oops', 'One or more files required to submit the application!');
                }

                this.setState({ confirmLoading: true });

                var files = [
                    { name: "request_letter_of_officer", file: fileList1[0] },
                    { name: "consent_letter_of_workplace", file: fileList2[0] },
                    { name: "consent_letter_of_new_workplace", file: fileList3[0] }
                ]

                this.props.appStore.uploadFiles(files)
                    .then(docs => {
                        //documents
                        values.documents = docs;

                        //application
                        let applicationData = {
                            institutes_id: userData.institutes_id,
                            officers_id: officer ? officer.id : null,
                            nic: values.nic,
                            officer_name: values.officer_name,
                            designation: values.current_designation,
                            place_of_work: values.place_of_work,
                            mobile_number: values.mobile_number,
                            application: JSON.stringify(values),
                            application_type: 7,
                            reject_reason: null,
                            status: 100
                        }

                        this.props.appStore.addApplication(applicationData)
                            .then(sucess => {
                                this.setState({
                                    fileList1: [], fileList2: [], fileList3: [],
                                    officer: {},
                                    confirmLoading: false,
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
        const { fileList4 } = this.state;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (fileList4.length === 0) {
                    openNotificationWithIcon('error', 'Oops', 'Please upload approval document!');
                }

                var files = [
                    { name: "approval_document", file: fileList4[0] }
                ]

                this.setState({ confirmLoading: true });

                this.props.appStore.uploadFiles(files)
                    .then(docs => {

                        let approveData = {
                            application_id: this.props.application.id,
                            application_type: this.props.application.application_type,
                            approved: approved,
                            user_role: role,
                            status: this.props.application.status,
                            reject_reason: values.reject_reason ? values.reject_reason : null,
                            approval_document: docs
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

                    })
                    .catch(err => {
                        this.setState({ confirmLoading: false });
                        openNotificationWithIcon('error', 'Oops', 'Something went wrong in application submission!');
                    });
            }
        });
    }

    updateApplication = (status) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { fileList1, fileList2, fileList3 } = this.state;
                let application = this.props.application;

                if (fileList1[0].length == 0 || fileList2[0].length == 0 || fileList3[0].length == 0) {
                    openNotificationWithIcon('error', 'Oops', 'One or more files required to submit the application!');
                }

                this.setState({ confirmLoading: true });

                var files = [
                    { name: "request_letter_of_officer", file: fileList1[0] },
                    { name: "consent_letter_of_workplace", file: fileList2[0] },
                    { name: "consent_letter_of_new_workplace", file: fileList3[0] }
                ]

                this.props.appStore.uploadFiles(files)
                    .then(docs => {
                        //documents
                        values.documents = docs;

                        //application
                        let applicationData = {
                            id: application.id,
                            nic: values.nic,
                            officer_name: values.officer_name,
                            designation: values.current_designation,
                            place_of_work: values.place_of_work,
                            mobile_number: values.mobile_number,
                            application: JSON.stringify(values),
                            reject_reason: null,
                            status: status
                        }

                        this.props.appStore.updateApplication(applicationData)
                            .then(sucess => {
                                openNotificationWithIcon('success', 'Success', 'Application updated successfully!');
                                this.setState({ confirmLoading: false });
                                this.props.closeApplication();
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

    viewSubmit = () => {
        const status = this.props.application.status;
        const role = this.props.appState.getUserRole();
        let enable = false;

        switch (role) {
            case '2':
                if (status == 100 || status == 201) {
                    enable = true;
                }
                break;
            case '3':
                if (status == 200 || status == 300) {
                    enable = true;
                }
                break;
            case '4'://institute
                if (status == 101) {
                    enable = true;
                }
                break;
            default:
                break;
        }
        return enable;
    }

    showRejectAction = () => {
        const status = _get(this.props.application, "status", null);
        const role = this.props.appState.getUserRole();
        let enable = false;

        switch (role) {
            case PUBAD://pubad
                if (status == 100 || status == 201) {
                    enable = true;
                }
                break;
            case '3'://psc
                if (status == 200 || status == 300) {
                    enable = true;
                }
                break;
            case '4'://institute
                break;
            default:
                break;
        }
        return enable;
    }

    showApprovalDocument = () => {
        const status = _get(this.props.application, "status", null);
        const role = this.props.appState.getUserRole();
        let enable = { view: false, edit: false };

        switch (role) {
            case PUBAD://pubad
                if (status == 100) {
                    enable = { view: false, edit: true };
                } else if (status == 400) {
                    enable = { view: true, edit: false };
                }
                break;
            case '3'://psc
                break;
            case '4'://institute
                if (status == 100) {
                    enable = { view: false, edit: false };
                } else if (status == 400) {
                    enable = { view: true, edit: false };
                }
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
                case PUBAD://pubad
                    if (status == 100) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.approveApplication}>Submit</Button>);
                    } else if (status == 201) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={() => this.updateApplication(200)}>Re Submit</Button>);
                    }
                    break;
                case '3'://psc
                    if (status == 200 || status == 300) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.approveApplication}>Submit</Button>);
                    }
                    break;
                case '4'://institute
                    if (status == 400) {
                        buttons.push(<Button type="primary" icon="printer" loading={confirmLoading} onClick={this.printDocument}>Print</Button>);
                    }
                    break;
                default:
                    break;
            }
        } else if (viewType == 'edit') {
            switch (role) {
                case '2'://pubad
                    if (status == 100) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={this.approveApplication}>Approve</Button>);
                        // buttons.push(<Button type="primary" loading={confirmLoading} onClick={() => this.updateApplication(200)}>Update and Approve</Button>);
                    } else if (status == 201) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={() => this.updateApplication(200)}>Re Submit</Button>);
                    }
                    break;
                case '3'://psc
                    break;
                case '4'://institute
                    if (status == 101) {
                        buttons.push(<Button type="primary" loading={confirmLoading} onClick={() => this.updateApplication(100)}>Re Submit</Button>);
                    } else if (status == 400) {
                        buttons.push(<Button type="primary" icon="printer" loading={confirmLoading} onClick={this.printDocument}>Print</Button>);
                    }
                    break;
                default:
                    break;
            }
        }
        return buttons;
    }

    printDocument = () => {
        let printWindow = window.open('', '_blank', 'resizable=1,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        printWindow.document.open();
        printWindow.document.write(generatePrintDoc());
        printWindow.document.close();
    }

    removeFile = (fileList) => {
        this.setState({ [fileList]: [] });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { institutes, designations } = this.props.appStore;
        const { officer, viewType, disabled, approved, applicationStatus, rejectReason, fileList1, fileList2, fileList3, fileList4 } = this.state;
        const status = _get(this.props.application, "status", null);

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
                                    <Option value="Grade II">Grade II</Option>
                                    <Option value="Grade III">Grade III</Option>
                                    <Option value="Special Grade">Special Grade</Option>
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
                                initialValue: viewType == 'add' ?
                                    (officer.service_history ? this.getActive(officer.service_history).designation : []) :
                                    this.getApplicationItem('current_designation')
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
                            label="Current Place of work"
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
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {instituteValues}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="New Institute Type"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('new_institute_type', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('new_institute_type')
                            })(
                                <Select
                                    showSearch
                                    disabled={disabled}
                                    style={{ width: 250 }}
                                    placeholder="Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={1}>Cabinet Ministry</Option>
                                    <Option value={2}>State Ministry Department</Option>
                                    <Option value={3}>Special Spending Unit</Option>
                                    <Option value={4}>Divisional Administartion</Option>
                                    <Option value={5}>Provincial Council</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            label="New place of work"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('new_place_of_work', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('new_place_of_work')
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
                            label="New designation"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('new_designation', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.getApplicationItem('new_designation')
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
                            label="Request letter of officer"
                            required={true}
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('recommendation_letter_issued_by_department_of_head', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props1} disabled={disabled} >
                                {fileList1.length >= 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('request_letter_of_officer')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList1')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('request_letter_of_officer')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Consent letter of current workplace"
                            required={true}
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_duty_assume_letter', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props2} disabled={disabled}>
                                {fileList2.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('consent_letter_of_workplace')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList2')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('consent_letter_of_workplace')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            label="Consent letter of new workplace"
                            required={true}
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_duty_assume_letter', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {(viewType == 'add' || viewType == 'edit') && <Upload {...props3} disabled={disabled}>
                                {fileList3.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('consent_letter_of_new_workplace')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList3')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {viewType == 'view' && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('consent_letter_of_new_workplace')}>Attachment</Button>}
                        </FormItem>

                        <FormItem
                            labelCol={{ span: 24 }}
                        >
                            <span>Consent letters should be signed by Head of Institute (Eg: Secretary of Ministry/ State Ministry/ Special Spending Unit, Chief Secretary of Privincila Council)</span>
                        </FormItem>


                        {this.showRejectAction() && <FormItem
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

                        {approved === 1 && (this.showApprovalDocument().view || this.showApprovalDocument().edit) && <FormItem
                            label="Approval Document"
                            required={true}
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {/* {getFieldDecorator('certified_copy_of_duty_assume_letter', {
                                rules: [{ required: true, message: 'Please input relevant data' }]
                            })( */}
                            {this.showApprovalDocument().edit && <Upload {...props4} disabled={disabled}>
                                {fileList4.length == 1 ?
                                    <span><Button style={{ paddingLeft: 0 }} icon="paper-clip" type="link" onClick={() => this.openAttachment('approval_document')}>Attachment</Button>
                                        <Icon type="delete" onClick={() => this.removeFile('fileList4')} /></span> :
                                    <Button><Icon type={'upload'} />Upload</Button>}
                            </Upload>}
                            {/*)} */}

                            {this.showApprovalDocument().view && <Button icon="paper-clip" type="link" onClick={() => this.openAttachment('approval_document')}>Attachment</Button>}
                        </FormItem>}

                        {(approved === 0 && this.showRejectAction()) && <FormItem
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

                        {rejectReason && (status != 400 && status != 100) && <FormItem
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
                                    return <span key={index} style={{ marginRight: 6 }}>{element}</span>;
                                })}
                            </RightButtons>
                        </ButtonContainer>
                    </Form>

                </Card>
            </ApplicationContainer>
        );
    }
}

const Transfer = Form.create()(ApplicationForm);

export default Transfer;