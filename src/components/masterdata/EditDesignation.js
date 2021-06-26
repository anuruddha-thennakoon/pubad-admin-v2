import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Button, notification, Input, Form, InputNumber, Switch, DatePicker } from 'antd';

import moment from 'moment';

const { TextArea } = Input;
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
class EditDesignationForm extends Component {

    constructor(props) {
        super(props);

        this.state = { visible: false, confirmLoading: false }
    }

    showModal = () => { this.setState({ visible: true }); }

    handleCancel = () => { this.setState({ visible: false, }); }

    handleOk = () => {
        this.props.form.validateFields((err, values) => {

            if (!err) {
                this.setState({ confirmLoading: true });

                var body = {
                    id: this.props.record.id,
                    designation: values.designation
                }

                this.props.appStore.editDesignation(body)
                    .then(sucess => {
                        openNotificationWithIcon('success', 'Success', 'Designation updated successfully');
                        this.props.form.resetFields();
                        this.setState({ confirmLoading: false });
                        this.props.appStore.getDesignations();
                        this.handleCancel();
                    })
                    .catch(err => {
                        this.setState({ confirmLoading: false });
                        openNotificationWithIcon('error', 'Oops', 'Something went wrong');
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading } = this.state;

        return (
            <div style={{ display: 'inline' }}>
                <Button type="link" onClick={this.showModal}>Edit</Button>
                <Modal
                    title="Edit Designation"
                    okText="Update"
                    confirmLoading={confirmLoading}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem
                            label="Designation"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                        >
                            {getFieldDecorator('designation', {
                                rules: [{ required: true, message: 'Please input designation name!' }],
                                initialValue: this.props.record.designation
                            })(
                                <Input maxLength={50} style={{ width: '100% !important' }} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const EditDesignation = Form.create()(EditDesignationForm);

export default EditDesignation;