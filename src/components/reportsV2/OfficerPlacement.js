import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography, Icon, Select, notification } from 'antd';

import ReactToPrint from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";

const { Title, Text } = Typography;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('appStore')
@observer
class OfficerPlacement extends React.Component {

    constructor(props) {
        super(props);

        this.state = { allOfficers: [], loading: true };
        this.loadOfficers();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.loadOfficers();
        }
    }

    loadOfficers = () => {
        this.setState({ allOfficers: [], loading: true });
        let path = this.props.match.params.grade;
        let type = '';
        if (path === 'special') {
            type = 'OFFICER_PLACEMENT_SPECIAL_GRADE';
        } else if (path === 'gradei') {
            type = 'OFFICER_PLACEMENT_GRADE_I';
        } else if (path === 'gradeii') {
            type = 'OFFICER_PLACEMENT_GRADE_II';
        } else if (path === 'gradeiii') {
            type = 'OFFICER_PLACEMENT_GRADE_III';
        }

        this.props.appStore.generateReports({ type: type })
            .then(sucess => {
                this.setState({ allOfficers: sucess, loading: false });
            })
            .catch(err => {
                this.setState({ allOfficers: [], loading: false });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong in officer adding!');
            });
    }

    columns = [
        {
            title: 'Serial No',
            dataIndex: 'serial_no',
            key: 'serial_no',
            render: (text, record, index) => (
                <span>{index + 1}</span>
            ),
        },
        {
            title: ' Seniority Number',
            dataIndex: 'seniority_no',
            key: 'seniority_no',
        },
        {
            title: 'NIC',
            dataIndex: 'nic',
            key: 'nic',
            align: 'center'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Current Grade',
            dataIndex: 'grade_name',
            key: 'grade_name',
            render: (text, record) => (
                <div>{this.getGradeName(record)}</div>
            ),
        },
        {
            title: 'Present Post',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Present Work Place',
            dataIndex: 'institute_name',
            key: 'institute_name',
            width: '20%'
        },
        {
            title: 'Contact Number',
            dataIndex: 'mobile',
            key: 'mobile',
            align: 'center'
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            key: 'dob',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Entry to</span><br />
                <span>Grade III</span>
            </span>,
            dataIndex: 'grade_iii_entry',
            key: 'grade_iii_entry',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Promotion to</span><br />
                <span>Grade II</span>
            </span>,
            dataIndex: 'grade_ii_promoted',
            key: 'grade_ii_promoted',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Promotion to</span><br />
                <span>Grade I</span>
            </span>,
            dataIndex: 'grade_i_promoted',
            key: 'grade_i_promoted',
            align: 'center',
            width: '10%'
        },
        {
            title: <span>
                <span>Date of</span><br />
                <span>Promotion to</span><br />
                <span>Special Grade</span>
            </span>,
            dataIndex: 'special_grade_promoted',
            key: 'special_grade_promoted',
            align: 'center',
            width: '10%'
        },
        {
            title: 'File Number',
            dataIndex: 'file_no',
            key: 'file_no',
        },
    ];

    getGradeName = (record) => {
        if (record.grades_id == 1) {
            return 'Special Grade';
        } else if (record.grades_id == 2) {
            return 'Grade I';
        } else if (record.grades_id == 3) {
            return 'Grade II';
        } else if (record.grades_id == 4) {
            return 'Grade III';
        } else {
            return '';
        }
    }

    getTitle = (path) => {
        if (path === 'special') {
            return 'Special Grade Officers';
        } else if (path === 'gradei') {
            return 'Grade I Officers';
        } else if (path === 'gradeii') {
            return 'Grade II Officers';
        } else if (path === 'gradeiii') {
            return 'Grade III Officers';
        }
    }

    render() {
        let { allOfficers, loading } = this.state;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Officer Placement
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.getTitle(this.props.match.params.grade)}
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>{this.getTitle(this.props.match.params.grade)}</Title>

                    <div style={{ textAlign: 'right' }}>
                        {/* {allOfficers && <CSVLink
                            filename={"special-grade-officers.csv"}
                            data={this.filterData()}>
                            <Icon style={{ fontSize: '32px', color: '#08c', marginRight: '10px' }} type="file-text" />
                        </CSVLink>}

                        <ReactToPrint
                            trigger={() => {
                                return <Icon style={{ fontSize: '32px', color: '#08c' }} type="printer" />;
                            }}
                            content={() => this.componentRef}
                        /> */}
                    </div>
                </Card>

                <Card className="card-magrin" ref={el => (this.componentRef = el)}>

                    <div style={{ marginTop: 15 }}>
                        {!loading && <Table
                            size={"small"}
                            loading={false}
                            rowKey={record => record.id}
                            columns={this.columns}
                            scroll={{ x: 1400 }}
                            pagination={false}
                            dataSource={allOfficers} />}

                        {loading && <Table
                            size={"small"}
                            loading={true}
                            rowKey={record => record.id}
                            columns={this.columns}
                            dataSource={null}
                            loading={true} />}
                    </div>

                </Card>
            </div>
        )
    }
}

export default OfficerPlacement;