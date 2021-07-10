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

        this.props.appStore.getDesignations();
        this.props.appStore.getActInApplications();
    }

    columns = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'NIC',
            dataIndex: 'nic',
            key: 'nic',
        },
        {
            title: 'Grade',
            dataIndex: 'present_grade',
            key: 'present_grade',
        },
        {
            title: 'Present Post',
            dataIndex: 'present_post',
            key: 'present_post',

        },
        {
            title: 'Current Work Place',
            dataIndex: 'current_work_place',
            key: 'current_work_place',

        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',

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
        return [{}];
    }

    render() {
        let { actInApplications } = this.props.appStore;

        return (
            <Card className="card-magrin">

                {actInApplications && <Table
                    size={"small"}
                    loading={this.state.tableLoading}
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={this.filterData(actInApplications)} />}
                {/*dataSource={actInApplications}/>}*/}

                {!actInApplications && <Table
                    size={"small"}
                    loading={this.state.tableLoading}
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={null}
                // loading={true}
                />}

            </Card>
        )
    }
}

export default ApplicationList;
