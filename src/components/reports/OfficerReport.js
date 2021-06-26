import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography, Row, Col, Spin, Icon } from 'antd';

const { Title, Text } = Typography;

import ReactToPrint from 'react-to-print';

@inject('appStore')
@observer
class OfficerReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };

        this.props.appStore.getAllOfficers();
    }

    getOfficersCounts = (data) => {
        var sp_nye = 0;
        var sp_nar = 0;
        var sp_arpubad = 0;
        var sp_aspsc = 0;
        var sp_pscdr = 0;
        var sp_promoted = 0;

        var gi_nye = 0;
        var gi_nar = 0;
        var gi_arpubad = 0;
        var gi_aspsc = 0;
        var gi_pscdr = 0;
        var gi_promoted = 0;

        var gii_nye = 0;
        var gii_nar = 0;
        var gii_arpubad = 0;
        var gii_aspsc = 0;
        var gii_pscdr = 0;
        var gii_promoted = 0;

        var sc_nye = 0;
        var sc_nar = 0;
        var sc_arpubad = 0;
        var sc_aspsc = 0;
        var sc_pscdr = 0;
        var sc_promoted = 0;

        data.forEach(element => {
            // 
            if (element.special_grade_promoted_status == 'Not Yet Eligible') {
                sp_nye = sp_nye + 1;
            }

            if (element.special_grade_promoted_status == 'No Application Received') {
                sp_nar = sp_nar + 1;
            }

            if (element.special_grade_promoted_status == 'Application Received to Public Administration') {
                sp_arpubad = sp_arpubad + 1;
            }

            if (element.special_grade_promoted_status == 'Application Send to PSC') {
                sp_aspsc = sp_aspsc + 1;
            }

            if (element.special_grade_promoted_status == 'PSC Decision Received') {
                sp_pscdr = sp_pscdr + 1;
            }

            if (element.special_grade_promoted_status == 'Confirmed / Promoted') {
                sp_promoted = sp_promoted + 1;
            }

            // 
            if (element.grade_i_promoted_status == 'Not Yet Eligible') {
                gi_nye = gi_nye + 1;
            }

            if (element.grade_i_promoted_status == 'No Application Received') {
                gi_nar = gi_nar + 1;
            }

            if (element.grade_i_promoted_status == 'Application Received to Public Administration') {
                gi_arpubad = gi_arpubad + 1;
            }

            if (element.grade_i_promoted_status == 'Application Send to PSC') {
                gi_aspsc = gi_aspsc + 1;
            }

            if (element.grade_i_promoted_status == 'PSC Decision Received') {
                gi_pscdr = gi_pscdr + 1;
            }

            if (element.grade_i_promoted_status == 'Confirmed / Promoted') {
                gi_promoted = gi_promoted + 1;
            }

            // 
            if (element.grade_ii_promoted_status == 'Not Yet Eligible') {
                gii_nye = gii_nye + 1;
            }

            if (element.grade_ii_promoted_status == 'No Application Received') {
                gii_nar = gii_nar + 1;
            }

            if (element.grade_ii_promoted_status == 'Application Received to Public Administration') {
                gii_arpubad = gii_arpubad + 1;
            }

            if (element.grade_ii_promoted_status == 'Application Send to PSC') {
                gii_aspsc = gii_aspsc + 1;
            }

            if (element.grade_ii_promoted_status == 'PSC Decision Received') {
                gii_pscdr = gii_pscdr + 1;
            }

            if (element.grade_ii_promoted_status == 'Confirmed / Promoted') {
                gii_promoted = gii_promoted + 1;
            }

            // 
            if (element.service_confirmed_status == 'Not Yet Eligible') {
                sc_nye = sc_nye + 1;
            }

            if (element.service_confirmed_status == 'No Application Received') {
                sc_nar = sc_nar + 1;
            }

            if (element.service_confirmed_status == 'Application Received to Public Administration') {
                sc_arpubad = sc_arpubad + 1;
            }

            if (element.service_confirmed_status == 'Application Send to PSC') {
                sc_aspsc = sc_aspsc + 1;
            }

            if (element.service_confirmed_status == 'PSC Decision Received') {
                sc_pscdr = sc_pscdr + 1;
            }

            if (element.service_confirmed_status == 'Confirmed / Promoted') {
                sc_promoted = sc_promoted + 1;
            }
        });

        var result = {
            sp_nye: sp_nye,
            sp_nar: sp_nar,
            sp_arpubad: sp_arpubad,
            sp_aspsc: sp_aspsc,
            sp_pscdr: sp_pscdr,
            sp_promoted: sp_promoted,
            gi_nye: gi_nye,
            gi_nar: gi_nar,
            gi_arpubad: gi_arpubad,
            gi_aspsc: gi_aspsc,
            gi_pscdr: gi_pscdr,
            gi_promoted: gi_promoted,
            gii_nye: gii_nye,
            gii_nar: gii_nar,
            gii_arpubad: gii_arpubad,
            gii_aspsc: gii_aspsc,
            gii_pscdr: gii_pscdr,
            gii_promoted: gii_promoted,
            sc_nye: sc_nye,
            sc_nar: sc_nar,
            sc_arpubad: sc_arpubad,
            sc_aspsc: sc_aspsc,
            sc_pscdr: sc_pscdr,
            sc_promoted: sc_promoted,
        }

        return result;
    }

    render() {
        let { officers } = this.props.appStore;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Reports
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Officer Report
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Officer Report</Title>

                    <div style={{ textAlign: 'right' }}>
                        <ReactToPrint
                            trigger={() => {
                                return <Icon style={{ fontSize: '32px', color: '#08c' }} type="printer" />;
                            }}
                            content={() => this.componentRef}
                        />
                    </div>
                </Card>


                <Card className="card-magrin" ref={el => (this.componentRef = el)}>
                    {officers && <div>
                        {/* Service Confirmed */}
                        <Row style={{ marginBottom: "10px" }}>
                            <Col span={20}><Text strong>Service Confirmed</Text></Col>
                            <Col span={4}></Col>
                        </Row>
                        <Row>
                            <Col span={20}>&emsp;Not Yet Eligible </Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sc_nye}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;No Application Received</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sc_nar}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;Application Received to Public Administration</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sc_arpubad}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;Application Send to PSC</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sc_aspsc}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;PSC Decision Received</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sc_pscdr}</Col>
                        </Row>
                        <Row style={{ marginTop: 15, marginBottom: 16 }}>
                            <Col span={20}>&emsp;Confirmed / Promoted</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sc_promoted}</Col>
                        </Row>


                        {/* Grade II Promoted */}
                        <Row style={{ marginBottom: "10px" }}>
                            <Col span={20}><Text strong>Grade II Promoted</Text></Col>
                            <Col span={4}></Col>
                        </Row>
                        <Row>
                            <Col span={20}>&emsp;Not Yet Eligible </Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gii_nye}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;No Application Received</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gii_nar}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;Application Received to Public Administration</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gii_arpubad}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;Application Send to PSC</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gii_aspsc}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;PSC Decision Received</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gii_pscdr}</Col>
                        </Row>
                        <Row style={{ marginTop: 15, marginBottom: 16 }}>
                            <Col span={20}>&emsp;Confirmed / Promoted</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gii_promoted}</Col>
                        </Row>


                        {/* Grade I Promoted */}
                        <Row style={{ marginBottom: "10px" }}>
                            <Col span={20}><Text strong>Grade I Promoted</Text></Col>
                            <Col span={4}></Col>
                        </Row>
                        <Row>
                            <Col span={20}>&emsp;Not Yet Eligible </Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gi_nye}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;No Application Received</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gi_nar}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;Application Received to Public Administration</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gi_arpubad}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;Application Send to PSC</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gi_aspsc}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;PSC Decision Received</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gi_pscdr}</Col>
                        </Row>
                        <Row style={{ marginTop: 15, marginBottom: 16 }}>
                            <Col span={20}>&emsp;Confirmed / Promoted</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).gi_promoted}</Col>
                        </Row>


                        {/* Special Grade Promoted */}
                        <Row style={{ marginBottom: "10px" }}>
                            <Col span={20}><Text strong>Special Grade Promoted</Text></Col>
                            <Col span={4}></Col>
                        </Row>
                        <Row>
                            <Col span={20}>&emsp;Not Yet Eligible </Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sp_nye}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;No Application Received</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sp_nar}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;Application Received to Public Administration</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sp_arpubad}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;Application Send to PSC</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sp_aspsc}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>&emsp;PSC Decision Received</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sp_pscdr}</Col>
                        </Row>
                        <Row style={{ marginTop: 15, marginBottom: 16 }}>
                            <Col span={20}>&emsp;Confirmed / Promoted</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getOfficersCounts(officers).sp_promoted}</Col>
                        </Row>

                    </div>}
                </Card>
            </div>
        )
    }
}

export default OfficerReport;