import React from 'react';
import { inject, observer } from 'mobx-react';
import { Statistic, Row, Col, Icon, Card, PageHeader, Avatar, Typography, Divider } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

const { Title } = Typography;
const { Meta } = Card;

import ApplicationList from '../application/ApplicationList';

@inject('appState', 'appStore')
@observer
class ApplicationsDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dbstate: 'applications',//applications, application_status, application_list
            applicationType: 0,
            applicationStatus: '',
            pendingCount: 0, approvedCount: 0, rejectedCount: 0,
            pendingList: [], approvedList: [], rejectedList: []
        };
    }

    getApplicationName = (applicationType) => {
        switch (applicationType) {
            case 1:
                return 'Acting Appointment';
            case 2:
                return 'Class II Promotion';
            case 3:
                return 'Confirmation';
            case 4:
                return 'Re-employment';
            case 5:
                return 'Releases';
            case 6:
                return 'Retirement';
            case 7:
                return 'Transfer';
            default:
                return '';
        }
    }

    selectApplication = (applicationType) => {
        console.log('select application triggered');
        const user = this.props.appState.getUserData();
        const role = this.props.appState.getUserRole();

        this.props.appStore.getApplications({
            user_role: role,
            institutes_id: user.institutes_id,
            application_type: applicationType
        })
            .then(response => {
                this.updateApplicationData(response);
                this.setState({ dbstate: 'application_status', applicationType: applicationType });
            })
            .catch(err => {
                this.setState({ applicationList: [] });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
    }

    updateApplicationData = (applications) => {
        let pendingList = applications.pendingList;
        let approvedList = applications.approvedList;
        let rejectedList = applications.rejectedList;

        let pendingCount = applications.pendingList.length;
        let approvedCount = applications.approvedList.length;
        let rejectedCount = applications.rejectedList.length;

        this.setState({
            pendingList: pendingList, approvedList: approvedList, rejectedList: rejectedList,
            pendingCount: pendingCount, approvedCount: approvedCount, rejectedCount: rejectedCount
        });
    }

    selectStatus = (applicationStatus) => {
        this.setState({ dbstate: 'application_list', applicationStatus: applicationStatus });
    }

    handleBack = (dbstate) => {
        this.setState({ dbstate: dbstate });
    }

    render() {
        const { dbstate, applicationType, applicationStatus, pendingCount,
            approvedCount, rejectedCount, pendingList, approvedList, rejectedList } = this.state;

        return (
            <div>
                {dbstate === 'applications' && <Row>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(1)}>
                            <Meta
                                avatar={<Icon type="file-text" style={{ fontSize: '32px', padding: 10 }} />}
                                title={<span>Acting <br />Appointment</span>}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(2)}>
                            <Meta
                                avatar={<Icon type="file-text" style={{ fontSize: '32px', padding: 10 }} />}
                                title={<span>Class II <br />Promotion</span>}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(3)}>
                            <Meta
                                avatar={<Icon type="file-text" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Confirmation"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(4)}>
                            <Meta
                                avatar={<Icon type="file-text" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Re-employment"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(5)}>
                            <Meta
                                avatar={<Icon type="file-text" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Releases"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(6)}>
                            <Meta
                                avatar={<Icon type="file-text" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Retirement"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(7)}>
                            <Meta
                                avatar={<Icon type="file-text" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Transfer"
                            />
                        </Card>
                    </Col>
                </Row>}

                {dbstate == 'application_status' && <div>
                    <Row>
                        <PageHeader
                            onBack={() => this.handleBack('applications')}
                            title={this.getApplicationName(applicationType)}
                        />
                    </Row>

                    <Row>
                        <Col span={8}>
                            <Card style={{ padding: 10, margin: 15, cursor: 'pointer' }} onClick={() => this.selectStatus('Pending')}>
                                <Statistic valueStyle={{ color: '#000000' }}
                                    prefix={<Icon type="file-text" />}
                                    title="Pending" value={pendingCount} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card style={{ padding: 10, margin: 15, cursor: 'pointer' }} onClick={() => this.selectStatus('Approved')}>
                                <Statistic valueStyle={{ color: '#0e8503' }}
                                    prefix={<Icon type="file-text" />}
                                    title="Approved" value={approvedCount} />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card style={{ padding: 10, margin: 15, cursor: 'pointer' }} onClick={() => this.selectStatus('Rejected')}>
                                <Statistic valueStyle={{ color: '#b40000' }}
                                    prefix={<Icon type="file-text" />}
                                    title="Rejected" value={rejectedCount} />
                            </Card>
                        </Col>
                    </Row>
                </div>}

                {dbstate == 'application_list' && <div>
                    <Row>
                        <PageHeader
                            onBack={() => this.handleBack('application_status')}
                            title={this.getApplicationName(applicationType)}
                            subTitle={applicationStatus}
                        />
                    </Row>

                    <Row>
                        {applicationStatus == 'Pending' && <ApplicationList applicationType={applicationType} data={pendingList} />}
                        {applicationStatus == 'Approved' && <ApplicationList applicationType={applicationType} data={approvedList} />}
                        {applicationStatus == 'Rejected' && <ApplicationList applicationType={applicationType} data={rejectedList} />}
                    </Row>
                </div>}

            </div>
        )
    }
}

export default ApplicationsDashboard;
