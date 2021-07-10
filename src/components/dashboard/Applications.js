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
class Applications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dbstate: 'applications',//applications, application_status, application_list
            applicationType: '',
            applicationStatus: ''
        };
        this.props.appStore.getActInApplications();
    }

    selectApplication = (applicationType) => {
        this.setState({ dbstate: 'application_status', applicationType: applicationType })
    }

    selectStatus = (applicationStatus) => {
        this.setState({ dbstate: 'application_list', applicationStatus: applicationStatus })
    }

    handleBack = (dbstate) => {
        this.setState({ dbstate: dbstate })
    }

    render() {
        const { actInApplications } = this.props.appStore;
        const { dbstate, applicationType, applicationStatus } = this.state;

        let pendingCount = 0;
        let approvedCount = 0;
        let rejectedCount = 0;

        let actInAppCount = 0;
        let classIIAppCount = 0;
        let confirmAppCount = 0;
        let reInfoAppCount = 0;
        let releasesAppCount = 0;
        let retirementAppCount = 0;
        let transferAppCount = 0;

        let role = localStorage.getItem('role');

        // if (actInApplications) {
        //     actInApplications.forEach((element, i) => {
        //         if (element.application_type == 'Acting Appointment') {
        //             actInAppCount += 1
        //         } else if (element.application_type == 'Class II Promotion') {
        //             classIIAppCount += 1
        //         } else if (element.application_type == 'Confirmation') {
        //             confirmAppCount += 1
        //         } else if (element.application_type == 'Re-employment') {
        //             reInfoAppCount += 1
        //         } else if (element.application_type == 'Releases') {
        //             releasesAppCount += 1
        //         } else if (element.application_type == 'Retirement') {
        //             retirementAppCount += 1
        //         } else if (element.application_type == 'Transfer') {
        //             transferAppCount += 1
        //         }
        //     })
        // }

        // if (this.state.showSubTile) {
        //     if (actInApplications) {
        //         actInApplications.forEach((element, index) => {

        //             if (this.state.appType == element.application_type && (role == '1' || role == '2')) { //admin and sAdmin
        //                 if (element.status == 100) {
        //                     pendingCount += 1
        //                 } else if (element.status == 300) {
        //                     approvedCount += 1
        //                 } else if (element.status == 201) {
        //                     rejectedCount += 1
        //                 }

        //             } else if (this.state.appType == element.application_type && role == '3') { //psc
        //                 if (element.status == 200) {
        //                     pendingCount += 1
        //                 } else if (element.status == 300) {
        //                     // approvedCount += 1
        //                 } else if (element.status == 201) {
        //                     // rejectedCount += 1
        //                 }

        //             } else if (this.state.appType == element.application_type && role == '4') { //institute
        //                 if (element.status == 100) {
        //                     pendingCount += 1
        //                 } else if (element.status == 300) {
        //                     approvedCount += 1
        //                 } else if (element.status == 101) {
        //                     rejectedCount += 1
        //                 }
        //             }

        //         })
        //     }
        // }


        return (
            <div>
                {dbstate === 'applications' && <Row>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication('Acting Appointment')}>
                            <Meta
                                avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                title={<span>Acting <br />Appointment</span>}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication('Class II Promotion')}>
                            <Meta
                                avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                title={<span>Class II <br />Promotion</span>}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication('Confirmation')}>
                            <Meta
                                avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Confirmation"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication('Re-employment')}>
                            <Meta
                                avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Re-employment"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication('Releases')}>
                            <Meta
                                avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Releases"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication('Retirement')}>
                            <Meta
                                avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Retirement"
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card className='card-style' onClick={() => this.selectApplication('Transfer')}>
                            <Meta
                                avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                title="Transfer"
                            />
                        </Card>
                    </Col>
                </Row>}

                {dbstate == 'application_status' && <div>
                    <Row>
                        <PageHeader
                            onBack={() => this.handleBack('applications')}
                            title={applicationType}
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
                            title={applicationType}
                            subTitle={applicationStatus}
                        />
                    </Row>

                    <Row>
                        <ApplicationList/>
                    </Row>
                </div>}

            </div>
        )
    }
}

export default Applications;
