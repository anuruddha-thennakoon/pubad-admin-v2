import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography } from 'antd';
import AddDesignation from './AddDesignation';
import EditDesignation from './EditDesignation';

const { Title } = Typography;

@inject('appStore')
@observer
class Designations extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };

        this.props.appStore.getDesignations();
    }

    columns = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: '',
            key: '',
            dataIndex: '',
            width: '10%',
            render: (text, record) => (
                <EditDesignation record={record} />
            ),
        }
    ];

    render() {
        let { designations } = this.props.appStore;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Master Data
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Designations
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Designations</Title>
                </Card>

                <Card className="card-magrin">
                    <div style={{ marginBottom: 25 }}><AddDesignation /></div>

                    {designations && <Table
                        size={"small"}
                        loading={this.state.tableLoading}
                        rowKey={record => record.id}
                        columns={this.columns}
                        dataSource={designations} />}

                    {!designations && <Table
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

export default Designations;