import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, Breadcrumb, Table, Typography, Button, Modal, Icon } from 'antd';

import styled from 'styled-components';
import moment from 'moment';
import ReactToPrint from 'react-to-print';

const Title = styled.div`
    writing-mode:tb-rl;
    transform: rotate(180deg);
    padding: 10px;
`;

// const getColumns = () => {
//     let columns = [];

//     columns = [
//         {
//             title: <Title>S/No</Title>,
//             dataIndex: 'id',
//             key: 'id',
//             width: '5%',
//         },
//         {
//             title: <Title>Name & NIC Number</Title>,
//             dataIndex: 'nic',
//             key: 'nic',
//             width: '10%',
//             render: (text, record) => (
//                 <span>
//                     <div>{record.nic}</div>
//                     <div>{record.officer_name}</div>
//                 </span>
//             ),
//         },
//         {
//             title: <Title>Date Of Appointment To Grade II</Title>,
//             dataIndex: 'officer_name',
//             key: 'officer_name',
//             width: '10%',
//             render: (text, record) => (
//                 <span>{moment(record.date_of_appointment_to_SLAS).format('YYYY-MM-DD')}</span>
//             ),
//         },
//         {
//             title: <Title>Date Of Assuming Duties</Title>,
//             dataIndex: 'designation',
//             key: 'designation',
//             width: '10%',
//             render: (text, record) => (
//                 <span>{moment(record.date_of_appointment_to_SLAS).format('YYYY-MM-DD')}</span>
//             ),
//         },
//         {
//             title: <Title>Date Of Confirmation</Title>,
//             dataIndex: 'nic',
//             key: 'nic',
//             width: '10%',
//             render: (text, record) => (
//                 <span>{moment(record.date_of_confirmed_in_the_service).format('YYYY-MM-DD')}</span>
//             ),
//         },
//         {
//             title: <Title>Extended Probation Period</Title>,
//             dataIndex: 'nic',
//             key: 'nic',
//             width: '10%',
//             render: (text, record) => (
//                 <span></span>
//             ),
//         },
//         {
//             title: <Title>Due Date Of Passing 1st EB <br />& Date Of Passing 1st EB</Title>,
//             dataIndex: 'nic',
//             key: 'nic',
//             width: '10%',
//             render: (text, record) => (
//                 <span>
//                     <div>Due date - {moment(record.the_due_date_of_passing_1st_efficiency_bar).format('YYYY-MM-DD')}</div>
//                     <div>Passing date - {moment(record.date_of_passing_1st_efficiency_bar).format('YYYY-MM-DD')}</div>
//                 </span>
//             ),
//         },
//         {
//             title: <Title>Due Date Of Passing Other Official Language <br /> & Date Of Passing Official Language</Title>,
//             dataIndex: 'nic',
//             key: 'nic',
//             width: '10%',
//             render: (text, record) => (
//                 <span>
//                     <div>Due date - {moment(record.due_date_of_passing_other_official_language).format('YYYY-MM-DD')}</div>
//                     <div>Passing date - {moment(record.date_of_passing_1st_efficiency_bar).format('YYYY-MM-DD')}</div>
//                 </span>
//             ),
//         },
//         {
//             title: <Title>Whether The Officer Has 06 Years Active & <br />Satisfactory Service Period In Gr III & <br /> Earned 06 Salary Increments</Title>,
//             dataIndex: 'nic',
//             key: 'nic',
//             width: '10%',
//             render: (text, record) => (
//                 <span>{record['whether_the_officer_has_06_years_active_satisfactory_service_period_in_grade_iii_&_earned_06_salary_increments']}</span>
//             ),
//         },
//         {
//             title: <Title>Whether The Officer Has Demonstrated <br />A Performance At Satisfactory Level Or <br /> Above During 06 Years Immediately Precedin</Title>,
//             dataIndex: 'nic',
//             key: 'nic',
//             width: '10%',
//             render: (text, record) => (
//                 <span>{record['have_the_salary_increments_and_performance_appraisal_reports_been_presented_for_06_years_immediately_preceding_the_date_of_promoting_to_grade_ii']}</span>
//             ),
//         },
//         {
//             title: <Title>Whether The Officer Has Earned All Salary <br />Increments For 6 Years Immediately Preceding</Title>,
//             dataIndex: 'place_of_work',
//             key: 'place_of_work',
//             render: (text, record) => (
//                 <span>{record.table1.map(element => {
//                     return <div>
//                         <span style={{ marginRight: '16px' }}>{element.year}</span>
//                         <span>{element.answer}</span>
//                     </div>
//                 })}</span>
//             ),
//         },
//         {
//             title: <Title>Whether The Officer Has Satisfactory <br />Service For 6 Years Immediately Preceding</Title>,
//             dataIndex: 'mobile_number',
//             key: 'mobile_number',
//             render: (text, record) => (
//                 <span>{record.table2.map(element => {
//                     return <div>
//                         <span style={{ marginRight: '16px' }}>{element.year}</span>
//                         <span>{element.answer}</span>
//                     </div>
//                 })}</span>
//             ),
//         },
//         {
//             title: <Title>Whether The Officer Has Obtained<br />  No – Pay Leave(Specify Duration)</Title>,
//             dataIndex: 'nic',
//             key: 'nic',
//             width: '10%',
//             render: (text, record) => (
//                 <span>{record.has_the_officer_obtained_no_pay}</span>
//             ),
//         },
//         {
//             title: <Title>Whether The Officer Has Pending<br /> Disciplinary Actions (1st/ 2nd Schedule)</Title>,
//             dataIndex: 'nic',
//             key: 'nic',
//             width: '10%',
//             render: (text, record) => (
//                 <span>{record.whether_the_officer_has_pending_disciplinary_actions}</span>
//             ),
//         },
//         {
//             title: <Title>Date Which The Officer Qualified For <br /> The Promotion</Title>,
//             dataIndex: 'nic',
//             key: 'nic',
//             render: (text, record) => (
//                 <span>{moment(record.date_which_the_officer_qualified_for_the_promotion).format('YYYY-MM-DD')}</span>
//             ),
//         },
//     ];

//     return columns;
// }

@inject('appStore', 'appState')
@observer
class TableData extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: false }
    }

    getColumns = () => {
        let applicationType = this.props.applicationType;
        let columns = [];

        if (applicationType === 2) {
            columns = [
                {
                    title: <Title>S/No</Title>,
                    dataIndex: 'id',
                    key: 'id',
                    width: '5%',
                },
                {
                    title: <Title>Name & NIC Number</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>
                            <div>{record.nic}</div>
                            <div>{record.officer_name}</div>
                        </span>
                    ),
                },
                {
                    title: <Title>Date Of Appointment To Grade II</Title>,
                    dataIndex: 'officer_name',
                    key: 'officer_name',
                    width: '10%',
                    render: (text, record) => (
                        <span>{moment(record.date_of_appointment_to_SLAS).format('YYYY-MM-DD')}</span>
                    ),
                },
                {
                    title: <Title>Date Of Assuming Duties</Title>,
                    dataIndex: 'designation',
                    key: 'designation',
                    width: '10%',
                    render: (text, record) => (
                        <span>{moment(record.date_of_appointment_to_SLAS).format('YYYY-MM-DD')}</span>
                    ),
                },
                {
                    title: <Title>Date Of Confirmation</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{moment(record.date_of_confirmed_in_the_service).format('YYYY-MM-DD')}</span>
                    ),
                },
                {
                    title: <Title>Extended Probation Period</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span></span>
                    ),
                },
                {
                    title: <Title>Due Date Of Passing 1st EB <br />& Date Of Passing 1st EB</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>
                            <div>Due date - {moment(record.the_due_date_of_passing_1st_efficiency_bar).format('YYYY-MM-DD')}</div>
                            <div>Passing date - {moment(record.date_of_passing_1st_efficiency_bar).format('YYYY-MM-DD')}</div>
                        </span>
                    ),
                },
                {
                    title: <Title>Due Date Of Passing Other Official Language <br /> & Date Of Passing Official Language</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>
                            <div>Due date - {moment(record.due_date_of_passing_other_official_language).format('YYYY-MM-DD')}</div>
                            <div>Passing date - {moment(record.date_of_passing_1st_efficiency_bar).format('YYYY-MM-DD')}</div>
                        </span>
                    ),
                },
                {
                    title: <Title>Whether The Officer Has 06 Years Active & <br />Satisfactory Service Period In Gr III & <br /> Earned 06 Salary Increments</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{record['whether_the_officer_has_06_years_active_satisfactory_service_period_in_grade_iii_&_earned_06_salary_increments']}</span>
                    ),
                },
                {
                    title: <Title>Whether The Officer Has Demonstrated <br />A Performance At Satisfactory Level Or <br /> Above During 06 Years Immediately Precedin</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{record['have_the_salary_increments_and_performance_appraisal_reports_been_presented_for_06_years_immediately_preceding_the_date_of_promoting_to_grade_ii']}</span>
                    ),
                },
                {
                    title: <Title>Whether The Officer Has Earned All Salary <br />Increments For 6 Years Immediately Preceding</Title>,
                    dataIndex: 'place_of_work',
                    key: 'place_of_work',
                    render: (text, record) => (
                        <span>{record.table1.map(element => {
                            return <div>
                                <span style={{ marginRight: '16px' }}>{element.year}</span>
                                <span>{element.answer}</span>
                            </div>
                        })}</span>
                    ),
                },
                {
                    title: <Title>Whether The Officer Has Satisfactory <br />Service For 6 Years Immediately Preceding</Title>,
                    dataIndex: 'mobile_number',
                    key: 'mobile_number',
                    render: (text, record) => (
                        <span>{record.table2.map(element => {
                            return <div>
                                <span style={{ marginRight: '16px' }}>{element.year}</span>
                                <span>{element.answer}</span>
                            </div>
                        })}</span>
                    ),
                },
                {
                    title: <Title>Whether The Officer Has Obtained<br />  No – Pay Leave(Specify Duration)</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{record.has_the_officer_obtained_no_pay}</span>
                    ),
                },
                {
                    title: <Title>Whether The Officer Has Pending<br /> Disciplinary Actions (1st/ 2nd Schedule)</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{record.whether_the_officer_has_pending_disciplinary_actions}</span>
                    ),
                },
                {
                    title: <Title>Date Which The Officer Qualified For <br /> The Promotion</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    render: (text, record) => (
                        <span>{moment(record.date_which_the_officer_qualified_for_the_promotion).format('YYYY-MM-DD')}</span>
                    ),
                },
            ];
        } else if (applicationType === 8) {
            columns = [
                {
                    title: <Title>S/No</Title>,
                    dataIndex: 'id',
                    key: 'id',
                    width: '5%',
                },
                {
                    title: <Title>Name</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{record.officer_name}</span>
                    ),
                },
                {
                    title: <Title>NIC Number</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{record.nic}</span>
                    ),
                },
                {
                    title: <Title>Previous service station (In case of a promotion, mention the <br/>institution where the officer is serving at present)</Title>,
                    dataIndex: 'officer_name',
                    key: 'officer_name',
                    width: '10%',
                    render: (text, record) => (
                        <span>{null}</span>
                    ),
                },
                {
                    title: <Title>Post (In case of a promotion,  mention the  current post and Grade)</Title>,
                    dataIndex: 'designation',
                    key: 'designation',
                    width: '10%',
                    render: (text, record) => (
                        <span>{null}</span>
                    ),
                },
                {
                    title: <Title>New service station (Not necessary in case of a promotion)</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{null}</span>
                    ),
                },
                {
                    title: <Title>New post (Not necessary in case of a promotion)</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{null}</span>
                    ),
                },
                {
                    title: <Title>Date of promotion /appointment to the post <br/>(If under covering approval, the date of assuming duties of the relevant post)</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{null}</span>
                    ),
                },
                {
                    title: <Title>Due Date Of Passing Other Official Language <br /> & Date Of Passing Official Language</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{}</span>
                    ),
                },
                {
                    title: <Title>Through whom the formal letter of promotion / appointment should be forwarded<br />First column (Administrative authority)</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{null}</span>
                    ),
                },
                {
                    title: <Title>Through whom the formal letter of promotion / appointment should be forwarded<br />First column (Administrative authority)</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{null}</span>
                    ),
                },
                {
                    title: <Title>Through whom the formal letter of promotion / appointment should be forwarded<br />Second column (Cabinet Ministry)</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{null}</span>
                    ),
                },
                {
                    title: <Title>Through whom the formal letter of promotion / appointment should be forwarded<br />Third column (State Ministry)</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{null}</span>
                    ),
                },
                {
                    title: <Title>Through whom the formal letter of promotion / appointment should be forwarded<br />Fourth column (Department or institution)</Title>,
                    dataIndex: 'nic',
                    key: 'nic',
                    width: '10%',
                    render: (text, record) => (
                        <span>{null}</span>
                    ),
                },
            ];
        }

        return columns;
    }

    showModal = () => { this.setState({ visible: true }); }

    handleCancel = () => { this.setState({ visible: false, }); }

    render() {

        return (
            <div style={{ display: 'inline' }}>
                <Button type="primary" onClick={this.showModal}>Generate Report</Button>
                <Modal
                    title=""
                    okText="Print"
                    width={'94%'}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <ReactToPrint
                        trigger={() => {
                            return <Icon style={{ fontSize: '32px', color: '#08c' }} type="printer" />;
                        }}
                        content={() => this.componentRef}
                    />

                    <div ref={el => (this.componentRef = el)}>
                        <Table
                            size={"small"}
                            bordered
                            rowKey={record => record.id}
                            columns={this.getColumns()}
                            dataSource={this.props.tableData}
                            pagination={false}
                        />
                    </div>
                </Modal>
            </div >
        )
    }
}

export default TableData;
