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
class AddDesignationForm extends Component {

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

                this.props.appStore.addDesignation(values)
                    .then(sucess => {
                        openNotificationWithIcon('success', 'Success', 'Designation added successfully');
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
                <Button type="primary" icon="plus" onClick={this.showModal}>Add New Designation</Button>
                <Modal
                    title="Add Designation"
                    okText="Add"
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
                                rules: [{ required: true, message: 'Please input designation name!' }]
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

const AddDesignation = Form.create()(AddDesignationForm);

export default AddDesignation;