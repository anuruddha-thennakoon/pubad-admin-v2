import React from 'react';
import {
    Select, Radio, Button, Upload, Input, Result, Row, Col, Modal, notification,
    Card, Breadcrumb, Icon, Typography, InputNumber, Divider
} from 'antd';
import { inject, observer } from 'mobx-react';
import Confirmation from './Confirmation';

const { Title, Text } = Typography;
const Option = Select.Option;

@inject('appStore')
@observer
class NewApplication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            applicationType: 3
        };
    }

    changeApplicationType = (value) => {
        this.setState({ applicationType: value });
    }

    render() {
        const { applicationType } = this.state;

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

                <Card style={{ margin: '25px 25px 0px 25px', textAlign: 'left' }}>
                    <Text style={{ margin: '0 25px 0 25px' }}>Select Relevant Application : </Text>
                    <Select
                        style={{ width: 450 }}
                        defaultValue={applicationType}
                        optionFilterProp="children"
                        labelAlign="left"
                        onChange={this.changeApplicationType}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value={1}>Acting Appointment Application</Option>
                        <Option value={2}>Class II Promotion Application</Option>
                        <Option value={3}>Confirmation Application</Option>
                        <Option value={4}>Re-employment Application</Option>
                        <Option value={5}>Releases Application</Option>
                        <Option value={6}>Retirement Application</Option>
                        <Option value={7}>Transfer Application</Option>
                    </Select>
                </Card>

                {applicationType == 3 &&
                    <Confirmation />
                }
            </div>
        );
    }
}

export default NewApplication
