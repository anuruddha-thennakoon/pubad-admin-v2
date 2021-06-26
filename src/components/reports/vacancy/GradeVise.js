import React, { Component } from 'react';
import {
    Form, Select, Radio, Button, Input, Result, Row, Col, Modal, notification, DatePicker,
    Card, Breadcrumb, Typography, InputNumber, Table, Statistic, Icon
} from 'antd';
import { inject, observer } from 'mobx-react';

const { Title, Text } = Typography;

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
class GradeViseForm extends Component {

    constructor(props) {
        super(props);

        this.state = { filter: 'vacancies' };

        this.props.appStore.getGradeVacancies();
        this.props.appStore.getGradeVacanciesCount();
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
        },
        {
            title: 'Special Grade',
            children: [
                {
                    title: 'Approved',
                    dataIndex: 'SPECIAL_GRADE_AVAILABLE',
                    key: 'SPECIAL_GRADE_AVAILABLE',
                    width: 50,
                    align: 'center'
                },
                {
                    title: 'Vacancies',
                    dataIndex: 'SPECIAL_GRADE_OCCUPIED',
                    key: 'SPECIAL_GRADE_OCCUPIED',
                    width: 50,
                    align: 'center',
                    render: (text, record) => (
                        <span>{record.SPECIAL_GRADE_AVAILABLE - record.SPECIAL_GRADE_OCCUPIED}</span>
                    ),
                }
            ]
        },
        {
            title: 'Grade I',
            children: [
                {
                    title: 'Approved',
                    dataIndex: 'GRADE_1_AVAILABLE',
                    key: 'GRADE_1_AVAILABLE',
                    width: 50,
                    align: 'center'
                },
                {
                    title: 'Vacancies',
                    dataIndex: 'GRADE_1_OCCUPIED',
                    key: 'GRADE_1_OCCUPIED',
                    width: 50,
                    align: 'center',
                    render: (text, record) => (
                        <span>{record.GRADE_1_AVAILABLE - record.GRADE_1_OCCUPIED}</span>
                    ),
                }
            ]
        },
        {
            title: 'Grade II/Grade III',
            children: [
                {
                    title: 'Approved',
                    dataIndex: 'GRADE_2_3_AVAILABLE',
                    key: 'GRADE_2_3_AVAILABLE',
                    width: 50,
                    align: 'center'
                },
                {
                    title: 'Vacancies',
                    dataIndex: 'GRADE_2_3_OCCUPIED',
                    key: 'GRADE_2_3_OCCUPIED',
                    width: 50,
                    align: 'center',
                    render: (text, record) => (
                        <span>{record.GRADE_2_3_AVAILABLE - record.GRADE_2_3_OCCUPIED}</span>
                    ),
                }
            ]
        },
        // {
        //     title: 'Grade III',
        //     width: 50,
        //     children: [
        //         {
        //             title: 'Approved',
        //             dataIndex: 'approved',
        //             key: 'approved',
        //         },
        //         {
        //             title: 'Vacancies',
        //             dataIndex: 'vacancies',
        //             key: 'vacancies',
        //         }
        //     ]
        // }
        {
            title: '',
            key: '',
            dataIndex: '',
            render: (text, record) => (
                <Button type="link" className="default-font" onClick={() => this.showDetails(record)}>More</Button>
            ),
        }
    ];

    showDetails = (record) => {
        this.props.appStore.getGradeVacanyDetails({ id: record.id })
            .then(sucess => {
                this.props.history.push('/grades-vacancy-info')
            })
            .catch(err => {
                openNotificationWithIcon('error', 'Oops', err.data);
            });
    }

    changeFilter = (value) => {
        this.setState({ filter: value });
    }

    filterData = (data) => {
        const { filter } = this.state;

        if (filter == 'vacancies') {
            var temp = [];

            data.forEach(record => {
                if ((record.SPECIAL_GRADE_AVAILABLE - record.SPECIAL_GRADE_OCCUPIED != 0) || (record.GRADE_1_AVAILABLE - record.GRADE_1_OCCUPIED != 0) || (record.GRADE_2_3_AVAILABLE - record.GRADE_2_3_OCCUPIED != 0)) {
                    temp.push(record)
                }
            });

            return temp;
        } else {
            return data;
        }
    }

    getCount = (data) => {
        var sp_approved = 0;
        var sp_vacancies = 0;
        var gradei_approved = 0;
        var gradei_vacancies = 0;
        var gradeii_approved = 0;
        var gradeii_vacancies = 0;

        data.forEach(record => {
            sp_approved = sp_approved + record.SPECIAL_GRADE_AVAILABLE;
            sp_vacancies = sp_vacancies + (record.SPECIAL_GRADE_AVAILABLE - record.SPECIAL_GRADE_OCCUPIED);
            gradei_approved = gradei_approved + record.GRADE_1_AVAILABLE;
            gradei_vacancies = gradei_vacancies + (record.GRADE_1_AVAILABLE - record.GRADE_1_OCCUPIED);
            gradeii_approved = gradeii_approved + record.GRADE_2_3_AVAILABLE;
            gradeii_vacancies = gradeii_vacancies + (record.GRADE_2_3_AVAILABLE - record.GRADE_2_3_OCCUPIED);

            console.log('GRADE_2_3_AVAILABLE',record.GRADE_2_3_AVAILABLE);
            console.log('GRADE_2_3_OCCUPIED',record.GRADE_2_3_OCCUPIED);
        });

        // console.log('data',data);

        return {
            sp_approved: sp_approved,
            sp_vacancies: sp_vacancies,
            gradei_approved: gradei_approved,
            gradei_vacancies: gradei_vacancies,
            gradeii_approved: gradeii_approved,
            gradeii_vacancies: gradeii_vacancies
        }
    }

    render() {
        const { gradeVacancies, gradeVacanciesCount } = this.props.appStore;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Reports
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Grades
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Grades</Title>

                    <div style={{ textAlign: 'right' }}>
                        <ReactToPrint
                            trigger={() => {
                                return <Icon style={{ fontSize: '32px', color: '#08c' }} type="printer" />;
                            }}
                            content={() => this.componentRef}
                        />
                    </div>
                </Card>

                {/* <Card style={{ margin: 25 }}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Special Grade <br />Approved</div>} value={gradeVacanciesCount ? gradeVacanciesCount.SPECIAL_GRADE_AVAILABLE : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Special Grade <br />Vacancies</div>} value={gradeVacanciesCount ? (gradeVacanciesCount.SPECIAL_GRADE_AVAILABLE - gradeVacanciesCount.SPECIAL_GRADE_OCCUPIED) : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Grade I <br />Approved</div>} value={gradeVacanciesCount ? gradeVacanciesCount.GRADE_1_AVAILABLE : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Grade I <br />Vacancies</div>} value={gradeVacanciesCount ? (gradeVacanciesCount.GRADE_1_AVAILABLE - gradeVacanciesCount.GRADE_1_OCCUPIED) : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Grade II/III <br />Approved</div>} vvalue={gradeVacanciesCount ? gradeVacanciesCount.GRADE_11_AVAILABLE : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Grade II/III <br />Vacancies</div>} value={gradeVacanciesCount ? (gradeVacanciesCount.GRADE_11_AVAILABLE - gradeVacanciesCount.GRADE_11_OCCUPIED) : 0} />
                        </Col>
                    </Row>
                </Card> */}

                <Card style={{ margin: 25 }}>
                    <Row gutter={24}>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Special Grade <br />Approved</div>} value={gradeVacancies ? this.getCount(gradeVacancies).sp_approved : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Special Grade <br />Vacancies</div>} value={gradeVacancies ? this.getCount(gradeVacancies).sp_vacancies : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Grade I <br />Approved</div>} value={gradeVacancies ? this.getCount(gradeVacancies).gradei_approved : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Grade I <br />Vacancies</div>} value={gradeVacancies ? this.getCount(gradeVacancies).gradei_vacancies : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Grade II/III <br />Approved</div>} vvalue={gradeVacancies ? this.getCount(gradeVacancies).gradeii_approved : 0} />
                        </Col>
                        <Col span={4}>
                            <Statistic valueStyle={{ textAlign: "center" }} title={<div style={{ textAlign: "center" }}>Grade II/III <br />Vacancies</div>} value={gradeVacancies ? this.getCount(gradeVacancies).gradeii_vacancies : 0} />
                        </Col>
                    </Row>
                </Card>

                <Card style={{ margin: 25 }}>
                    <div>
                        <Text>Type : </Text>
                        <Select
                            defaultValue="vacancies"
                            style={{ width: 250 }}
                            placeholder="Select filter"
                            optionFilterProp="children"
                            onChange={this.changeFilter}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="vacancies">Vacancies</Option>
                            <Option value="all">All</Option>
                        </Select>
                    </div>

                    <div style={{ marginTop: 15 }} ref={el => (this.componentRef = el)}>
                        {gradeVacancies && <Table
                            size={"small"}
                            rowKey={record => record.id}
                            columns={this.columns}
                            dataSource={this.filterData(gradeVacancies)}
                            pagination={false} />}

                        {!gradeVacancies && <Table
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
const GradeVise = Form.create()(GradeViseForm);

export default GradeVise;