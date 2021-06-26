import React, { Component } from 'react';
import {
    Form, Select, Radio, Button, Input, Result, Row, Col, Modal, notification, DatePicker,
    Card, Breadcrumb, Typography, InputNumber, Table, Statistic, Icon
} from 'antd';
import { inject, observer } from 'mobx-react';

const { Title } = Typography;

import ReactToPrint from 'react-to-print';

const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('appStore')
@observer
class DesignationsViseForm extends Component {

    constructor(props) {
        super(props);

        this.state = { confirmLoading: false };

        this.props.appStore.getInstitutes();
        this.props.appStore.getGrades();
        this.props.appStore.getDesignationVacancies({ institutes_id: null, grades_id: null });
    }

    columns = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Institute',
            dataIndex: 'name',
            key: 'name',
            width: '50%',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Vacancies',
            dataIndex: 'vacancies',
            key: 'vacancies',
            width: '10%',
            align: 'center',
            render: (text, record) => (
                <span>{record.no_of_cadre - record.occupied}</span>
            ),
        }
    ];

    getTotal = (data) => {
        var count = 0;
        data.forEach(element => {
            count = count + (element.no_of_cadre - element.occupied)
        });

        return count;
    }

    handleOk = e => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.appStore.resetVacancyDesignation();
                this.setState({ confirmLoading: true });

                var body = {
                    institutes_id: values.institutes_id ? values.institutes_id : null,
                    grades_id: values.grades_id ? values.grades_id : null,
                }

                this.props.appStore.getDesignationVacancies(body)
                    .then(sucess => {
                        this.setState({ confirmLoading: false });
                    })
                    .catch(err => {
                        this.setState({ confirmLoading: false });
                        openNotificationWithIcon('error', 'Oops', 'Something went wrong in cadre position adding!');
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { confirmLoading } = this.state;
        const { institutes, grades, vacancyDesignation } = this.props.appStore;

        let instituteValues = [];
        let gradesValues = [];

        if (institutes) {
            institutes.forEach((element, index) => {
                instituteValues.push(<Option key={index} value={element.id}>{element.name}</Option>);
            });
        }

        if (grades) {
            grades.forEach((element, index) => {
                gradesValues.push(<Option key={index} value={element.id}>{element.grade_name}</Option>);
            });
        }

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Reports
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Designations
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Designations</Title>

                    <div style={{ textAlign: 'right' }}>
                        <ReactToPrint
                            trigger={() => {
                                return <Icon style={{ fontSize: '32px', color: '#08c' }} type="printer" />;
                            }}
                            content={() => this.componentRef}
                        />
                    </div>
                </Card>

                <Card style={{ margin: 25 }}>
                    <Form layout='inline'>

                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="Institute"
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 18 }}
                                >
                                    {getFieldDecorator('institutes_id', {
                                        rules: [{ required: !true, message: 'Please input institute' }]
                                    })(
                                        <Select
                                            style={{ width: 360 }}
                                            placeholder="Select institute"
                                            optionFilterProp="children"
                                            allowClear
                                            showSearch
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {instituteValues}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="Grade"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 12 }}
                                >
                                    {getFieldDecorator('grades_id', {
                                        rules: [{ required: !true, message: 'Please input grade' }]
                                    })(
                                        <Select
                                            style={{ width: 250 }}
                                            placeholder="Select grade"
                                            optionFilterProp="children"
                                            allowClear
                                            showSearch
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {gradesValues}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={6} style={{ textAlign: 'right' }}>
                                <FormItem>
                                    <Button type="primary" loading={confirmLoading} onClick={this.handleOk}>View</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>

                    <div style={{ marginTop: 15 }} ref={el => (this.componentRef = el)}>
                        {vacancyDesignation && <Table
                            size={"small"}
                            rowKey={record => record.id}
                            columns={this.columns}
                            dataSource={vacancyDesignation}
                            pagination={false}
                            footer={() => <div style={{ textAlign: 'right', marginRight: 25 }}>Total : {this.getTotal(vacancyDesignation)}</div>} />}

                        {!vacancyDesignation && <Table
                            size={"small"}
                            rowKey={record => record.id}
                            columns={this.columns}
                            loading={true}
                            dataSource={null}
                            pagination={false} />}
                    </div>

                </Card>

            </div>
        )
    }

}
const DesignationsVise = Form.create()(DesignationsViseForm);

export default DesignationsVise;