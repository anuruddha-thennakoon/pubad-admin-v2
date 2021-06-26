import React, { Component } from 'react';
import {
    Form, Select, Radio, Button, Input, Typography, Checkbox, Row, Col, Avatar,
    Card, Icon, message
} from 'antd';
import { inject, observer } from 'mobx-react';
import avater from '../../styles/imgs/paratrooper.jpg';

const { Meta } = Card;
const { Paragraph } = Typography;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@inject('appState', 'authStore')
@observer
class ProfileForm extends Component {

    constructor(props) {
        super(props);
        this.props.appState.userData = JSON.parse(window.localStorage.getItem('userData'));
    }

    doLogout = () => {
        this.props.authStore.logout()
            .then(() => this.props.history.push('/'));
    }

    render() {
        let { userData } = this.props.appState;

        if (!userData) {
            return (<div>loading..</div>)
        } else {
            return (
                <Row style={{marginTop:20}}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Card style={{ width: 400 }}>
                            <div className="antd-pro-pages-account-center-center-avatarHolder">
                                <img alt="" src={avater} />
                                <div className="antd-pro-pages-account-center-center-name">{userData.fname} {userData.lname}</div>
                                <div>{userData.role}</div>
                                <div>{userData.email}</div>
                            </div>
                            <div className="ant-divider ant-divider-horizontal ant-divider-dashed"></div>
                            <Button type="danger" className="btn-align" onClick={this.doLogout}>Logout</Button>
                        </Card>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            )
        }
    }

}
const Profile = Form.create()(ProfileForm);

export default Profile;