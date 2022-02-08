import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Card, Table } from 'antd';

import ViewApplication from "./ViewApplication";
import TableData from './TableData';

import { APPOINTMENT, PROMOTION, PUBAD } from '../../utils/constants';

const generatePrintDoc = (props) => {
    return `
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Transfer Confirmation - ${props.applicantName}</title>
        <style>
            body {
                font-size: 14px;
                font-family: "Segoe UI";
            }
            .title {
                text-align: center;
            }
            table {
                border-collapse: collapse;
                table-layout: fixed;
            }
            table th{
                text-align: center;
                padding: 3px;
                border: 1px solid #cfcfcf;
            }
            table td {
                text-align: left;
                padding: 5px;
                border: 1px solid #cfcfcf;
            }
            .margin {
                margin-top: 2rem;
            }
        </style>
    </head>
    
    <body onload="window.print()">
        <div style="width: 1000px; margin: 0 auto">
            <div class="officer margin">
                <div>${props.applicantName} (${props.currentGrade} of S.L.A.S)</div>
                <div>through</div>
                <div>${props.currentInstituteHead}, ${props.currentInstitute}</div>
            </div>
    
            <div class="title margin"><u>Transfers of Sri Lanka Administrative Service</u></div>
    
            <div class="description margin">
                You are transferred to the Service Station mentioned below until further notice
                and I should be informed through the relevant Head of the Department on Assumption
                of Duties.
            </div>
    
            <table width="100%" class="margin">
                <tbody>
                    <tr>
                        <th width="20%">Name of the Officer</th>
                        <th width="30%">Service Station and the Post held at Present</th>
                        <th width="30%">Service Station to which the Officer is Transferred and the Post</th>
                        <th width="10%">Date of Transfer</th>
                        <th width="10%">Subsistence Allowance</th>
                    </tr>
                    <tr>
                        <td>${props.applicantName} <br/> (${props.currentGrade} of S.L.A.S)</td>
                        <td>${props.currentInstitute} - <br/> ${props.currentPost}</td>
                        <td>${props.newInstitute} - <br/> ${props.newPost}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
    
            <div class="signature margin">
                <div>G.I. Lakmali Fernando - For Information</div>
                <div>Assistant Director (S.L.A.S)</div>
                <div>For Secretary Ministry of Public Services</div>
                <div>Provincial Councils and Local Government</div>
            </div>

            <table width="100%" class="margin">
                <tbody>
                    <tr>
                        <td width="40%">${props.currentInstituteHead}, ${props.currentInstitute}</td>
                        <td width="60%">${props.currentInstituteNote}</td>
                    </tr>
                    <tr>
                        <td width="40%">${props.newInstituteHead}, ${props.newInstitute}</td>
                        <td width="60%">${props.newInstituteNote}</td>
                    </tr>
                    <tr>
                        <td width="40%">${props.inform1Head}, ${props.inform1Institute}</td>
                        <td width="60%">For Information</td>
                    </tr>
                    <tr>
                        <td width="40%">${props.inform2Head}, ${props.inform2Institute}</td>
                        <td width="60%">For Information</td>
                    </tr>
                    <tr>
                        <td width="40%">${props.inform3Head}, ${props.inform3Institute}</td>
                        <td width="60%">For Information</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    
    </html>
    `
}

@inject('appStore', 'appState')
@observer
class ApplicationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: null,
            selectedRowKeys: [],
            loading: false,
        };

        this.props.appStore.getInstitutes();
    }

    componentDidMount() {
        this.reloadApplications();
    }

    filterData = (array, filterBy, key) => {
        return array && array.filter(function (element) {
            return element[filterBy] === key
        })[0];
    }

    generateColumns = () => {
        const applicationType = this.props.applicationType;
        const applicationStatus = this.props.applicationStatus;
        const role = this.props.appState.getUserRole();

        let columns = [
            {
                title: '#ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'NIC',
                dataIndex: 'nic',
                key: 'nic',
                width: '10%',
            },
            {
                title: 'Name',
                dataIndex: 'officer_name',
                key: 'officer_name',
            },
            {
                title: 'Designation',
                dataIndex: 'designation',
                key: 'designation',
            },
            {
                title: 'Place of work',
                dataIndex: 'place_of_work',
                key: 'place_of_work',

            },
            {
                title: 'Mobile',
                dataIndex: 'mobile_number',
                key: 'mobile_number',
                width: '10%',
            },
            {
                title: 'Submitted by',
                dataIndex: 'submited_by',
                key: 'submited_by',
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '5%',
                render: (text, record) => (
                    <ViewApplication reloadData={() => this.reloadApplications()} applicationType={applicationType} application={record} />
                ),
            }
        ];

        if (applicationType === 7 && applicationStatus === 400 && role === '2') {
            columns.push(
                {
                    title: '',
                    key: '',
                    dataIndex: '',
                    width: '5%',
                    render: (text, record) => (
                        <Button type="link" icon="printer" onClick={() => this.printDocument(record)}>Print</Button>
                    )
                }
            );
            return columns;
        } else {
            return columns;
        }

    }

    printDocument = (data) => {
        const { institutes } = this.props.appStore;
        let application = JSON.parse(data.application);
        let approvalDetails = JSON.parse(data.approval_details);

        let printBody = {
            applicantName: application.officer_name,
            currentGrade: application.grade,
            currentInstituteHead: this.filterData(institutes, 'name',application.place_of_work).department_head,
            currentInstitute: application.place_of_work,
            currentPost: application.current_designation,
            newInstituteHead: this.filterData(institutes, 'name',application.new_place_of_work).department_head,
            newInstitute: application.new_place_of_work,
            newPost: application.new_designation,
            currentInstituteNote: approvalDetails.notice_current_work_place,
            newInstituteNote: approvalDetails.notice_new_work_place,
            inform1Head: this.filterData(institutes, 'name',approvalDetails.inform_1).department_head,
            inform1Institute: approvalDetails.inform_1,
            inform2Head: this.filterData(institutes, 'name',approvalDetails.inform_2).department_head,
            inform2Institute: approvalDetails.inform_2,
            inform3Head: this.filterData(institutes, 'name',approvalDetails.inform_3).department_head,
            inform3Institute: approvalDetails.inform_2,
        }

        let printWindow = window.open('', '_blank', 'resizable=1,scrollbars=yes,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        printWindow.document.open();
        printWindow.document.write(generatePrintDoc(printBody));
        printWindow.document.close();
    }

    reloadApplications = () => {
        this.setState({ applications: null });
        const user = this.props.appState.getUserData();
        const role = this.props.appState.getUserRole();

        this.props.appStore.getApplications({
            user_role: role,
            institutes_id: user.institutes_id,
            application_type: this.props.applicationType,
            application_status: this.props.applicationStatus
        })
            .then(response => {
                this.setState({ applications: response });
            })
            .catch(err => {
                this.setState({ applications: [] });
                openNotificationWithIcon('error', 'Oops', 'Something went wrong!');
            });
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }

    showBulkAction = () => {
        const role = this.props.appState.getUserRole();
        const applicationType = this.props.applicationType;
        const applicationStatus = this.props.applicationStatus;

        if (role === PUBAD && (applicationType === PROMOTION || applicationType === APPOINTMENT) && applicationStatus === 400) {
            return true;
        } else {
            return false;
        }
    }

    generateReport = (keys, applications) => {
        let csv = [];
        if (applications) {
            keys.forEach(element => {
                let appObj = applications.filter(value => value.id == element);
                let application = JSON.parse(appObj[0].application);
                csv.push(application);
            });
        }
        return csv;
    }

    render() {
        const { applications, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const applicationType = this.props.applicationType;

        return (
            <Card className="card-magrin">
                {this.showBulkAction() && <div style={{ marginBottom: 16 }}>
                    <TableData applicationType={applicationType} tableData={this.generateReport(selectedRowKeys, applications)} />

                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} applications` : ''}
                    </span>
                </div>}

                {applications && <Table
                    size={"small"}
                    loading={this.state.tableLoading}
                    rowKey={record => record.id}
                    columns={this.generateColumns(applicationType)}
                    dataSource={applications}
                    pagination={false}
                    rowSelection={this.showBulkAction() && rowSelection}
                />}

                {!applications && <Table
                    size={"small"}
                    loading={true}
                    rowKey={record => record.id}
                    columns={this.generateColumns(applicationType)}
                    dataSource={null}
                    pagination={false}
                />}

            </Card>
        )
    }
}

export default ApplicationList;
