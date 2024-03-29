import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography, Statistic, Row, Col } from 'antd';

const { Title } = Typography;

@inject('appStore')
@observer
class GradeViseInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tableLoading: true };

        if (!this.props.appStore.gradeVacanyDetails) {
            this.props.history.push('/grades-vacancy')
        }
    }

    columns = [
        {
            title: '#ID',
            dataIndex: 'officers_id',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
        },
        {
            title: 'Officer Name',
            dataIndex: 'name',
        },
        {
            title: 'Grade Name',
            dataIndex: 'grade_name',
        },
        {
            title: 'Nature of Attachment',
            dataIndex: 'nature_of_attachment',
        },
    ];

    render() {
        let { gradeVacanyDetails } = this.props.appStore;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Reports
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Grades
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Info
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Info</Title>
                </Card>

                <Card className="card-magrin">
                    <Table
                        pagination={false}
                        columns={this.columns}
                        dataSource={gradeVacanyDetails}
                        size="small" />
                </Card>
            </div>
        )
    }
}

export default GradeViseInfo;