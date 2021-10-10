import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, Breadcrumb, Table, Typography, Button } from 'antd';

const { Title } = Typography;

import ViewApplication from "./ViewApplication";
import TableData from './TableData';

import { ACTING, APPOINTMENT, PROMOTION, PUBAD } from '../../utils/constants';


@inject('appStore', 'appState')
@observer
class ApplicationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: null,
            selectedRowKeys: [],
            loading: false,
        };
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

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }

    showBulkAction = () => {
        const role = this.props.appState.getUserRole();
        const applicationType = this.props.applicationType;
        const applicationStatus = this.props.applicationStatus;

        if (role === PUBAD && (applicationType === PROMOTION || applicationType === APPOINTMENT) && applicationStatus === 400) {
            return true;
        } else {
            return false;
        }
    }

    generateReport = (keys, applications) => {
        let csv = [];
        if (applications) {
            keys.forEach(element => {
                let appObj = applications.filter(value => value.id == element);
                let application = JSON.parse(appObj[0].application);
                csv.push(application);
            });
        }
        return csv;
    }

    render() {
        const { applications, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const applicationType = this.props.applicationType;

        return (
            <Card className="card-magrin">
                {this.showBulkAction() && <div style={{ marginBottom: 16 }}>
                    <TableData applicationType={applicationType} tableData={this.generateReport(selectedRowKeys, applications)} />

                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} applications` : ''}
                    </span>
                </div>}

                {applications && <Table
                    size={"small"}
                    loading={this.state.tableLoading}
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={applications}
                    pagination={false}
                    rowSelection={this.showBulkAction() && rowSelection}
                />}

                {!applications && <Table
                    size={"small"}
                    loading={true}
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={null}
                    pagination={false}
                />}

            </Card>
        )
    }
}

export default ApplicationList;
