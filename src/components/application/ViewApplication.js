import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import '../../styles/styles.scss';
import {
    Modal, Alert, Button, notification, Input, Form, Link, Radio, Tag, Select, Divider, Card, Upload, Icon, Statistic
} from 'antd';
import Confirmation from './Confirmation';

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
        this.state = { visible: false, confirmLoading: false }
    }

    showModal = () => {
        this.setState({ visible: true });
    }

    closeModal = () => {
        this.setState({ visible: false });
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
                                this.props.appStore.getApplications();
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
        const { confirmLoading, visible } = this.state;

        let role = localStorage.getItem('role');

        return (
            <div style={{ display: 'inline' }}>
                <Button type="link" onClick={this.showModal}>View</Button>
                <Modal
                    title="Application Details"
                    okText="Submit"
                    confirmLoading={confirmLoading}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.closeModal}
                    width={900}
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
                    <Confirmation viewType="edit" />
                    {/* <Confirmation viewType="view" /> */}
                </Modal>
            </div>
        );
    }
}

const ViewApplication = Form.create()(ViewApplicationForm);

export default ViewApplication;
