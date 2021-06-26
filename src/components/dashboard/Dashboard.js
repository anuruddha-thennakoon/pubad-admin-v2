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

@inject('appState', 'appStore')
@observer
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showSectionTile: true, appType: '' };
        this.props.appStore.getActInApplications();
    }

    handleClick = (e) => {
        this.setState({ showSectionTile: false, showSubTile: true, appType: e })
    }

    handleBack = () => {
        this.setState({ showSectionTile: true, showSubTile: false })
    }

    render() {
        const { actInApplications } = this.props.appStore;

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

        if (actInApplications) {
            actInApplications.forEach((element, i) => {
                if (element.application_type == 'Acting Appointment') {
                    actInAppCount += 1
                } else if (element.application_type == 'Class II Promotion') {
                    classIIAppCount += 1
                } else if (element.application_type == 'Confirmation') {
                    confirmAppCount += 1
                } else if (element.application_type == 'Re-employment') {
                    reInfoAppCount += 1
                } else if (element.application_type == 'Releases') {
                    releasesAppCount += 1
                } else if (element.application_type == 'Retirement') {
                    retirementAppCount += 1
                } else if (element.application_type == 'Transfer') {
                    transferAppCount += 1
                }
            })
        }

        if (this.state.showSubTile) {
            if (actInApplications) {
                actInApplications.forEach((element, index) => {

                    if (this.state.appType == element.application_type && (role == '1' || role == '2')) { //admin and sAdmin
                        if (element.status == 100) {
                            pendingCount += 1
                        } else if (element.status == 300) {
                            approvedCount += 1
                        } else if (element.status == 201) {
                            rejectedCount += 1
                        }

                    } else if (this.state.appType == element.application_type && role == '3') { //psc
                        if (element.status == 200) {
                            pendingCount += 1
                        } else if (element.status == 300) {
                            // approvedCount += 1
                        } else if (element.status == 201) {
                            // rejectedCount += 1
                        }

                    } else if (this.state.appType == element.application_type && role == '4') { //institute
                        if (element.status == 100) {
                            pendingCount += 1
                        } else if (element.status == 300) {
                            approvedCount += 1
                        } else if (element.status == 101) {
                            rejectedCount += 1
                        }
                    }

                })
            }
        }


        return (
            <Row>
                <Col span={24}>
                    {this.state.showSectionTile ? <Row>
                        <Col span={6}>
                            <Card className='card-style' onClick={() => this.handleClick('Acting Appointment')}>
                                <Meta
                                    avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                    title={<span>Acting <br />Appointment</span>}
                                // description={actInAppCount}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className='card-style' onClick={() => this.handleClick('Class II Promotion')}>
                                <Meta
                                    avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                    title={<span>Class II <br />Promotion</span>}
                                // description={classIIAppCount}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className='card-style' onClick={() => this.handleClick('Confirmation')}>
                                <Meta
                                    avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                    title="Confirmation"
                                // description={confirmAppCount}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className='card-style' onClick={() => this.handleClick('Re-employment')}>
                                <Meta
                                    avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                    title="Re-employment"
                                // description={reInfoAppCount}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className='card-style' onClick={() => this.handleClick('Releases')}>
                                <Meta
                                    avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                    title="Releases"
                                // description={releasesAppCount}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className='card-style' onClick={() => this.handleClick('Retirement')}>
                                <Meta
                                    avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                    title="Retirement"
                                // description={retirementAppCount}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className='card-style' onClick={() => this.handleClick('Transfer')}>
                                <Meta
                                    avatar={<Icon type="snippets" style={{ fontSize: '32px', padding: 10 }} />}
                                    title="Transfer"
                                // description={transferAppCount}
                                />
                            </Card>
                        </Col>
                    </Row> : ''}
                    {this.state.showSubTile ?
                        <div>
                            <Row>
                                <PageHeader
                                    // style={{
                                    //     border: '1px solid rgb(235, 237, 240)',
                                    // }}
                                    onBack={this.handleBack}
                                    title={this.state.appType}
                                />
                            </Row>

                            <Row>
                                <Col span={8}>
                                    <Link to={'/view-application?app=' + this.state.appType + '&status=Pending'}>
                                        <Card style={{ padding: 10, margin: 15 }}>
                                            <Statistic valueStyle={{ color: '#000000' }}
                                                prefix={<Icon type="file-text" />}
                                                title="Pending" value={pendingCount} />
                                        </Card>
                                    </Link>
                                </Col>
                                <Col span={8}>
                                    <Link to={'/view-application?app=' + this.state.appType + '&status=Approved'}>
                                        <Card style={{ padding: 10, margin: 15 }}>
                                            <Statistic valueStyle={{ color: '#0e8503' }}
                                                prefix={<Icon type="file-text" />}
                                                title="Approved" value={approvedCount} />
                                        </Card>
                                    </Link>
                                </Col>
                                <Col span={8}>
                                    <Link to={'/view-application?app=' + this.state.appType + '&status=Rejected'}>
                                        <Card style={{ padding: 10, margin: 15 }}>
                                            <Statistic valueStyle={{ color: '#b40000' }}
                                                prefix={<Icon type="file-text" />}
                                                title="Rejected" value={rejectedCount} />
                                        </Card>
                                    </Link>
                                </Col>
                                {/* <span className='backBtnStyle' onClick={this.handleBack}>
                                <i className='fas fa-arrow-left'></i> </span> */}
                            </Row>
                        </div> : ''}
                </Col>
            </Row>

        )
    }
}

export default Dashboard;
