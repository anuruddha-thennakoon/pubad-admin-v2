import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, Breadcrumb, Table, Typography, Switch, notification } from 'antd';

const { Title } = Typography;

const openNotificationWithIcon = (type, title, msg) => {
    notification[type]({
        placement: 'topRight',
        message: title,
        description: msg,
    });
};

@inject('appStore', 'appState')
@observer
class AllUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        this.getAllUsers();
    }

    columns = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            width: '15%',
        },
        {
            title: 'NIC',
            dataIndex: 'nic',
            key: 'nic',
            width: '10%',
        },
        {
            title: 'User Category',
            dataIndex: 'user_category',
            key: 'user_category',
        },
        {
            title: 'Institute',
            dataIndex: 'institute',
            key: 'institute',
            width: '30%',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '5%',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            width: '10%',

        },
        {
            title: '',
            key: '',
            dataIndex: '',
            width: '10%',
            render: (text, record) => (
                <span>
                    {record.status == 1 && <Switch defaultChecked onChange={() => this.setActive(record)} />}
                    {record.status == 0 && <Switch onChange={() => this.setActive(record)} />}
                </span>
            ),
        }
    ];

    setActive = (record) => {
        this.props.appStore.approveUser({ id: record.id, status: !record.status })
            .then(response => {
                this.getAllUsers();
            })
            .catch(err => {
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
                this.getAllUsers();
            });
    }

    getAllUsers = () => {
        this.props.appStore.getAllUsers()
            .then(response => {
                this.setState({ users: response });
            })
            .catch(err => {
                this.setState({ users: [] });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
    }

    render() {
        const { users } = this.state;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Users
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            All Users
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>All Users</Title>
                </Card>
                <Card className="card-magrin">

                    {users.length != 0 && <Table
                        size={"small"}
                        loading={this.state.tableLoading}
                        rowKey={record => record.id}
                        columns={this.columns}
                        dataSource={users} />}

                    {users.length == 0 && <Table
                        size={"small"}
                        loading={true}
                        rowKey={record => record.id}
                        columns={this.columns}
                        dataSource={null}
                    />}

                </Card>
            </div>
        )
    }
}

export default AllUsers;
