import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography, Statistic, Row, Col } from 'antd';

const { Title } = Typography;

@inject('appStore','appState')
@observer
class Cadre extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cadres: [] };
    }

    columns = [
        {
            title: 'Designation',
            dataIndex: 'designation',
        },
        {
            title: 'Grade',
            dataIndex: 'grade_name',
        },
        {
            title: 'No of cadre',
            dataIndex: 'no_of_cadre',
        }
    ];

    componentDidMount() {
        this.getCadres();
    }

    getCadres = () => {
        let userData = this.props.appState.getUserData();

        this.props.appStore.getCadres({institute_id: userData.institutes_id})
            .then(response => {
                this.setState({ cadres: response });
            })
            .catch(err => {
                this.setState({ cadres: [] });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
    }

    render() {
        let { cadres } = this.state;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Cadre
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Cadre</Title>
                </Card>

                <Card className="card-magrin">
                    <Table
                        pagination={false}
                        columns={this.columns}
                        dataSource={cadres}
                        size="small" />
                </Card>
            </div>
        )
    }
}

export default Cadre;