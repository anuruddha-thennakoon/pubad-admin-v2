import React from 'react';
import {
    Select, Radio, Button, Upload, Input, Result, Row, Col, Modal, notification,
    Card, Breadcrumb, Icon, Typography, InputNumber, Divider
} from 'antd';
import { inject, observer } from 'mobx-react';
import Confirmation from './Confirmation';

const { Title } = Typography;
const Option = Select.Option;

@inject('appStore')
@observer
class NewApplication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            applicationType: "Acting Appointment"
        };
    }

    changeApplicationType = (e) => {
        this.setState({ applicationType: e.target.value });
    }

    render() {
        const { confirmLoading, applicationType } = this.state;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Application
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            New Application
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>New Application</Title>
                </Card>
                <Card style={{ margin: '25px 25px 0px 25px', textAlign: 'center' }}>
                    <Radio.Group size={'large'} value={applicationType} onChange={this.changeApplicationType}>
                        <Radio.Button value="Acting Appointment">Acting Appointment</Radio.Button>
                        <Radio.Button value="Class II Promotion">Class II Promotion</Radio.Button>
                        <Radio.Button value="Confirmation">Confirmation</Radio.Button>
                        <Radio.Button value="Re-employment">Re-employment</Radio.Button>
                        <Radio.Button value="Releases">Releases</Radio.Button>
                        <Radio.Button value="Retirement">Retirement</Radio.Button>
                        <Radio.Button value="Transfer">Transfer</Radio.Button>
                    </Radio.Group>
                </Card>

                {applicationType == "Acting Appointment" &&
                    <Confirmation />
                }
            </div>
        );
    }
}

export default NewApplication
