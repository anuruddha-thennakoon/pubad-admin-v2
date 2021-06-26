import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography, Statistic, Row, Col } from 'antd';

const { Title } = Typography;

@inject('appStore')
@observer
class Institute extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tableLoading: true };
    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];

    showDetails = (record) => {
        this.props.appStore.getDealDetails(record.id)
            .then(sucess => {
                this.props.history.push('/view-institute')
            })
            .catch(err => {
                openNotificationWithIcon('error', 'Oops', err.data);
            });
    }

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
                            View Institute
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>View Institute</Title>
                </Card>

                <Card className="card-magrin">
                    <Table
                        title={() => 'Cadre Positions'}
                        columns={this.columns} dataSource={null} size="small" />

                </Card>
            </div>
        )
    }
}

export default Institute;