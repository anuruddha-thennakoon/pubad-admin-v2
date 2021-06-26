import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography } from 'antd';
import AddCadre from './AddCadre';

const { Title } = Typography;

@inject('appStore')
@observer
class CadrePositions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };

        this.props.appStore.getCadrePositions();
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
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Grade',
            dataIndex: 'grade_name',
            key: 'grade_name',
            width: '10%',
            align:'center'
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
            width: '10%',
            align:'center'
        },
        {
            title: 'Salary Code',
            dataIndex: 'salary_code',
            key: 'salary_code',
            width: '10%',
            align:'center'
        },
        {
            title: 'No of Cadre',
            dataIndex: 'no_of_cadre',
            key: 'no_of_cadre',
            width: '10%',
            align:'center'
        },
        // {
        //     title: '',
        //     key: '',
        //     dataIndex: '',
        //     width: '10%',
        //     render: (text, record) => (
        //         <EditDesignation record={record} />
        //     ),
        // }
    ];

    render() {
        let { cadrePositions } = this.props.appStore;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Master Data
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Cadre Positions
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Cadre Positions</Title>
                </Card>

                <Card className="card-magrin">
                    <div style={{ marginBottom: 25 }}><AddCadre /></div>

                    {cadrePositions && <Table
                        size={"small"}
                        loading={this.state.tableLoading}
                        rowKey={record => record.id}
                        columns={this.columns}
                        dataSource={cadrePositions} />}

                    {!cadrePositions && <Table
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

export default CadrePositions;