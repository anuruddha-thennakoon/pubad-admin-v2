import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import '../../styles/styles.scss';
import {
    Modal, Alert, Button, notification, Input, Form, Link, Radio, Tag, Select, Divider, Card, Upload, Icon, Statistic
} from 'antd';

const FormItem = Form.Item;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
}

@inject('appStore')
@observer
class ViewApplicationForm extends Component {

    constructor(props) {
        super(props);
        this.props.appStore.getAllOfficers();
        this.state = { visible: false, confirmLoading: false, visibleReason: false, fileList1: [], fileList2: [] }
    }

    appAction = (e) => {
        let value = e.target.value;
        if (value == 101 || value == 201) {
            this.setState({ visibleReason: true })
        } else
            this.setState({ visibleReason: false })
    };

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false, });
    }

    getProperName = (name) => {
        // console.log('name', name);

        if (name == 'institute_covering_letter') {
            return 'Institute Covering Letter'
        } else if (name == 'est01') {
            return 'EST01'
        } else if (name == 'est02') {
            return 'EST02'
        } else if (name == 'est03') {
            return 'EST03'
        } else if (name == 'est04') {
            return 'EST04'
        } else if (name == 'est12') {
            return 'EST12'
        } else if (name == 'cv') {
            return 'CV'
        } else if (name == 'nic') {
            return 'NIC'
        } else if (name == 'organization_chart') {
            return 'Organisation Chart'
        } else if (name == 'promotion_application') {
            return 'Promotion Application'
        } else if (name == 'medical_certificate') {
            return 'Medical Certificate'
        } else if (name == 'appendix_10/11') {
            return 'Appendix 10/11'
        } else if (name == 'officer_request_letter') {
            return 'Officer Request Letter'
        } else if (name == 'current_institute_consent_letter') {
            return 'Current Institute Consent Letter'
        } else if (name == 'to_be_transferred_institute_consent_letter') {
            return 'To be Transferred Institute Consent Letter'
        } else if (name == 'pubad_covering_letter') {
            return 'Pubad Converting letter'
        } else if (name == 'pubad_format') {
            return 'Pubad Format'
        } else if (name == 'psc_order') {
            return 'PSC Order'
        }
    }

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            const { fileList1, fileList2 } = this.state;

            let files = [];
            let body = {};
            let role = localStorage.getItem('role');

            if (!err) {
                this.setState({ confirmLoading: true });

                if (role == 1 || role == 2) {
                    files = [
                        { name: "pubad_covering_letter", file: fileList1[0] },
                        { name: "pubad_format", file: fileList2[0] },
                    ]
                } else if (role == 3) {
                    files = [
                        { name: "psc_order", file: fileList1[0] }
                    ]
                }

                this.props.appStore.uploadFiles(files)
                    .then(docs => {

                        if (role == 1 || role == 2) {
                            body = {
                                id: this.props.record.id,
                                status: values.application_status,
                                reject_reason: values.reject_reason,
                                psc_documents: '',
                                pbad_documents: docs
                            };
                        } else if (role == 3) {
                            body = {
                                id: this.props.record.id,
                                status: values.application_status,
                                reject_reason: values.reject_reason,
                                pbad_documents: '',
                                psc_documents: docs
                            };
                        }

                        this.props.appStore.updateApplicationStatus(body)
                            .then(sucess => {
                                this.props.form.resetFields();
                                this.setState({ confirmLoading: false, fileList1: [], fileList2: [] });
                                this.props.appStore.getActInApplications();
                                openNotificationWithIcon('success', 'Success', 'Application status update successfull');
                                this.handleCancel();
                            })
                            .catch(err => {
                                this.setState({ confirmLoading: false });
                                openNotificationWithIcon('error', 'Oops', 'Something went wrong');
                            });

                    })
                    .catch(err => {
                        this.setState({ confirmLoading: false });
                        openNotificationWithIcon('error', 'Oops', 'Something went wrong in application submission!');
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading, fileList1, fileList2 } = this.state;
        const { officers } = this.props.appStore;

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
        };

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
        };

        let isRejected = this.state.visibleReason;
        let role = localStorage.getItem('role');
        let officerName = '';
        let app_status = '';
        let alert_style = '';

        // console.log(this.props.record.status);

        if (officers) {
            officers.forEach((element, index) => {
                if (element.id == this.props.record.officers_id) {
                    officerName = element.name
                }
            });
        }

        if (this.props.record.status == '100') {
            app_status = 'Pending Application';
            alert_style = 'warning'
        } else if (this.props.record.status == '200') {
            app_status = 'Approved from Public Administration';
            alert_style = 'success'
        } else if (this.props.record.status == '101') {
            app_status = 'Rejected from Public Administration';
            alert_style = 'error'
        } else if (this.props.record.status == '300') {
            app_status = 'Approved from PSC';
            alert_style = 'success'
        } else if (this.props.record.status == '201') {
            app_status = 'Rejected from PSC';
            alert_style = 'error'
        }


        return (
            <div style={{ display: 'inline' }}>
                <Button type="link" onClick={this.showModal}>View</Button>
                <Modal
                    title="Application Details"
                    okText="Submit"
                    confirmLoading={confirmLoading}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={860}
                    footer={role == '4' ? null :
                        [
                            <Button key="back" onClick={this.handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
                                Submit
                            </Button>,
                        ]}
                >
                    <Form>
                        <Card style={{ marginTop: 10 }} size="small" title="Personal Details" type="inner">
                            <FormItem
                                labelAlign={"left"}
                                label="Officer Name"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('officers_id', {})(
                                    <span style={{ width: '100%' }}>{officerName}</span>
                                )}
                            </FormItem>
                            <FormItem
                                labelAlign={"left"}
                                label="NIC"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('nic', {})(
                                    <span style={{ width: '100%' }}>{this.props.record.nic}</span>
                                )}
                            </FormItem>
                            <FormItem
                                labelAlign={"left"}
                                label="Grade"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('present_grade', {})(
                                    <span style={{ width: '100%' }}>{this.props.record.present_grade}</span>
                                )}
                            </FormItem>
                            <FormItem
                                labelAlign={"left"}
                                label="Present Post"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('category', {
                                    initialValue: this.props.record.present_post
                                })(
                                    <span style={{ width: '100%' }}>{this.props.record.present_post}</span>
                                )}
                            </FormItem>
                            <FormItem
                                labelAlign={"left"}
                                label="Working Place"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('current_work_place', {
                                    initialValue: this.props.record.current_work_place
                                })(
                                    <span style={{ width: '100%' }}>{this.props.record.current_work_place}</span>
                                )}
                            </FormItem>
                            <FormItem
                                labelAlign={"left"}
                                label="Mobile Number"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('present_post', {
                                    initialValue: this.props.record.mobile
                                })(
                                    <span style={{ width: '100%' }}>{this.props.record.mobile}</span>
                                )}
                            </FormItem>
                            <FormItem
                                labelAlign={"left"}
                                label="Application Type"
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                            >
                                {getFieldDecorator('application_type', {
                                    initialValue: this.props.record.application_type
                                })(
                                    <span style={{ width: '100%' }}>{this.props.record.application_type}</span>
                                )}
                            </FormItem>
                        </Card>

                        <Card style={{ marginTop: 10 }} size="small" title="Documents" type="inner">
                            {JSON.parse(this.props.record.documents).map(element => {
                                return <FormItem
                                    labelAlign={"left"}
                                    label={this.getProperName(element.name)}
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}
                                >
                                    {element.url != '' ?
                                        <a href={element.url} target='_blank'><Icon type={'file'}
                                            style={{ marginLeft: 10 }} />Document</a>
                                        : <span>No Document</span>}
                                </FormItem>
                            })}

                            {this.props.record.pbad_documents && JSON.parse(this.props.record.pbad_documents).map(element => {
                                return <FormItem
                                    labelAlign={"left"}
                                    label={this.getProperName(element.name)}
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}
                                >
                                    {element.url != '' ?
                                        <a href={element.url} target='_blank'><Icon type={'file'}
                                            style={{ marginLeft: 10 }} />Document</a>
                                        : <span>No Document</span>}
                                </FormItem>
                            })}

                            {this.props.record.psc_documents && JSON.parse(this.props.record.psc_documents).map(element => {
                                return <FormItem
                                    labelAlign={"left"}
                                    label={this.getProperName(element.name)}
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}
                                >
                                    {element.url != '' ?
                                        <a href={element.url} target='_blank'><Icon type={'file'}
                                            style={{ marginLeft: 10 }} />Document</a>
                                        : <span>No Document</span>}
                                </FormItem>
                            })}
                        </Card>

                        {((role == '1' || role == '2') && (this.props.record.status == 100)) &&
                            <Card style={{ marginTop: '10px' }} size="small" title="Documents" type="inner">
                                <FormItem
                                    labelAlign={"left"}
                                    label="Pubad Covering Letter"
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}
                                >
                                    <Upload {...props1}>
                                        {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                    </Upload>
                                </FormItem>
                                <FormItem
                                    labelAlign={"left"}
                                    label="Pubad Format(Optional)"
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}
                                >
                                    <Upload {...props2}>
                                        {fileList2.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                    </Upload>
                                </FormItem>
                            </Card>}

                        {((role == '3') && (this.props.record.status == 200)) &&
                            <Card style={{ marginTop: '10px' }} size="small" title="Documents" type="inner">
                                <FormItem
                                    labelAlign={"left"}
                                    label="PSC Order"
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}
                                >
                                    <Upload {...props1}>
                                        {fileList1.length == 1 ? null : <Button><Icon type={'upload'} />Upload</Button>}
                                    </Upload>
                                </FormItem>
                            </Card>}

                        {role == '2' || role == '3' ?
                            <Card style={{ marginTop: '10px' }} size="small" title="Application Action" type="inner">
                                <FormItem
                                    labelAlign={"left"}
                                    label="Application State"
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}
                                >
                                    {role == '2' && getFieldDecorator('application_status', {
                                        initialValue: this.props.record.status
                                    })(
                                        <Radio.Group name="radiogroup" onChange={this.appAction}>
                                            <Radio value={200}>Approved</Radio>
                                            <Radio value={101}>Rejected</Radio>
                                        </Radio.Group>
                                    )}
                                    {role == '3' && getFieldDecorator('application_status', {
                                        initialValue: this.props.record.status
                                    })(
                                        <Radio.Group name="radiogroup" onChange={this.appAction}>
                                            <Radio value={300}>Approved</Radio>
                                            <Radio value={201}>Rejected</Radio>
                                        </Radio.Group>
                                    )}

                                </FormItem>
                                <FormItem
                                    labelAlign={"left"}
                                    style={{
                                        display: isRejected || this.props.record.status == 101 ||
                                            this.props.record.status == 201 ? '' : 'none'
                                    }}
                                    label="Rejected Reason"
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 14 }}
                                >
                                    {getFieldDecorator('reject_reason', {
                                        initialValue: this.props.record.reject_reason
                                    })(
                                        <Select
                                            placeholder="Select Reason"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="reason 1">Sample reason 1</Option>
                                            <Option value="reason 2">Sample reason 2</Option>
                                            <Option value="reason 3">Sample reason 3</Option>
                                        </Select>
                                    )}

                                </FormItem>
                            </Card> : ''}

                        {role == '4' && (this.props.record.status == 101 || this.props.record.status == 201) ?
                            <div style={{ marginTop: 10 }}>
                                <Button key="submit" type="primary">Re-Submit</Button>
                                <Button style={{ float: 'right' }} key="back" onClick={this.handleCancel}>
                                    Cancel
                                </Button>
                            </div> : ''
                        }

                    </Form>
                </Modal>
            </div>
        );
    }
}

const ViewApplication = Form.create()(ViewApplicationForm);

export default ViewApplication;
