import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, Breadcrumb, Table, Typography } from 'antd';

const { Title } = Typography;

import ViewApplication from "./ViewApplication";

@inject('appStore')
@observer
class ApplicationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    columns = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'NIC',
            dataIndex: 'nic',
            key: 'nic',
            width: '10%',
        },
        {
            title: 'Name',
            dataIndex: 'officer_name',
            key: 'officer_name',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Place of work',
            dataIndex: 'place_of_work',
            key: 'place_of_work',

        },
        {
            title: 'Mobile',
            dataIndex: 'mobile_number',
            key: 'mobile_number',
            width: '10%',

        },
        {
            title: '',
            key: '',
            dataIndex: '',
            width: '10%',
            render: (text, record) => (
                <ViewApplication applicationType={this.props.applicationType} record={record} />
            ),
        }
    ];

    render() {
        return (
            <Card className="card-magrin">

                {this.props.data && <Table
                    size={"small"}
                    loading={this.state.tableLoading}
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={this.props.data} />}

                {!this.props.data && <Table
                    size={"small"}
                    loading={this.state.tableLoading}
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={null}
                />}

            </Card>
        )
    }
}

export default ApplicationList;
