import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography } from 'antd';

const { Title } = Typography;

@inject('appStore')
@observer
class ClassIDowngradedReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };

        this.props.appStore.getAllOfficers();
    }

    columns = [
        {
            title: 'Serial No',
            dataIndex: '',
            key: '',
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
            title: 'File Number',
            dataIndex: 'file_no',
            key: 'file_no',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            title: 'NIC',
            dataIndex: 'nic',
            key: 'nic',
            align: 'center'
        },
    ];

    filterData = (data) => {
        var temp = [];
        data.forEach(element => {
            if (element.grades_id == 8) {
                temp.push(element)
            }
        });
        return temp;
    }

    render() {
        let { officers } = this.props.appStore;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Reports
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Class I Downgraded List
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Class I Downgraded List</Title>
                </Card>

                <Card className="card-magrin">

                    {officers && <Table
                        size={"small"}
                        loading={this.state.tableLoading}
                        rowKey={record => record.id}
                        columns={this.columns}
                        scroll={{ x: 1400 }}
                        pagination={false}
                        dataSource={this.filterData(officers)} />}

                    {!officers && <Table
                        size={"small"}
                        loading={this.state.tableLoading}
                        rowKey={record => record.id}
                        columns={this.columns}
                        dataSource={null}
                        loading={true} />}

                </Card>
            </div>
        )
    }
}

export default ClassIDowngradedReport;