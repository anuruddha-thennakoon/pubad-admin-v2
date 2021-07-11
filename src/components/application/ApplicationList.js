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
                <ViewApplication record={record} />
            ),
        }
    ];

    filterData = (data) => {
        // const params = new URLSearchParams(this.props.location.search);
        // const role = localStorage.getItem('role');

        // let temp = [];
        // data.forEach(element => {
        //     if (params.get('app') == element.application_type && (role == '1' || role == '2')) {
        //         if (params.get('status') == 'Pending') {
        //             if (element.status == 100) {
        //                 temp.push(element)
        //             }
        //         } else if (params.get('status') == 'Approved') {
        //             if (element.status == 300) {
        //                 temp.push(element)
        //             }
        //         } else if (params.get('status') == 'Rejected') {
        //             if (element.status == 201) {
        //                 temp.push(element)
        //             }
        //         }
        //     }
        //     else if (params.get('app') == element.application_type && role == '4') {
        //         if (params.get('status') == 'Pending') {
        //             if (element.status == 100) {
        //                 temp.push(element)
        //             }
        //         } else if (params.get('status') == 'Approved') {
        //             if (element.status == 300) {
        //                 temp.push(element)
        //             }
        //         } else if (params.get('status') == 'Rejected') {
        //             if (element.status == 101) {
        //                 temp.push(element)
        //             }
        //         }
        //     }
        //     else if (params.get('app') == element.application_type && role == '3') {
        //         if (params.get('status') == 'Pending') {
        //             if (element.status == 200) {
        //                 temp.push(element)
        //             }
        //         } else if (params.get('status') == 'Approved') {
        //             if (element.status == 300) {
        //                 temp.push(element)
        //             }
        //         } else if (params.get('status') == 'Rejected') {
        //             if (element.status == 201) {
        //                 temp.push(element)
        //             }
        //         }
        //     }


        // });
        // return temp;
        return [];
    }

    render() {
        let { actInApplications } = this.props.appStore;

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
