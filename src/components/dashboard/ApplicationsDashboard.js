import React from 'react';
import { inject, observer } from 'mobx-react';
import { Statistic, Row, Col, Icon, Card, PageHeader, Button, Typography, Divider } from 'antd';

import axios from 'axios';
import api from '../../utils/api';

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
            applicationStatus: 0,
            applicationStatusName: '',
            applicationsCount: []
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
            case 8:
                return 'Appointment to Post';
            default:
                return '';
        }
    }

    selectApplication = (applicationType) => {
        const user = this.props.appState.getUserData();
        const role = this.props.appState.getUserRole();

        this.props.appStore.getApplicationsCount({
            user_role: role,
            institutes_id: user.institutes_id,
            application_type: applicationType
        })
            .then(response => {
                this.setState({ applicationsCount: response });
                this.setState({ dbstate: 'application_status', applicationType: applicationType });
            })
            .catch(err => {
                this.setState({ applicationsCount: response });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
    }

    selectStatus = (applicationStatus, applicationStatusName) => {
        this.setState({ dbstate: 'application_list', applicationStatus: applicationStatus, applicationStatusName: applicationStatusName });
    }

    handleBack = (dbstate) => {
        const { applicationType } = this.state;
        this.setState({ dbstate: dbstate });
        if (dbstate == 'application_status') {
            this.selectApplication(applicationType);
        }
    }

    sendMessage = () => {
        axios.defaults.headers.common['app-token'] = api.APP_TOKEN;
        axios.defaults.headers.common['session-token'] = window.localStorage.getItem('jwt');
        axios
            .post('http://119.235.4.210:9494/api/v1/send-user-message', { message: 'Test Message', number: '94762711712' })
            .then(result => {
                console.log('result ', result);
            })
            .catch(error => {
                console.log('error ', error);
            });
    }

    render() {
        const role = this.props.appState.getUserRole();
        const { dbstate, applicationType, applicationsCount, applicationStatus, applicationStatusName } = this.state;

        return (
            <div>
                {/* <Button type="primary" onClick={() => this.sendMessage()}>Primary</Button> */}

                {dbstate === 'applications' && <Row>
                    {(role == '2' || role == '3' || role == '4') && <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(3)}>
                            <Meta
                                avatar={<Icon type="safety-certificate" theme="twoTone" style={{ fontSize: '36px', padding: 10 }} />}
                                title={<div style={{ marginTop: '14px' }}>Confirmation</div>}
                            />
                        </Card>
                    </Col>}
                    {(role == '2' || role == '4') && <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(2)}>
                            <Meta
                                avatar={<Icon type="trophy" theme="twoTone" style={{ fontSize: '36px', padding: 10 }} />}
                                title={<span>Class II <br />Promotion</span>}
                            />
                        </Card>
                    </Col>}
                    {(role == '2' || role == '4') && <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(7)}>
                            <Meta
                                avatar={<Icon type="interaction" theme="twoTone" style={{ fontSize: '36px', padding: 10 }} />}
                                title={<div style={{ marginTop: '14px' }}>Transfer</div>}
                            />
                        </Card>
                    </Col>}
                    {(role == '2' || role == '4') && <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(8)}>
                            <Meta
                                avatar={<Icon type="build" theme="twoTone" style={{ fontSize: '36px', padding: 10 }} />}
                                title={<div>Appoinment to<br />Post</div>}
                            />
                        </Card>
                    </Col>}
                    {(role == '2' || role == '4') && <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(1)}>
                            <Meta
                                avatar={<Icon type="gold" theme="twoTone" style={{ fontSize: '36px', padding: 10 }} />}
                                title={<span>Acting <br />Appointment</span>}
                            />
                        </Card>
                    </Col>}
                    {/* {(role == '2' || role == '4') && <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(6)}>
                            <Meta
                                avatar={<Icon type="shop" theme="twoTone" style={{ fontSize: '36px', padding: 10 }} />}
                                title={<div style={{ marginTop: '14px' }}>Retirement</div>}
                            />
                        </Card>
                    </Col>} */}
                    {/* {(role == '2' || role == '4') && <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(4)}>
                            <Meta
                                avatar={<Icon type="file-text" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Re-employment"
                            />
                        </Card>
                    </Col>} */}
                    {/* {(role == '2' || role == '4') && <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication(5)}>
                            <Meta
                                avatar={<Icon type="file-text" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Releases"
                            />
                        </Card>
                    </Col>} */}
                </Row>}

                {dbstate == 'application_status' && <div>
                    <Row>
                        <PageHeader
                            onBack={() => this.handleBack('applications')}
                            title={this.getApplicationName(applicationType)}
                        />
                    </Row>

                    <Row>
                        {applicationsCount.map((data, index) => {
                            return <Col span={6} key={index}>
                                <Card style={{ padding: 10, margin: 15, cursor: 'pointer' }} onClick={() => this.selectStatus(data.status, data.status_name)}>
                                    <Statistic valueStyle={{ color: '#000000' }}
                                        prefix={<Icon type="file-text" />}
                                        title={data.status_name} value={data.count} />
                                </Card>
                            </Col>
                        })}
                    </Row>
                </div>}

                {dbstate == 'application_list' && <div>
                    <Row>
                        <PageHeader
                            onBack={() => this.handleBack('application_status')}
                            title={this.getApplicationName(applicationType)}
                            subTitle={applicationStatusName}
                        />
                    </Row>

                    <Row>
                        <ApplicationList applicationStatus={applicationStatus} applicationType={applicationType} />
                    </Row>
                </div>}

            </div>
        )
    }
}

export default ApplicationsDashboard;
