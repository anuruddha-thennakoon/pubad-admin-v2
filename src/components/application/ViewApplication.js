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
        this.state = { visible: false }
    }

    showModal = () => {
        this.setState({ visible: true });
    }

    closeModal = () => {
        this.props.reloadData();
        this.setState({ visible: false });
    }

    render() {
        const { visible } = this.state;

        let role = localStorage.getItem('role');

        return (
            <div style={{ display: 'inline' }}>
                <Button type="link" onClick={this.showModal}>View</Button>
                <Modal
                    title="Application Details"
                    okText="Submit"
                    visible={visible}
                    footer={null}
                    onCancel={this.closeModal}
                    width={900}
                >
                    {this.props.applicationType == 3 && <Confirmation application={this.props.application} viewType="view" />}
                    {/* <Confirmation viewType="view" /> */}
                </Modal>
            </div>
        );
    }
}

const ViewApplication = Form.create()(ViewApplicationForm);

export default ViewApplication;
