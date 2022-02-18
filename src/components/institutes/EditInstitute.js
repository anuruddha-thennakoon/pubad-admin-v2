import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Button, notification, Form, Input } from 'antd';

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
class EditInstituteForm extends Component {

    constructor(props) {
        super(props);

        this.state = { visible: false, confirmLoading: false }
    }

    showModal = () => { this.setState({ visible: true }); }

    handleCancel = () => {
        this.setState({ visible: false });
        this.props.form.resetFields();
    }

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ confirmLoading: true });

                var body = {
                    id: this.props.institute.id,
                    department_head: values.department_head,
                    address: values.address ? values.address : null,
                    telephone: values.telephone ? values.telephone : null,
                    fax_no: values.fax_no ? values.fax_no : null,
                    email: values.email ? values.email : null,
                    contact_person_name: values.contact_person_name ? values.contact_person_name : null,
                    contact_person_telphone: values.contact_person_telphone ? values.contact_person_telphone : null
                }

                this.props.appStore.editInstitute(body)
                    .then(sucess => {
                        openNotificationWithIcon('success', 'Success', 'Institute updated successfully');
                        this.props.form.resetFields();
                        this.setState({ confirmLoading: false });
                        this.props.appStore.getAllInstitutes();
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
                    title="Edit Institute"
                    okText="Update"
                    confirmLoading={confirmLoading}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}
                >
                    <Form>
                        <FormItem
                            label="Institute Name"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.props.institute.name
                            })(
                                <TextArea rows={2} maxLength={100} style={{ width: '100%' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Head of Department"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('department_head', {
                                rules: [{ required: true, message: 'Please input relevant data' }],
                                initialValue: this.props.institute.department_head
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Address"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('address', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: this.props.institute.address
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Telephone No"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('telephone', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: this.props.institute.telephone
                            })(
                                <Input style={{ width: 250 }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Fax No"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('fax_no', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: this.props.institute.fax_no
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
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: this.props.institute.email
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Contact Person"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('contact_person_name', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: this.props.institute.contact_person_name
                            })(
                                <Input style={{ width: '100% !important' }} />
                            )}
                        </FormItem>

                        <FormItem
                            label="Contact Telephone"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('contact_person_telphone', {
                                rules: [{ required: !true, message: 'Please input relevant data' }],
                                initialValue: this.props.institute.contact_person_telphone
                            })(
                                <Input style={{ width: '100% !important', width: 250 }} />
                            )}
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        );
    }
}

const EditInstitute = Form.create()(EditInstituteForm);

export default EditInstitute;