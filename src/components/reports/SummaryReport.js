import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Button, Card, Breadcrumb, Typography, Row, Col, Spin, Icon } from 'antd';

const { Title } = Typography;

import ReactToPrint from 'react-to-print';

@inject('appStore')
@observer
class SummaryReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };

        this.props.appStore.getAllOfficers();
        this.props.appStore.getGradeVacanciesCount();
    }

    getOfficersCounts = (data) => {
        var special_grade_posts = 0;
        var pool_attached = 0;
        var secondment = 0;
        var calss_i_stayed = 0;
        var secretary_list = 0;
        var other_officer_cabinet_acting = 0;
        var slas_cabinet_acting = 0;
        var slas_psc_acting = 0;
        var slas_psc_contract_basis = 0;

        data.forEach(element => {
            if (element.nature_of_attachment == 'Permanent' && element.grades_id == 1) {
                special_grade_posts = special_grade_posts + 1;
            } else if (element.grades_id == 7) {
                pool_attached = pool_attached + 1;
            } else if (element.grades_id == 6) {
                secondment = secondment + 1;
            } else if (element.nature_of_attachment == 'Class I Stayed') {
                calss_i_stayed = calss_i_stayed + 1;
            } else if (element.grades_id == 5) {
                secretary_list = secretary_list + 1;
            } else if (element.nature_of_attachment == 'Other Officer Cabinet Acting') {
                other_officer_cabinet_acting = other_officer_cabinet_acting + 1;
            } else if (element.nature_of_attachment == 'SLAS - Cabinet Acting') {
                slas_cabinet_acting = slas_cabinet_acting + 1;
            } else if (element.nature_of_attachment == 'SLAS - PSC Acting') {
                slas_psc_acting = slas_psc_acting + 1;
            } else if (element.nature_of_attachment == 'SLAS - PSC Contract Basis') {
                slas_psc_contract_basis = slas_psc_contract_basis + 1;
            }
        });

        var result = {
            special_grade_posts: special_grade_posts,
            pool_attached: pool_attached,
            secondment: secondment,
            calss_i_stayed: calss_i_stayed,
            secretary_list: secretary_list,
            other_officer_cabinet_acting: other_officer_cabinet_acting,
            slas_cabinet_acting: slas_cabinet_acting,
            slas_psc_acting: slas_psc_acting,
            slas_psc_contract_basis: slas_psc_contract_basis
        }

        return result;
    }

    getCalculatedValues = (officers, gradeVacanciesCount) => {

        var result = {
            total_approved_cadre: (gradeVacanciesCount.SPECIAL_GRADE_AVAILABLE),
            special_grade_posts: this.getOfficersCounts(officers).special_grade_posts,
            pool_attached: this.getOfficersCounts(officers).pool_attached,
            secondment: this.getOfficersCounts(officers).secondment,
            calss_i_stayed: this.getOfficersCounts(officers).calss_i_stayed,
            secretary_list: this.getOfficersCounts(officers).secretary_list,
            other_officer_cabinet_acting: this.getOfficersCounts(officers).other_officer_cabinet_acting,
            slas_cabinet_acting: this.getOfficersCounts(officers).slas_cabinet_acting,
            slas_psc_acting: this.getOfficersCounts(officers).slas_psc_acting,
            slas_psc_contract_basis: this.getOfficersCounts(officers).slas_psc_contract_basis
        }

        return result;
    }

    render() {
        let { officers, gradeVacanciesCount } = this.props.appStore;

        return (
            <div>
                <Card bordered={false}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Reports
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Summary Report
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <Title level={4}>Summary Report</Title>

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
                    {(!gradeVacanciesCount && !officers) && <div style={{ textAlign: 'center' }}><Spin size="large" /></div>}
                    {(gradeVacanciesCount && officers) && <div>
                        <Row>
                            <Col span={20}>Total Approved Cadre </Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getCalculatedValues(officers, gradeVacanciesCount).total_approved_cadre}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>Appointed Officers in Special Grade Posts</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getCalculatedValues(officers, gradeVacanciesCount).special_grade_posts}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>Pool Attached</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getCalculatedValues(officers, gradeVacanciesCount).pool_attached}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>Secondment Officers</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getCalculatedValues(officers, gradeVacanciesCount).secondment}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>Class I Stayed Officers</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getCalculatedValues(officers, gradeVacanciesCount).calss_i_stayed}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>Secretary List</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getCalculatedValues(officers, gradeVacanciesCount).secretary_list}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>Other Officer Cabinet Acting</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getCalculatedValues(officers, gradeVacanciesCount).other_officer_cabinet_acting}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>SLAS - Cabinet Acting</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getCalculatedValues(officers, gradeVacanciesCount).slas_cabinet_acting}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>SLAS - PSC Acting</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getCalculatedValues(officers, gradeVacanciesCount).slas_psc_acting}</Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={20}>SLAS - PSC Contract Basis</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{this.getCalculatedValues(officers, gradeVacanciesCount).slas_psc_contract_basis}</Col>
                        </Row>

                        <Row style={{ marginTop: 15, borderTop: '1px solid #777' }}>
                            <Col span={20}>All Vacancy <br />(Total Approved Cadre - (Appointed Officers in Special Grade Posts + Pool Attached + Secondment Officers + Class I Stayed Officers))</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{(this.getCalculatedValues(officers, gradeVacanciesCount).total_approved_cadre -
                                (this.getCalculatedValues(officers, gradeVacanciesCount).special_grade_posts +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).pool_attached +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).secondment +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).calss_i_stayed))}</Col>
                        </Row>

                        {/* <Row style={{ marginTop: 15, borderTop: '1px solid #777' }}>
                            <Col span={20}>Physically Available Vacancies <br />(All Vacancy - (Other Officer Cabinet Acting + SLAS - Cabinet Acting + SLAS - PSC Acting + SLAS - PSC Contract Basis ) + Class I Stayed Officers)</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{(this.getCalculatedValues(officers, gradeVacanciesCount).total_approved_cadre -
                                (this.getCalculatedValues(officers, gradeVacanciesCount).special_grade_posts +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).pool_attached +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).secondment +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).calss_i_stayed)) -

                                (this.getCalculatedValues(officers, gradeVacanciesCount).other_officer_cabinet_acting +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).slas_cabinet_acting +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).slas_psc_acting +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).slas_psc_contract_basis) +

                                this.getCalculatedValues(officers, gradeVacanciesCount).calss_i_stayed}</Col>
                        </Row> */}

                        <Row style={{ marginTop: 15, borderTop: '1px solid #777' }}>
                            <Col span={20}>Vacancies Wihout Cabinet Appointments <br />(All Vacancy - (Other Officer Cabinet Acting + SLAS - Cabinet Acting))</Col>
                            <Col span={4} style={{ textAlign: "center" }}>{((this.getCalculatedValues(officers, gradeVacanciesCount).total_approved_cadre) -
                                (this.getCalculatedValues(officers, gradeVacanciesCount).special_grade_posts +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).pool_attached +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).secondment +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).calss_i_stayed)) -

                                (this.getCalculatedValues(officers, gradeVacanciesCount).other_officer_cabinet_acting +
                                    this.getCalculatedValues(officers, gradeVacanciesCount).slas_cabinet_acting)}</Col>
                        </Row>

                    </div>}

                </Card>
            </div>
        )
    }
}

export default SummaryReport;