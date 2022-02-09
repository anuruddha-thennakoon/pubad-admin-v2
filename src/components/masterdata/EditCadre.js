import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Button, notification, Form, InputNumber } from 'antd';

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
class EditCadreForm extends Component {

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
                    no_of_cadre: values.no_of_cadre
                }

                this.props.appStore.editCadre(body)
                    .then(sucess => {
                        openNotificationWithIcon('success', 'Success', 'No of Cadre updated successfully');
                        this.props.form.resetFields();
                        this.setState({ confirmLoading: false });
                        // this.props.appStore.getCadrePositions();
                        this.props.search();
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
                    title="Edit Cadre"
                    okText="Update"
                    confirmLoading={confirmLoading}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                    <FormItem
                            label="No of Cadre"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 12 }}
                        >
                            {getFieldDecorator('no_of_cadre', {
                                rules: [{ required: true, message: 'Please input no of cadre' }],
                                initialValue: this.props.record.no_of_cadre
                            })(
                                <InputNumber style={{ width: 150 }} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const EditCadre = Form.create()(EditCadreForm);

export default EditCadre;