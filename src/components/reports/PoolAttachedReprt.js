import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography } from 'antd';

const { Title } = Typography;

@inject('appStore')
@observer
class PoolAttachedReprt extends React.Component {

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
            title: 'Grade',
            dataIndex: 'grade_name',
            key: 'grade_name'
        },
        {
            title: 'Nature of Attachment',
            dataIndex: 'nature_of_attachment',
            key: 'nature_of_attachment'
        }
    ];

    filterData = (data) => {
        var temp = [];
        data.forEach(element => {
            if (element.grades_id == 7) {
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
                            Pool Attached List
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Pool Attached List</Title>
                </Card>

                <Card className="card-magrin">

                    {officers && <Table
                        size={"small"}
                        loading={this.state.tableLoading}
                        rowKey={record => record.id}
                        columns={this.columns}
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

export default PoolAttachedReprt;