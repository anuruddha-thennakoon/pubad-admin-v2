import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, Breadcrumb, Table, Typography } from 'antd';

const { Title } = Typography;

import ViewApplication from "./ViewApplication";

@inject('appStore', 'appState')
@observer
class ApplicationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { applications: null };
    }

    componentDidMount() {
        this.reloadApplications();
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
                <ViewApplication reloadData={() => this.reloadApplications()} applicationType={this.props.applicationType} application={record} />
            ),
        }
    ];

    reloadApplications = () => {
        this.setState({ applications: null });
        const user = this.props.appState.getUserData();
        const role = this.props.appState.getUserRole();

        this.props.appStore.getApplications({
            user_role: role,
            institutes_id: user.institutes_id,
            application_type: this.props.applicationType,
            application_status: this.props.applicationStatus
        })
            .then(response => {
                this.setState({ applications: response });
            })
            .catch(err => {
                this.setState({ applications: [] });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
    }

    render() {
        const { applications } = this.state;

        return (
            <Card className="card-magrin">

                {applications && <Table
                    size={"small"}
                    loading={this.state.tableLoading}
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={applications} />}

                {!applications && <Table
                    size={"small"}
                    loading={true}
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={null}
                />}

            </Card>
        )
    }
}

export default ApplicationList;
