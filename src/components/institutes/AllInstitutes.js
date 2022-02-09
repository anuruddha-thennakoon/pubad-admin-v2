import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography } from 'antd';
import EditInstitute from './EditInstitute';

const { Title } = Typography;

@inject('appStore')
@observer
class AllInstitutes extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tableLoading: true };

        this.props.appStore.getAllInstitutes();
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
            width: '35%'
        },
        {
            title: 'Type',
            dataIndex: 'institute_name',
            key: 'institute_name',
        },
        {
            title: 'Head of Department',
            dataIndex: 'department_head',
            key: 'department_head',
            // width: '15%'
        },
        // {
        //     title: 'Parent Institue',
        //     dataIndex: 'ministry_name',
        //     key: 'ministry_name',
        //     width: '10%'
        // },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            // width: '15%'
        },
        {
            title: 'Telephone No',
            dataIndex: 'telephone',
            key: 'telephone',
            width: '120px'
        },
        {
            title: 'Fax No',
            dataIndex: 'fax_no',
            key: 'fax_no',
            width: '120px'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '150px'
        },
        {
            title: 'Contact Person',
            dataIndex: 'contact_person_name',
            key: 'contact_person_name',
            // width: '15%'
        },
        {
            title: 'Contact Telephone',
            dataIndex: 'contact_person_telphone',
            key: 'contact_person_telphone',
            width: '120px'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '',
            key: '',
            dataIndex: '',
            render: (text, record) => (
                <EditInstitute institute={record}/>
            ),
        },
        // {
        //     title: '',
        //     key: '',
        //     dataIndex: '',
        //     render: (text, record) => (
        //         <Button type="link" className="default-font" onClick={() => this.showDetails(record)}>More</Button>
        //     ),
        // }
    ];

    // showDetails = (record) => {
        // this.props.appStore.getDealDetails(record.id)
        //     .then(sucess => {
        // this.props.history.push('/view-institute')
        // })
        // .catch(err => {
        //     openNotificationWithIcon('error', 'Oops', err.data);
        // });
    // }

    render() {
        let { allinstitutes } = this.props.appStore;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Institutes
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            All Institutes
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>All Institutes</Title>
                </Card>

                <Card className="card-magrin">

                    {allinstitutes && <Table
                        size={"small"}
                        rowKey={record => record.id}
                        columns={this.columns}
                        scroll={{ x: 1400 }}
                        pagination={false}
                        dataSource={allinstitutes} />}

                    {!allinstitutes && <Table
                        size={"small"}
                        rowKey={record => record.id}
                        columns={this.columns}
                        dataSource={null}
                        loading={true} />}

                </Card>
            </div>
        )
    }
}

export default AllInstitutes;