import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { inject, observer } from 'mobx-react';
import UserDetailsModal from './UserDetailsModal.js';

const columns = [{
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name'
}, {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
}, {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
}, {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
}, {
    title: 'Designation',
    dataIndex: 'designation',
    key: 'designation',
}, {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
}, 
// {
//     title: 'Role',
//     dataIndex: 'role',
//     key: 'role',
// }, {
//     title: 'Status',
//     dataIndex: 'is_active',
//     key: 'is_active',
// }, 
{
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (text, record) => (
        <UserDetailsModal />
    ),
}];

// const dataSource = [{
//     key: '1',
//     first_name: 'John',
//     last_name: 'Brown',
//     email: 'email',
//     phone: '0776154215',
//     designation: 'designation',
//     gender: 'female',
//     role: 'role',
//     is_active: 'is_active'
// }];

@inject('userStore')
@observer
class Users extends Component {

    constructor(props) {
        super(props);
        this.props.userStore.getAllUsers();
    }

    setSingleRequest(data) {
        this.props.userStore.setRequset(data);
    }

    render() {
        let { users } = this.props.userStore;

        if (!users) {
            return (<div>loading..</div>);
        } else {
            return (
                <div className="add-padding">
                    <Table rowKey={record => record.userid} bordered={true} columns={columns} dataSource={users}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    this.setSingleRequest(record);
                                },
                            };
                        }}
                    />
                </div>
            );
        }
    }

}

export default Users;